const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const envVar = functions.config();
const OWM_API = envVar.owm.api;

app.post('/', (req, res) => {
    console.log(req.body);
    const loc = req.body;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${loc.lat}&lon=${loc.lon}&units=metric&lang=${loc.lang}&appid=${OWM_API}`;

    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data));
});

exports.getWeatherData = functions.https.onRequest(app);
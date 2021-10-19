import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyBjIxdBR-O3w4hc17H9jyvYF862Zl9I20c",
    authDomain: "weather-app-3a7ac.firebaseapp.com",
    projectId: "weather-app-3a7ac",
    storageBucket: "weather-app-3a7ac.appspot.com",
    messagingSenderId: "561725061613",
    appId: "1:561725061613:web:d19a3993376a0536030fe4",
    measurementId: "G-ST2BHH4NYB"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const functions = getFunctions(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);

const getWeatherData = function (lat, lon) {
    const latitude = lat
    const longitude = lon
    const lang = window.navigator.language;
    const url = 'https://us-central1-weather-app-3a7ac.cloudfunctions.net/getWeatherData';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            lat: latitude,
            lon: longitude,
            lang: lang
        })
    }).then(res => res.json()).then(data => {
        console.log(data);
        sessionStorage.setItem('weatherData', JSON.stringify(data));
        renderWeatherData();
    });
};

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if (place == null) return;
    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();
    sessionStorage.clear();
    sessionStorage.setItem('place', JSON.stringify(place.formatted_address));
    getWeatherData(lat, lon);
});

document.querySelector(['.geo-button']).addEventListener('click', () => {
    const successCallback = (position) => {
        sessionStorage.clear();
        getWeatherData(position.coords.latitude, position.coords.longitude);
    };

    const errorCallback = (position) => {
        alert('Unable to retrieve your location');
    };

    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
            timeout: 5000
        });
    };
});

const renderWeatherData = () => {
    const temp = document.querySelector('[data-temperature]');
    const hum = document.querySelector('[data-humidity]');
    const press = document.querySelector('[data-pressure]');
    const wind = document.querySelector('[data-windSpeed]');
    const prec = document.querySelector('[data-precipitationV]');
    const visb = document.querySelector('[data-visibility]');
    const summary = document.querySelector('[data-summary]');
    const location = document.querySelector('[data-location]');

    const weatherData = JSON.parse(sessionStorage.weatherData);
    let place;
    const data = weatherData.current;

    if (sessionStorage.getItem('place') === null) {
        place = weatherData.timezone;
    } else {
        place = JSON.parse(sessionStorage.place);
    }

    console.log(place);

    // console.log(`${place}, ${data}, ${data.rain['1h']}`);

    temp.textContent = data.temp;
    hum.textContent = data.humidity;
    press.textContent = data.pressure;
    wind.textContent = data.wind_speed;
    prec.textContent = weatherData.minutely['0'].precipitation;
    visb.textContent = data.visibility;
    summary.textContent = data.weather['0'].description;
    location.textContent = place;
};


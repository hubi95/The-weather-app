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
        sessionStorage.setItem('weatherData', JSON.stringify(data));
        renderWeatherData();
    });

    searchElement.value = '';
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
    const weatherData = JSON.parse(sessionStorage.weatherData);

    const temp = document.querySelector('[data-temperature]');
    const hum = document.querySelector('[data-humidity]');
    const press = document.querySelector('[data-pressure]');
    const wind = document.querySelector('[data-windSpeed]');
    const prec = document.querySelector('[data-precipitationV]');
    const visb = document.querySelector('[data-visibility]');
    const summary = document.querySelector('[data-summary]');
    const location = document.querySelector('[data-location]');

    let place;
    const data = weatherData.current;

    if (sessionStorage.getItem('place') === null) {
        place = weatherData.timezone;
    } else {
        place = JSON.parse(sessionStorage.place);
    }

    temp.textContent = data.temp;
    hum.textContent = data.humidity;
    press.textContent = data.pressure;
    wind.textContent = data.wind_speed;
    prec.textContent = weatherData.minutely['0'].precipitation;
    visb.textContent = data.visibility;
    summary.textContent = data.weather['0'].description;
    location.textContent = place;

    const wetIcon = document.querySelector('#main-icon');
    wetIcon.src = `https://openweathermap.org/img/wn/${data.weather['0'].icon}@2x.png`;

    renderWeekWeather(weatherData);
    renderCharts(weatherData);
};

const renderWeekWeather = (weatherData) => {
    const lang = window.navigator.language;
    const data = weatherData.daily;
    let dataCounter = 0;
    let dayOfWeek = [];
    console.log(lang);
    if (lang == 'en') {
        dayOfWeek = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
    } else {
        dayOfWeek = ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."];
    }

    const days = document.querySelectorAll('.tile-day');
    const imgs = document.querySelectorAll('img');
    const temps = document.querySelectorAll('.tile-temp');
    const minTemps = document.querySelectorAll('.tile-min-temp');
    const summaries = document.querySelectorAll('.tile-summary');
    [...days].forEach(day => {
        const currentTime = new Date(data[dataCounter++].dt * 1000);
        const currentDay = currentTime.getDay();
        const currentdate = currentTime.getDate();

        console.log(currentDay);
        console.log(dayOfWeek[currentDay]);
        day.textContent = `${dayOfWeek[currentDay]} ${currentdate}`;
        if (dataCounter == 7) dataCounter = 0;
    });

    [...imgs].forEach(img => {
        img.src = `https://openweathermap.org/img/wn/${data[dataCounter++].weather['0'].icon}@2x.png`;
        if (dataCounter == 7) dataCounter = 0;
    });

    [...temps].forEach(temp => {
        temp.textContent = `${Math.round(data[dataCounter++].temp.max)}°`;
        if (dataCounter == 7) dataCounter = 0;
    });

    [...minTemps].forEach(mintemp => {
        mintemp.textContent = `${Math.round(data[dataCounter++].temp.min)}°`;
        if (dataCounter == 7) dataCounter = 0;
    });

    [...summaries].forEach(summary => {
        summary.textContent = `${data[dataCounter++].weather['0'].description}`;
        if (dataCounter == 7) dataCounter = 0;
    });

};

const renderCharts = (weatherData) => {
    const hourly = weatherData.hourly;
    const temp = [];
    const hours = [];

    hourly.forEach(element => {
        let hour = new Date(element.dt * 1000).getHours();

        if (hour === 0) {
            hour = 24;
        };

        hours.push(hour);

        temp.push(Math.round(element.temp));

    });

    let maxTempScale = Math.max(...temp) + 3;
    let minTempScale = Math.min(...temp) - 3;

    const ctx = document.getElementById('myChart').getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, 'RGBA(243,156,18,1)');
    gradient.addColorStop(0.5, 'RGBA(46,204,113,1)');
    gradient.addColorStop(1, 'RGBA(32,169,237,1)');

    const underLineGradient = ctx.createLinearGradient(0, 0, 0, 500);
    underLineGradient.addColorStop(0, 'RGBA(255,255,255,1)');
    underLineGradient.addColorStop(1, 'RGBA(255,255,255,0.1)');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'Temp 48h',
                data: temp,
                backgroundColor: underLineGradient,
                borderColor: gradient,
                borderWidth: 3,
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.9,
                pointRadius: 0,
                fill: true,
            }]
        },
        plugins: [ChartDataLabels],
        options: {
            aspectRatio: 10 / 3,
            responsive: true,
            scales: {
                y: {
                    max: maxTempScale,
                    min: minTempScale,
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false, //this will remove only the label
                    },
                    grid: {
                        display: false,
                    },
                },
                x: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return this.getLabelForValue(value) + ':00';
                        },
                    },

                },
            },

            plugins: {
                zoom: {
                    pan: {
                        mode: 'x',
                        enabled: true
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                            speed: 0.1,
                        },
                        mode: 'x',
                    },
                },
                datalabels: {
                    color: '#000',
                    align: 'end',
                    offset: 10,
                    formatter: function (value, context) {
                        return context.chart.data.datasets[0].data[context.dataIndex] + '°';
                    }
                },
            },
        },
    });

    // myChart.zoom(1.5);

    const hiddenTiles = document.querySelectorAll('.tile-hidden');
    [...hiddenTiles].forEach(element => {
        element.classList.add('tile-visible');
        element.classList.remove('tile-hidden');
    });
};
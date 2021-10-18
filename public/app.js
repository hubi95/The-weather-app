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
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if (place == null) return;
    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();
    const url = 'https://us-central1-weather-app-3a7ac.cloudfunctions.net/getWeatherData';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            lat: lat,
            lon: lon
        })
    }).then(res => res.json()).then(data => {
        console.log(data);
        // setWeatherData(data, place.formatted_address)
    });
});
## The weather app
---
<img src="https://dub01pap001files.storage.live.com/y4mETjwnqCX0RopSf20gDhZWZeSD7cOTD4mAYps4PhaGdiwREa_opiuTkW63ujsXHLUFtF0CNF3jtbp-5vJBJV1y2ANKL3PxpmCVUX_XtglT0kVUBK_yStavBeD5xtGPfVFfSic3d8TYTZwLkrl5gEdNH3OTSjj9Xm_F1cSmoeH9cAxzTLgEpkzcugfsEhA7TR7?width=1432&height=1213&cropmode=none" width="100%" height="auto" />

This project is a weather app based on Google Cloud Platform and OpenWeatherMap API.

Firebase project is the main core and it's used for hosting and linking all services in sync.
Cloud functions to pair with simple REST API written with Express.js is used to get weather data from OpenWeatherMap API.

It works like this:
If you type in city into search area and choose one from a list, you get latitude and longitude from Google Places API.
You can also simply use button to get you current position thanks to build in Geolocation API.
Then "getWeatherData" function is triggered on client side to make a call to REST API hosted on Cloud functions which then get the weather data from OWM API,
send it back to user's browser app and store it in sessionStorage to render it later.
OWM API key is stored on server side as a cloud environment variable for security reason and to not abuse it.

The application interface is still under construction.
For now you can search for city of your choice or use geolocation and see simple set of current weather data, for today, one week and 48 hours(on a chart).
I used Figma to prototype some of interface elements and then implemented them in css styles.
For chart I used Chart.js library.

---
Here is link to my project preview [Link to The weather app](https://weather-app-3a7ac.web.app/)
You can read about the API here [OpenWeatherMap API](https://openweathermap.org/api/one-call-api)
Here is link to Chart.js Doc [Chart.js](https://www.chartjs.org/docs/3.6.0/)


---
## License
This project is licensed under the terms of the **MIT** license.

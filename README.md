## The weather app
---
This project is an weather app based on google cloud services and OpenWeatherMap API.

Firebase is the main core and it's used for hosting and linking all services in sync.
Cloud functions to pair with simple REST API written with Express.js is used to get weather data from OpenWeatherMap API.

It work like this: If you type in city into search area you get latitude and longitude from G Places API.
You can also simply use button to get you current position thanks to build in Geolocation API.
Then "getWeatherData" function is triggered to make a call to REST API hosted on Cloud functions which then get the weather data from OWM API,
send if back to user's browser app and store it in sessionStorage to render it later.

The application interface is still under construction.
For now you can search for city of your choice or use geolocation and see simple set of current weather data.

---
Here is link to my project preview [Link to The weather app](https://weather-app-3a7ac.web.app/)
You can read about the API here [OpenWeatherMap API](https://openweathermap.org/api/one-call-api)

---
## License
This project is licensed under the terms of the **MIT** license.

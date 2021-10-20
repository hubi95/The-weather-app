## The weather app
---
This project is an weather app based on Google Cloud Platform and OpenWeatherMap API.

Firebase project is the main core and it's used for hosting and linking all services in sync.
Cloud functions to pair with simple REST API written with Express.js is used to get weather data from OpenWeatherMap API.

It works like this:
If you type in city into search area and choose one from a list, you get latitude and longitude from Google Places API.
You can also simply use button to get you current position thanks to build in Geolocation API.
Then "getWeatherData" function is triggered on client side to make a call to REST API hosted on Cloud functions which then get the weather data from OWM API,
send it back to user's browser app and store it in sessionStorage to render it later.
OWM API key is stored on server side as a cloud environment variable for security reason and to not abuse it.

The application interface is still under construction.
For now you can search for city of your choice or use geolocation and see simple set of current weather data.

---
Here is link to my project preview [Link to The weather app](https://weather-app-3a7ac.web.app/)
You can read about the API here [OpenWeatherMap API](https://openweathermap.org/api/one-call-api)

---
## License
This project is licensed under the terms of the **MIT** license.

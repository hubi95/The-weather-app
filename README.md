## The weather app
---
<img src="https://dub01pap001files.storage.live.com/y4me6-MJJvF9kdwoKbVNojDWLi7nLs7d7ay1_VGtGts58IJoSWxhna2eU4n623j-o827Ydzl6UcDmbiYzj0G2Utolm4HWVo7Tut8NmnRAOjtfOe-zIWX6vQ0-z_VotchsbR-TEkwDyE4gXhgU11JpzsiA1F0qE558c-8z6PthRhJ_L1RRApWUz0U-X-I53TAe40?width=1357&height=1216&cropmode=none" width="100%" height="auto" />

This project is a weather app based on Google Cloud Platform and OpenWeatherMap API.

Firebase project is the main core and it's used for hosting and linking all services in sync.
Cloud functions to pair with simple REST API written with Express.js is used to get weather data from OpenWeatherMap API.

It works like this:
If you type in city into search area and choose one from a list, you get latitude and longitude from Google Places API.
You can also simply use button to get you current position thanks to build in Geolocation API.
Then "getWeatherData" function is triggered on client side to make a call to REST API hosted on Cloud functions which then get the weather data from OWM API,
send it back to user's browser app and store it in sessionStorage to render it later.
OWM API key is stored on server side as a cloud environment variable for security reason and to not abuse it.

You can search for city of your choice or use geolocation and see simple set of current weather data, for today, one week and next 48 hours (on chart - you can scroll on it or pinch it with your fingers on mobile).
I used Chart.js library to create chart to represent data for next 48h.
Figma came in handy to prototype general look and some basic arrangement of elements so I can implemented them later in CSS styles.

If you have any problems with data to load on screen, please disable any blockers on your browser, or use private mode if you don't want to disable blockers manualy :)

---
Here is link to my project preview [Link to The weather app](https://weather-app-3a7ac.web.app/)
You can read about the API here [OpenWeatherMap API](https://openweathermap.org/api/one-call-api)
Here is link to Chart.js Doc [Chart.js](https://www.chartjs.org/docs/3.6.0/)


---
## License
This project is licensed under the terms of the **MIT** license.

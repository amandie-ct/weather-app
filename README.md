# weather-app
My first API integration using JavaScript. This app provides simple weather forecast upon searching for a determined location, using AccuWeather`s API.
First, the user inputs the city's name, and a request is made to Accuweather's API GET city search endpoint, which returns an id (Key). Then, a second request is made to GET current conditions endpoint using the id as the parameter, which returns some details about the current weather conditions of the searched location. 


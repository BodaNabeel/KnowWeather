"use strict";

// Getting els from HTML using document.getElement method
const checkBtn = document.querySelector(".checkBtn");
const resetBtn = document.querySelector(".resetBtn");
const inputField = document.querySelector(".inputField");
const cityName = document.querySelector(".city");
const weather = document.querySelector(".weatherInCalcius");
const weatherImg = document.querySelector(".weatherImg");
const weatherDescription = document.querySelector(".weatherDescription");
const displayArea = document.querySelector(".displayArea");

// Using this to create a new div in which weather will be shown
let containerWeather = document.createElement("div");
containerWeather.classList.add("containerWeather")

// Inilizers only
let currentLocation;
let markup;

// Arrays
let cityArr = [];
let weatherArr = [];
let iconArr = [];

// Creating function for adding markup
const addMarkUp = function (
  city,
  country,
  weather_,
  icon,
  detailedWeather,
  windSpeed,
  humidity,
  pressure
) {
  markup = `
  <p class="location"> ${city}, ${country} </p>
  <div class="weatherInfo">
     <img src="${icon}" class="weatherImg">
     <p class="weatherDescription">${detailedWeather}</p>   
     <p class="weather">${weather_}°C</p>
  </div>

  <ul class="microDetails">
      <li class="microDetailsList">${windSpeed}km/hr</li>
      <li class="microDetailsList">${humidity}</li>
      <li class="microDetailsList">${pressure} mBar</li>
  </ul>

  <div class="sunTiming">
      <span class="sunrise"></span>
      <span class="sunset"></span>
  </div>    
  `;
  containerWeather.innerHTML = markup;
  displayArea.appendChild(containerWeather);
};

// Creating a function to clear markup
const rmvMarkup = function () {
  inputField.value = "";
  displayArea.removeChild(containerWeather);
};

// checkBtn Functionality
checkBtn.addEventListener("click", () => {
  currentLocation = inputField.value;

  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=0a81cb7904282a45e77ea20e909f5d68`
  );
  xhr.send();
  xhr.onload = () => {
    // setting this if/else to check if location given is correct.
    // you've to put it in the start & then only you can work with rest code
    if (xhr.status === 404) {
      alert("Location Incorrect");
    } else {
      // storing the data from API in data variable
      const data = JSON.parse(xhr.response);

      // Storing important values from varaible data
      const city = data.name;
      const weatherInKelvin = data.main.temp;
      const weatherInCalcius = Math.round(weatherInKelvin - 273.15);
      const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const detailedWeather = data.weather[0].description;
      const country = data.sys.country;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const pressureInHPA = data.main.pressure;
      const pressureInMBAR = Math.round(pressureInHPA/100)


      //Manipulating the markup
      addMarkUp(
        city,
        country,
        weatherInCalcius,
        icon,
        detailedWeather,
        windSpeed,
        humidity,
        pressureInMBAR
      );
    }
  };
});

// Adding resetBtn funcitonality
resetBtn.addEventListener("click", rmvMarkup);



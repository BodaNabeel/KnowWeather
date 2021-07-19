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
let currentLocation;

let cityArr = [];
let weatherArr = [];
let iconArr = [];
// checkBtn Functionality
checkBtn.addEventListener("click", () => {
  currentLocation = inputField.value;

  //   TODO:Understanding this working
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
      // console.log(data);

      // Storing important values from varaible data
      const city = data.name;
      const weatherInKelvin = data.main.temp;
      const weatherInCalcius = Math.round(weatherInKelvin - 273.15);
      const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const detailedWeather = data.weather[0].description;

      //Manipulating the markup

      // Using this to create a new div in which weather detail of 1 place will be stored & on running this code continously i.e by added new places, new details will be added to UI
      const containerMarkup = document.createElement("div.weatherArea");
      const markup = `
      <p class="city">${city}</p>
          <p class="weatherInCalcius">${weatherInCalcius}℃</p>
          <img src="${icon}" class="weatherImg">
          <p class="weatherDescription">${detailedWeather}</p>
      `;
      containerMarkup.innerHTML = markup;
      displayArea.appendChild(containerMarkup);
    }
  };
});

// Adding resetBtn funcitonality
resetBtn.addEventListener("click", () => {
  console.log(currentLocation);
  // this makes the page to reload and reach to its actual position
  window.location.reload();
  inputField.value = "";
});

"use strict";

// Getting els from HTML using document.getElement method
const checkBtn = document.querySelector(".checkBtn");
const resetBtn = document.querySelector(".resetBtn");
const inputField = document.querySelector(".inputField");
let currentLocation;

// checkBtn Functionality
checkBtn.addEventListener("click", () => {
  currentLocation = inputField.value;
  console.log(currentLocation);

  //   TODO:Understanding this working
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=0a81cb7904282a45e77ea20e909f5d68`
  );
  xhr.send();
  xhr.onload = () => {
    // we can change the data type to json also by
    const data = JSON.parse(xhr.response);
    console.log(data);
  };
});

// Adding resetBtn funcitonality
resetBtn.addEventListener("click", () => {
  console.log(currentLocation);
  window.location.reload();
});

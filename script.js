"use strict";

// Getting els from HTML using document.getElement method
const checkBtn = document.querySelector(".checkBtn");
const resetBtn = document.querySelector(".resetBtn");
const inputField = document.querySelector(".inputField");


// Adding Event Listener OnClick inorder to get inputfield data once checkBtn in clicked
checkBtn.addEventListener('click', ()=>{
    let location = inputField.value
    console.log(location)
})
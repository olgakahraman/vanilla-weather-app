function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let h3 = document.querySelector("h3");
let currentTime = new Date();
h3.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  let mainIcon = document.querySelector("#icon");
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#main-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#main-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
}
function searchCity(city) {
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function searchLocation(position) {
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function handlesubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handlesubmit);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("new york");

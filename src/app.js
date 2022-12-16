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
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temperature
  );
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.condition.discription;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.feels_like
  );

  let mainIcon = document.querySelector("#icon");
  mainIcon.setAttribute(
    "src", "icon_url"
  );
  document.querySelector("#main-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#main-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
}
function searchCity(city) {
  let apiKey = "30tacoed7baaf2f850e321e0334cf4ed";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query={city}&key={apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function searchLocation(position) {
  let apiKey = "30tacoed7baaf2f850e321e0334cf4ed";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon={position.coordinates.longitude}&lat={position.coordinates.latitude}&Key={apiKey}`;
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

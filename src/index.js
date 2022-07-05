function currentDate(timestamp) {
  let date = new Date(timestamp);
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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
currentDate();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector(".temperature");
  cityTemperature.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let header = document.querySelector("h1");
  header.innerHTML = city;

  let date = document.querySelector("#date");
  date.innerHTML = currentDate(response.data.dt * 1000);

  let humidity = response.data.main.humidity;
  let cityHumidity = document.querySelector(".humidity");
  cityHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  let cityWind = document.querySelector(".wind");
  cityWind.innerHTML = `Wind: ${wind} meter/sec`;
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let header = document.querySelector("h1");
  header.innerHTML = cityInput.value;

  let apiKey = "fa2a49395aed41c446ad27757ee747da";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}q=${header.innerHTML}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", enterCity);

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "fa2a49395aed41c446ad27757ee747da";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

let apiKey = "fa2a49395aed41c446ad27757ee747da";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

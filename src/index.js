function currentDate() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let time = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  let date = document.querySelector("#date");
  date.innerHTML = `${day} ${time}`;
}
currentDate();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector(".temperature");
  cityTemperature.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let header = document.querySelector("h1");
  header.innerHTML = city;
  console.log(city);
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
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "fa2a49395aed41c446ad27757ee747da";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

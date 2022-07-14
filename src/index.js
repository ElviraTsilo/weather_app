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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row days-row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${day}</h5>
              <h6 class="card-subtitle mb-2 text-muted">23°C</h6>
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
                alt="weather image"
                id="weather-icon-forecast"
              />
            </div>
          </div>
        </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = `${temperature}`;
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

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();

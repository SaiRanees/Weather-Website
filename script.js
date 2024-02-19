const apiKey = "95c5e42e7d9c0ca4c41d582e12f30e4d";

const mainElement = document.getElementById("main");
const formElement = document.getElementById("form");
const searchInput = document.getElementById("search");

const apiUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function fetchWeather(city) {
  try {
    const response = await fetch(apiUrl(city), { origin: "cors" });
    const weatherData = await response.json();
    console.log(weatherData);
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(data) {
  const temperature = kelvinToCelsius(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weather");

  weatherDiv.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
      ${temperature}°C
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    </h2>
    <small>${data.weather[0].main}</small>
    <div class="more-info">
      <p>Humidity: <span>${humidity}%</span></p>
      <p>Wind speed: <span>${Math.round(windSpeed * 3.6)} km/h</span></p>
    </div>
  `;

  mainElement.innerHTML = "";
  mainElement.appendChild(weatherDiv);
}

function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = searchInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

const weatherApp = {};

weatherApp.getApiInfo = function (userChoice, firstPageLoad) {

  weatherApp.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  weatherApp.apiKey = "75bca0532ad0bc22fa4ca7f257f8dbfe";

  const url = new URL(weatherApp.apiUrl);
  url.search = new URLSearchParams({
    appid: weatherApp.apiKey,
    q: userChoice,
  })

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      weatherApp.updateBackground(jsonResponse);
      weatherApp.displayApiInfo(jsonResponse, firstPageLoad);
    })
    .catch(function (error) {
      const errorMessage = document.querySelector('.error-message');
      errorMessage.style.display = "block";
      errorMessage.classList.add('fade-in-2');
    })
}

weatherApp.updateBackground = function (jsonDataIf) {
  const bodyElement = document.querySelector('body');
  const weatherMain = jsonDataIf.weather[0].main;

  // use switch statement here later on.
  if (weatherMain === "Clear") {
    bodyElement.setAttribute('class', 'clear');
  } else if (weatherMain === "Clouds") {
    bodyElement.setAttribute('class', 'cloudy');
  } else if (weatherMain === "Drizzle") {
    bodyElement.setAttribute('class', 'drizzle');
  } else if (weatherMain === "Rain") {
    bodyElement.setAttribute('class', 'drizzle');
  } else if (weatherMain === "Snow") {
    bodyElement.setAttribute('class', 'snow');
  } else if (weatherMain === "Fog" || "Mist" || "Smoke" || "Haze") {
    bodyElement.setAttribute('class', 'mist');
  } else if (weatherMain === "Thunderstorm") {
    bodyElement.setAttribute('class', 'thunderstorm');
  }
}

weatherApp.displayApiInfo = function (jsonData, firstPageLoad) {
  const flexDiv = document.querySelector('.flex-container');
  if (!firstPageLoad) {
    flexDiv.classList.add('fade-in');
  };

  const cityDiv = document.querySelector('.city-div');
  cityDiv.innerHTML = "";
  // do check later if i can use textContent instead of innerHTML here.

  const errorMessage = document.querySelector('.error-message');
  errorMessage.style.display = "none";

  const h1Element = document.createElement('h1');
  h1Element.textContent = `${jsonData.name}, ${jsonData.sys.country}`;
  cityDiv.appendChild(h1Element);

  const weatherDescription = document.createElement('p');
  weatherDescription.textContent = jsonData.weather[0].description;
  weatherDescription.setAttribute('class', 'capitalize')
  cityDiv.appendChild(weatherDescription);

  const tempDiv = document.querySelector('.temperature');
  tempDiv.innerHTML = "";

  const currentTemp = document.createElement('p');
  currentTemp.textContent = `${Math.round(jsonData.main.temp - 273.15)}°C`;
  currentTemp.setAttribute('class', 'temperature-font');
  tempDiv.appendChild(currentTemp);

  const conditionsDiv = document.querySelector('.weather-conditions')
  conditionsDiv.innerHTML = "";

  const feelsTemp = document.createElement('p');
  feelsTemp.textContent = `Feels like: ${Math.round(jsonData.main.feels_like - 273.15)} °C`;
  conditionsDiv.appendChild(feelsTemp);

  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${jsonData.main.humidity}%`;
  conditionsDiv.appendChild(humidity);

  const wind = document.createElement('p');
  wind.textContent = `Wind: ${Math.round(jsonData.wind.speed)} km/hr`;
  conditionsDiv.appendChild(wind);
}

weatherApp.formElement = document.querySelector('form');
weatherApp.formElement.addEventListener('submit', function (event) {
  event.preventDefault();

  const inputElement = document.querySelector('input');

  weatherApp.getApiInfo(inputElement.value, firstPageLoad = false);

  inputElement.value = "";

  const flexDiv = document.querySelector('.flex-container');
  flexDiv.classList.remove('fade-in');
})

weatherApp.init = function () {
  const firstPageLoad = true;
  weatherApp.getApiInfo("toronto", firstPageLoad);
}

weatherApp.init();
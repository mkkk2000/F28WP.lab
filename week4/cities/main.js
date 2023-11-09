const apiKey = '2e0bb3b26408a54823e7ddf16932990f';

const inputField = document.getElementById('cityInput');
const searchButton = document.getElementById('btn');
const weatherInfoDiv = document.getElementById('weather-info');
const cityContainer = document.getElementById("city-info");

searchButton.addEventListener('click', () => {
  const cityName = inputField.value.trim();

  if (cityName === '') {
    alert('Please enter a city name');
    return;
  }

  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  const weatherRequest = new XMLHttpRequest();

  weatherRequest.open('GET', weatherApiUrl, true);

  weatherRequest.onload = function () {
    if (weatherRequest.status >= 200 && weatherRequest.status < 300) {
      const weatherData = JSON.parse(weatherRequest.responseText);
      const weatherDescription = weatherData.weather[0].description;
      const mainTemperature = weatherData.main.temp;
      const windSpeed = weatherData.wind.speed;

      weatherInfoDiv.innerHTML = `
        <p>City Name: ${cityName}</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Main Temperature: ${mainTemperature} K</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    } else {
      alert(`HTTP error! Status: ${weatherRequest.status}`);
    }
  };

  weatherRequest.onerror = function () {
    alert('Network error. Please check your internet connection');
  };

  weatherRequest.send();

  // Load city information from JSON
  const cityApiUrl = 'https://mkkk2000.github.io/F28WP.lab/week4/cities/cities1.json';
  const cityRequest = new XMLHttpRequest();

  cityRequest.open('GET', cityApiUrl, true);

  cityRequest.onload = function () {
    if (cityRequest.status >= 200 && cityRequest.status < 300) {
      const cityData = JSON.parse(cityRequest.responseText);
      renderHTML(cityData);
      searchButton.classList.add("hide-me");
    } else {
      alert(`HTTP error! Status: ${cityRequest.status}`);
    }
  };

  cityRequest.onerror = function () {
    alert('Network error. Please check your internet connection');
  };

  cityRequest.send();
});

function renderHTML(data) {
  var htmlString = "";
  for (i = 0; i < data.length; i++) {
    htmlString += "<p>" + data[i].name + " is a city in " + data[i].country + ",</br> Where you can enjoy indoor places like: ";
    for (ii = 0; ii < data[i].places.indoor.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].places.indoor[ii];
      } else {
        htmlString += ", and " + data[i].places.indoor[ii];
      }
    }
    htmlString += '. & enjoy outdoor places like: ';
    for (ii = 0; ii < data[i].places.outdoor.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].places.outdoor[ii];
      } else {
        htmlString += " and " + data[i].places.outdoor[ii];
      }
    }
    htmlString += '.</p>';
  }
  cityContainer.insertAdjacentHTML('beforeend', htmlString);
}

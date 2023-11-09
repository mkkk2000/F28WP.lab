
const apiKey = '2e0bb3b26408a54823e7ddf16932990f';


const inputField = document.getElementById('cityInput');
const searchButton = document.getElementById('btn'); 
const weatherInfoDiv = document.getElementById('weather-info'); 


searchButton.addEventListener('click', () => {
  
  const cityName = inputField.value.trim();

  if (cityName === '') {
    alert('Please enter a city name');
    return;
  }

  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  const request = new XMLHttpRequest();

  request.open('GET', apiUrl, true);

  request.onload = function () {
    
    if (request.status >= 200 && request.status < 300) {
      const data = JSON.parse(request.responseText);
      
      const weatherDescription = data.weather[0].description;
      const mainTemperature = data.main.temp;
      const windSpeed = data.wind.speed;

      weatherInfoDiv.innerHTML = `
      <p>City Name: ${cityName}</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Main Temperature: ${mainTemperature} K</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    } else {
      
      alert(`HTTP error! Status: ${request.status}`);
    }
  };

  request.onerror = function () {
    
    alert('Network error. Please check your internet connection');
  };

  request.send();
});
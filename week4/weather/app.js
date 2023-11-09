
const apiKey = '2e0bb3b26408a54823e7ddf16932990f';


const inputField = document.getElementById('cityInput');
const searchButton = document.getElementById('btn');
const weatherInfoDiv = document.getElementById('weather-info');

searchButton.addEventListener('click', async () => {
  const cityName = inputField.value.trim();

  if (cityName === '') {
    alert('Please enter a city name');
    return;
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

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
      alert(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    alert('Network error or JSON parsing error. Please check your internet connection');
  }
});

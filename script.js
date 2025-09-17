const apiKey = "8443eac99af2f975bad679e7f1455c57";

function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherDiv = document.getElementById("weather");

      // Check for errors
      if (data.cod !== 200) {
        weatherDiv.innerHTML = `<p class="error">City not found 😢</p>`;
        return;
      }

      const iconClass = getWeatherIcon(data.weather[0].main);

      // Display weather info
      weatherDiv.innerHTML = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <div class="weather-icon"><i class="${iconClass}"></i></div>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Weather:</strong> ${capitalizeFirstLetter(data.weather[0].description)}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        </div>
      `;
    })
    .catch(error => {
      document.getElementById("weather").innerHTML = `<p class="error">Error fetching data!</p>`;
      console.error(error);
    });
}

// Select icon based on weather
function getWeatherIcon(condition) {
  switch(condition.toLowerCase()) {
    case "clear": return "fas fa-sun";
    case "clouds": return "fas fa-cloud";
    case "rain": return "fas fa-cloud-showers-heavy";
    case "drizzle": return "fas fa-cloud-rain";
    case "thunderstorm": return "fas fa-bolt";
    case "snow": return "fas fa-snowflake";
    case "mist":
    case "fog":
    case "haze": return "fas fa-smog";
    default: return "fas fa-cloud";
  }
}

// Capitalize first letter of description
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
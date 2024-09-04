document.getElementById('search-button').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a location.");
    }
});


document.getElementById('current-location-button').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(null, latitude, longitude);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});


function fetchWeatherData(location, lat = null, lon = null) {
    const apiKey = '71a39d4fe71e4cd0b87140043240309';  // Your API key here
    let apiUrl = '';


    if (location) {
        apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    } else if (lat !== null && lon !== null) {
        apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    }


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}


function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    const { temp_c, condition } = data.current;
    const { name, region, country } = data.location;


    weatherContainer.innerHTML = `
        <h2>${name}, ${region}, ${country}</h2>
        <p><strong>Temperature:</strong> ${temp_c}°C</p>
        <p><strong>Condition:</strong> ${condition.text}</p>
        <img src="${condition.icon}" alt="${condition.text}">
    `;
}
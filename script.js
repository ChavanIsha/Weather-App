const apiKey = "0f7ddf3fbac7413190a144312250507";  // ✅ Replace with your actual WeatherAPI.com key

async function getWeather() {
    const city = document.getElementById('city').value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);  // For debugging

        if (data.error) {
            document.getElementById('weather-result').innerHTML = `<p>Error: ${data.error.message}</p>`;
        } else {
            const result = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <img src="${data.current.condition.icon}" alt="Weather Icon">
                <p><strong>${data.current.temp_c}°C</strong> (${data.current.condition.text})</p>
                <p>Feels Like: ${data.current.feelslike_c}°C</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind Speed: ${data.current.wind_kph} kph</p>
                <p>Pressure: ${data.current.pressure_mb} mb</p>
            `;
            document.getElementById('weather-result').innerHTML = result;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('weather-result').innerHTML = `<p>Failed to fetch data!</p>`;
    }
}

document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark');
};

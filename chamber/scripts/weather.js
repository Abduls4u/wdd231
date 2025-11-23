    const apiKey = "86d2890879b0626338f831df705b05a9";
    const lat = 8.4966;
    const lon = 4.5421;

    const tempSpan = document.getElementById("temp");
    const descSpan = document.getElementById("description");
    const forecastList = document.getElementById("forecast-list");

   async function getCurrentWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather API error");
        const data = await response.json();
        tempSpan.textContent = `${Math.round(data.main.temp)}°C`;
        descSpan.textContent = data.weather[0].description;
    } catch (error) {
        console.error(error);
        tempSpan.textContent = "N/A";
        descSpan.textContent = "Unable to fetch weather";
    }
}

    // 3-DAY FORECAST
    async function getForecast() {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        // Pick 3 mid-day results
        const middayForecasts = data.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);

        middayForecasts.forEach(f => {
            const li = document.createElement("li");
            li.textContent = `${new Date(f.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}: 
                            ${Math.round(f.main.temp)}°C, ${f.weather[0].description}`;
            forecastList.appendChild(li);
        });
    }

    getCurrentWeather();
    getForecast();



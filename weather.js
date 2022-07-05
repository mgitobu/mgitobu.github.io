let weather = {
    fetchWeather: function(city) {
        fetch(
                "https://api.open-meteo.com/v1/forecast?q=" +
                city
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".lat").value);
        this.fetchWeather(document.querySelector(".lng").value);
    },
};
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
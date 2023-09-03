
let weather_api_data;

function weatherApp() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            
                const weather_api = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=1";
                //const weather_api = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto&forecast_days=1";
                console.log(weather_api)

                fetch(weather_api)
                    .then(response => response.json())
                    .then(weather_data => {
                        // console.log(weather_data);
                        weather_api_data = weather_data
                        
                        // current_weather details
                        let temperature = weather_api_data.current_weather.temperature + weather_api_data.daily_units.temperature_2m_max
                        let wind_speed = weather_api_data.current_weather.windspeed + weather_api_data.daily_units.windgusts_10m_max
                        let wind_direction = weather_api_data.current_weather.winddirection + weather_api_data.daily_units.winddirection_10m_dominant
                    
                        
                        // daily weather details
                         let max_temp = weather_api_data.daily.temperature_2m_max + weather_api_data.daily_units.temperature_2m_max
                         let min_temp = weather_api_data.daily.temperature_2m_min + weather_api_data.daily_units.temperature_2m_min
                         let sunrise  = weather_api_data.daily.sunrise
                         let sunset = weather_api_data.daily.sunset
                         let uv_index = weather_api_data.daily.uv_index_max + weather_api_data.daily_units.uv_index_max
                         let precipitation_sum = weather_api_data.daily.precipitation_sum + " " + weather_api_data.daily_units.precipitation_sum
                         let precipitation_probability = weather_api_data.daily.precipitation_probability_max + weather_api_data.daily_units.precipitation_probability_max
                         let wind_speed_max = weather_api_data.daily.windspeed_10m_max + weather_api_data.daily_units.windspeed_10m_max 
                         let wind_gust_max = weather_api_data.daily.windgusts_10m_max + weather_api_data.daily_units.windgusts_10m_max
                         let wind_direction_dominant = weather_api_data.daily.winddirection_10m_dominant +  weather_api_data.daily_units.winddirection_10m_dominant
                    
                         console.log(max_temp, min_temp, precipitation_sum, precipitation_probability, wind_speed_max, wind_gust_max, wind_direction_dominant)

                            weather_page = document.querySelector("#weather-page")

                            weather_details = document.createElement("div")

                            weather_details.innerHTML = `
                            <center>
                            <h2>Today's Weather</h2> 
                            <h4>Current Weather Details:</h4>
                            Temperature: ${temperature} <br>
                            Wind Speed: ${wind_speed} <br>
                            Wind Direction: ${wind_direction} <br>
                            <h4>Daily Weather Details:</h4>
                            Max Temp: ${max_temp} <br>
                            Min Temp: ${min_temp} <br>
                            Sunrise: ${sunrise} <br>
                            Sunset: ${sunset} <br>
                            UV Index: ${uv_index} <br>
                            Precipitation Sum: ${precipitation_sum} <br>
                            Precipitation Probability: ${precipitation_probability} <br>
                            Max Wind Speed: ${wind_speed_max} <br>
                            Max Wind Gust: ${wind_gust_max} <br>
                            Wind Direction Dominant: ${wind_direction_dominant} <br>
                            Temp Unit: <br>
                            <button class="button-primary" id="f-button">°F</button> <button class="button-primary" id="c-button">°C</button>
                            </center>`

                            weather_page.appendChild(weather_details)

                            document.getElementById("f-button").addEventListener("click", () => {location.href = "index.html"})
                            document.getElementById("c-button").addEventListener("click", () => {location.href = "indexc.html"})
                    })

                    .catch(error => {
                        alert("Error fetching weather data: ", error);
                    });
                
            },
            function (error) {
                console.error("Error getting location: ", error);
            }
        );
    } 
    else {
        alert("Geolocation is not available.");
    }
}

weatherApp()
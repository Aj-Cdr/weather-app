
let weather_api_data;

function weatherApp() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            
                const weather_api = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=1";
                
                fetch(weather_api)
                    .then(response => response.json())
                    .then(weather_data => {
                        // console.log(weather_data);
                        weather_api_data = weather_data
                        
                        // current weather details
                        let temperature = weather_api_data.current_weather.temperature
                        let wind_speed
                        let wind_direction 
                    
                        // daily weather details
                         let max_temp
                         let min_temp
                         let sunrise 
                         let sunset
                         let uv_index
                         let precipitation_sum
                         let precipitation_probability
                         let wind_speed_max
                         let wind_gust_max
                         let wind_direction_dominant
                    
                    })
                    .catch(error => {
                        alert("Error fetching weather data: ", error);
                    });
                
            },
            function (error) {
                console.error("Error getting location: ", error);
            }
        );
    } else {
        alert("Geolocation is not available.");
    }
}

weatherApp()

// http://localhost:5500/index.html
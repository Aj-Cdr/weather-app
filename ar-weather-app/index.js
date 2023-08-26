
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
                        let temperature = weather_api_data.current_weather.temperature
                        let wind_speed = weather_api_data.current_weather.windspeed
                        let wind_direction = weather_api_data.current_weather.winddirection
                    
                        
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

AFRAME.registerComponent("display-weather", {
    init: function() {this.createWeatherCard()},
    createWeatherCard: function() {
     
    }
})



// http://localhost:5500/index.html
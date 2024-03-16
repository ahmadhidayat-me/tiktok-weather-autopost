var axios = require("axios");

var API_KEY = "678c0342aa9c47d5a2010918241503"; // Replace this with your WeatherAPI API key
const time = ["00:05", "06:00", "07:00", "11:00", "12:00", "13:00", "15:00", "18:00", "19:00"];

const getWeather = async (LOCATION) => {
  try {
    const forecastResponse = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=1&aqi=no&alerts=no`
    );
    const forecastData = forecastResponse.data.forecast.forecastday;

    forecastData.forEach((day) => {
      console.log(`Hourly weather forecast ${LOCATION} for ${day.date}:`);
      day.hour.forEach((hour) => {
        // Check if the current hour matches any of the desired times
        if (time.includes(hour.time.split(" ")[1])) {
          console.log(
            `Time: ${hour.time}, Temperature: ${hour.temp_c}°C, Condition: ${hour.condition.text}, Code: ${hour.condition.code}, Icon: ${hour.condition.icon}`
          );
        }
      });
    });
    console.log("\n");
  } catch (error) {
    console.error("Error fetching weather:", error.message);
  }
};

getWeather("Depok");
getWeather("Serpong");
getWeather("New York");

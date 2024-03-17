const axios = require('axios');

async function fetchWeather(city) {
   try {
      const apiKey = process.env.WEATHER_API_KEY; // Sesuaikan dengan kunci API cuaca Anda
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      return response.data;
   } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
   }
}

module.exports = fetchWeather;

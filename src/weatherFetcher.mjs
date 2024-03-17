// weatherFetcher.js

import fetch from 'node-fetch';

async function fetchWeather(city) {
   const apiKey = process.env.WEATHER_API_KEY; // Sesuaikan dengan kunci API cuaca Anda
   const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
   const data = await response.json();
   return data;
}

export default fetchWeather;

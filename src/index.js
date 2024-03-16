require('dotenv').config();

const cron = require('node-cron');
const axios = require('axios');

// Load konfigurasi dari file JSON
const config = require('../config.json');


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const TIKTOK_APP_ID = process.env.TIKTOK_APP_ID;
const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;


// Fungsi untuk mengambil data cuaca
async function fetchWeatherData(location, time) {
  try {
    const forecastResponse = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=1&aqi=no&alerts=no`
    );
    const forecastData = forecastResponse.data.forecast.forecastday;
    const result = [];
    forecastData.forEach((day) => {
      day.hour.forEach((hour) => {
        // Check if the current hour matches any of the desired times
        if (time.includes(parseInt(hour.time.split(" ")[1]))) {
          result.push({
            time: hour.time,
            temperature: hour.temp_c,
            condition: hour.condition.text,
            code: hour.condition.code,
            icon: hour.condition.icon
          });
        }
      });
    });
    return result;
  } catch (error) {
    console.error(`Error fetching weather data for ${location}: ${error.message}`);
    return null;
  }
}

// Fungsi untuk melakukan fungsi POST
async function performPost(city, data) {
  try {
    // Lakukan logika untuk melakukan fungsi POST sesuai kebutuhan Anda
    console.log(`Posting data for city: ${city.name}`);
    // Contoh: Menggunakan Axios untuk melakukan POST ke suatu API
    // const response = await axios.post('https://example.com/api/post', {
    //   city: city.name,
    //   data: data
    // });
    // console.log(response.data);
  } catch (error) {
    console.error(`Error posting data for city ${city.name}: ${error.message}`);
  }
}

// Fungsi untuk menjalankan tugas pada waktu post_times
function schedulePostTasks() {
  config.cities.forEach(city => {
    city.post_times.forEach(postTime => {
      cron.schedule(postTime, async () => {
        // Ambil data cuaca sebelum melakukan posting
        const weatherData = await fetchWeatherData(city.name, city.weather_timings[0].weather_hours);
        // Lakukan posting dengan data cuaca yang diambil
        performPost(city, weatherData);
      });
      console.log(`Scheduled post for city ${city.name} at ${postTime}`);
    });
  });
}

// Panggil fungsi untuk menjadwalkan tugas
schedulePostTasks();

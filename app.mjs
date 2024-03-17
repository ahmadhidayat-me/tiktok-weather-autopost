import cron from 'node-cron';
import moment from 'moment';
import fs from 'fs';
import { downloadRandomImage, generateImage } from './src/imageGenerator.mjs';
import fetchWeather from './src/weatherFetcher.mjs';
import postToTikTok from './src/tiktokPoster.mjs';
import { log, clearOldLogs } from './src/logger.mjs';

// Load environment variables
const {
   WEATHER_API_KEY,
   TIKTOK_APP_ID,
   TIKTOK_CLIENT_KEY,
   TIKTOK_CLIENT_SECRET
} = process.env;

async function main() {
   try {
      const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

      // Gunakan require untuk mengimpor TikTokAPI
      const pkg = require('tiktok-api');
      const TikTokAPI = pkg.default;

      const tiktokApi = new TikTokAPI({
         app_id: TIKTOK_APP_ID,
         client_key: TIKTOK_CLIENT_KEY,
         client_secret: TIKTOK_CLIENT_SECRET,
         device_id: 'your_device_id_here',
      });

      const weatherData = [];
      for (const city of config.cities) {
         const data = await fetchWeather(city.name);
         weatherData.push(data);
      }

      for (let i = 0; i < config.cities.length; i++) {
         const city = config.cities[i];
         const currentTime = moment();

         for (let j = 0; j < city.post_times.length; j++) {
            const postTime = moment(city.post_times[j], 'HH:mm');

            if (currentTime.isSameOrBefore(postTime)) {
               const weatherTiming = city.weather_timings[j];
               const timestamp = moment().set('hour', weatherTiming.weather_hours[0]).set('minute', 0).set('second', 0);
               const imagePath = `./images/${city.name}_${timestamp.format('YYYYMMDDHHmm')}.png`;

               const imageBuffer = await downloadRandomImage(weatherTiming.description, 300, 300);
               fs.writeFileSync(imagePath, imageBuffer);

               generateImage(weatherData[i], imagePath);
               await postToTikTok(imagePath);

               // Uncomment below if you want to remove the image after posting
               // fs.unlinkSync(imagePath);
            }
         }
      }

      clearOldLogs();

      cron.schedule(config.cron_schedule, () => {
         main();
      });
   } catch (error) {
      log(error);
   }
}

main();

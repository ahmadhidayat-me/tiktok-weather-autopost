require("dotenv").config(); // Mengimpor dan mengkonfigurasi dotenv

const logger = require("./utils/logger.util");
const moment = require("moment");
const cron = require("node-cron");
const { fetchWeather } = require("./utils/weather.util");
const { downloadRandomImage, generateImage } = require("./utils/imageGenerator.util");
const { config } = require("./utils/config.util");
async function main() {
   logger.debug('APP START')
   logger.error('APP START')

   logger.http('APP START')
   logger.info('APP START')

   logger.silly('APP START')
   logger.verbose('APP START')
   logger.warn('APP START')
   // try {
   //    const weatherData = [];
   //    for (const city of config.cities) {
   //       const data = await fetchWeather(city.name);
   //       weatherData.push(data);
   //    }

   //    for (let i = 0; i < config.cities.length; i++) {
   //       const city = config.cities[i];
   //       const currentTime = moment();

   //       for (let j = 0; j < city.post_times.length; j++) {
   //          const postTime = moment(city.post_times[j], "HH:mm");

   //          if (currentTime.isSameOrBefore(postTime)) {
   //             const weatherTiming = city.weather_timings[j];
   //             const timestamp = moment().set("hour", weatherTiming.weather_hours[0]).set("minute", 0).set("second", 0);
   //             const imagePath = `./images/${city.name}_${timestamp.format("YYYYMMDDHHmm")}.png`;

   //             const imageBuffer = await downloadRandomImage(weatherTiming.description, 300, 300);
   //             fs.writeFileSync(imagePath, imageBuffer);

   //             generateImage(weatherData[i], imagePath);
   //             await postToTikTok(imagePath);

   //             // Uncomment below if you want to remove the image after posting
   //             // fs.unlinkSync(imagePath);
   //          }
   //       }
   //    }

   //    cron.schedule(config.cron_schedule, () => {
   //       main();
   //    });
   // } catch (error) {
   //    logger.error(error); // Logging error menggunakan logger
   // }
}

main();

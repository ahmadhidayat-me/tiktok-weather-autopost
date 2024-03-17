require('dotenv').config(); // Mengimpor dan mengkonfigurasi dotenv
const fs = require('fs');
const axios = require('axios');
const logger = require('./logger.util');

async function downloadRandomImage(description, width, height) {
   try {
      const apiKey = process.env.PEXELS_API_KEY; // Mengambil nilai apiKey dari variabel lingkungan
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(description)}&per_page=1&width=${width}&height=${height}`, {
         headers: {
            'Authorization': apiKey
         }
      });
      const data = response.data;
      const imageUrl = data.photos[0].src.large; // Menggunakan gambar dengan resolusi besar
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      return imageResponse.data;
   } catch (error) {
      logger.error("Error downloading random image:", error);
      throw error;
   }
}

function generateImage(weatherData, imagePath) {
   // Implementasi untuk menggabungkan data cuaca dengan gambar
   // Contoh: Anda dapat menggunakan 'canvas' untuk menggambar gambar dari data cuaca dan gambar yang diunduh
   // Misalnya, menggunakan 'canvas' untuk membuat gambar dengan latar belakang gambar yang diunduh
   // dan menambahkan teks deskripsi cuaca di atasnya
}

module.exports = {
   downloadRandomImage,
   generateImage
};

import fs from 'fs';
import fetch from 'node-fetch';

async function downloadRandomImage(description, width, height) {
   const apiKey = process.env.PEXELS_API_KEY; // Sesuaikan dengan kunci API Pexels Anda
   const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(description)}&per_page=1&width=${width}&height=${height}`, {
      headers: {
         'Authorization': apiKey
      }
   });
   const data = await response.json();
   const imageUrl = data.photos[0].src.large; // Menggunakan gambar dengan resolusi besar
   const imageResponse = await fetch(imageUrl);
   const imageData = await imageResponse.buffer();
   return imageData;
}

function generateImage(weatherData, imagePath) {
   // Implementasi untuk menggabungkan data cuaca dengan gambar
   // Contoh: Anda dapat menggunakan 'canvas' untuk menggambar gambar dari data cuaca dan gambar yang diunduh
   // Misalnya, menggunakan 'canvas' untuk membuat gambar dengan latar belakang gambar yang diunduh
   // dan menambahkan teks deskripsi cuaca di atasnya
}

export {
   downloadRandomImage,
   generateImage
};

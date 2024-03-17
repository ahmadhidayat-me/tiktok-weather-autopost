import fs from 'fs';

async function postToTikTok(imagePath) {
   const formData = {
      file: fs.createReadStream(imagePath)
   };

   try {
      const response = await tiktokApi.uploadVideo({ // hapus variabel tiktokApi
         file: imagePath,
         fileName: 'weather_image.png',
         formData
      });
      console.log('Image uploaded:', response);
   } catch (error) {
      console.error('Error uploading image:', error);
   }
}

export default postToTikTok;

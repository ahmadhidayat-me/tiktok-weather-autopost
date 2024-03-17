const chokidar = require("chokidar");
const fs = require("fs");
const logger = require("./logger.util");

// Path untuk file konfigurasi
const configPath = "./configs/config.json";
const loggerConfigPath = "./configs/logger.json";

// Load konfigurasi saat aplikasi dimulai
let config = loadConfig(configPath);
let loggerConfig = loadConfig(loggerConfigPath);

// Memantau perubahan pada file config.json
chokidar.watch(configPath).on("change", () => {
   logger.info("Config file changed, reloading configuration..."); // Menggunakan logger.info untuk informasi umum
   config = loadConfig(configPath); // Memuat ulang konfigurasi saat terjadi perubahan
   logger.info("Configuration reloaded:", config); // Menggunakan logger.info untuk informasi umum
});

// Memantau perubahan pada file logger.json
chokidar.watch(loggerConfigPath).on("change", () => {
   logger.info("Logger config file changed, reloading logger configuration..."); // Menggunakan logger.info untuk informasi umum
   loggerConfig = loadConfig(loggerConfigPath); // Memuat ulang konfigurasi logger saat terjadi perubahan
   logger.info("Logger configuration reloaded:", loggerConfig); // Menggunakan logger.info untuk informasi umum
});

// Fungsi untuk memuat konfigurasi dari file
function loadConfig(filePath) {
   try {
      const configData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(configData);
   } catch (error) {
      logger.error("Failed to load configuration:", error); // Gunakan logger.error untuk mencetak pesan error
      return {};
   }
}

// Ekspor konfigurasi untuk digunakan di aplikasi
module.exports = {
   config,
   loggerConfig
};

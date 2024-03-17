const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { loggerConfig } = require("./config.util");

// Format untuk menampilkan waktu, level, dan pesan
const logFormat = winston.format.combine(
   winston.format.timestamp(),
   winston.format.printf(info => {
      return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
   })
);

// Transport untuk log dengan level 'error'
const errorTransport = new DailyRotateFile({
   filename: `logs-error-%DATE%.log`,
   dirname: './logs',
   datePattern: 'YYYY-MM-DD',
   maxSize: loggerConfig.maxSize,
   maxFiles: loggerConfig.maxDays,
   zippedArchive: true,
   level: 'error'
});

// Transport untuk log dengan level 'silly'
const sillyTransport = new DailyRotateFile({
   filename: `logs-%DATE%.log`,
   dirname: './logs',
   datePattern: 'YYYY-MM-DD',
   maxSize: loggerConfig.maxSize,
   maxFiles: loggerConfig.maxDays,
   zippedArchive: true,
   level: 'silly'
});

// Transport untuk konsol (jika loggerConfig.consoleLog bernilai true)
const consoleTransport = loggerConfig.consoleLog ? new winston.transports.Console() : null;

// Konfigurasi logger
const logger = winston.createLogger({
   format: logFormat,
   transports: [
      errorTransport,
      sillyTransport,
      consoleTransport // Tambahkan transport konsol ke dalam array jika ada
   ].filter(Boolean) // Hilangkan nilai null dari array
});

module.exports = logger;

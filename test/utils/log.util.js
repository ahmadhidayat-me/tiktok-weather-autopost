const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { loggerConfig } = require("./config.util");

const timezoned = () => new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

const logFormat = winston.format.combine(
   winston.format.colorize(),
   winston.format.timestamp({ format: timezoned }),
   winston.format.align(),
   winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transport = new DailyRotateFile({
   filename: `${loggerConfig.logFolder}logs-%LEVEL%-2024-03-17.log`, // Menggunakan placeholder %LEVEL%
   datePattern: "YYYY-MM-DD",
   zippedArchive: false,
   maxSize: loggerConfig.maxSize,
   maxFiles: loggerConfig.maxDays,
   prepend: true,
});

const logger = winston.createLogger({
   format: logFormat,
   transports: [
      transport,
      new winston.transports.Console({ level: "info" }),
      new winston.transports.Console({ level: "error" }),
   ],
});

module.exports = logger;

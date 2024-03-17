import { createLogger, format, transports } from 'winston';
import moment from 'moment';
import fs from 'fs';
import path from 'path'; // Menambahkan impor path

const logDirectory = 'logs';

if (!fs.existsSync(logDirectory)) {
   fs.mkdirSync(logDirectory);
}

const logger = createLogger({
   level: 'info',
   format: format.combine(
      format.timestamp(),
      format.simple()
   ),
   transports: [
      new transports.Console(),
      new transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }), // Penyesuaian transport file
      new transports.File({ filename: path.join(logDirectory, 'combined.log') }) // Penyesuaian transport file
   ]
});

function log(message) {
   const timestamp = moment().format('YYYY-MM-DD HH:mm:ss'); // Penyesuaian format timestamp
   const logMessage = `[${timestamp}] ${message}`;
   logger.info(logMessage);
}

function clearOldLogs() {
   const thirtyDaysAgo = moment().subtract(30, 'days');

   fs.readdirSync(logDirectory).forEach(file => {
      const filePath = path.join(logDirectory, file);
      const fileStat = fs.statSync(filePath);
      if (fileStat.isFile() && moment(fileStat.ctime) < thirtyDaysAgo) {
         fs.unlinkSync(filePath);
      }
   });
}

export { log, clearOldLogs };

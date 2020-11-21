const { createLogger, format, transports } = require("winston");
const winston = require("winston/lib/winston/config");
require("winston-daily-rotate-file");

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.DailyRotateFile({
      filename: "./logs/actions_%DATE%.log",
      level: "info",
      frequency: "24h",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "14d",
    }),
    new transports.DailyRotateFile({
      filename: "./logs/errors.log",
      level: "error",
    }),
    new transports.Console(),
  ],
});

module.exports = logger;

const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: "./logs/actions.log", level: "info" }),
    new transports.File({ filename: "./logs/errors.log", level: "error" }),
    new transports.Console(),
  ],
});

module.exports = logger;

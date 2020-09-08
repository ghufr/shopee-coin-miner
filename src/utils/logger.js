const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "actions.log", level: "info" }),
  ],
});

module.exports = logger;

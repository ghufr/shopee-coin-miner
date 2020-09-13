const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: "actions.log", level: "info" }),
    new transports.Console(),
  ],
});

module.exports = logger;

const { createLogger, format, transports } = require("winston");

const { combine, timestamp, label } = format;

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), label()),
  transports: [new transports.File({ filename: "actions.log", level: "info" })],
});

module.exports = logger;

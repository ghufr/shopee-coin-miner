const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [new transports.File({ filename: "actions.log", level: "info" })],
});

module.exports = logger;

const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, 'app.log');
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${level.toUpperCase()}]: ${message}\n`;
  try {
    fs.appendFileSync(logFilePath, logMessage);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
  if (level === 'error') {
    console.error(logMessage);
  } else {
    console.log(logMessage);
  }
}
const logger = {
  info: (msg) => log(msg, 'info'),
  warn: (msg) => log(msg, 'warn'),
  error: (msg) => log(msg, 'error'),
  debug: (msg) => log(msg, 'debug'),
};

module.exports = logger;

// example for use
// logger.info("Application started");
// logger.warn("This is a warning message");
// logger.error("An error occurred while processing the request");
// logger.debug("Debugging information here");

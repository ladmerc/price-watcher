'use strict';

const appRoot = require('app-root-path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  rotateErrorMonthly: {
    level: 'error',
    handleExceptions: true,
    filename: `${appRoot}/logs/zinc-%DATE%.log`,
    datePattern: 'MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new DailyRotateFile(options.rotateErrorMonthly),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
var winston = require('winston');

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const LOG_PATH = process.env.LOG_PATH || './logs/';
const FILE_SUFFIX = process.env.LOG_FILENAME_SUFFIX || '-default';
const DATE_SUFFIX = new Date().toISOString().slice(0,10);

const logger = winston.createLogger({
format: winston.format.combine(
    winston.format.timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File({ filename: `${LOG_PATH}/requests-${FILE_SUFFIX}.${DATE_SUFFIX}.log` })
  ]
});

 exports.logRequest = function(method, path, token, statusCode, requestBody, responseBody) {
    var o = {};
    o['entry date'] = new Date();
    o['method'] = method;
    o['path'] = path;
    o['token'] = token;
    o['status code'] = statusCode;
    o['request body'] = requestBody;
    o['response body'] = responseBody;
    logger.log({
       level: 'info',
       message: JSON.stringify(o, null, 4)
    });
}
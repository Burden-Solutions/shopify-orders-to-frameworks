const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    
    // Add stack trace if available
    if (stack) {
      log += `\n${stack}`;
    }
    
    // Add metadata if available
    if (Object.keys(meta).length > 0) {
      log += `\n${JSON.stringify(meta, null, 2)}`;
    }
    
    return log;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'shopify-frameworks-connector' },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
          let log = `${timestamp} ${level}: ${message}`;
          
          // Add emoji indicators for better readability
          // if (message.includes('[DEBUG]')) {
          //   log = `🔍 ${log}`;
          // } else if (message.includes('[SUCCESS]')) {
          //   log = `✅ ${log}`;
          // } else if (message.includes('[ERROR]')) {
          //   log = `❌ ${log}`;
          // } else if (message.includes('[DEBUG]')) {
          //   log = `🔧 ${log}`;
          // } else if (message.includes('Webhook')) {
          //   log = `🔔 ${log}`;
          // }
          
          // Add stack trace if available
          if (stack) {
            log += `\n${stack}`;
          }
          
          return log;
        })
      )
    }),
    
    // File transport for all logs with daily rotation
    new DailyRotateFile({
      filename: path.join(logsDir, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info'
    }),
    
    // Separate file for errors only
    new DailyRotateFile({
      filename: path.join(logsDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error'
    }),
    
    // Separate file for debug logs
    new DailyRotateFile({
      filename: path.join(logsDir, 'debug-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '7d',
      level: 'debug'
    })
  ],
  
  // Handle uncaught exceptions
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d'
    })
  ],
  
  // Handle unhandled promise rejections
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d'
    })
  ]
});

// Development vs Production configuration
if (process.env.NODE_ENV === 'production') {
  // In production, we might want to reduce console logging
  logger.transports[0].level = 'warn';
} else {
  // In development, keep debug logging
  logger.level = 'debug';
}

// Helper methods for consistent logging
const loggerHelper = {
  debug: (message, meta = {}) => logger.debug(message, meta),
  info: (message, meta = {}) => logger.info(message, meta),
  warn: (message, meta = {}) => logger.warn(message, meta),
  error: (message, meta = {}) => logger.error(message, meta),
  
  // Specific logging methods for the application
  webhook: (message, meta = {}) => logger.info(`🔔 [DEBUG] ${message}`, meta),
  processing: (message, meta = {}) => logger.info(`🔍 [DEBUG] ${message}`, meta),
  frameworks: (message, meta = {}) => logger.info(`🔐 [DEBUG] ${message}`, meta),
  success: (message, meta = {}) => logger.info(`✅ [SUCCESS] ${message}`, meta),
  orderError: (message, meta = {}) => logger.error(`❌ [ERROR] ${message}`, meta)
};

module.exports = loggerHelper;

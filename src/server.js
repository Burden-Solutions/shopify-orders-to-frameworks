const express = require('express');
const webhookRoutes = require('./routes/webhook');
const logger = require('./config/logger');

module.exports = function startServer() {
  const app = express();

  app.use(express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  }));

  app.use('/webhooks', webhookRoutes);

  const server = app.listen(process.env.PORT, () => {
    logger.info(`Connector running on port ${process.env.PORT}`, {
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV || 'development',
      logLevel: process.env.LOG_LEVEL || 'info'
    });
  });

  // Graceful shutdown handling
  const gracefulShutdown = (signal) => {
    logger.info(`Received ${signal}, starting graceful shutdown...`);
    
    server.close((err) => {
      if (err) {
        logger.error('Error during server shutdown', { error: err.message });
        process.exit(1);
      }
      
      logger.info('Server closed successfully');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.orderError('Uncaught Exception', { 
      error: error.message,
      stack: error.stack 
    });
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.orderError('Unhandled Rejection', { 
      reason: reason,
      promise: promise 
    });
    process.exit(1);
  });

  return server;
};


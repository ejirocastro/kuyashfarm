/**
 * Server Entry Point
 * Starts the Express server and connects to database
 */

import app from './app';
import config from '@/config';
import { connectDatabase } from '@/config/database';
import logger from '@/utils/logger';

/**
 * Start server
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Start Express server
    const server = app.listen(config.port, () => {
      logger.info(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   🌾 Kuyash Farm API Server                      ║
║                                                   ║
║   Environment: ${config.env.padEnd(36)}║
║   Port: ${config.port.toString().padEnd(42)}║
║   API Version: ${config.apiVersion.padEnd(36)}║
║                                                   ║
║   🚀 Server is running!                          ║
║   📡 API: http://localhost:${config.port}/api/${config.apiVersion.padEnd(14)}║
║   ❤️  Health: http://localhost:${config.port}/api/${config.apiVersion}/health${' '.repeat(5)}║
║                                                   ║
╚═══════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`\n${signal} signal received. Closing HTTP server...`);
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('Forcing server shutdown...');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: Error) => {
      logger.error('Unhandled Rejection:', reason);
      throw reason;
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

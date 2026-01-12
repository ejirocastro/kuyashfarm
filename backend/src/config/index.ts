/**
 * Configuration Management
 * Centralizes all environment variables and configuration
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

interface Config {
  env: string;
  port: number;
  apiVersion: string;
  databaseUrl: string;
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    accessExpiry: string;
    refreshExpiry: string;
  };
  cors: {
    origin: string;
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  email: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
  admin: {
    defaultEmail: string;
    defaultPassword: string;
  };
  logging: {
    level: string;
  };
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  apiVersion: process.env.API_VERSION || 'v1',
  databaseUrl: process.env.DATABASE_URL || '',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret-key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'noreply@kuyashfarm.com',
  },
  admin: {
    defaultEmail: process.env.DEFAULT_ADMIN_EMAIL || 'admin@kuyashfarm.com',
    defaultPassword: process.env.DEFAULT_ADMIN_PASSWORD || 'ChangeThisPassword123!',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

// Validate required configuration
const validateConfig = () => {
  const required = ['databaseUrl', 'jwt.accessSecret', 'jwt.refreshSecret'];
  const missing: string[] = [];

  if (!config.databaseUrl) missing.push('DATABASE_URL');
  if (config.jwt.accessSecret === 'access-secret-key') {
    console.warn('⚠️  Using default JWT_ACCESS_SECRET. Please set a secure secret in production!');
  }
  if (config.jwt.refreshSecret === 'refresh-secret-key') {
    console.warn('⚠️  Using default JWT_REFRESH_SECRET. Please set a secure secret in production!');
  }

  if (missing.length > 0 && config.env === 'production') {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

validateConfig();

export default config;

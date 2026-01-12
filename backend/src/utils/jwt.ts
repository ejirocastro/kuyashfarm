/**
 * JWT Utilities
 * Handles JWT token generation, verification, and decoding
 */

import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import config from '@/config';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  userType: string;
}

/**
 * Generate access token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwt.accessExpiry,
    issuer: 'kuyashfarm-api',
    audience: 'kuyashfarm-client',
  };

  return jwt.sign(payload, config.jwt.accessSecret, options);
};

/**
 * Generate refresh token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwt.refreshExpiry,
    issuer: 'kuyashfarm-api',
    audience: 'kuyashfarm-client',
  };

  return jwt.sign(payload, config.jwt.refreshSecret, options);
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret, {
      issuer: 'kuyashfarm-api',
      audience: 'kuyashfarm-client',
    }) as JwtPayload;

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      userType: decoded.userType,
    };
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret, {
      issuer: 'kuyashfarm-api',
      audience: 'kuyashfarm-client',
    }) as JwtPayload;

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      userType: decoded.userType,
    };
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

/**
 * Decode token without verification (for debugging)
 */
export const decodeToken = (token: string): JwtPayload | null => {
  return jwt.decode(token) as JwtPayload | null;
};

/**
 * Generate token pair (access + refresh)
 */
export const generateTokenPair = (
  payload: TokenPayload
): { accessToken: string; refreshToken: string } => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

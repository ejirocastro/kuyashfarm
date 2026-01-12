/**
 * API Response Utilities
 * Standardized response format for all API endpoints
 */

import { Response } from 'express';

export interface ApiResponseFormat<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * Send success response
 */
export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200,
  meta?: ApiResponseFormat['meta']
): Response => {
  const response: ApiResponseFormat<T> = {
    success: true,
    message,
    data,
    meta,
  };

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const sendError = (
  res: Response,
  message: string,
  errors?: any[],
  statusCode: number = 400
): Response => {
  const response: ApiResponseFormat = {
    success: false,
    message,
    errors,
  };

  return res.status(statusCode).json(response);
};

/**
 * Send validation error response
 */
export const sendValidationError = (
  res: Response,
  errors: any[]
): Response => {
  return sendError(res, 'Validation failed', errors, 422);
};

/**
 * Send unauthorized response
 */
export const sendUnauthorized = (
  res: Response,
  message: string = 'Unauthorized access'
): Response => {
  return sendError(res, message, undefined, 401);
};

/**
 * Send forbidden response
 */
export const sendForbidden = (
  res: Response,
  message: string = 'Access forbidden'
): Response => {
  return sendError(res, message, undefined, 403);
};

/**
 * Send not found response
 */
export const sendNotFound = (
  res: Response,
  message: string = 'Resource not found'
): Response => {
  return sendError(res, message, undefined, 404);
};

/**
 * Send server error response
 */
export const sendServerError = (
  res: Response,
  message: string = 'Internal server error',
  error?: any
): Response => {
  const errors = error ? [{ message: error.message, stack: error.stack }] : undefined;
  return sendError(res, message, errors, 500);
};

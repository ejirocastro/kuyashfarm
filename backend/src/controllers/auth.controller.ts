/**
 * Authentication Controller
 * Handles HTTP requests for authentication endpoints
 */

import { Request, Response } from 'express';
import * as authService from '@/services/auth.service';
import { sendSuccess, sendError } from '@/utils/apiResponse';
import { asyncHandler } from '@/middlewares/error.middleware';

/**
 * Register a new user
 * POST /api/v1/auth/register
 */
export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, phone } = req.body;

  const result = await authService.register({ email, password, name, phone });

  // Set refresh token as HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendSuccess(
    res,
    'Registration successful',
    {
      user: result.user,
      accessToken: result.accessToken,
    },
    201
  );
});

/**
 * Login user
 * POST /api/v1/auth/login
 */
export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  // Set refresh token as HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendSuccess(res, 'Login successful', {
    user: result.user,
    accessToken: result.accessToken,
  });
});

/**
 * Logout user
 * POST /api/v1/auth/logout
 */
export const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  if (userId) {
    await authService.logout(userId);
  }

  // Clear refresh token cookie
  res.clearCookie('refreshToken');

  sendSuccess(res, 'Logout successful');
});

/**
 * Refresh access token
 * POST /api/v1/auth/refresh
 */
export const refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    sendError(res, 'Refresh token not provided', undefined, 401);
    return;
  }

  const tokens = await authService.refreshAccessToken(refreshToken);

  // Set new refresh token as HTTP-only cookie
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendSuccess(res, 'Token refreshed successfully', {
    accessToken: tokens.accessToken,
  });
});

/**
 * Get current user profile
 * GET /api/v1/auth/me
 */
export const getMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;

  const user = await authService.getProfile(userId);

  // Remove sensitive data
  const { password, refreshToken, ...userWithoutSensitiveData } = user as any;

  sendSuccess(res, 'Profile retrieved successfully', userWithoutSensitiveData);
});

/**
 * Update user profile
 * PUT /api/v1/auth/me
 */
export const updateMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  const { name, phone } = req.body;

  const user = await authService.updateProfile(userId, { name, phone });

  // Remove sensitive data
  const { password, refreshToken, ...userWithoutSensitiveData } = user as any;

  sendSuccess(res, 'Profile updated successfully', userWithoutSensitiveData);
});

/**
 * Change password
 * PUT /api/v1/auth/change-password
 */
export const changePassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(userId, currentPassword, newPassword);

  sendSuccess(res, 'Password changed successfully');
});

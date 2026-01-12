/**
 * Authentication Routes
 * Defines all authentication-related endpoints
 */

import { Router } from 'express';
import * as authController from '@/controllers/auth.controller';
import * as authValidator from '@/validators/auth.validator';
import { validate } from '@/middlewares/validation.middleware';
import { authenticate } from '@/middlewares/auth.middleware';

const router = Router();

/**
 * Public routes (no authentication required)
 */

// Register new user
router.post(
  '/register',
  validate(authValidator.registerValidator),
  authController.register
);

// Login
router.post(
  '/login',
  validate(authValidator.loginValidator),
  authController.login
);

// Refresh access token
router.post('/refresh', authController.refreshToken);

/**
 * Protected routes (authentication required)
 */

// Logout
router.post('/logout', authenticate, authController.logout);

// Get current user profile
router.get('/me', authenticate, authController.getMe);

// Update profile
router.put(
  '/me',
  authenticate,
  validate(authValidator.updateProfileValidator),
  authController.updateMe
);

// Change password
router.put(
  '/change-password',
  authenticate,
  validate(authValidator.changePasswordValidator),
  authController.changePassword
);

export default router;

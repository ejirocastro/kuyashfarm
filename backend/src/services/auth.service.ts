/**
 * Authentication Service
 * Business logic for authentication operations
 */

import User, { IUser, UserType, UserRole } from '@/models/User.model';
import { hashPassword, comparePassword, validatePasswordStrength } from '@/utils/password';
import { generateTokenPair, TokenPayload } from '@/utils/jwt';
import { AppError } from '@/middlewares/error.middleware';

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    userType: UserType;
    role: UserRole;
    isEmailVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * Register a new user
 */
export const register = async (data: RegisterDTO): Promise<AuthResponse> => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: data.email.toLowerCase() });

  if (existingUser) {
    throw new AppError(400, 'User with this email already exists');
  }

  // Validate password strength
  const passwordValidation = validatePasswordStrength(data.password);
  if (!passwordValidation.isValid) {
    throw new AppError(400, passwordValidation.errors.join(', '));
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await User.create({
    email: data.email.toLowerCase(),
    password: hashedPassword,
    name: data.name,
    phone: data.phone,
    userType: UserType.RETAIL,
    role: UserRole.USER,
  });

  // Generate tokens
  const tokenPayload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    userType: user.userType,
  };

  const tokens = generateTokenPair(tokenPayload);

  // Save refresh token to database
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      userType: user.userType,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

/**
 * Login user
 */
export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  // Find user (include password field)
  const user = await User.findOne({ email: data.email.toLowerCase() }).select('+password');

  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new AppError(401, 'Account is deactivated. Please contact support.');
  }

  // Verify password
  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, 'Invalid email or password');
  }

  // Generate tokens
  const tokenPayload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    userType: user.userType,
  };

  const tokens = generateTokenPair(tokenPayload);

  // Save refresh token to database
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      userType: user.userType,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

/**
 * Logout user
 */
export const logout = async (userId: string): Promise<void> => {
  await User.findByIdAndUpdate(userId, { refreshToken: undefined });
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  // Find user with this refresh token
  const user = await User.findOne({ refreshToken }).select('+refreshToken');

  if (!user) {
    throw new AppError(401, 'Invalid refresh token');
  }

  if (!user.isActive) {
    throw new AppError(401, 'Account is deactivated');
  }

  // Generate new token pair
  const tokenPayload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    userType: user.userType,
  };

  const tokens = generateTokenPair(tokenPayload);

  // Update refresh token in database
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return tokens;
};

/**
 * Get user profile
 */
export const getProfile = async (userId: string): Promise<any> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user.toJSON();
};

/**
 * Update user profile
 */
export const updateProfile = async (
  userId: string,
  data: { name?: string; phone?: string }
): Promise<any> => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user.toJSON();
};

/**
 * Change password
 */
export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  // Get user with password
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // Verify current password
  const isPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, 'Current password is incorrect');
  }

  // Validate new password strength
  const passwordValidation = validatePasswordStrength(newPassword);
  if (!passwordValidation.isValid) {
    throw new AppError(400, passwordValidation.errors.join(', '));
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update password
  user.password = hashedPassword;
  await user.save();
};

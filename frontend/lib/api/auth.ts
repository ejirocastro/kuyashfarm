/**
 * Authentication API
 * API methods for authentication operations
 */

import { apiClient } from './client';
import { UserType, UserRole } from '@/lib/types';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  userType: string;
  role: string;
  isEmailVerified: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

/**
 * Register new user
 */
export const register = async (data: RegisterData) => {
  const response = await apiClient.post<{ user: AuthUser; accessToken: string }>(
    '/auth/register',
    data
  );

  if (response.success && response.data) {
    apiClient.setAccessToken(response.data.accessToken);
  }

  return response;
};

/**
 * Login user
 */
export const login = async (data: LoginData) => {
  const response = await apiClient.post<{ user: AuthUser; accessToken: string }>(
    '/auth/login',
    data
  );

  if (response.success && response.data) {
    apiClient.setAccessToken(response.data.accessToken);
  }

  return response;
};

/**
 * Logout user
 */
export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  apiClient.setAccessToken(null);
  return response;
};

/**
 * Get current user profile
 */
export const getProfile = async () => {
  return await apiClient.get<AuthUser>('/auth/me');
};

/**
 * Update user profile
 */
export const updateProfile = async (data: UpdateProfileData) => {
  return await apiClient.put<AuthUser>('/auth/me', data);
};

/**
 * Change password
 */
export const changePassword = async (data: ChangePasswordData) => {
  return await apiClient.put('/auth/change-password', data);
};

/**
 * Refresh access token
 */
export const refreshToken = async () => {
  return await apiClient.post<{ accessToken: string }>('/auth/refresh');
};

/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '@/lib/api/auth';
import { AuthUser } from '@/lib/api/auth';
import { apiClient } from '@/lib/api/client';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: authApi.RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: authApi.UpdateProfileData) => Promise<void>;
  changePassword: (data: authApi.ChangePasswordData) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load user profile on mount
   */
  const loadUser = useCallback(async () => {
    try {
      const token = apiClient.getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await authApi.getProfile();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      apiClient.setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  /**
   * Login user
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authApi.login({ email, password });
      if (response.success && response.data) {
        setUser(response.data.user);

        // Sync with localStorage for backward compatibility
        localStorage.setItem('user', JSON.stringify({
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          userType: response.data.user.userType,
          isAdmin: response.data.user.role === 'ADMIN' || response.data.user.role === 'SUPER_ADMIN',
        }));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  /**
   * Register new user
   */
  const register = async (data: authApi.RegisterData): Promise<void> => {
    try {
      const response = await authApi.register(data);
      if (response.success && response.data) {
        setUser(response.data.user);

        // Sync with localStorage for backward compatibility
        localStorage.setItem('user', JSON.stringify({
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          userType: response.data.user.userType,
          isAdmin: response.data.user.role === 'ADMIN' || response.data.user.role === 'SUPER_ADMIN',
        }));
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      apiClient.setAccessToken(null);
      localStorage.removeItem('user');
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (data: authApi.UpdateProfileData): Promise<void> => {
    try {
      const response = await authApi.updateProfile(data);
      if (response.success && response.data) {
        setUser(response.data);

        // Sync with localStorage
        const localUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...localUser,
          name: response.data.name,
          phone: response.data.phone,
        }));
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Update failed');
    }
  };

  /**
   * Change password
   */
  const changePassword = async (data: authApi.ChangePasswordData): Promise<void> => {
    try {
      const response = await authApi.changePassword(data);
      if (!response.success) {
        throw new Error(response.message || 'Password change failed');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Password change failed');
    }
  };

  /**
   * Refresh user data
   */
  const refreshUser = async (): Promise<void> => {
    await loadUser();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;

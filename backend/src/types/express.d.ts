/**
 * Express Type Extensions
 * Extends Express Request interface to include custom properties
 */

import { UserType, UserRole } from '@/models/User.model';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: UserRole;
        userType: UserType;
      };
    }
  }
}

export {};

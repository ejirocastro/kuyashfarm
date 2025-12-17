/**
 * Admin utilities for managing wholesale applications
 * Frontend-only implementation using localStorage
 */

import { WholesaleApplication, User } from "@/types";

const APPLICATIONS_KEY = 'wholesale_applications';
const USERS_KEY = 'all_users';

/**
 * Check if current user is admin
 */
export function isCurrentUserAdmin(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    const user = JSON.parse(userStr);
    return user.isAdmin === true;
  } catch {
    return false;
  }
}

/**
 * Get all wholesale applications from localStorage
 */
export function getAllApplications(): WholesaleApplication[] {
  if (typeof window === 'undefined') return [];

  try {
    const appsStr = localStorage.getItem(APPLICATIONS_KEY);
    if (!appsStr) return [];
    return JSON.parse(appsStr);
  } catch {
    return [];
  }
}

/**
 * Get pending applications only
 */
export function getPendingApplications(): WholesaleApplication[] {
  return getAllApplications().filter(app => app.status === 'pending');
}

/**
 * Save applications to localStorage
 */
function saveApplications(applications: WholesaleApplication[]): void {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}

/**
 * Create a new wholesale application
 * Called when user submits application form
 */
export function createApplication(
  userId: string,
  userName: string,
  userEmail: string,
  businessName: string,
  businessAddress: string
): WholesaleApplication {
  const application: WholesaleApplication = {
    id: `app_${Date.now()}`,
    userId,
    userName,
    userEmail,
    businessName,
    businessAddress,
    status: 'pending',
    appliedAt: new Date().toISOString(),
  };

  const applications = getAllApplications();
  applications.push(application);
  saveApplications(applications);

  return application;
}

/**
 * Approve a wholesale application
 * Updates application status and user type
 */
export function approveApplication(applicationId: string): boolean {
  const applications = getAllApplications();
  const appIndex = applications.findIndex(app => app.id === applicationId);

  if (appIndex === -1) return false;

  const application = applications[appIndex];

  // Update application status
  applications[appIndex] = {
    ...application,
    status: 'approved',
    reviewedAt: new Date().toISOString(),
  };
  saveApplications(applications);

  // Update user type to wholesale_verified
  updateUserType(application.userEmail, 'wholesale_verified');

  return true;
}

/**
 * Reject a wholesale application
 * Updates application status and user type back to retail
 */
export function rejectApplication(applicationId: string, reason?: string): boolean {
  const applications = getAllApplications();
  const appIndex = applications.findIndex(app => app.id === applicationId);

  if (appIndex === -1) return false;

  const application = applications[appIndex];

  // Update application status
  applications[appIndex] = {
    ...application,
    status: 'rejected',
    reviewedAt: new Date().toISOString(),
    rejectionReason: reason,
  };
  saveApplications(applications);

  // Update user type back to retail
  updateUserType(application.userEmail, 'retail');

  return true;
}

/**
 * Update user type in localStorage
 * This simulates backend user update
 */
function updateUserType(userEmail: string, userType: 'retail' | 'wholesale_verified'): void {
  // Store the user update in a separate key for verification lookups
  try {
    // Get or create user updates map
    const userUpdatesStr = localStorage.getItem('user_updates');
    const userUpdates = userUpdatesStr ? JSON.parse(userUpdatesStr) : {};

    // Store the updated user type for this email
    userUpdates[userEmail] = userType;
    localStorage.setItem('user_updates', JSON.stringify(userUpdates));

    // Also update current user if it matches
    const currentUserStr = localStorage.getItem('user');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.email === userEmail) {
        currentUser.userType = userType;
        localStorage.setItem('user', JSON.stringify(currentUser));
      }
    }
  } catch (e) {
    console.error('Error updating user type:', e);
  }

  // In a real app, this would be a backend API call
  // For now, we store updates in a separate key
}

/**
 * Get application statistics
 */
export function getApplicationStats(): {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
} {
  const applications = getAllApplications();

  return {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };
}

/**
 * Create a test admin user
 * Helper function for development
 */
export function createTestAdmin(): void {
  const adminUser = {
    id: 'admin_1',
    name: 'Admin User',
    email: 'admin@kuyashfarm.com',
    userType: 'retail' as const,
    isAdmin: true,
  };
  localStorage.setItem('user', JSON.stringify(adminUser));
}

/**
 * Create sample applications for testing
 */
export function createSampleApplications(): void {
  const sampleApps: WholesaleApplication[] = [
    {
      id: 'app_1',
      userId: 'user_1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      businessName: 'ABC Trading Ltd',
      businessAddress: '123 Business St, Lagos, Nigeria',
      status: 'pending',
      appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'app_2',
      userId: 'user_2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      businessName: 'Fresh Foods Import/Export',
      businessAddress: '456 Market Road, Abuja, Nigeria',
      status: 'pending',
      appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'app_3',
      userId: 'user_3',
      userName: 'Michael Johnson',
      userEmail: 'michael@example.com',
      businessName: 'Green Valley Distributors',
      businessAddress: '789 Farm Lane, Port Harcourt, Nigeria',
      status: 'pending',
      appliedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ];

  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(sampleApps));
}

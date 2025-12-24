/**
 * Distributor Application Management Utilities
 * Handles distributor application submission, retrieval, and approval workflow
 */

import { DistributorApplication, User, DistributorTier } from "./types";

const DISTRIBUTOR_APPLICATIONS_KEY = 'distributor_applications';

/**
 * Calculate distributor tier based on number of states covered
 * Tier 1: Small distributor (1-2 states)
 * Tier 2: Regional distributor (3-5 states)
 * Tier 3: National distributor (6+ states)
 */
export function calculateDistributorTier(geographicCoverage: string): DistributorTier {
  // Count the number of states mentioned in the geographic coverage
  const stateCount = countStatesInCoverage(geographicCoverage);

  if (stateCount >= 6) {
    return 'tier3'; // National distributor
  } else if (stateCount >= 3) {
    return 'tier2'; // Regional distributor
  } else {
    return 'tier1'; // Small distributor
  }
}

/**
 * Count number of states in geographic coverage string
 */
function countStatesInCoverage(coverage: string): number {
  // Common separators for multiple states
  const separators = [',', '&', 'and', '+', '/'];

  let count = 1; // Start with at least 1 state

  // Check for common multi-state indicators
  separators.forEach(separator => {
    const parts = coverage.toLowerCase().split(separator);
    if (parts.length > count) {
      count = parts.length;
    }
  });

  // Check for "nationwide" or "all states" keywords
  const nationalKeywords = ['nationwide', 'all states', 'national', 'entire nigeria', 'whole nigeria'];
  if (nationalKeywords.some(keyword => coverage.toLowerCase().includes(keyword))) {
    return 37; // Nigeria has 36 states + FCT
  }

  // Check for regional keywords (typically 3-5 states)
  const regionalKeywords = ['south-west', 'south-east', 'north-central', 'north-west', 'north-east', 'south-south'];
  if (regionalKeywords.some(keyword => coverage.toLowerCase().includes(keyword))) {
    return Math.max(count, 4); // Regions typically have 4-6 states
  }

  return count;
}

/**
 * Get tier display name
 */
export function getTierDisplayName(tier: DistributorTier): string {
  switch (tier) {
    case 'tier1':
      return 'Tier 1 - Small Distributor';
    case 'tier2':
      return 'Tier 2 - Regional Distributor';
    case 'tier3':
      return 'Tier 3 - National Distributor';
    default:
      return 'Unknown Tier';
  }
}

/**
 * Get tier description
 */
export function getTierDescription(tier: DistributorTier): string {
  switch (tier) {
    case 'tier1':
      return '1-2 states coverage';
    case 'tier2':
      return '3-5 states coverage';
    case 'tier3':
      return '6+ states coverage (National)';
    default:
      return '';
  }
}

/**
 * Get tier badge color
 */
export function getTierBadgeColor(tier: DistributorTier): string {
  switch (tier) {
    case 'tier1':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'tier2':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'tier3':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Create a new distributor application
 */
export function createDistributorApplication(
  userId: string,
  userName: string,
  userEmail: string,
  businessName: string,
  businessAddress: string,
  distributionArea: string,
  yearsInBusiness: string,
  expectedVolume: string,
  additionalInfo?: string
): DistributorApplication {
  // Calculate tier based on geographic coverage
  const tier = calculateDistributorTier(distributionArea);

  const application: DistributorApplication = {
    id: `dist_app_${Date.now()}`,
    userId,
    userName,
    userEmail,
    businessName,
    businessAddress,
    distributionArea,
    yearsInBusiness,
    expectedVolume,
    additionalInfo,
    tier,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };

  // Save to localStorage
  const existingApplications = getDistributorApplications();
  existingApplications.push(application);
  localStorage.setItem(DISTRIBUTOR_APPLICATIONS_KEY, JSON.stringify(existingApplications));

  return application;
}

/**
 * Get all distributor applications
 */
export function getDistributorApplications(): DistributorApplication[] {
  if (typeof window === 'undefined') return [];

  try {
    const applicationsStr = localStorage.getItem(DISTRIBUTOR_APPLICATIONS_KEY);
    if (!applicationsStr) return [];
    return JSON.parse(applicationsStr);
  } catch {
    return [];
  }
}

/**
 * Get pending distributor applications
 */
export function getPendingDistributorApplications(): DistributorApplication[] {
  return getDistributorApplications().filter(app => app.status === 'pending');
}

/**
 * Get distributor application by ID
 */
export function getDistributorApplicationById(id: string): DistributorApplication | undefined {
  return getDistributorApplications().find(app => app.id === id);
}

/**
 * Get distributor application by user ID
 */
export function getDistributorApplicationByUserId(userId: string): DistributorApplication | undefined {
  return getDistributorApplications().find(app => app.userId === userId);
}

/**
 * Check if user has a pending distributor application
 */
export function hasDistributorApplication(userId: string): boolean {
  const application = getDistributorApplicationByUserId(userId);
  return application !== undefined && application.status === 'pending';
}

/**
 * Approve distributor application (Admin only)
 */
export function approveDistributorApplication(
  applicationId: string,
  adminId: string,
  reviewNotes?: string
): boolean {
  const applications = getDistributorApplications();
  const applicationIndex = applications.findIndex(app => app.id === applicationId);

  if (applicationIndex === -1) {
    console.error('Distributor application not found');
    return false;
  }

  const application = applications[applicationIndex];

  // Update application status
  application.status = 'approved';
  application.reviewedAt = new Date().toISOString();
  application.reviewedBy = adminId;
  application.reviewNotes = reviewNotes;

  // Save updated applications
  localStorage.setItem(DISTRIBUTOR_APPLICATIONS_KEY, JSON.stringify(applications));

  // Update user type to distributor_verified
  updateUserTypeToDistributor(application.userEmail, application);

  return true;
}

/**
 * Reject distributor application (Admin only)
 */
export function rejectDistributorApplication(
  applicationId: string,
  adminId: string,
  reviewNotes?: string
): boolean {
  const applications = getDistributorApplications();
  const applicationIndex = applications.findIndex(app => app.id === applicationId);

  if (applicationIndex === -1) {
    console.error('Distributor application not found');
    return false;
  }

  const application = applications[applicationIndex];

  // Update application status
  application.status = 'rejected';
  application.reviewedAt = new Date().toISOString();
  application.reviewedBy = adminId;
  application.reviewNotes = reviewNotes;

  // Save updated applications
  localStorage.setItem(DISTRIBUTOR_APPLICATIONS_KEY, JSON.stringify(applications));

  // Reset user type to retail
  updateUserTypeToRetail(application.userEmail);

  return true;
}

/**
 * Update user type to distributor_verified
 */
function updateUserTypeToDistributor(userEmail: string, application: DistributorApplication): void {
  const userStr = localStorage.getItem('user');
  if (!userStr) return;

  try {
    const user: User = JSON.parse(userStr);
    if (user.email === userEmail) {
      user.userType = 'distributor_verified';
      user.distributorInfo = {
        businessName: application.businessName,
        businessAddress: application.businessAddress,
        distributionArea: application.distributionArea,
        yearsInBusiness: application.yearsInBusiness,
        expectedVolume: application.expectedVolume,
        tier: application.tier,
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
  } catch (error) {
    console.error('Failed to update user type:', error);
  }
}

/**
 * Update user type to retail (after rejection)
 */
function updateUserTypeToRetail(userEmail: string): void {
  const userStr = localStorage.getItem('user');
  if (!userStr) return;

  try {
    const user: User = JSON.parse(userStr);
    if (user.email === userEmail) {
      user.userType = 'retail';
      delete user.distributorInfo;
      localStorage.setItem('user', JSON.stringify(user));
    }
  } catch (error) {
    console.error('Failed to update user type:', error);
  }
}

/**
 * Get distributor application statistics
 */
export function getDistributorApplicationStats() {
  const applications = getDistributorApplications();

  return {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };
}

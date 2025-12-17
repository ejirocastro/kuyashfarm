"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  isCurrentUserAdmin,
  getPendingApplications,
  getAllApplications,
  approveApplication,
  rejectApplication,
} from "@/lib/admin-utils";
import { WholesaleApplication } from "@/types";
import { CheckCircle, XCircle, ArrowLeft, Building2, Mail, User } from "lucide-react";

/**
 * Wholesale Applications Management Page
 * Admin interface for reviewing and approving/rejecting applications
 */
export default function WholesaleApplicationsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [applications, setApplications] = useState<WholesaleApplication[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<WholesaleApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // Check admin access
    const isAdmin = isCurrentUserAdmin();
    if (!isAdmin) {
      router.push('/');
      return;
    }

    setIsAuthorized(true);
    loadApplications();
  }, [router]);

  const loadApplications = () => {
    const allApps = getAllApplications();
    setApplications(allApps);
  };

  const handleApprove = (appId: string) => {
    if (confirm('Are you sure you want to approve this application? The user will be upgraded to wholesale_verified.')) {
      const success = approveApplication(appId);
      if (success) {
        alert('Application approved! User is now a verified wholesale customer.');
        loadApplications();
      } else {
        alert('Failed to approve application.');
      }
    }
  };

  const handleRejectClick = (app: WholesaleApplication) => {
    setSelectedApp(app);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = () => {
    if (selectedApp) {
      const success = rejectApplication(selectedApp.id, rejectionReason);
      if (success) {
        alert('Application rejected. User status changed back to retail.');
        setShowRejectModal(false);
        setSelectedApp(null);
        setRejectionReason('');
        loadApplications();
      } else {
        alert('Failed to reject application.');
      }
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Checking authorization...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="font-serif text-3xl font-bold text-gray-900">
                  Wholesale Applications
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Review and manage wholesale pricing requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setFilter('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === 'pending'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending
                <span className="ml-2 py-0.5 px-2 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                  {applications.filter(a => a.status === 'pending').length}
                </span>
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === 'approved'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approved
                <span className="ml-2 py-0.5 px-2 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                  {applications.filter(a => a.status === 'approved').length}
                </span>
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === 'rejected'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rejected
                <span className="ml-2 py-0.5 px-2 rounded-full bg-red-100 text-red-800 text-xs font-semibold">
                  {applications.filter(a => a.status === 'rejected').length}
                </span>
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === 'all'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Applications
              </button>
            </nav>
          </div>
        </div>

        {/* Applications Table */}
        {filteredApplications.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {app.userName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {app.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {app.businessName}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs">
                            {app.businessAddress}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(app.appliedAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          app.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {app.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApprove(app.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectClick(app)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">
                          {app.status === 'approved' ? 'Already approved' : 'Already rejected'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {filter !== 'all' ? filter : ''} applications
            </h3>
            <p className="text-gray-600">
              {filter === 'pending'
                ? 'All applications have been reviewed.'
                : 'There are no applications in this category.'}
            </p>
          </div>
        )}
      </main>

      {/* Reject Modal */}
      {showRejectModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
              Reject Application
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You are about to reject the wholesale application from{' '}
              <strong>{selectedApp.userName}</strong>. Their user status will be changed back to "retail".
            </p>

            <div className="mb-4">
              <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason (Optional)
              </label>
              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                placeholder="e.g., Incomplete business information, unable to verify business..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRejectSubmit}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm"
              >
                Reject Application
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedApp(null);
                  setRejectionReason('');
                }}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

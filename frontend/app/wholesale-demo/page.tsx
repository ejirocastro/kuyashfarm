"use client";

import { useState } from "react";
import Link from "next/link";
import { WholesaleBanner } from "@/components/banners/WholesaleBanner";
import { WholesaleApplicationModal } from "@/components/modals/WholesaleApplicationModal";
import { formatPrice, calculatePrice, getCurrentUser } from "@/lib/utils";
import { createTestAdmin, createSampleApplications, createApplication } from "@/lib/admin-utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Wholesale System Demo Page
 * Shows how the wholesale upgrade system works
 */
export default function WholesaleDemoPage() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  // Sample product with bulk pricing
  const sampleProduct = {
    id: 1,
    name: "Organic Tomatoes",
    price: 7500, // Retail price
    unit: "per kg",
    bulkPricing: [
      { minQuantity: 10, pricePerUnit: 6500 },
      { minQuantity: 50, pricePerUnit: 6000 },
    ],
  };

  const handleApplication = (businessName: string, businessAddress: string) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        userType: 'wholesale_pending' as const,
        businessInfo: { businessName, businessAddress },
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setShowModal(false);
      alert('Application submitted! Your status is now "wholesale_pending"');
    } else {
      alert('Please log in first to apply for wholesale pricing!');
    }
  };

  const simulateVerification = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const verifiedUser = {
        ...currentUser,
        userType: 'wholesale_verified' as const,
      };
      localStorage.setItem('user', JSON.stringify(verifiedUser));
      setUser(verifiedUser);
      alert('Simulated admin verification! You are now a verified wholesale user.');
    }
  };

  const resetToRetail = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const retailUser = {
        ...currentUser,
        userType: 'retail' as const,
        businessInfo: undefined,
      };
      localStorage.setItem('user', JSON.stringify(retailUser));
      setUser(retailUser);
      alert('Reset to retail user!');
    }
  };

  // Calculate prices for different quantities and user types
  const priceExamples = [
    { qty: 1, label: "1 unit (retail)" },
    { qty: 15, label: "15 units" },
    { qty: 60, label: "60 units" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
              Wholesale System Demo
            </h1>
            <p className="text-gray-600">
              Test the Airbnb-style wholesale upgrade system
            </p>
          </div>

          {/* Current User Status */}
          <div className="mb-8 rounded-lg bg-white border-2 border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Current User Status
            </h2>
            {user ? (
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Name:</span> {user.name || 'N/A'}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {user.email || 'N/A'}
                </p>
                <p className="text-sm">
                  <span className="font-medium">User Type:</span>{' '}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.userType === 'retail'
                      ? 'bg-blue-100 text-blue-800'
                      : user.userType === 'wholesale_pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.userType}
                  </span>
                </p>
                {user.businessInfo && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium mb-1">Business Information:</p>
                    <p className="text-sm text-gray-600">
                      {user.businessInfo.businessName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user.businessInfo.businessAddress}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Not logged in. Please sign up or log in to test the wholesale system.
              </p>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={resetToRetail}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Reset to Retail
              </button>
              <button
                onClick={simulateVerification}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Simulate Admin Verification
              </button>
            </div>
          </div>

          {/* Banner Demo */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Banner Display (Based on User Type)
            </h2>

            {/* Retail User Banner */}
            {user?.userType === 'retail' && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Showing: <strong>Wholesale Application Banner</strong> (retail users only)
                </p>
                <WholesaleBanner onApply={() => setShowModal(true)} />
              </div>
            )}

            {/* Pending User Banner */}
            {user?.userType === 'wholesale_pending' && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Showing: <strong>Application Pending Banner</strong>
                </p>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Application Pending:</strong> Your wholesale application is under review. You'll be notified once verified.
                  </p>
                </div>
              </div>
            )}

            {/* Verified User - No Banner */}
            {user?.userType === 'wholesale_verified' && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  No banner shown (verified wholesale users don't need banners)
                </p>
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm text-green-800">
                    ✓ You are a verified wholesale user! Bulk pricing applies automatically based on quantity.
                  </p>
                </div>
              </div>
            )}

            {!user && (
              <p className="text-sm text-gray-500 italic">
                Please log in to see banners
              </p>
            )}
          </div>

          {/* Pricing Demo */}
          <div className="mb-8 rounded-lg bg-white border-2 border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pricing Calculation Demo
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Product: <strong>{sampleProduct.name}</strong> (Retail: {formatPrice(sampleProduct.price)}/kg)
            </p>

            <div className="space-y-3">
              {priceExamples.map(({ qty, label }) => {
                const retailPrice = calculatePrice(sampleProduct, qty, 'retail');
                const pendingPrice = calculatePrice(sampleProduct, qty, 'wholesale_pending');
                const verifiedPrice = calculatePrice(sampleProduct, qty, 'wholesale_verified');

                return (
                  <div key={qty} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">{label}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Retail User:</p>
                        <p className="font-semibold text-gray-900">
                          {formatPrice(retailPrice)}/kg
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Pending User:</p>
                        <p className="font-semibold text-gray-900">
                          {formatPrice(pendingPrice)}/kg
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Verified User:</p>
                        <p className={`font-semibold ${verifiedPrice < retailPrice ? 'text-green-600' : 'text-gray-900'}`}>
                          {formatPrice(verifiedPrice)}/kg
                          {verifiedPrice < retailPrice && (
                            <span className="ml-2 text-xs text-green-600">
                              (Save {formatPrice(retailPrice - verifiedPrice)})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Only verified wholesale users get bulk discounts. Retail and pending users always pay retail price.
              </p>
            </div>
          </div>

          {/* Implementation Summary */}
          <div className="rounded-lg bg-white border-2 border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs font-semibold">
                  1
                </span>
                <span>
                  All users start as <strong>"retail"</strong> after signup
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs font-semibold">
                  2
                </span>
                <span>
                  Retail users see the green banner encouraging them to apply for wholesale pricing
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs font-semibold">
                  3
                </span>
                <span>
                  Clicking "Apply" opens a modal that collects business name and address
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs font-semibold">
                  4
                </span>
                <span>
                  After submission, user becomes <strong>"wholesale_pending"</strong> and sees amber banner
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs font-semibold">
                  5
                </span>
                <span>
                  Admin verifies the application (backend) and changes user to <strong>"wholesale_verified"</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs font-semibold">
                  6
                </span>
                <span>
                  Verified users automatically get bulk pricing based on quantity (10+, 50+ units)
                </span>
              </li>
            </ol>
          </div>

          {/* Admin Testing Tools */}
          <div className="rounded-lg bg-purple-50 border-2 border-purple-200 p-6">
            <h2 className="text-lg font-semibold text-purple-900 mb-4">
              Admin Testing Tools
            </h2>
            <p className="text-sm text-purple-800 mb-4">
              Use these buttons to test the admin panel functionality:
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  createTestAdmin();
                  alert('Admin user created! Email: admin@kuyashfarm.com. Refresh the page to login as admin.');
                }}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold text-sm text-left flex items-center justify-between"
              >
                <span>1. Create Test Admin User</span>
                <span className="text-xs bg-purple-700 px-2 py-1 rounded">Click First</span>
              </button>
              <button
                onClick={() => {
                  createSampleApplications();
                  alert('3 sample wholesale applications created! Visit /admin/wholesale-applications to review them.');
                }}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold text-sm text-left"
              >
                2. Create Sample Applications
              </button>
              <Link
                href="/admin"
                className="block w-full px-4 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 font-semibold text-sm text-center"
              >
                3. Go to Admin Dashboard →
              </Link>
            </div>
            <div className="mt-4 p-3 bg-purple-100 rounded-lg">
              <p className="text-xs text-purple-900">
                <strong>Note:</strong> You must be logged in as an admin (isAdmin: true) to access the admin panel.
                The admin panel is at <code className="bg-purple-200 px-1 rounded">/admin</code> and
                <code className="bg-purple-200 px-1 rounded ml-1">/admin/wholesale-applications</code>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Wholesale Application Modal */}
      <WholesaleApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleApplication}
      />
    </>
  );
}

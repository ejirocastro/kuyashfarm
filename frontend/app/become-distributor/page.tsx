"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Truck, CheckCircle, Upload } from "lucide-react";
import { getCurrentUser } from "@/lib/utils";
import { createDistributorApplication } from "@/lib/distributor-utils";
import { createNotification } from "@/lib/inventory-manager";
import type { User } from "@/lib/types";

/**
 * Become a Distributor Page
 * Professional distributor registration with comprehensive B2B fields
 */
export default function BecomeDistributorPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state - Business Information
  const [businessName, setBusinessName] = useState("");
  const [cacNumber, setCacNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");

  // Geographic & Specialty
  const [geographicCoverage, setGeographicCoverage] = useState("");
  const [specialtyAreas, setSpecialtyAreas] = useState<string[]>([]);

  // Capacity & Network
  const [monthlyVolumeCapacity, setMonthlyVolumeCapacity] = useState("");
  const [retailNetworkSize, setRetailNetworkSize] = useState("");
  const [warehouseInfo, setWarehouseInfo] = useState("");

  // Contact Information
  const [contactPerson, setContactPerson] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // References & Banking
  const [references, setReferences] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/');
      return;
    }

    if (currentUser.userType === 'distributor_pending' || currentUser.userType === 'distributor_verified') {
      router.push('/profile');
      return;
    }

    setUser(currentUser);
    // Pre-fill contact email with user's email
    setContactEmail(currentUser.email || '');
    setContactPerson(currentUser.name || '');
  }, [router]);

  const handleSpecialtyToggle = (specialty: string) => {
    setSpecialtyAreas(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      createNotification({
        type: 'error',
        title: 'Authentication Required',
        message: 'Please sign in to submit a distributor application.',
      });
      router.push('/');
      return;
    }

    setIsSubmitting(true);

    try {
      const userId = user.id || `user_${Date.now()}`;
      const userName = user.name || contactPerson;
      const userEmail = user.email || contactEmail;

      // Comprehensive application data
      const additionalInfo = JSON.stringify({
        cacNumber,
        taxId,
        geographicCoverage,
        specialtyAreas,
        monthlyVolumeCapacity,
        retailNetworkSize,
        warehouseInfo,
        contactPerson,
        contactPhone,
        references,
        bankDetails: {
          bankName,
          accountNumber,
          accountName,
        }
      });

      createDistributorApplication(
        userId,
        userName,
        userEmail,
        businessName,
        businessAddress,
        geographicCoverage,
        yearsInBusiness,
        monthlyVolumeCapacity,
        additionalInfo
      );

      const updatedUser: User = {
        ...user,
        userType: 'distributor_pending',
        distributorInfo: {
          businessName,
          businessAddress,
          distributionArea: geographicCoverage,
          yearsInBusiness,
          expectedVolume: monthlyVolumeCapacity,
        },
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      createNotification({
        type: 'success',
        title: 'Application Submitted!',
        message: 'Your distributor application has been submitted. We will review it within 2-3 business days.',
      });

      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    } catch (error) {
      createNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'There was an error submitting your application. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const specialtyOptions = [
    'Grains', 'Poultry', 'Dairy', 'Vegetables', 'Fruits', 'Livestock', 'Fish', 'Other'
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Distributor Registration
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Partner with Kuyash Integrated Farm to distribute quality agricultural products across Nigeria.
            </p>
          </div>

          {/* Tier Information Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4 text-center">
              Distributor Tiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-blue-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full border border-blue-200">
                    TIER 1
                  </span>
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Small Distributor</h3>
                <p className="text-sm text-gray-600 mb-3">1-2 states coverage</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ Standard distributor pricing</li>
                  <li>✓ Email support</li>
                  <li>✓ Monthly product updates</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-purple-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full border border-purple-200">
                    TIER 2
                  </span>
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Regional Distributor</h3>
                <p className="text-sm text-gray-600 mb-3">3-5 states coverage</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ Enhanced pricing (5% better)</li>
                  <li>✓ Priority support</li>
                  <li>✓ Quarterly business reviews</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-amber-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                    TIER 3
                  </span>
                  <Truck className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">National Distributor</h3>
                <p className="text-sm text-gray-600 mb-3">6+ states / Nationwide</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ Premium pricing (10% better)</li>
                  <li>✓ Dedicated account manager</li>
                  <li>✓ Exclusive product access</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-4">
              Your tier is automatically determined based on your geographic coverage
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            {/* Benefits Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 border-b border-gray-200 bg-gray-50/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Better Prices</div>
                <p className="text-sm text-gray-600">Distributor-only pricing</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Flexible Terms</div>
                <p className="text-sm text-gray-600">Credit & payment options</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Full Support</div>
                <p className="text-sm text-gray-600">Dedicated account manager</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              <div className="space-y-8">
                {/* Section 1: Business Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Business Information
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-gray-900 mb-2">
                          Business Name (Legal Entity) *
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="ABC Distribution Ltd."
                        />
                      </div>

                      <div>
                        <label htmlFor="cacNumber" className="block text-sm font-medium text-gray-900 mb-2">
                          CAC Registration Number *
                        </label>
                        <input
                          type="text"
                          id="cacNumber"
                          value={cacNumber}
                          onChange={(e) => setCacNumber(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="RC1234567"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-900 mb-2">
                        Business Address (HQ) *
                      </label>
                      <textarea
                        id="businessAddress"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        required
                        rows={2}
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="123 Business Street, Lagos, Nigeria"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="taxId" className="block text-sm font-medium text-gray-900 mb-2">
                          Tax ID (VAT/TIN) *
                        </label>
                        <input
                          type="text"
                          id="taxId"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="12345678-0001"
                        />
                      </div>

                      <div>
                        <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-900 mb-2">
                          Years in Operation *
                        </label>
                        <select
                          id="yearsInBusiness"
                          value={yearsInBusiness}
                          onChange={(e) => setYearsInBusiness(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Select</option>
                          <option value="less-than-1">Less than 1 year</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Geographic Coverage & Specialty */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Coverage & Specialty
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="geographicCoverage" className="block text-sm font-medium text-gray-900 mb-2">
                        Geographic Coverage (States/LGAs) *
                      </label>
                      <input
                        type="text"
                        id="geographicCoverage"
                        value={geographicCoverage}
                        onChange={(e) => setGeographicCoverage(e.target.value)}
                        required
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Lagos, Ogun, Oyo States"
                      />
                      <p className="mt-1 text-xs text-gray-500">List states or LGAs you currently serve</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        Specialty Areas *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {specialtyOptions.map((specialty) => (
                          <label key={specialty} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={specialtyAreas.includes(specialty)}
                              onChange={() => handleSpecialtyToggle(specialty)}
                              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">{specialty}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Capacity & Network */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Capacity & Network
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="monthlyVolumeCapacity" className="block text-sm font-medium text-gray-900 mb-2">
                          Monthly Volume Capacity *
                        </label>
                        <select
                          id="monthlyVolumeCapacity"
                          value={monthlyVolumeCapacity}
                          onChange={(e) => setMonthlyVolumeCapacity(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Select range</option>
                          <option value="₦500,000-₦1,000,000">₦500K - ₦1M/month</option>
                          <option value="₦1,000,000-₦5,000,000">₦1M - ₦5M/month</option>
                          <option value="₦5,000,000-₦10,000,000">₦5M - ₦10M/month</option>
                          <option value="₦10,000,000-₦50,000,000">₦10M - ₦50M/month</option>
                          <option value="₦50,000,000+">₦50M+/month</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="retailNetworkSize" className="block text-sm font-medium text-gray-900 mb-2">
                          Retail Network Size *
                        </label>
                        <input
                          type="number"
                          id="retailNetworkSize"
                          value={retailNetworkSize}
                          onChange={(e) => setRetailNetworkSize(e.target.value)}
                          required
                          min="0"
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="50"
                        />
                        <p className="mt-1 text-xs text-gray-500">Number of stores/outlets served</p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="warehouseInfo" className="block text-sm font-medium text-gray-900 mb-2">
                        Warehouse Information *
                      </label>
                      <textarea
                        id="warehouseInfo"
                        value={warehouseInfo}
                        onChange={(e) => setWarehouseInfo(e.target.value)}
                        required
                        rows={2}
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Size: 5000 sqft, Locations: Lagos (Main), Ibadan (Branch)"
                      />
                      <p className="mt-1 text-xs text-gray-500">Include size and locations</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Primary Contact
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-900 mb-2">
                          Contact Person Name *
                        </label>
                        <input
                          type="text"
                          id="contactPerson"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-900 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="contactPhone"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="+234 801 234 5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="contact@business.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 5: References & Banking */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    References & Banking
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="references" className="block text-sm font-medium text-gray-900 mb-2">
                        References (Existing Supplier Relationships)
                      </label>
                      <textarea
                        id="references"
                        value={references}
                        onChange={(e) => setReferences(e.target.value)}
                        rows={3}
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Company Name, Contact Person, Phone (one per line)"
                      />
                      <p className="mt-1 text-xs text-gray-500">Optional - helps speed up verification</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="bankName" className="block text-sm font-medium text-gray-900 mb-2">
                          Bank Name *
                        </label>
                        <input
                          type="text"
                          id="bankName"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="GTBank"
                        />
                      </div>

                      <div>
                        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-900 mb-2">
                          Account Number *
                        </label>
                        <input
                          type="text"
                          id="accountNumber"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="0123456789"
                        />
                      </div>

                      <div>
                        <label htmlFor="accountName" className="block text-sm font-medium text-gray-900 mb-2">
                          Account Name *
                        </label>
                        <input
                          type="text"
                          id="accountName"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="ABC Distribution Ltd"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 6: Document Upload Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900 mb-1">
                        Required Documents
                      </p>
                      <p className="text-sm text-amber-800 mb-2">
                        After submission, our team will contact you to upload:
                      </p>
                      <ul className="text-sm text-amber-800 space-y-1 ml-4 list-disc">
                        <li>CAC Certificate</li>
                        <li>Tax Certificate (TIN/VAT)</li>
                        <li>Business License</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        What happens next?
                      </p>
                      <p className="text-sm text-blue-800">
                        We'll review your application within 2-3 business days, verify your documents, and contact you to complete the onboarding process.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || specialtyAreas.length === 0}
                  className="w-full rounded-lg bg-primary py-4 text-base font-semibold text-white transition-all hover:bg-secondary disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    'Submit Distributor Application'
                  )}
                </button>

                {specialtyAreas.length === 0 && (
                  <p className="text-center text-sm text-red-600">
                    Please select at least one specialty area
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Questions? Email us at{' '}
            <a href="mailto:distributors@kuyashfarm.com" className="text-primary hover:underline">
              distributors@kuyashfarm.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

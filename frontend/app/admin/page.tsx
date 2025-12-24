"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isCurrentUserAdmin, getApplicationStats } from "@/lib/admin-utils";
import { getInventoryOverview, getLastNMonthsSales, CategoryStats, ProductStats } from "@/lib/inventory-utils";
import { formatPrice, getCurrentUser } from "@/lib/utils";
import { Users, FileText, CheckCircle, XCircle, TrendingUp, Package, ShoppingCart, DollarSign, BarChart3, AlertTriangle, Plus, Clock, Truck } from "lucide-react";
import { getLowStockProducts, getOutOfStockProducts, getAllProducts, restockProduct } from "@/lib/inventory-manager";
import { StockBadge } from "@/components/ui/StockBadge";
import type { Product, DistributorApplication } from "@/lib/types";
import { getDistributorApplications, getDistributorApplicationStats, approveDistributorApplication, rejectDistributorApplication, getTierDisplayName, getTierBadgeColor } from "@/lib/distributor-utils";

/**
 * Admin Dashboard - Main control panel
 * Shows overview of wholesale applications and quick stats
 */
export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [activeTab, setActiveTab] = useState<'applications' | 'distributors' | 'inventory'>('applications');
  const [distributorStats, setDistributorStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [distributorApplications, setDistributorApplications] = useState<DistributorApplication[]>([]);
  const [inventoryData, setInventoryData] = useState<{
    totalProducts: number;
    totalCategories: number;
    totalOrders: number;
    totalRevenue: number;
    totalItemsSold: number;
    averageOrderValue: number;
    productStats: ProductStats[];
    categoryStats: CategoryStats[];
  }>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalItemsSold: 0,
    averageOrderValue: 0,
    productStats: [],
    categoryStats: [],
  });
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [restockQuantity, setRestockQuantity] = useState("");
  const [restockNotes, setRestockNotes] = useState("");

  const loadInventoryData = () => {
    // Load wholesale application stats
    setStats(getApplicationStats());

    // Load distributor application stats
    setDistributorStats(getDistributorApplicationStats());
    setDistributorApplications(getDistributorApplications());

    // Load inventory data
    const inventory = getInventoryOverview();
    setInventoryData(inventory);

    // Load last 6 months sales data
    const monthlySales = getLastNMonthsSales(6);
    setMonthlyData(monthlySales);

    // Load stock alerts
    setLowStockProducts(getLowStockProducts());
    setOutOfStockProducts(getOutOfStockProducts());
    setAllProducts(getAllProducts());
  };

  useEffect(() => {
    // Check admin access
    const isAdmin = isCurrentUserAdmin();
    if (!isAdmin) {
      router.push('/');
      return;
    }

    setIsAuthorized(true);
    loadInventoryData();
  }, [router]);

  const handleRestockClick = (product: Product) => {
    setSelectedProduct(product);
    setRestockQuantity("");
    setRestockNotes("");
    setShowRestockModal(true);
  };

  const handleRestockSubmit = () => {
    if (!selectedProduct || !restockQuantity) return;

    const quantity = parseInt(restockQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    const currentUser = getCurrentUser();
    const adminId = currentUser?.id || 'admin';

    const success = restockProduct(selectedProduct.id, quantity, adminId, restockNotes);

    if (success) {
      setShowRestockModal(false);
      setSelectedProduct(null);
      setRestockQuantity("");
      setRestockNotes("");
      // Reload data to reflect changes
      loadInventoryData();
    }
  };

  const handleApproveDistributor = (applicationId: string) => {
    const currentUser = getCurrentUser();
    const adminId = currentUser?.id || 'admin';

    const success = approveDistributorApplication(applicationId, adminId, 'Application approved');

    if (success) {
      alert('Distributor application approved successfully!');
      loadInventoryData();
    }
  };

  const handleRejectDistributor = (applicationId: string) => {
    const reason = prompt('Reason for rejection (optional):');
    const currentUser = getCurrentUser();
    const adminId = currentUser?.id || 'admin';

    const success = rejectDistributorApplication(applicationId, adminId, reason || 'Application rejected');

    if (success) {
      alert('Distributor application rejected.');
      loadInventoryData();
    }
  };

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
            <div>
              <h1 className="font-serif text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage wholesale applications, distributors, and inventory
              </p>
              {/* Tab Navigation */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'applications'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Wholesale Applications
                </button>
                <button
                  onClick={() => setActiveTab('distributors')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === 'distributors'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  Distributors
                  {distributorStats.pending > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {distributorStats.pending}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'inventory'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Inventory & Sales
                </button>
              </div>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'applications' ? (
          <>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Applications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Review
                </p>
                <p className="mt-2 text-3xl font-bold text-amber-600">
                  {stats.pending}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Approved */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Approved
                </p>
                <p className="mt-2 text-3xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Rejected
                </p>
                <p className="mt-2 text-3xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/admin/wholesale-applications"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Review Applications
                </h3>
                <p className="text-sm text-gray-600">
                  {stats.pending} pending applications
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">
                  More Features Coming
                </h3>
                <p className="text-sm text-gray-500">
                  User management, reports, etc.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Admin Panel Information
              </h3>
              <p className="text-sm text-blue-800">
                This is a frontend-only admin panel using localStorage. In production,
                this would connect to a backend API for managing users and applications.
                All changes made here affect the local browser data only.
              </p>
            </div>
          </div>
        </div>
        </>
        ) : activeTab === 'distributors' ? (
          <>
        {/* Distributors Tab */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Applications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {distributorStats.total}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Review
                </p>
                <p className="mt-2 text-3xl font-bold text-amber-600">
                  {distributorStats.pending}
                </p>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Approved */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Approved
                </p>
                <p className="mt-2 text-3xl font-bold text-green-600">
                  {distributorStats.approved}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Rejected
                </p>
                <p className="mt-2 text-3xl font-bold text-red-600">
                  {distributorStats.rejected}
                </p>
              </div>
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Distributor Applications</h2>
            <p className="mt-1 text-sm text-gray-600">
              Review and manage distributor partnership applications
            </p>
          </div>

          {distributorApplications.length === 0 ? (
            <div className="p-12 text-center">
              <Truck className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-sm font-medium text-gray-900">No applications yet</h3>
              <p className="mt-2 text-sm text-gray-600">
                Distributor applications will appear here for review.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Distribution Area
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expected Volume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {distributorApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{app.userName}</div>
                          <div className="text-sm text-gray-500">{app.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{app.businessName}</div>
                          <div className="text-sm text-gray-500">{app.yearsInBusiness} years</div>
                          <div className="text-xs text-gray-400 mt-1">{app.businessAddress}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{app.distributionArea}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.tier && (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getTierBadgeColor(app.tier)}`}>
                            {getTierDisplayName(app.tier).split(' - ')[0]}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.expectedVolume}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          app.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {app.status === 'pending' ? '⏳ Pending' : app.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {app.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApproveDistributor(app.id)}
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectDistributor(app.id)}
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">
                            {app.status === 'approved' ? 'Approved' : 'Rejected'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
        ) : (
          <>
        {/* Inventory & Sales Tab */}

        {/* Stock Alerts Banner */}
        {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
          <div className="mb-6 space-y-4">
            {/* Out of Stock Alert */}
            {outOfStockProducts.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-semibold text-red-800">
                      {outOfStockProducts.length} Product{outOfStockProducts.length > 1 ? 's' : ''} Out of Stock
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      {outOfStockProducts.map(p => p.name).join(', ')} - Immediate restocking required
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-semibold text-amber-800">
                      {lowStockProducts.length} Product{lowStockProducts.length > 1 ? 's' : ''} Running Low
                    </h3>
                    <p className="text-sm text-amber-700 mt-1">
                      {lowStockProducts.map(p => `${p.name} (${p.stock} left)`).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Inventory Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {inventoryData.totalProducts}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="mt-2 text-3xl font-bold text-blue-600">
                  {inventoryData.totalOrders}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="mt-2 text-3xl font-bold text-green-600">
                  {formatPrice(inventoryData.totalRevenue)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Items Sold */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Items Sold
                </p>
                <p className="mt-2 text-3xl font-bold text-orange-600">
                  {inventoryData.totalItemsSold}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Category Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items Sold
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryData.categoryStats.length > 0 ? (
                  inventoryData.categoryStats.map((category: CategoryStats) => (
                    <tr key={category.category} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {category.category}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {category.productCount}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {category.totalSold}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        {formatPrice(category.revenue)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {category.orderCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                      No sales data available yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Sales Report */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Sales Report (Last 6 Months)
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items Sold
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Order Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlyData.length > 0 && monthlyData.some((m: any) => m.totalOrders > 0) ? (
                  monthlyData.map((month: any, index: number) => (
                    month.totalOrders > 0 && (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {month.month} {month.year}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {month.totalOrders}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {month.totalItemsSold}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          {formatPrice(month.totalRevenue)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatPrice(month.averageOrderValue)}
                        </td>
                      </tr>
                    )
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                      No monthly sales data available yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Management Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory Management
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Low Stock Alert
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Restocked
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                      {product.category}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StockBadge product={product} showQuantity={false} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {product.stock} units
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.lowStockThreshold} units
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.lastRestocked ? (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(product.lastRestocked).toLocaleDateString()}
                        </div>
                      ) : (
                        'Never'
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleRestockClick(product)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Selling Products (All Time)
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Sold
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Qty/Order
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryData.productStats.filter((p: ProductStats) => p.totalSold > 0).length > 0 ? (
                  inventoryData.productStats
                    .filter((p: ProductStats) => p.totalSold > 0)
                    .slice(0, 10)
                    .map((product: ProductStats) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                          {product.category}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {product.totalSold} units
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          {formatPrice(product.revenue)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {product.averageOrderQuantity.toFixed(1)}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                      No product sales data available yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}
      </main>

      {/* Restock Modal */}
      {showRestockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Restock Product
            </h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Product</p>
              <p className="text-base font-semibold text-gray-900">{selectedProduct.name}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Current Stock</p>
              <p className="text-base font-semibold text-gray-900">{selectedProduct.stock} units</p>
            </div>

            <div className="mb-4">
              <label htmlFor="restockQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity to Add *
              </label>
              <input
                id="restockQuantity"
                type="number"
                min="1"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {restockQuantity && parseInt(restockQuantity) > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  New stock will be: <strong>{selectedProduct.stock + parseInt(restockQuantity)} units</strong>
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="restockNotes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="restockNotes"
                value={restockNotes}
                onChange={(e) => setRestockNotes(e.target.value)}
                placeholder="Add any notes about this restock..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRestockModal(false);
                  setSelectedProduct(null);
                  setRestockQuantity("");
                  setRestockNotes("");
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRestockSubmit}
                disabled={!restockQuantity || parseInt(restockQuantity) <= 0}
                className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

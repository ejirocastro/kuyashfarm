"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Truck } from "lucide-react";
import { isCurrentUserAdmin, getApplicationStats } from "@/lib/features/admin/admin-utils";
import { getInventoryOverview, getLastNMonthsSales, CategoryStats, ProductStats } from "@/lib/features/inventory/inventory-utils";
import { getCurrentUser } from "@/lib/utils";
import { getLowStockProducts, getOutOfStockProducts, getAllProducts, restockProduct } from "@/lib/features/inventory/inventory-manager";
import { getDistributorApplications, getDistributorApplicationStats, approveDistributorApplication, rejectDistributorApplication } from "@/lib/features/distributor/distributor-utils";
import type { Product, DistributorApplication } from "@/lib/types";
import { WholesaleTab } from "./components/WholesaleTab";
import { DistributorsTab } from "./components/DistributorsTab";
import { InventoryTab } from "./components/InventoryTab";
import { RestockModal } from "./components/RestockModal";

type Tab = "applications" | "distributors" | "inventory";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("applications");

  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [distributorStats, setDistributorStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
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
    totalProducts: 0, totalCategories: 0, totalOrders: 0,
    totalRevenue: 0, totalItemsSold: 0, averageOrderValue: 0,
    productStats: [], categoryStats: [],
  });
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [restockQuantity, setRestockQuantity] = useState("");
  const [restockNotes, setRestockNotes] = useState("");

  const loadData = () => {
    setStats(getApplicationStats());
    setDistributorStats(getDistributorApplicationStats());
    setDistributorApplications(getDistributorApplications());
    setInventoryData(getInventoryOverview());
    setMonthlyData(getLastNMonthsSales(6));
    setLowStockProducts(getLowStockProducts());
    setOutOfStockProducts(getOutOfStockProducts());
    setAllProducts(getAllProducts());
  };

  useEffect(() => {
    if (!isCurrentUserAdmin()) { router.push("/"); return; }
    setIsAuthorized(true);
    loadData();
  }, [router]);

  const handleRestockClick = (product: Product) => {
    setSelectedProduct(product);
    setRestockQuantity("");
    setRestockNotes("");
    setShowRestockModal(true);
  };

  const handleRestockConfirm = () => {
    if (!selectedProduct) return;
    const qty = parseInt(restockQuantity);
    if (isNaN(qty) || qty <= 0) { alert("Please enter a valid quantity"); return; }
    const adminId = getCurrentUser()?.id || "admin";
    if (restockProduct(selectedProduct.id, qty, adminId, restockNotes)) {
      setShowRestockModal(false);
      setSelectedProduct(null);
      loadData();
    }
  };

  const handleApproveDistributor = (id: string) => {
    const adminId = getCurrentUser()?.id || "admin";
    if (approveDistributorApplication(id, adminId, "Application approved")) {
      alert("Distributor application approved successfully!");
      loadData();
    }
  };

  const handleRejectDistributor = (id: string) => {
    const reason = prompt("Reason for rejection (optional):") || "Application rejected";
    const adminId = getCurrentUser()?.id || "admin";
    if (rejectDistributorApplication(id, adminId, reason)) {
      alert("Distributor application rejected.");
      loadData();
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Checking authorization…</p>
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
              <h1 className="font-serif text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Manage wholesale applications, distributors, and inventory</p>
              <div className="flex gap-2 mt-4">
                {(["applications", "distributors", "inventory"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2 ${
                      activeTab === tab
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {tab === "distributors" && <Truck className="w-4 h-4" />}
                    {tab === "applications" ? "Wholesale Applications" : tab === "distributors" ? "Distributors" : "Inventory & Sales"}
                    {tab === "distributors" && distributorStats.pending > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {distributorStats.pending}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Back to Store
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "applications" && <WholesaleTab stats={stats} />}
        {activeTab === "distributors" && (
          <DistributorsTab
            stats={distributorStats}
            applications={distributorApplications}
            onApprove={handleApproveDistributor}
            onReject={handleRejectDistributor}
          />
        )}
        {activeTab === "inventory" && (
          <InventoryTab
            inventoryData={inventoryData}
            monthlyData={monthlyData}
            lowStockProducts={lowStockProducts}
            outOfStockProducts={outOfStockProducts}
            allProducts={allProducts}
            onRestockClick={handleRestockClick}
          />
        )}
      </main>

      {showRestockModal && selectedProduct && (
        <RestockModal
          product={selectedProduct}
          quantity={restockQuantity}
          notes={restockNotes}
          onQuantityChange={setRestockQuantity}
          onNotesChange={setRestockNotes}
          onConfirm={handleRestockConfirm}
          onCancel={() => { setShowRestockModal(false); setSelectedProduct(null); }}
        />
      )}
    </div>
  );
}

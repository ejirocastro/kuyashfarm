"use client";

import { Package, ShoppingCart, DollarSign, BarChart3, AlertTriangle, Plus, Clock } from "lucide-react";
import { StatsGrid } from "./StatsGrid";
import { StockBadge } from "@/components/ui/StockBadge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";
import type { CategoryStats, ProductStats } from "@/lib/features/inventory/inventory-utils";

interface InventoryData {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalItemsSold: number;
  productStats: ProductStats[];
  categoryStats: CategoryStats[];
}

interface MonthlyRow {
  month: string;
  year: number;
  totalOrders: number;
  totalItemsSold: number;
  totalRevenue: number;
  averageOrderValue: number;
}

interface InventoryTabProps {
  inventoryData: InventoryData;
  monthlyData: MonthlyRow[];
  lowStockProducts: Product[];
  outOfStockProducts: Product[];
  allProducts: Product[];
  onRestockClick: (product: Product) => void;
}

export function InventoryTab({
  inventoryData,
  monthlyData,
  lowStockProducts,
  outOfStockProducts,
  allProducts,
  onRestockClick,
}: InventoryTabProps) {
  const cards = [
    { label: "Total Products", value: inventoryData.totalProducts,  icon: Package,     iconBg: "bg-purple-100", iconColor: "text-purple-600" },
    { label: "Total Orders",   value: inventoryData.totalOrders,    icon: ShoppingCart, iconBg: "bg-blue-100",  iconColor: "text-blue-600",   valueColor: "text-blue-600" },
    { label: "Total Revenue",  value: formatPrice(inventoryData.totalRevenue), icon: DollarSign, iconBg: "bg-green-100", iconColor: "text-green-600", valueColor: "text-green-600" },
    { label: "Items Sold",     value: inventoryData.totalItemsSold, icon: BarChart3,   iconBg: "bg-orange-100", iconColor: "text-orange-600", valueColor: "text-orange-600" },
  ];

  return (
    <>
      {/* Stock alerts */}
      {(outOfStockProducts.length > 0 || lowStockProducts.length > 0) && (
        <div className="mb-6 space-y-4">
          {outOfStockProducts.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-red-800">
                  {outOfStockProducts.length} Product{outOfStockProducts.length > 1 ? "s" : ""} Out of Stock
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  {outOfStockProducts.map((p) => p.name).join(", ")} — Immediate restocking required
                </p>
              </div>
            </div>
          )}
          {lowStockProducts.length > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-amber-800">
                  {lowStockProducts.length} Product{lowStockProducts.length > 1 ? "s" : ""} Running Low
                </h3>
                <p className="text-sm text-amber-700 mt-1">
                  {lowStockProducts.map((p) => `${p.name} (${p.stock} left)`).join(", ")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <StatsGrid cards={cards} />

      {/* Category Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {["Category", "Products", "Items Sold", "Revenue", "Orders"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryData.categoryStats.length > 0 ? (
                inventoryData.categoryStats.map((cat) => (
                  <tr key={cat.category} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{cat.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{cat.productCount}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{cat.totalSold}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{formatPrice(cat.revenue)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{cat.orderCount}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">No sales data available yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Sales */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales Report (Last 6 Months)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {["Month", "Orders", "Items Sold", "Revenue", "Avg Order Value"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyData.some((m) => m.totalOrders > 0) ? (
                monthlyData.filter((m) => m.totalOrders > 0).map((month, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month} {month.year}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{month.totalOrders}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{month.totalItemsSold}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{formatPrice(month.totalRevenue)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{formatPrice(month.averageOrderValue)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">No monthly sales data available yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Management */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {["Product", "Category", "Stock Status", "Current Stock", "Low Stock Alert", "Last Restocked", "Actions"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${i === 6 ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{product.category}</td>
                  <td className="px-4 py-4 whitespace-nowrap"><StockBadge product={product} showQuantity={false} /></td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{product.stock} units</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{product.lowStockThreshold} units</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.lastRestocked ? (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(product.lastRestocked).toLocaleDateString()}
                      </div>
                    ) : "Never"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => onRestockClick(product)}
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products (All Time)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {["Product", "Category", "Total Sold", "Revenue", "Avg Qty/Order"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryData.productStats.filter((p) => p.totalSold > 0).length > 0 ? (
                inventoryData.productStats
                  .filter((p) => p.totalSold > 0)
                  .slice(0, 10)
                  .map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{product.category}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{product.totalSold} units</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{formatPrice(product.revenue)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{product.averageOrderQuantity.toFixed(1)}</td>
                    </tr>
                  ))
              ) : (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">No product sales data available yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

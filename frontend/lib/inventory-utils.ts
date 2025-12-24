/**
 * Inventory and Sales Analytics Utilities
 * Provides functions for tracking product inventory, sales data, and generating reports
 */

import { Order, OrderItem } from "./types";
import { PRODUCTS, FARM_CATEGORIES } from "./constants";

export interface ProductStats {
  id: number;
  name: string;
  category: string;
  totalSold: number;
  revenue: number;
  orderCount: number;
  averageOrderQuantity: number;
}

export interface CategoryStats {
  category: string;
  productCount: number;
  totalSold: number;
  revenue: number;
  orderCount: number;
}

export interface MonthlySalesData {
  month: string;
  year: number;
  totalOrders: number;
  totalRevenue: number;
  totalItemsSold: number;
  averageOrderValue: number;
  categoryBreakdown: {
    category: string;
    revenue: number;
    itemsSold: number;
  }[];
  topProducts: {
    name: string;
    category: string;
    quantity: number;
    revenue: number;
  }[];
}

export interface InventoryOverview {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
  totalItemsSold: number;
  averageOrderValue: number;
  productStats: ProductStats[];
  categoryStats: CategoryStats[];
}

/**
 * Get all orders from localStorage
 */
export function getAllOrders(): Order[] {
  if (typeof window === 'undefined') return [];

  try {
    const ordersStr = localStorage.getItem('kuyash-orders');
    if (!ordersStr) return [];
    return JSON.parse(ordersStr);
  } catch {
    return [];
  }
}

/**
 * Calculate total number of unique products in the system
 */
export function getTotalProductCount(): number {
  let count = 0;
  Object.values(PRODUCTS).forEach((categoryProducts) => {
    count += categoryProducts.length;
  });
  return count;
}

/**
 * Get product statistics from orders
 */
export function getProductStats(): ProductStats[] {
  const orders = getAllOrders();
  const productMap = new Map<number, ProductStats>();

  // Initialize with all products
  Object.entries(PRODUCTS).forEach(([category, products]) => {
    products.forEach((product) => {
      productMap.set(product.id, {
        id: product.id,
        name: product.name,
        category,
        totalSold: 0,
        revenue: 0,
        orderCount: 0,
        averageOrderQuantity: 0,
      });
    });
  });

  // Calculate stats from orders
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const stats = productMap.get(item.id);
      if (stats) {
        stats.totalSold += item.quantity;
        stats.revenue += item.price * item.quantity;
        stats.orderCount += 1;
      }
    });
  });

  // Calculate averages
  productMap.forEach((stats) => {
    if (stats.orderCount > 0) {
      stats.averageOrderQuantity = stats.totalSold / stats.orderCount;
    }
  });

  return Array.from(productMap.values()).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Get category-level statistics
 */
export function getCategoryStats(): CategoryStats[] {
  const productStats = getProductStats();
  const categoryMap = new Map<string, CategoryStats>();

  productStats.forEach((product) => {
    const existing = categoryMap.get(product.category);
    if (existing) {
      existing.productCount += 1;
      existing.totalSold += product.totalSold;
      existing.revenue += product.revenue;
      existing.orderCount += product.orderCount;
    } else {
      categoryMap.set(product.category, {
        category: product.category,
        productCount: 1,
        totalSold: product.totalSold,
        revenue: product.revenue,
        orderCount: product.orderCount,
      });
    }
  });

  return Array.from(categoryMap.values()).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Get overall inventory overview
 */
export function getInventoryOverview(): InventoryOverview {
  const orders = getAllOrders();
  const productStats = getProductStats();
  const categoryStats = getCategoryStats();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItemsSold = orders.reduce(
    (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );

  return {
    totalProducts: getTotalProductCount(),
    totalCategories: FARM_CATEGORIES.length,
    totalOrders: orders.length,
    totalRevenue,
    totalItemsSold,
    averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    productStats,
    categoryStats,
  };
}

/**
 * Get monthly sales data for a specific month and year
 */
export function getMonthlySales(month: number, year: number): MonthlySalesData {
  const orders = getAllOrders();

  // Filter orders for the specified month/year
  const monthOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    return orderDate.getMonth() === month && orderDate.getFullYear() === year;
  });

  const totalRevenue = monthOrders.reduce((sum, order) => sum + order.total, 0);
  const totalItemsSold = monthOrders.reduce(
    (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );

  // Category breakdown
  const categoryMap = new Map<string, { revenue: number; itemsSold: number }>();
  const productMap = new Map<string, { name: string; category: string; quantity: number; revenue: number }>();

  monthOrders.forEach((order) => {
    order.items.forEach((item) => {
      // Category stats
      const categoryKey = item.category;
      const categoryData = categoryMap.get(categoryKey);
      const itemRevenue = item.price * item.quantity;

      if (categoryData) {
        categoryData.revenue += itemRevenue;
        categoryData.itemsSold += item.quantity;
      } else {
        categoryMap.set(categoryKey, {
          revenue: itemRevenue,
          itemsSold: item.quantity,
        });
      }

      // Product stats
      const productKey = `${item.id}-${item.name}`;
      const productData = productMap.get(productKey);
      if (productData) {
        productData.quantity += item.quantity;
        productData.revenue += itemRevenue;
      } else {
        productMap.set(productKey, {
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          revenue: itemRevenue,
        });
      }
    });
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return {
    month: monthNames[month],
    year,
    totalOrders: monthOrders.length,
    totalRevenue,
    totalItemsSold,
    averageOrderValue: monthOrders.length > 0 ? totalRevenue / monthOrders.length : 0,
    categoryBreakdown: Array.from(categoryMap.entries())
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.revenue - a.revenue),
    topProducts: Array.from(productMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10),
  };
}

/**
 * Get sales data for the last N months
 */
export function getLastNMonthsSales(n: number): MonthlySalesData[] {
  const result: MonthlySalesData[] = [];
  const now = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthData = getMonthlySales(date.getMonth(), date.getFullYear());
    result.push(monthData);
  }

  return result;
}

/**
 * Get top selling products across all time
 */
export function getTopSellingProducts(limit: number = 10): ProductStats[] {
  const productStats = getProductStats();
  return productStats
    .filter((p) => p.totalSold > 0)
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, limit);
}

/**
 * Get low stock alert (products with low sales - placeholder for future inventory tracking)
 */
export function getLowPerformingProducts(threshold: number = 5): ProductStats[] {
  const productStats = getProductStats();
  return productStats.filter((p) => p.totalSold < threshold && p.totalSold > 0);
}

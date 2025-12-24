/**
 * Inventory Management System
 * Handles stock tracking, deduction, alerts, and restock subscriptions
 */

import { Product, RestockSubscription, RestockHistory, Notification } from "./types";
import { PRODUCTS } from "./constants";

// LocalStorage keys
const INVENTORY_KEY = "kuyash_inventory";
const RESTOCK_SUBSCRIPTIONS_KEY = "kuyash_restock_subscriptions";
const RESTOCK_HISTORY_KEY = "kuyash_restock_history";
const NOTIFICATIONS_KEY = "kuyash_notifications";

/**
 * Initialize inventory from constants if not already in localStorage
 */
export function initializeInventory(): void {
  const existingInventory = localStorage.getItem(INVENTORY_KEY);

  if (!existingInventory) {
    // Flatten all products from all categories
    const allProducts = Object.values(PRODUCTS).flat();
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(allProducts));
  }
}

/**
 * Get all products from inventory
 */
export function getAllProducts(): Product[] {
  initializeInventory();
  const inventory = localStorage.getItem(INVENTORY_KEY);
  return inventory ? JSON.parse(inventory) : [];
}

/**
 * Get a single product by ID
 */
export function getProductById(productId: number): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.id === productId);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.category === category);
}

/**
 * Update a product in inventory
 */
export function updateProduct(productId: number, updates: Partial<Product>): Product | null {
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(products));

  return products[index];
}

/**
 * Check if sufficient stock is available
 */
export function checkStockAvailability(productId: number, quantity: number): {
  available: boolean;
  currentStock: number;
  requested: number;
} {
  const product = getProductById(productId);

  if (!product) {
    return { available: false, currentStock: 0, requested: quantity };
  }

  return {
    available: product.stock >= quantity,
    currentStock: product.stock,
    requested: quantity,
  };
}

/**
 * Deduct inventory after an order is placed
 * Returns true if successful, false if insufficient stock
 */
export function deductInventory(productId: number, quantity: number): boolean {
  const product = getProductById(productId);

  if (!product || product.stock < quantity) {
    return false;
  }

  const newStock = product.stock - quantity;
  updateProduct(productId, { stock: newStock, inStock: newStock > 0 });

  // Check if low stock alert is needed
  if (newStock > 0 && newStock <= product.lowStockThreshold) {
    triggerLowStockAlert(product);
  }

  // Check if out of stock
  if (newStock === 0) {
    triggerOutOfStockAlert(product);
  }

  return true;
}

/**
 * Restock a product
 */
export function restockProduct(
  productId: number,
  quantity: number,
  adminId: string,
  notes?: string
): boolean {
  const product = getProductById(productId);

  if (!product) return false;

  const previousStock = product.stock;
  const newStock = previousStock + quantity;
  const wasOutOfStock = previousStock === 0;

  // Update product stock
  updateProduct(productId, {
    stock: newStock,
    inStock: true,
    lastRestocked: new Date().toISOString(),
  });

  // Record restock history
  const history: RestockHistory = {
    id: `restock_${Date.now()}_${productId}`,
    productId,
    quantity,
    previousStock,
    newStock,
    restockedBy: adminId,
    restockedAt: new Date().toISOString(),
    notes,
  };

  const existingHistory = getRestockHistory();
  existingHistory.unshift(history);
  localStorage.setItem(RESTOCK_HISTORY_KEY, JSON.stringify(existingHistory));

  // If product was out of stock, notify subscribers
  if (wasOutOfStock) {
    notifyRestockSubscribers(product);
  }

  // Create notification for admins
  createNotification({
    type: "success",
    title: "Product Restocked",
    message: `${product.name} restocked with ${quantity} units. New stock: ${newStock}`,
  });

  return true;
}

/**
 * Get restock history
 */
export function getRestockHistory(productId?: number): RestockHistory[] {
  const history = localStorage.getItem(RESTOCK_HISTORY_KEY);
  const allHistory: RestockHistory[] = history ? JSON.parse(history) : [];

  if (productId) {
    return allHistory.filter((h) => h.productId === productId);
  }

  return allHistory;
}

/**
 * Get products with low stock
 */
export function getLowStockProducts(): Product[] {
  const products = getAllProducts();
  return products.filter(
    (p) => p.stock > 0 && p.stock <= p.lowStockThreshold
  );
}

/**
 * Get out of stock products
 */
export function getOutOfStockProducts(): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.stock === 0);
}

/**
 * Trigger low stock alert
 */
function triggerLowStockAlert(product: Product): void {
  createNotification({
    type: "warning",
    title: "Low Stock Alert",
    message: `${product.name} is running low! Only ${product.stock} left in stock.`,
  });
}

/**
 * Trigger out of stock alert
 */
function triggerOutOfStockAlert(product: Product): void {
  createNotification({
    type: "error",
    title: "Out of Stock",
    message: `${product.name} is now out of stock!`,
  });
}

/**
 * Create a notification
 */
export function createNotification(notification: Omit<Notification, "id" | "timestamp" | "read">): void {
  const newNotification: Notification = {
    id: `notif_${Date.now()}_${Math.random()}`,
    ...notification,
    timestamp: new Date(),
    read: false,
  };

  const notifications = getNotifications();
  notifications.unshift(newNotification);

  // Keep only last 100 notifications
  if (notifications.length > 100) {
    notifications.splice(100);
  }

  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));

  // Trigger custom event for real-time UI updates
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("kuyash-notification", { detail: newNotification }));
  }
}

/**
 * Get all notifications
 */
export function getNotifications(): Notification[] {
  const notifications = localStorage.getItem(NOTIFICATIONS_KEY);
  return notifications ? JSON.parse(notifications) : [];
}

/**
 * Get unread notifications
 */
export function getUnreadNotifications(): Notification[] {
  return getNotifications().filter((n) => !n.read);
}

/**
 * Mark notification as read
 */
export function markNotificationAsRead(notificationId: string): void {
  const notifications = getNotifications();
  const notification = notifications.find((n) => n.id === notificationId);

  if (notification) {
    notification.read = true;
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }
}

/**
 * Mark all notifications as read
 */
export function markAllNotificationsAsRead(): void {
  const notifications = getNotifications();
  notifications.forEach((n) => (n.read = true));
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

/**
 * Subscribe to restock notifications
 */
export function subscribeToRestock(
  productId: number,
  userId: string,
  userEmail: string
): boolean {
  const product = getProductById(productId);

  if (!product) return false;

  const subscriptions = getRestockSubscriptions();

  // Check if already subscribed
  const existingSubscription = subscriptions.find(
    (s) => s.productId === productId && s.userId === userId
  );

  if (existingSubscription) return false;

  const subscription: RestockSubscription = {
    id: `sub_${Date.now()}_${productId}_${userId}`,
    productId,
    userId,
    userEmail,
    subscribedAt: new Date().toISOString(),
  };

  subscriptions.push(subscription);
  localStorage.setItem(RESTOCK_SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));

  createNotification({
    type: "info",
    title: "Restock Subscription",
    message: `You'll be notified when ${product.name} is back in stock!`,
  });

  return true;
}

/**
 * Get restock subscriptions
 */
export function getRestockSubscriptions(productId?: number): RestockSubscription[] {
  const subscriptions = localStorage.getItem(RESTOCK_SUBSCRIPTIONS_KEY);
  const allSubscriptions: RestockSubscription[] = subscriptions ? JSON.parse(subscriptions) : [];

  if (productId) {
    return allSubscriptions.filter((s) => s.productId === productId);
  }

  return allSubscriptions;
}

/**
 * Notify restock subscribers
 */
function notifyRestockSubscribers(product: Product): void {
  const subscriptions = getRestockSubscriptions(product.id);

  subscriptions.forEach((sub) => {
    // Create notification for each subscriber
    createNotification({
      type: "success",
      title: "Back in Stock!",
      message: `Good news! ${product.name} is now back in stock.`,
    });

    // In a real app, this would send an email via backend
    console.log(`Email notification sent to ${sub.userEmail} about ${product.name} restock`);
  });

  // Clear subscriptions for this product
  const allSubscriptions = getRestockSubscriptions();
  const remaining = allSubscriptions.filter((s) => s.productId !== product.id);
  localStorage.setItem(RESTOCK_SUBSCRIPTIONS_KEY, JSON.stringify(remaining));
}

/**
 * Check if user is subscribed to product restock
 */
export function isSubscribedToRestock(productId: number, userId: string): boolean {
  const subscriptions = getRestockSubscriptions(productId);
  return subscriptions.some((s) => s.userId === userId);
}

/**
 * Unsubscribe from restock notifications
 */
export function unsubscribeFromRestock(productId: number, userId: string): boolean {
  const subscriptions = getRestockSubscriptions();
  const filtered = subscriptions.filter(
    (s) => !(s.productId === productId && s.userId === userId)
  );

  if (filtered.length === subscriptions.length) return false;

  localStorage.setItem(RESTOCK_SUBSCRIPTIONS_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Get inventory statistics
 */
export function getInventoryStats() {
  const products = getAllProducts();
  const lowStock = getLowStockProducts();
  const outOfStock = getOutOfStockProducts();

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalItems = products.reduce((sum, p) => sum + p.stock, 0);

  return {
    totalProducts: products.length,
    totalItems,
    totalValue,
    lowStockCount: lowStock.length,
    outOfStockCount: outOfStock.length,
    inStockCount: products.length - outOfStock.length,
    lowStockProducts: lowStock,
    outOfStockProducts: outOfStock,
  };
}

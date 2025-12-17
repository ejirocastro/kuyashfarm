/**
 * Root-level type definitions for the application
 */

export interface Product {
  id: number;
  name: string;
  price: number; // Retail price
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
  bulkPricing?: readonly {
    readonly minQuantity: number;
    readonly pricePerUnit: number;
  }[];
}

export type UserType = 'retail' | 'wholesale_pending' | 'wholesale_verified';

export interface User {
  id?: string;
  name: string;
  email: string;
  userType: UserType;
  isAdmin?: boolean; // Admin flag for access control
  businessInfo?: {
    businessName: string;
    businessAddress: string;
  };
}

export interface WholesaleApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  businessName: string;
  businessAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface CartItem extends Product {
  quantity: number;
  category: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product, category: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

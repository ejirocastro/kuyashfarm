/**
 * Type definitions for the application
 */

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
}

export interface Goal {
  id: number;
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
  category?: string;
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

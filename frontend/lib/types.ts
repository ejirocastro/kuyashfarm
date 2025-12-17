/**
 * Application-wide type definitions
 *
 * Currency: All prices are in Nigerian Naira (NGN)
 * Price format: Whole numbers (e.g., 7500 = ₦7,500.00)
 */

export interface Product {
  id: number;
  name: string;
  price: number; // Price in NGN (Nigerian Naira)
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: number;
  name: string;
  price: number; // Price in NGN (Nigerian Naira)
  quantity: number;
  image: string;
  unit: string;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number; // Total in NGN (Nigerian Naira)
  items: OrderItem[];
  itemCount: number;
  shipping: ShippingAddress;
  tracking?: {
    number: string;
    carrier: string;
    url?: string;
    estimatedDelivery?: string;
  };
  timeline: {
    status: string;
    date: string;
    completed: boolean;
  }[];
}

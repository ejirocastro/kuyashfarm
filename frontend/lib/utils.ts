import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Currency configuration for Nigerian Naira
 */
export const CURRENCY = {
  code: 'NGN',
  symbol: '₦',
  locale: 'en-NG',
  name: 'Nigerian Naira',
} as const;

/**
 * Formats a price amount in Nigerian Naira
 * @param amount - The numeric amount to format
 * @returns Formatted price string with ₦ symbol
 * @example formatPrice(5000) => "₦5,000.00"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate price based on quantity and user verification status
 * Retail users always see retail price
 * Verified wholesale users get bulk pricing when quantity qualifies
 */
export function calculatePrice(
  product: {
    price: number;
    bulkPricing?: readonly { readonly minQuantity: number; readonly pricePerUnit: number }[]
  },
  quantity: number,
  userType: 'retail' | 'wholesale_pending' | 'wholesale_verified'
): number {
  // Retail and pending users always get retail price
  if (userType !== 'wholesale_verified') {
    return product.price;
  }

  // No bulk pricing available
  if (!product.bulkPricing || product.bulkPricing.length === 0) {
    return product.price;
  }

  // Find applicable bulk price tier (highest tier that user qualifies for)
  let applicablePrice = product.price;
  for (const tier of product.bulkPricing) {
    if (quantity >= tier.minQuantity) {
      applicablePrice = tier.pricePerUnit;
    }
  }

  return applicablePrice;
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): {
  userType: 'retail' | 'wholesale_pending' | 'wholesale_verified';
  name?: string;
  email?: string;
  id?: string;
  isAdmin?: boolean;
  businessInfo?: {
    businessName: string;
    businessAddress: string;
  };
} | null {
  if (typeof window === 'undefined') return null;

  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

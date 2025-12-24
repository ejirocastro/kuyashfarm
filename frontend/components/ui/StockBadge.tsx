/**
 * Stock Badge Component
 * Displays product stock status with appropriate styling
 */

import { Product } from "@/lib/types";

interface StockBadgeProps {
  product: Product;
  showQuantity?: boolean;
  className?: string;
}

export function StockBadge({ product, showQuantity = true, className = "" }: StockBadgeProps) {
  const { stock, lowStockThreshold } = product;

  // Out of Stock
  if (stock === 0) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-300 ${className}`}>
        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
        <span className="text-xs font-medium text-gray-700">Out of Stock</span>
      </div>
    );
  }

  // Low Stock
  if (stock <= lowStockThreshold) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 ${className}`}>
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span className="text-xs font-medium text-amber-700">
          {showQuantity ? `Only ${stock} left!` : 'Low Stock'}
        </span>
      </div>
    );
  }

  // In Stock
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 ${className}`}>
      <span className="w-2 h-2 rounded-full bg-green-500"></span>
      <span className="text-xs font-medium text-green-700">
        {showQuantity ? `${stock} in stock` : 'In Stock'}
      </span>
    </div>
  );
}

/**
 * Simple stock status indicator (just the dot and text)
 */
export function StockIndicator({ product }: { product: Product }) {
  const { stock, lowStockThreshold } = product;

  if (stock === 0) {
    return (
      <span className="text-sm text-gray-600">
        ⚠️ Out of Stock
      </span>
    );
  }

  if (stock <= lowStockThreshold) {
    return (
      <span className="text-sm text-amber-600">
        ⚠️ Only {stock} left in stock!
      </span>
    );
  }

  return (
    <span className="text-sm text-green-600">
      ✓ In Stock ({stock} available)
    </span>
  );
}

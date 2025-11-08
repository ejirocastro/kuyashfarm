'use client';

/**
 * Cart button component for the navbar
 * Shows cart icon with item count badge
 */

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useEffect, useState } from 'react';

interface CartButtonProps {
  onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const [totalItems, setTotalItems] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTotalItems(getTotalItems());
  }, [getTotalItems]);

  // Subscribe to cart changes
  useEffect(() => {
    if (!mounted) return;

    const unsubscribe = useCartStore.subscribe((state) => {
      setTotalItems(state.getTotalItems());
    });

    return unsubscribe;
  }, [mounted]);

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6 text-white" />
      {mounted && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}

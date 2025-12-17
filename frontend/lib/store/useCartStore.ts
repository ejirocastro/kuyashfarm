/**
 * Shopping cart store using Zustand
 * Manages cart state with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, Product, CartItem } from '@/types';
import { calculatePrice, getCurrentUser } from '@/lib/utils';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, category: string) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            // If item exists, increase quantity
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          // Add new item with quantity 1
          const newItem: CartItem = {
            ...product,
            category,
            quantity: 1,
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const user = getCurrentUser();
        const userType = user?.userType || 'retail';

        return get().items.reduce((total, item) => {
          // Calculate price based on quantity and user type
          const pricePerUnit = calculatePrice(item, item.quantity, userType);
          return total + pricePerUnit * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'kuyash-cart-storage', // localStorage key
    }
  )
);

/**
 * Shopping cart store using Zustand
 * Manages cart state with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, Product, CartItem } from '@/types';
import { calculatePrice, getCurrentUser } from '@/lib/utils';
import { checkStockAvailability, createNotification } from '@/lib/inventory-manager';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, category: string) => {
        const existingItem = get().items.find((item) => item.id === product.id);
        const requestedQuantity = existingItem ? existingItem.quantity + 1 : 1;

        // Check stock availability
        const stockCheck = checkStockAvailability(product.id, requestedQuantity);

        if (!stockCheck.available) {
          createNotification({
            type: 'error',
            title: 'Insufficient Stock',
            message: `Only ${stockCheck.currentStock} units of ${product.name} available. You're trying to add ${requestedQuantity}.`,
          });
          return;
        }

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

        // Show success notification
        createNotification({
          type: 'success',
          title: 'Added to Cart',
          message: `${product.name} has been added to your cart.`,
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

        // Check stock availability
        const stockCheck = checkStockAvailability(productId, quantity);

        if (!stockCheck.available) {
          const item = get().items.find((item) => item.id === productId);
          createNotification({
            type: 'warning',
            title: 'Stock Limit Reached',
            message: `Only ${stockCheck.currentStock} units of ${item?.name || 'this product'} available.`,
          });
          // Set to maximum available stock
          set((state) => ({
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity: stockCheck.currentStock } : item
            ),
          }));
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

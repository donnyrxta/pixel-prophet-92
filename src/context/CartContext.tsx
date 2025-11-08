/**
 * CartContext - Global cart state management
 * Phase 3: E-commerce with localStorage persistence
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Cart, CartItem, Product } from '@/types/shop';
import { calculateCartTotals } from '@/lib/shop/pricing';
import { trackAddToCart, trackRemoveFromCart } from '@/lib/gtm';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sohoconnect_cart';

/**
 * Load cart from localStorage
 */
function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
}

/**
 * Save cart to localStorage
 */
function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedItems = loadCartFromStorage();
    setItems(savedItems);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  // Calculate cart totals
  const cart: Cart = {
    items,
    ...calculateCartTotals(items)
  };

  /**
   * Add product to cart
   */
  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.product.id === product.id);

      if (existingIndex >= 0) {
        // Update quantity of existing item
        const updated = [...prevItems];
        const newQuantity = updated[existingIndex].quantity + quantity;

        // Check stock availability
        if (newQuantity > product.stockCount) {
          console.warn(`Cannot add ${quantity} more. Only ${product.stockCount} in stock.`);
          return prevItems;
        }

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQuantity
        };

        // Track analytics
        trackAddToCart(product.id, product.name, product.price, newQuantity);

        return updated;
      } else {
        // Add new item
        if (quantity > product.stockCount) {
          console.warn(`Cannot add ${quantity}. Only ${product.stockCount} in stock.`);
          return prevItems;
        }

        const newItem: CartItem = {
          product,
          quantity,
          addedAt: new Date().toISOString()
        };

        // Track analytics
        trackAddToCart(product.id, product.name, product.price, quantity);

        return [...prevItems, newItem];
      }
    });
  };

  /**
   * Remove product from cart
   */
  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);

      if (itemToRemove) {
        // Track analytics
        trackRemoveFromCart(
          itemToRemove.product.id,
          itemToRemove.product.name,
          itemToRemove.product.price,
          itemToRemove.quantity
        );
      }

      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  /**
   * Update item quantity
   */
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems => {
      const updated = prevItems.map(item => {
        if (item.product.id === productId) {
          // Check stock availability
          if (quantity > item.product.stockCount) {
            console.warn(`Cannot set quantity to ${quantity}. Only ${item.product.stockCount} in stock.`);
            return item;
          }

          return {
            ...item,
            quantity
          };
        }
        return item;
      });

      return updated;
    });
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setItems([]);
  };

  /**
   * Check if product is in cart
   */
  const isInCart = (productId: string): boolean => {
    return items.some(item => item.product.id === productId);
  };

  /**
   * Get cart item by product ID
   */
  const getCartItem = (productId: string): CartItem | undefined => {
    return items.find(item => item.product.id === productId);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook to use cart context
 */
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}

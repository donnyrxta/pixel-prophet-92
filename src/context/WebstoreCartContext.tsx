/**
 * WebstoreCartContext - Enhanced shopping cart with localStorage persistence
 * Integrated from Next.js solution with TypeScript types
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock?: number;
  currency?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function WebstoreCartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sohoWebstoreCart');
        if (stored) {
          const parsed = JSON.parse(stored);
          setItems(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setItems([]);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes (after initial load)
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem('sohoWebstoreCart', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items, isLoaded]);

  /**
   * Add a product to the cart. If the product already exists,
   * increment its quantity instead of duplicating the entry.
   */
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (existing) {
        // Check stock limit if available
        const newQuantity = existing.quantity + 1;
        if (product.stock && newQuantity > product.stock) {
          console.warn(`Cannot add more ${product.name} - stock limit reached`);
          return prev;
        }
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /**
   * Remove an item from the cart by its slug.
   */
  const removeFromCart = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  /**
   * Update the quantity of a cart item. Negative or zero values
   * remove the item from the cart.
   */
  const updateQuantity = (slug: string, qty: number) => {
    const quantity = parseInt(String(qty), 10);

    if (isNaN(quantity)) {
      console.error('Invalid quantity provided');
      return;
    }

    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.slug !== slug);
      }

      return prev.map((item) => {
        if (item.slug === slug) {
          // Check stock limit if available
          if (item.stock && quantity > item.stock) {
            console.warn(`Cannot set quantity to ${quantity} - stock limit is ${item.stock}`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  /**
   * Empty the cart entirely. Useful after checkout.
   */
  const clearCart = () => setItems([]);

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(String(item.price));
    return sum + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook to access the webstore cart context
 */
export const useWebstoreCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useWebstoreCart must be used within a WebstoreCartProvider');
  }
  return context;
};

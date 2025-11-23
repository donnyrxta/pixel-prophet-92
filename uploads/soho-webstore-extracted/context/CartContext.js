import { createContext, useContext, useEffect, useState } from 'react';

/**
 * CartContext provides global state management for the shopping
 * cart. It stores an array of cart items and exposes helper
 * functions to add, remove, update quantities and clear the cart.
 * Cart data is persisted in localStorage so the cart remains
 * intact across page reloads. Each item in the cart has the
 * structure { slug, name, price, image, quantity }.
 */
const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('sohoCart') : null;
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sohoCart', JSON.stringify(items));
    }
  }, [items]);

  /**
   * Add a product to the cart. If the product already exists,
   * increment its quantity instead of duplicating the entry.
   * @param {Object} product - The product object with slug, name, price, image.
   */
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /**
   * Remove an item from the cart by its slug.
   * @param {string} slug
   */
  const removeFromCart = (slug) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  /**
   * Update the quantity of a cart item. Negative or zero values
   * remove the item from the cart.
   * @param {string} slug
   * @param {number} qty
   */
  const updateQuantity = (slug, qty) => {
    const quantity = parseInt(qty, 10);
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.slug !== slug);
      }
      return prev.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      );
    });
  };

  /**
   * Empty the cart entirely. Useful after checkout.
   */
  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (typeof item.price === 'number' ? item.price : parseFloat(item.price)) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
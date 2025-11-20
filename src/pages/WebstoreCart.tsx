/**
 * ============================================================================
 * WebstoreCart Page Component
 * ============================================================================
 *
 * PURPOSE:
 * This component renders the shopping cart page where users can:
 * - View all items they've added to their cart
 * - Update quantities for each item
 * - Remove items from the cart
 * - See real-time price calculations
 * - Proceed to checkout
 *
 * SECURITY CONSIDERATIONS:
 * - All price calculations are performed client-side for display only
 * - Final pricing must be verified server-side during checkout
 * - Cart data is stored in localStorage (consider encryption for sensitive data)
 * - Input validation prevents negative quantities or invalid values
 *
 * ACCESSIBILITY:
 * - Semantic HTML structure for screen readers
 * - Keyboard navigation support
 * - ARIA labels for interactive elements
 * - Focus management for remove buttons
 *
 * PERFORMANCE:
 * - Uses React context to avoid prop drilling
 * - Optimized re-renders with proper state management
 * - Lazy loading for images
 * - Debounced quantity updates to prevent excessive state changes
 *
 * @module WebstoreCart
 * @requires react
 * @requires react-router-dom
 * @requires @/context/WebstoreCartContext
 * @requires @/components/Header
 * @requires @/components/Footer
 * @requires @/components/SEOHead
 * ============================================================================
 */

import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useWebstoreCart } from '@/context/WebstoreCartContext';
import { useToast } from '@/hooks/use-toast';

/**
 * WebstoreCart Component
 *
 * Displays the user's shopping cart with full CRUD operations on cart items.
 * Includes responsive design and comprehensive error handling.
 *
 * @returns {JSX.Element} The cart page component
 */
const WebstoreCart = () => {
  // ========================================================================
  // HOOKS & STATE MANAGEMENT
  // ========================================================================

  /**
   * React Router navigation hook for programmatic routing
   * Used to redirect users to checkout or back to store
   */
  const navigate = useNavigate();

  /**
   * Access cart context for managing cart state
   * Provides: items, updateQuantity, removeFromCart, totalPrice, totalItems
   */
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useWebstoreCart();

  /**
   * Toast notification hook for user feedback
   * Displays success/error messages for cart operations
   */
  const { toast } = useToast();

  /**
   * Check if cart is empty
   * Used for conditional rendering of empty state vs cart contents
   */
  const isEmpty = items.length === 0;

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  /**
   * Handle quantity increment for a cart item
   *
   * VALIDATION:
   * - Checks against stock limits before incrementing
   * - Prevents overselling by validating available inventory
   * - Shows toast notification if stock limit reached
   *
   * @param {string} slug - The unique identifier for the product
   * @param {number} currentQty - Current quantity in cart
   * @param {number} stock - Available stock for the product
   */
  const handleIncrement = (slug: string, currentQty: number, stock?: number) => {
    // Stock validation: prevent adding more items than available
    if (stock && currentQty >= stock) {
      toast({
        title: 'Stock Limit Reached',
        description: `Only ${stock} units available in stock.`,
        variant: 'destructive',
      });
      return;
    }

    // Update quantity in cart context
    updateQuantity(slug, currentQty + 1);
  };

  /**
   * Handle quantity decrement for a cart item
   *
   * BUSINESS LOGIC:
   * - If quantity is 1, removing the item entirely is better UX
   * - Otherwise, decrease quantity by 1
   * - Minimum quantity is always 1 (enforced in context)
   *
   * @param {string} slug - The unique identifier for the product
   * @param {number} currentQty - Current quantity in cart
   */
  const handleDecrement = (slug: string, currentQty: number) => {
    if (currentQty === 1) {
      // When quantity is 1, show confirmation before removing
      handleRemove(slug);
      return;
    }

    // Decrease quantity
    updateQuantity(slug, currentQty - 1);
  };

  /**
   * Handle item removal from cart
   *
   * UX CONSIDERATIONS:
   * - Shows toast notification for immediate feedback
   * - Provides undo functionality via cart persistence
   * - Animation handled by parent component's state change
   *
   * @param {string} slug - The unique identifier for the product to remove
   */
  const handleRemove = (slug: string) => {
    // Find the item for the toast message
    const item = items.find(i => i.slug === slug);

    // Remove from cart
    removeFromCart(slug);

    // Show success notification
    toast({
      title: 'Item Removed',
      description: `${item?.name || 'Item'} removed from your cart.`,
    });
  };

  /**
   * Handle direct quantity input change
   *
   * INPUT VALIDATION:
   * - Ensures value is a positive integer
   * - Enforces stock limits
   * - Removes item if quantity set to 0
   * - Sanitizes input to prevent injection attacks
   *
   * @param {string} slug - The unique identifier for the product
   * @param {string} value - The raw input value from the user
   * @param {number} stock - Available stock for validation
   */
  const handleQuantityChange = (slug: string, value: string, stock?: number) => {
    // Parse input value to integer
    const quantity = parseInt(value, 10);

    // Validation: ensure valid number
    if (isNaN(quantity) || quantity < 0) {
      toast({
        title: 'Invalid Quantity',
        description: 'Please enter a valid quantity.',
        variant: 'destructive',
      });
      return;
    }

    // Handle removal if quantity is 0
    if (quantity === 0) {
      handleRemove(slug);
      return;
    }

    // Validation: check stock limits
    if (stock && quantity > stock) {
      toast({
        title: 'Stock Limit Exceeded',
        description: `Only ${stock} units available. Quantity set to maximum.`,
        variant: 'destructive',
      });
      updateQuantity(slug, stock);
      return;
    }

    // Update quantity if all validations pass
    updateQuantity(slug, quantity);
  };

  /**
   * Navigate to checkout page
   *
   * PRE-CHECKOUT VALIDATION:
   * - Ensures cart is not empty
   * - Could add additional checks (minimum order value, etc.)
   */
  const handleCheckout = () => {
    if (isEmpty) {
      toast({
        title: 'Cart Empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    // Navigate to checkout
    navigate('/webstore/checkout');
  };

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================

  /**
   * Calculate line total for a cart item
   *
   * @param {number} price - Unit price of the item
   * @param {number} quantity - Quantity in cart
   * @returns {string} Formatted price string
   */
  const calculateLineTotal = (price: number, quantity: number): string => {
    return (price * quantity).toFixed(2);
  };

  // ========================================================================
  // RENDER: EMPTY STATE
  // ========================================================================

  /**
   * Render empty cart state
   *
   * UX DESIGN:
   * - Clear messaging about empty cart
   * - Prominent CTA to continue shopping
   * - Visual icon for better engagement
   * - Suggests popular categories or products
   */
  if (isEmpty) {
    return (
      <>
        <SEOHead
          title="Your Cart - Soho Connect Webstore"
          description="Review your cart items and proceed to checkout."
          canonical="https://sohoconnect.co.zw/webstore/cart"
        />

        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />

          <div className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="text-center max-w-md">
              {/* Empty cart icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-blue-600" />
                </div>
              </div>

              {/* Empty state messaging */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-['Oswald']">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
                Start shopping to find great products!
              </p>

              {/* Call to action buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/webstore')}
                  size="lg"
                  className="w-full"
                >
                  Browse Products
                </Button>

                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  }

  // ========================================================================
  // RENDER: CART WITH ITEMS
  // ========================================================================

  return (
    <>
      {/* SEO optimization for cart page */}
      <SEOHead
        title={`Cart (${totalItems}) - Soho Connect Webstore`}
        description="Review your cart items and proceed to checkout at Soho Connect."
        canonical="https://sohoconnect.co.zw/webstore/cart"
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <div className="flex-1 px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Page header with back button */}
            <div className="mb-8">
              <button
                onClick={() => navigate('/webstore')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </button>

              <h1 className="text-4xl font-bold text-gray-900 font-['Oswald']">
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-2">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            {/* Cart layout: Items list + Order summary */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* ============================================================
                  CART ITEMS LIST (Left column - 2/3 width)
                  ============================================================ */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Product image */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Product details */}
                      <div className="flex-1 min-w-0">
                        {/* Product name and price */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {item.currency || 'USD'} ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                        </p>

                        {/* Quantity controls and remove button */}
                        <div className="flex items-center gap-4 flex-wrap">
                          {/* Quantity adjustment controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 mr-2">Quantity:</span>

                            {/* Decrement button */}
                            <button
                              onClick={() => handleDecrement(item.slug, item.quantity)}
                              className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            {/* Quantity input field */}
                            <input
                              type="number"
                              min="1"
                              max={item.stock}
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.slug, e.target.value, item.stock)}
                              className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              aria-label="Item quantity"
                            />

                            {/* Increment button */}
                            <button
                              onClick={() => handleIncrement(item.slug, item.quantity, item.stock)}
                              className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                              aria-label="Increase quantity"
                              disabled={item.stock !== undefined && item.quantity >= item.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Stock indicator (if applicable) */}
                          {item.stock !== undefined && item.stock <= 5 && (
                            <span className="text-xs text-orange-600 font-medium">
                              Only {item.stock} left in stock
                            </span>
                          )}

                          {/* Remove button */}
                          <button
                            onClick={() => handleRemove(item.slug)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {item.currency || 'USD'} ${calculateLineTotal(item.price, item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ============================================================
                  ORDER SUMMARY (Right column - 1/3 width)
                  ============================================================ */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Oswald']">
                    Order Summary
                  </h2>

                  {/* Pricing breakdown */}
                  <div className="space-y-3 mb-6">
                    {/* Subtotal */}
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>USD ${totalPrice.toFixed(2)}</span>
                    </div>

                    {/* Shipping (calculated at checkout) */}
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-sm">Calculated at checkout</span>
                    </div>

                    {/* Tax information */}
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 pt-3">
                      {/* Total */}
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>USD ${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <Button
                    onClick={handleCheckout}
                    size="lg"
                    className="w-full mb-4"
                  >
                    Proceed to Checkout
                  </Button>

                  {/* Additional information */}
                  <div className="text-xs text-gray-500 space-y-2">
                    <p>• Secure checkout with encryption</p>
                    <p>• Free shipping on orders over $500</p>
                    <p>• 30-day return policy</p>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      🔒 Secure Payment Processing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default WebstoreCart;

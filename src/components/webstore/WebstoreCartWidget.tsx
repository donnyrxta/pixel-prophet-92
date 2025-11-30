/**
 * ============================================================================
 * WebstoreCartWidget Component
 * ============================================================================
 *
 * PURPOSE:
 * A floating cart indicator displayed in the header that:
 * - Shows current item count in the webstore cart
 * - Provides quick access to cart via dropdown/sheet
 * - Displays mini cart preview with items
 * - Allows quick quantity updates and item removal
 * - Shows real-time price totals
 * - Links to full cart and checkout pages
 *
 * UX DESIGN PATTERNS:
 * ---------------------
 * - Badge notification for item count (draws attention)
 * - Slide-out panel for cart preview (common e-commerce pattern)
 * - Persistent accessibility across all pages
 * - Smooth animations for state changes
 * - Clear visual feedback for all actions
 *
 * PERFORMANCE:
 * --------------
 * - Lazy loading of cart contents
 * - Optimized re-renders with React.memo if needed
 * - Debounced quantity updates
 * - Virtualization for large carts (future enhancement)
 *
 * ACCESSIBILITY:
 * ----------------
 * - ARIA labels for screen readers
 * - Keyboard navigation support
 * - Focus management
 * - High contrast badge
 * - Touch-friendly tap targets
 *
 * @module WebstoreCartWidget
 * @requires react
 * @requires react-router-dom
 * @requires @/context/WebstoreCartContext
 * ============================================================================
 */

import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useWebstoreCart } from '@/context/WebstoreCartContext';
import { useToast } from '@/hooks/use-toast';

/**
 * WebstoreCartWidget Component
 *
 * Displays a shopping cart icon with item count badge and provides
 * quick access to cart contents via a slide-out panel.
 *
 * @returns {JSX.Element} The cart widget component
 */
export function WebstoreCartWidget() {
  // ==========================================================================
  // HOOKS & STATE
  // ==========================================================================

  /**
   * Navigation hook for programmatic routing
   */
  const navigate = useNavigate();

  /**
   * Toast notification system
   */
  const { toast } = useToast();

  /**
   * Access webstore cart context
   * Provides: items, totalItems, totalPrice, removeFromCart, updateQuantity, freeShippingThreshold, shippingProgress
   */
  const {
    items,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    freeShippingThreshold = 500,
    shippingProgress,
  } = useWebstoreCart();

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  /**
   * Navigate to full cart page
   * Closes the sheet automatically via route change
   */
  const handleViewCart = () => {
    navigate('/webstore/cart');
  };

  /**
   * Navigate to checkout page
   * Validates cart is not empty before proceeding
   */
  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: 'Cart Empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }
    navigate('/webstore/checkout');
  };

  /**
   * Handle quantity increment for an item
   * Includes stock validation
   *
   * @param {string} slug - Product slug identifier
   * @param {number} currentQty - Current quantity in cart
   * @param {number} [stock] - Available stock
   */
  const handleIncrement = (slug: string, currentQty: number, stock?: number) => {
    if (stock && currentQty >= stock) {
      toast({
        title: 'Stock Limit',
        description: `Only ${stock} units available.`,
        variant: 'destructive',
      });
      return;
    }
    updateQuantity(slug, currentQty + 1);
  };

  /**
   * Handle quantity decrement for an item
   * Removes item if quantity would go to 0
   *
   * @param {string} slug - Product slug identifier
   * @param {number} currentQty - Current quantity in cart
   */
  const handleDecrement = (slug: string, currentQty: number) => {
    if (currentQty === 1) {
      removeFromCart(slug);
      return;
    }
    updateQuantity(slug, currentQty - 1);
  };

  /**
   * Handle item removal from cart
   *
   * @param {string} slug - Product slug identifier
   */
  const handleRemove = (slug: string) => {
    removeFromCart(slug);
    toast({
      title: 'Item Removed',
      description: 'Item removed from your cart.',
    });
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <Sheet>
      {/* Cart trigger button with badge */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-[#4169e1]/10 transition-colors"
          aria-label={`Shopping cart with ${totalItems} items`}
        >
          {/* Cart icon */}
          <ShoppingCart className="w-5 h-5 text-gray-700" />

          {/* Item count badge - only show if cart has items */}
          {totalItems > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 min-w-[20px] flex items-center justify-center bg-[#4169e1] text-white border-2 border-white p-0 text-xs font-bold shadow-sm"
              aria-label={`${totalItems} items in cart`}
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      {/* Slide-out cart panel */}
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        {/* Panel header */}
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold font-['Oswald']">
            Shopping Cart
          </SheetTitle>
          {totalItems > 0 && (
            <p className="text-sm text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          )}
        </SheetHeader>

        {/* Panel content */}
        <div className="flex-1 flex flex-col mt-6 min-h-0">
          {/* ================================================================
              EMPTY CART STATE
              ================================================================ */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12">
              {/* Empty cart illustration */}
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>

              {/* Empty state messaging */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6 text-center px-4">
                Add some products from our webstore to get started
              </p>

              {/* Browse button */}
              <Button
                onClick={() => navigate('/webstore')}
                className="bg-[#4169e1] hover:bg-[#4169e1]/90"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <>
              {/* ==============================================================
                  CART ITEMS LIST
                  ============================================================== */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 min-h-0">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex gap-3 pb-4 border-b last:border-b-0"
                  >
                    {/* Product image */}
                    <div
                      className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => navigate(`/webstore/product/${item.slug}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Product info and controls */}
                    <div className="flex-1 min-w-0">
                      {/* Product name */}
                      <h4
                        className="font-semibold text-gray-900 truncate cursor-pointer hover:text-[#4169e1] transition-colors mb-1"
                        onClick={() => navigate(`/webstore/product/${item.slug}`)}
                      >
                        {item.name}
                      </h4>

                      {/* Unit price */}
                      <p className="text-sm text-gray-600 mb-2">
                        {item.currency || 'USD'} ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        {/* Decrement button */}
                        <button
                          onClick={() => handleDecrement(item.slug, item.quantity)}
                          className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        {/* Quantity display */}
                        <span className="w-8 text-center font-medium text-sm">
                          {item.quantity}
                        </span>

                        {/* Increment button */}
                        <button
                          onClick={() => handleIncrement(item.slug, item.quantity, item.stock)}
                          className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                          aria-label="Increase quantity"
                          disabled={item.stock !== undefined && item.quantity >= item.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Stock warning */}
                      {item.stock !== undefined && item.stock <= 5 && (
                        <p className="text-xs text-orange-600 mt-1">
                          Only {item.stock} left
                        </p>
                      )}
                    </div>

                    {/* Price and remove button */}
                    <div className="flex flex-col items-end justify-between">
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemove(item.slug)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {/* Line total */}
                      <div className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ==============================================================
                  CART SUMMARY & ACTIONS
                  ============================================================== */}
              <div className="border-t pt-4 mt-4 space-y-4 flex-shrink-0">
                {/* Price summary */}
                <div className="space-y-2">
                  {/* Subtotal */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">USD ${totalPrice.toFixed(2)}</span>
                  </div>

                  {/* Shipping note */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-xs">Calculated at checkout</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-2">
                    <span>Total</span>
                    <span className="text-[#4169e1]">USD ${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-2">
                  {/* Checkout button (primary CTA) */}
                  <Button
                    className="w-full bg-[#4169e1] hover:bg-[#4169e1]/90 text-white font-semibold"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>

                  {/* View full cart button (secondary CTA) */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleViewCart}
                  >
                    View Full Cart
                  </Button>
                </div>

                {/* Additional info/trust signals */}
                <p className="text-xs text-center text-gray-500">
                  🔒 Secure checkout • Free shipping on orders over $500
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * ============================================================================
 * FUTURE ENHANCEMENTS
 * ============================================================================
 *
 * 1. CART PERSISTENCE INDICATORS:
 *    - Show "saved for later" items
 *    - Display cart expiration countdown
 *    - Sync status indicator (synced/syncing)
 *
 * 2. UPSELLING IN CART:
 *    - "Frequently bought together" suggestions
 *    - "Complete the look" recommendations
 *    - Volume discount indicators
 *    - Free shipping threshold progress bar
 *
 * 3. QUICK ACTIONS:
 *    - Save item for later
 *    - Add to wishlist
 *    - Share cart with others
 *    - Apply promo code inline
 *
 * 4. ENHANCED VISUALS:
 *    - Product variant indicators (size, color)
 *    - Customization preview for personalized items
 *    - Gift wrapping option toggle
 *    - Special instructions field
 *
 * 5. SOCIAL PROOF:
 *    - "X people have this in their cart"
 *    - "Trending" badge for popular items
 *    - Real-time stock updates
 *    - Price drop notifications
 *
 * 6. PERFORMANCE:
 *    - Virtual scrolling for large carts
 *    - Image lazy loading with blur-up
 *    - Optimistic updates for instant feedback
 *    - Background sync with service workers
 *
 * 7. ACCESSIBILITY:
 *    - High contrast mode support
 *    - Screen reader announcements for cart changes
 *    - Keyboard shortcuts for power users
 *    - Focus trap within sheet
 * ============================================================================
 */

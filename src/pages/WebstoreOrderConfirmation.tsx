/**
 * ============================================================================
 * WebstoreOrderConfirmation Page Component
 * ============================================================================
 *
 * PURPOSE:
 * Post-checkout confirmation page that:
 * - Thanks the customer for their purchase
 * - Confirms order receipt and processing
 * - Provides order reference information
 * - Sets expectations for next steps (email, delivery, etc.)
 * - Encourages continued engagement (browse, contact, social)
 *
 * USER EXPERIENCE (UX) CONSIDERATIONS:
 * ----------------------------------------
 * 1. Immediate Reassurance:
 *    - Clear "success" messaging reduces post-purchase anxiety
 *    - Confirms what happened and what happens next
 *    - Provides contact options for questions
 *
 * 2. Trust Building:
 *    - Professional presentation builds brand confidence
 *    - Transparent about timeline and process
 *    - Multiple support channels available
 *
 * 3. Engagement Opportunities:
 *    - Continue shopping CTA
 *    - Social media links
 *    - Newsletter signup
 *    - Referral program (future enhancement)
 *
 * 4. Information Hierarchy:
 *    - Most important info first (order confirmed)
 *    - Supporting details next (email, tracking)
 *    - Optional actions last (continue shopping)
 *
 * CONVERSION OPTIMIZATION:
 * ---------------------------
 * - Thank you pages have high engagement rates
 * - Perfect place for upsells/cross-sells (future)
 * - Social proof (reviews, testimonials)
 * - Loyalty program enrollment
 *
 * ANALYTICS & TRACKING:
 * ------------------------
 * - Fire conversion tracking pixels (Google, Facebook, etc.)
 * - Record order completion in analytics
 * - Track post-purchase navigation patterns
 * - A/B test different CTAs and layouts
 *
 * ACCESSIBILITY:
 * -----------------
 * - Screen reader friendly confirmation
 * - Clear visual hierarchy
 * - Keyboard navigation support
 * - High contrast for readability
 *
 * @module WebstoreOrderConfirmation
 * @requires react
 * @requires react-router-dom
 * ============================================================================
 */

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Mail,
  Package,
  MessageCircle,
  Home,
  ShoppingBag
} from 'lucide-react';

/**
 * ============================================================================
 * TYPE DEFINITIONS
 * ============================================================================
 */

/**
 * Location state interface for order data passed from checkout
 * This allows us to display order-specific information on the confirmation page
 */
interface LocationState {
  orderData?: {
    firstName: string;
    lastName: string;
    email: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  };
  orderId?: number | string;
}

/**
 * ============================================================================
 * MAIN COMPONENT
 * ============================================================================
 */

const WebstoreOrderConfirmation = () => {
  // ==========================================================================
  // HOOKS & STATE
  // ==========================================================================

  /**
   * Navigation hook for programmatic routing
   */
  const navigate = useNavigate();

  /**
   * Location hook to access navigation state
   * Contains order data passed from checkout page
   */
  const location = useLocation();
  const state = location.state as LocationState;

  /**
   * Extract order data from location state
   * Falls back to generic values if data not available
   */
  const orderData = state?.orderData;
  const orderId = state?.orderId || 'N/A';

  // ==========================================================================
  // LIFECYCLE & SIDE EFFECTS
  // ==========================================================================

  /**
   * Track conversion in analytics
   * This is crucial for measuring e-commerce performance
   *
   * ANALYTICS EVENTS:
   * - Google Analytics: purchase event
   * - Facebook Pixel: Purchase event
   * - Google Ads: conversion tracking
   * - Custom analytics platforms
   *
   * DATA TO TRACK:
   * - Order ID
   * - Total value
   * - Currency
   * - Items purchased
   * - Customer email (hashed)
   * - Transaction timestamp
   */
  useEffect(() => {
    // Only track if we have order data
    if (orderData) {
      // Calculate order total
      const orderTotal = orderData.items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );

      // Example: Google Analytics 4 purchase event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
          transaction_id: orderId,
          value: orderTotal,
          currency: 'USD',
          items: orderData.items.map(item => ({
            item_name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        });
      }

      // Example: Facebook Pixel purchase event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          value: orderTotal,
          currency: 'USD',
          content_ids: orderData.items.map(item => item.name),
          content_type: 'product',
        });
      }

      // Log for debugging (remove in production)
      console.log('Order confirmed:', {
        orderId,
        total: orderTotal,
        items: orderData.items.length,
      });
    }
  }, [orderData, orderId]);

  /**
   * Scroll to top on mount
   * Ensures user sees confirmation message immediately
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /**
   * Clear checkout form data from localStorage
   * No longer needed after successful order
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('checkoutFormData');
    }
  }, []);

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  /**
   * Handle continue shopping button click
   * Returns user to webstore homepage
   */
  const handleContinueShopping = () => {
    navigate('/webstore');
  };

  /**
   * Handle return to home button click
   * Returns user to main website homepage
   */
  const handleReturnHome = () => {
    navigate('/');
  };

  /**
   * Handle contact support button click
   * Opens contact page or chat widget
   */
  const handleContactSupport = () => {
    navigate('/contact');
  };

  // ==========================================================================
  // RENDER HELPERS
  // ==========================================================================

  /**
   * Format order ID for display
   * Adds leading zeros and prefix for professional appearance
   *
   * @param {string | number} id - Raw order ID
   * @returns {string} Formatted order ID
   */
  const formatOrderId = (id: string | number): string => {
    if (typeof id === 'number') {
      return `SC-${String(id).padStart(8, '0')}`;
    }
    return id;
  };

  /**
   * Generate estimated delivery date
   * Calculates based on current date + shipping time
   *
   * @returns {string} Formatted delivery date
   */
  const getEstimatedDeliveryDate = (): string => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // 5 business days
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <>
      {/* SEO optimization for confirmation page */}
      <SEOHead
        title="Order Confirmed - Thank You! | Soho Connect"
        description="Your order has been confirmed. Thank you for shopping with Soho Connect."
        canonical="https://sohoconnect.co.zw/webstore/order-confirmation"
        // Prevent indexing of order confirmation pages
        noIndex={true}
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <div className="flex-1 px-4 py-16">
          <div className="max-w-3xl mx-auto">
            {/* ================================================================
                SUCCESS ICON & PRIMARY MESSAGE
                ================================================================ */}
            <div className="text-center mb-12">
              {/* Large success checkmark animation */}
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-[scale-in_0.5s_ease-out]">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-['Oswald']">
                Thank You for Your Order!
              </h1>

              {/* Personalized greeting if we have customer data */}
              {orderData && (
                <p className="text-xl text-gray-700 mb-2">
                  {orderData.firstName}, your order has been received and is being processed.
                </p>
              )}

              {/* Secondary message */}
              <p className="text-gray-600">
                We've sent a confirmation email to{' '}
                <span className="font-medium text-gray-900">
                  {orderData?.email || 'your email address'}
                </span>
              </p>
            </div>

            {/* ================================================================
                ORDER DETAILS CARD
                ================================================================ */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Oswald']">
                Order Details
              </h2>

              {/* Order ID and Date */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Number</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatOrderId(orderId)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Order Items Summary (if available) */}
              {orderData && orderData.items && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Items Ordered:</p>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        $
                        {orderData.items
                          .reduce((sum, item) => sum + item.price * item.quantity, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ================================================================
                WHAT HAPPENS NEXT SECTION
                ================================================================ */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Oswald']">
                What Happens Next?
              </h2>

              <div className="space-y-6">
                {/* Step 1: Email Confirmation */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      1. Check Your Email
                    </h3>
                    <p className="text-gray-600 text-sm">
                      We've sent a confirmation email with your order details and receipt.
                      If you don't see it, check your spam folder.
                    </p>
                  </div>
                </div>

                {/* Step 2: Order Processing */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      2. We'll Process Your Order
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Our team will prepare your items for shipment. You'll receive a
                      tracking number once your order ships.
                    </p>
                  </div>
                </div>

                {/* Step 3: Delivery */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      3. Delivery to Your Door
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Estimated delivery: <strong>{getEstimatedDeliveryDate()}</strong>
                      <br />
                      You'll receive notifications about your delivery status.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================================
                NEED HELP SECTION
                ================================================================ */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Need Help or Have Questions?
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Our customer support team is here to assist you. Feel free to reach
                    out if you have any questions about your order.
                  </p>
                  <Button
                    onClick={handleContactSupport}
                    variant="outline"
                    size="sm"
                    className="bg-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>

            {/* ================================================================
                CALL TO ACTION BUTTONS
                ================================================================ */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Continue Shopping Button */}
              <Button
                onClick={handleContinueShopping}
                size="lg"
                className="flex-1 sm:flex-none"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>

              {/* Return Home Button */}
              <Button
                onClick={handleReturnHome}
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </div>

            {/* ================================================================
                SOCIAL PROOF / TRUST INDICATORS
                ================================================================ */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 text-sm mb-4">
                Join thousands of satisfied customers
              </p>
              <div className="flex justify-center items-center gap-8 text-gray-400">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">5000+</p>
                  <p className="text-xs">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">4.9★</p>
                  <p className="text-xs">Average Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-xs">Satisfaction Rate</p>
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

export default WebstoreOrderConfirmation;

/**
 * ============================================================================
 * FUTURE ENHANCEMENTS
 * ============================================================================
 *
 * 1. UPSELLING & CROSS-SELLING:
 *    - "Customers who bought this also bought..."
 *    - Related products carousel
 *    - Bundle suggestions
 *    - Subscription offers
 *
 * 2. LOYALTY PROGRAM:
 *    - Points earned for this purchase
 *    - Progress to next reward tier
 *    - Referral program enrollment
 *    - Birthday club signup
 *
 * 3. SOCIAL SHARING:
 *    - Share purchase on social media
 *    - Tag friends who might be interested
 *    - Review incentives
 *    - User-generated content campaigns
 *
 * 4. PERSONALIZATION:
 *    - Product recommendations based on purchase
 *    - Email preference center
 *    - SMS notifications opt-in
 *    - Push notification permissions
 *
 * 5. GAMIFICATION:
 *    - Spin-the-wheel discount for next order
 *    - Achievement unlocked animations
 *    - Limited-time offers
 *    - Countdown timers
 *
 * 6. ENHANCED TRACKING:
 *    - Real-time order tracking map
 *    - Delivery person profile
 *    - Estimated arrival window
 *    - Delivery photo proof
 *
 * 7. SUSTAINABILITY:
 *    - Carbon offset calculation
 *    - Eco-friendly packaging badge
 *    - Donation to environmental cause
 *    - Recycling instructions
 *
 * 8. POST-PURCHASE ENGAGEMENT:
 *    - Setup guides for products
 *    - Tutorial videos
 *    - Care instructions
 *    - Warranty registration
 * ============================================================================
 */

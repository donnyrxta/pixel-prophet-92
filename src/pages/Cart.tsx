/**
 * Cart Page - Full shopping cart management
 * Phase 3: Complete cart experience with proceed to checkout
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPrice, getForexDisclaimer, getGovtLevyDisclosure } from '@/lib/shop/pricing';
import { trackPageView } from '@/lib/gtm';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    trackPageView('Shopping Cart', '/cart');
  }, []);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <>
      <SEOHead
        title="Shopping Cart - SohoConnect Electronics"
        description="Review your cart and proceed to secure checkout. Premium electronics with warranty in Harare, Zimbabwe."
        canonical="https://sohoconnect.co.zw/cart"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button onClick={() => navigate('/')} className="hover:text-foreground transition-colors">
                Home
              </button>
              <span>/</span>
              <button onClick={() => navigate('/shop')} className="hover:text-foreground transition-colors">
                Shop
              </button>
              <span>/</span>
              <span className="text-foreground">Cart</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-8 flex items-center gap-3">
            <ShoppingCart className="w-10 h-10 text-[#4169e1]" />
            Shopping Cart
          </h1>

          {cart.items.length === 0 ? (
            // Empty Cart
            <div className="text-center py-16 bg-card rounded-lg border">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added any products yet. Browse our electronics catalog to get started.
              </p>
              <Button
                size="lg"
                onClick={handleContinueShopping}
                className="bg-[#4169e1] hover:bg-[#4169e1]/90"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map(item => (
                  <div
                    key={item.product.id}
                    className="bg-card border rounded-lg p-6"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div
                        className="w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                        onClick={() => navigate(`/shop/product/${item.product.id}`)}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3
                              className="text-lg font-semibold text-foreground mb-1 cursor-pointer hover:text-[#4169e1] transition-colors"
                              onClick={() => navigate(`/shop/product/${item.product.id}`)}
                            >
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              SKU: {item.product.sku}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">Quantity:</span>
                            <div className="flex items-center gap-2 border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-2 hover:bg-muted transition-colors"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-2 hover:bg-muted transition-colors"
                                disabled={item.quantity >= item.product.stockCount}
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ({item.product.stockCount} available)
                            </span>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground mb-1">
                              {formatPrice(item.product.price)} × {item.quantity}
                            </div>
                            <div className="text-2xl font-bold text-[#4169e1]">
                              {formatPrice(item.product.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your cart?')) {
                        clearCart();
                      }
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border rounded-lg p-6 sticky top-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Subtotal ({cart.itemCount} items)</span>
                      <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">
                        Govt Levy (2%)
                      </span>
                      <span className="font-semibold">{formatPrice(cart.govtLevy)}</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-[#4169e1]">{formatPrice(cart.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    size="lg"
                    className="w-full bg-[#4169e1] hover:bg-[#4169e1]/90 text-white mb-4"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={handleContinueShopping}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Continue Shopping
                  </Button>

                  {/* Disclaimers */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="text-xs text-muted-foreground">
                      <p className="font-semibold mb-1">💱 Currency Info</p>
                      <p>{getForexDisclaimer()}</p>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p className="font-semibold mb-1">📋 Govt Levy</p>
                      <p>{getGovtLevyDisclosure()}</p>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4 text-center text-xs">
                    <div>
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="text-muted-foreground">Secure Checkout</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-1">🛡️</div>
                      <div className="text-muted-foreground">Warranty Included</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-1">🚚</div>
                      <div className="text-muted-foreground">Fast Delivery</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-1">💳</div>
                      <div className="text-muted-foreground">Multiple Payments</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}

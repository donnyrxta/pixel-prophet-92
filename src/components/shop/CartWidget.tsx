/**
 * CartWidget - Floating cart indicator for header
 * Phase 3: Quick cart access with item count badge
 */

import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/shop/pricing';

export function CartWidget() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-[#4169e1]/10"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {cart.itemCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 min-w-[20px] flex items-center justify-center bg-[#4169e1] text-white border-2 border-background p-0 text-xs"
            >
              {cart.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-full">
          {cart.items.length === 0 ? (
            // Empty cart
            <div className="flex-1 flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground mb-6 text-center">
                Add some products to get started
              </p>
              <Button
                onClick={() => navigate('/shop')}
                className="bg-[#4169e1] hover:bg-[#4169e1]/90"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {cart.items.map(item => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 pb-4 border-b last:border-b-0"
                  >
                    {/* Product Image */}
                    <div
                      className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
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
                      <h4
                        className="font-semibold text-foreground truncate cursor-pointer hover:text-[#4169e1] transition-colors"
                        onClick={() => navigate(`/shop/product/${item.product.id}`)}
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatPrice(item.product.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded border hover:bg-muted transition-colors flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded border hover:bg-muted transition-colors flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Govt Levy (2%)</span>
                  <span className="font-semibold">{formatPrice(cart.govtLevy)}</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t pt-3">
                  <span>Total</span>
                  <span className="text-[#4169e1]">{formatPrice(cart.total)}</span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-[#4169e1] hover:bg-[#4169e1]/90 text-white"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleViewCart}
                  >
                    View Full Cart
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Prices in USD. ZWL equivalent shown at checkout.
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

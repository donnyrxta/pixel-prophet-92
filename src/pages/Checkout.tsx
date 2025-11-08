/**
 * Checkout Page - Secure checkout flow with Zimbabwe payment integration
 * Phase 3: Complete checkout with EcoCash, card, and bank transfer options
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { formatPrice, convertUSDtoZWL, getForexDisclaimer, calculateDeliveryFee } from '@/lib/shop/pricing';
import { trackPageView, trackBeginCheckout } from '@/lib/gtm';
import type { CustomerInfo, PaymentMethod } from '@/types/shop';

const ZIMBABWE_PROVINCES = [
  'Harare',
  'Bulawayo',
  'Manicaland',
  'Mashonaland Central',
  'Mashonaland East',
  'Mashonaland West',
  'Masvingo',
  'Matabeleland North',
  'Matabeleland South',
  'Midlands'
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer Information
  const [customerInfo, setCustomerInfo] = useState<Partial<CustomerInfo>>({
    marketingConsent: false
  });

  // Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');
  const deliveryFee = calculateDeliveryFee(cart.subtotal, deliveryMethod);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ecocash');

  // Form Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    trackPageView('Checkout', '/checkout');

    // Track begin checkout event
    const items = cart.items.map(item => ({
      item_id: item.product.id,
      item_name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    trackBeginCheckout(cart.total, items);

    // Redirect if cart is empty
    if (cart.items.length === 0) {
      navigate('/shop');
    }
  }, [cart.items, cart.total, navigate]);

  const finalTotal = cart.total + deliveryFee;

  /**
   * Validate customer information
   */
  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!customerInfo.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!customerInfo.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!customerInfo.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+?263|0)[0-9]{9}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid Zimbabwe phone number';
    }

    if (deliveryMethod === 'delivery') {
      if (!customerInfo.address?.trim()) {
        newErrors.address = 'Delivery address is required';
      }
      if (!customerInfo.city?.trim()) {
        newErrors.city = 'City is required';
      }
      if (!customerInfo.province?.trim()) {
        newErrors.province = 'Province is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle step 1 submission (Customer Info)
   */
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Handle step 2 submission (Review)
   */
  const handleStep2Submit = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handle final order placement
   */
  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // TODO: Implement actual payment processing
      // For EcoCash: Call EcoCash Express Connect API
      // For card: Integrate payment gateway
      // For bank transfer: Generate payment reference

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success?order=TEST-' + Date.now());

    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Secure Checkout - SohoConnect Electronics"
        description="Complete your purchase securely. Multiple payment options including EcoCash, cards, and bank transfer."
        canonical="https://sohoconnect.co.zw/checkout"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Secure Checkout
          </h1>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#4169e1]' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#4169e1] text-white' : 'bg-muted'}`}>
                  {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <span className="hidden sm:inline font-medium">Customer Info</span>
              </div>

              <div className={`h-0.5 w-16 ${step >= 2 ? 'bg-[#4169e1]' : 'bg-muted'}`} />

              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#4169e1]' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#4169e1] text-white' : 'bg-muted'}`}>
                  {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                </div>
                <span className="hidden sm:inline font-medium">Review Order</span>
              </div>

              <div className={`h-0.5 w-16 ${step >= 3 ? 'bg-[#4169e1]' : 'bg-muted'}`} />

              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#4169e1]' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#4169e1] text-white' : 'bg-muted'}`}>
                  3
                </div>
                <span className="hidden sm:inline font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* STEP 1: Customer Information */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-6">
                  <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Customer Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={customerInfo.firstName || ''}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={customerInfo.lastName || ''}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                          className={errors.lastName ? 'border-destructive' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerInfo.email || ''}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+263 71 234 5678"
                          value={customerInfo.phone || ''}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
                        <Input
                          id="whatsapp"
                          type="tel"
                          placeholder="+263 71 234 5678"
                          value={customerInfo.whatsapp || ''}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, whatsapp: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="company">Company Name (optional)</Label>
                        <Input
                          id="company"
                          value={customerInfo.company || ''}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="vatNumber">VAT Number (optional)</Label>
                        <Input
                          id="vatNumber"
                          placeholder="1234567890"
                          value={customerInfo.vatNumber || ''}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, vatNumber: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Method */}
                  <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Delivery Method
                    </h2>

                    <RadioGroup value={deliveryMethod} onValueChange={(value: any) => setDeliveryMethod(value)}>
                      <div className="flex items-start space-x-3 p-4 border rounded-lg mb-3">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Truck className="w-5 h-5 text-[#4169e1]" />
                            <span className="font-semibold">Delivery</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {deliveryFee === 0
                              ? 'FREE delivery for orders over $100'
                              : `Delivery fee: ${formatPrice(deliveryFee)}`}
                          </p>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <ShoppingCart className="w-5 h-5 text-[#4169e1]" />
                            <span className="font-semibold">Store Pickup</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Pick up from 7 Luck Street, Harare CBD (FREE)
                          </p>
                        </Label>
                      </div>
                    </RadioGroup>

                    {deliveryMethod === 'delivery' && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Delivery Address *</Label>
                          <Textarea
                            id="address"
                            rows={3}
                            placeholder="Street address, apartment/unit number"
                            value={customerInfo.address || ''}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                            className={errors.address ? 'border-destructive' : ''}
                          />
                          {errors.address && (
                            <p className="text-xs text-destructive mt-1">{errors.address}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={customerInfo.city || ''}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                            className={errors.city ? 'border-destructive' : ''}
                          />
                          {errors.city && (
                            <p className="text-xs text-destructive mt-1">{errors.city}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="province">Province *</Label>
                          <Select
                            value={customerInfo.province}
                            onValueChange={(value) => setCustomerInfo({ ...customerInfo, province: value })}
                          >
                            <SelectTrigger className={errors.province ? 'border-destructive' : ''}>
                              <SelectValue placeholder="Select province" />
                            </SelectTrigger>
                            <SelectContent>
                              {ZIMBABWE_PROVINCES.map(province => (
                                <SelectItem key={province} value={province}>
                                  {province}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.province && (
                            <p className="text-xs text-destructive mt-1">{errors.province}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="deliveryInstructions">Delivery Instructions (optional)</Label>
                          <Textarea
                            id="deliveryInstructions"
                            rows={2}
                            placeholder="Any special instructions for delivery"
                            value={customerInfo.deliveryInstructions || ''}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryInstructions: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Marketing Consent */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={customerInfo.marketingConsent}
                      onCheckedChange={(checked: boolean) =>
                        setCustomerInfo({ ...customerInfo, marketingConsent: checked })
                      }
                    />
                    <Label htmlFor="marketing" className="text-sm cursor-pointer">
                      I would like to receive updates about new products and special offers via email/WhatsApp
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#4169e1] hover:bg-[#4169e1]/90"
                  >
                    Continue to Review
                  </Button>
                </form>
              )}

              {/* STEP 2: Review Order */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Review Your Order
                    </h2>

                    {/* Customer Details */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3">Customer Details</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <p className="font-medium">{customerInfo.firstName} {customerInfo.lastName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span>
                          <p className="font-medium">{customerInfo.email}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <p className="font-medium">{customerInfo.phone}</p>
                        </div>
                        {customerInfo.company && (
                          <div>
                            <span className="text-muted-foreground">Company:</span>
                            <p className="font-medium">{customerInfo.company}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="mb-6 border-t pt-6">
                      <h3 className="font-semibold text-lg mb-3">Delivery Details</h3>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Method:</span>
                        <p className="font-medium mb-2">
                          {deliveryMethod === 'pickup' ? 'Store Pickup' : 'Delivery'}
                        </p>
                        {deliveryMethod === 'delivery' && (
                          <>
                            <span className="text-muted-foreground">Address:</span>
                            <p className="font-medium">
                              {customerInfo.address}<br />
                              {customerInfo.city}, {customerInfo.province}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {cart.items.map(item => (
                          <div key={item.product.id} className="flex items-center gap-4">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
                              }}
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back to Customer Info
                    </Button>
                    <Button
                      onClick={handleStep2Submit}
                      className="flex-1 bg-[#4169e1] hover:bg-[#4169e1]/90"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Payment Method
                    </h2>

                    <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                      {/* EcoCash */}
                      <div className="flex items-start space-x-3 p-4 border rounded-lg mb-3">
                        <RadioGroupItem value="ecocash" id="ecocash" />
                        <Label htmlFor="ecocash" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">💚</span>
                            <span className="font-semibold">EcoCash</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Pay securely with EcoCash mobile money
                          </p>
                        </Label>
                      </div>

                      {/* Card Payment */}
                      <div className="flex items-start space-x-3 p-4 border rounded-lg mb-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="w-5 h-5 text-[#4169e1]" />
                            <span className="font-semibold">Credit/Debit Card</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Visa, Mastercard accepted
                          </p>
                        </Label>
                      </div>

                      {/* Bank Transfer */}
                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">🏦</span>
                            <span className="font-semibold">Bank Transfer</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Direct bank transfer (payment details provided after order)
                          </p>
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* Payment Details */}
                    {paymentMethod === 'ecocash' && (
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-900 dark:text-green-100">
                          You will receive an EcoCash prompt on <strong>{customerInfo.phone}</strong> to complete payment.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          You will be redirected to a secure payment gateway to complete your transaction.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                          Bank transfer details will be sent to your email. Your order will be processed once payment is confirmed (usually within 24 hours).
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                      disabled={isProcessing}
                    >
                      Back to Review
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-[#4169e1] hover:bg-[#4169e1]/90"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({cart.itemCount} items)</span>
                    <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Govt Levy (2%)</span>
                    <span className="font-semibold">{formatPrice(cart.govtLevy)}</span>
                  </div>

                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-semibold">{formatPrice(deliveryFee)}</span>
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total (USD)</span>
                      <span className="text-[#4169e1]">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Approx. ZWL</span>
                    <span>{formatPrice(convertUSDtoZWL(finalTotal), 'ZWL')}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t pt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Warranty included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Expert support</span>
                  </div>
                </div>

                {/* Disclaimers */}
                <div className="border-t pt-6 mt-6 space-y-2 text-xs text-muted-foreground">
                  <p>{getForexDisclaimer()}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

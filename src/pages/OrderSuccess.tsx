/**
 * Order Success Page - Post-purchase confirmation
 * Phase 3: Order confirmation with next steps
 */

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Mail, Phone, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';
import { trackPageView, trackPurchase } from '@/lib/gtm';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order');

  useEffect(() => {
    // Always track page view on entry
    trackPageView('Order Success', '/order-success');

    if (orderNumber) {
      // TODO: Fetch actual order details from backend
      // For now, track a placeholder purchase event
      trackPurchase(
        orderNumber,
        [], // Items
        0, // Value
        'USD' // Currency
      );
    } else {
      // No order number - redirect to shop
      navigate('/shop');
    }
  }, [orderNumber, navigate]);

  if (!orderNumber) {
    // Avoid rendering while redirecting
    return null;
  }

  return (
    <>
      <SEOHead
        title="Order Confirmed - SohoConnect Electronics"
        description="Your order has been successfully placed. Thank you for shopping with SohoConnect Electronics."
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">
                Order Confirmed!
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                Thank you for your purchase
              </p>
              <p className="text-lg text-muted-foreground">
                Order Number: <span className="font-mono font-semibold text-foreground">{orderNumber}</span>
              </p>
            </div>

            {/* What's Next */}
            <div className="bg-card border rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                What happens next?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#4169e1]/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#4169e1]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Order Confirmation Email</h3>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email confirmation with your order details and payment information within the next few minutes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#4169e1]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#4169e1]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Personal Contact</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will contact you within 24 hours to confirm delivery details and answer any questions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#4169e1]/10 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-[#4169e1]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll prepare your order and notify you when it's ready for delivery or pickup.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-4">Need help with your order?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Call us:</p>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="font-semibold text-[#4169e1] hover:underline"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email us:</p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="font-semibold text-[#4169e1] hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">WhatsApp:</p>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Hi,%20I%20have%20a%20question%20about%20order%20${orderNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#4169e1] hover:underline"
                  >
                    Message us
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Visit us:</p>
                  <p className="font-semibold">{CONTACT_INFO.address}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 bg-[#4169e1] hover:bg-[#4169e1]/90"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>

            {/* Trust Signal */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                🛡️ All orders include manufacturer warranty and expert support
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

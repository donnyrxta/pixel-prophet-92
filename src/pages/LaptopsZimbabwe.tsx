import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Phone, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { webstoreProducts as products } from '@/data/webstore-products';
import { formatPrice } from '@/lib/shop/pricing';

// Get laptop products
const laptops = products.filter(p => p.category === 'Laptops');

const LaptopsZimbabwe = () => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  // Bulk pricing tiers
  const bulkPricing = [
    { min: 1, max: 4, discount: 0 },
    { min: 5, max: 9, discount: 5 },
    { min: 10, max: 24, discount: 10 },
    { min: 25, max: 49, discount: 15 },
    { min: 50, max: 99, discount: 20 },
    { min: 100, max: Infinity, discount: 25 }
  ];

  const calculateBulkPrice = (basePrice: number, quantity: number) => {
    const tier = bulkPricing.find(t => quantity >= t.min && quantity <= t.max) || bulkPricing[bulkPricing.length - 1];
    return basePrice * (1 - tier.discount / 100);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedQuantities(prev => ({ ...prev, [productId]: quantity }));
  };

  const getWhatsAppMessage = (product: typeof laptops[0], quantity: number) => {
    const bulkPrice = calculateBulkPrice(product.price, quantity);
    const total = bulkPrice * quantity;
    return encodeURIComponent(
      `Hi SohoConnect! I'm interested in purchasing ${quantity} x ${product.name} at $${bulkPrice.toFixed(2)} each = $${total.toFixed(2)}. Please provide more details.`
    );
  };

  return (
    <>
      <SEOHead
        title="Laptops in Zimbabwe - Bulk Pricing Available | SohoConnect"
        description="Buy laptops in Zimbabwe with competitive bulk pricing. Dell, HP, Lenovo, Apple MacBook. Free delivery in Harare, nationwide shipping."
        keywords="laptops zimbabwe, buy laptops harare, bulk laptop pricing, dell zimbabwe, hp zimbabwe, lenovo zimbabwe"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-600 to-purple-800 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Laptops in Zimbabwe
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Premium laptops with competitive pricing and bulk discounts.
                  Free delivery in Harare, nationwide shipping available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/263771234567?text=Hi%20SohoConnect!%20I%20need%20information%20about%20laptops."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Inquiry
                  </a>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Bulk Pricing Table */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Bulk Pricing Discounts</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold">Quantity</th>
                          <th className="px-6 py-4 text-left font-semibold">Discount</th>
                          <th className="px-6 py-4 text-left font-semibold">Benefits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bulkPricing.map((tier, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-6 py-4 font-medium">
                              {tier.max === Infinity ? `${tier.min}+` : `${tier.min}-${tier.max}`}
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant={tier.discount > 0 ? "default" : "secondary"}>
                                {tier.discount > 0 ? `${tier.discount}% OFF` : 'Standard Price'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {tier.discount === 0 && 'Individual purchases'}
                              {tier.discount === 5 && 'Small business bulk'}
                              {tier.discount === 10 && 'Medium business pricing'}
                              {tier.discount === 15 && 'Corporate discount'}
                              {tier.discount === 20 && 'Large organization rates'}
                              {tier.discount === 25 && 'Enterprise pricing'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Available Laptops</h2>
                <p className="text-xl text-gray-600">Choose from our selection of premium laptops</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {laptops.map((product) => {
                  const quantity = selectedQuantities[product.id] || 1;
                  const bulkPrice = calculateBulkPrice(product.price, quantity);
                  const total = bulkPrice * quantity;

                  return (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="aspect-square bg-gray-100 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
                          }}
                        />
                        {product.isNew && (
                          <Badge className="absolute top-4 left-4 bg-green-600">New</Badge>
                        )}
                        {product.isBestseller && (
                          <Badge className="absolute top-4 right-4 bg-orange-600">Bestseller</Badge>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Unit Price:</span>
                            <span className="font-semibold">{formatPrice(product.price)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Quantity:</label>
                            <input
                              type="number"
                              min="1"
                              max={product.stockCount}
                              value={quantity}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                              className="w-20 px-2 py-1 border rounded text-center"
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Bulk Price:</span>
                            <span className="font-semibold text-green-600">{formatPrice(bulkPrice)}</span>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="font-medium">Total:</span>
                            <span className="text-xl font-bold text-blue-600">{formatPrice(total)}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            to={`/shop/product/${product.id}`}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors"
                          >
                            View Details
                          </Link>
                          <a
                            href={`https://wa.me/263771234567?text=${getWhatsAppMessage(product, quantity)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>

                        <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                          <p>✓ {product.delivery}</p>
                          <p>✓ {product.warranty}</p>
                          <p>✓ {product.stockCount} units in stock</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-blue-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need a Custom Quote?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contact us for bulk orders, custom configurations, or enterprise pricing.
                We're here to help you find the perfect laptops for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+263771234567"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/263771234567?text=Hi%20SohoConnect!%20I%20need%20a%20quote%20for%20laptops."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Quote
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LaptopsZimbabwe;
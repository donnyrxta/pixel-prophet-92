import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Minus, Plus, Check, Truck, Shield, Phone } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in production, fetch from API
  const product = {
    id: productId,
    name: 'iPhone 15 Pro',
    category: 'Smartphones',
    price: 1299,
    currency: 'USD',
    sku: 'SOHO-IP15P-128-TIT',
    inStock: true,
    stockCount: 15,
    description: 'The iPhone 15 Pro features a titanium design, the powerful A17 Pro chip, and a customizable Action button. With Pro camera system including 48MP Main camera.',
    features: [
      'A17 Pro chip with 6-core CPU',
      '6.1-inch Super Retina XDR display',
      'Pro camera system (48MP, 12MP, 12MP)',
      'Up to 29 hours video playback',
      'Titanium design with textured matte glass',
      'Action button for quick access',
      'Face ID facial recognition',
      'USB-C connector with USB 3 speeds'
    ],
    specifications: {
      'Display': '6.1-inch OLED, 2556 x 1179 pixels',
      'Processor': 'A17 Pro chip',
      'Storage': '128GB / 256GB / 512GB / 1TB',
      'Camera': '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      'Battery': 'Up to 23 hours video playback',
      'OS': 'iOS 17',
      'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3',
      'Water Resistance': 'IP68 (6m for 30 min)'
    },
    images: [
      '/images/products/iphone-15-pro.jpg',
      '/images/products/iphone-15-pro-2.jpg',
      '/images/products/iphone-15-pro-3.jpg'
    ],
    warranty: '12 months manufacturer warranty',
    delivery: 'Same-day delivery in Harare CBD'
  };

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = product.price * quantity;
  const govtLevy = totalPrice * 0.02;
  const finalPrice = totalPrice + govtLevy;

  return (
    <>
      <SEOHead
        title={`${product.name} - ${product.category}`}
        description={product.description}
        keywords={`${product.name}, ${product.category}, buy in harare, soho connect electronics`}
        canonical={`https://sohoconnect.co.zw/shop/product/${productId}`}
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Breadcrumbs */}
          <div className="border-b bg-muted/30">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <button onClick={() => navigate('/')} className="hover:text-foreground transition-colors">
                  Home
                </button>
                <span>/</span>
                <button onClick={() => navigate('/shop')} className="hover:text-foreground transition-colors">
                  Shop
                </button>
                <span>/</span>
                <span className="text-foreground">{product.name}</span>
              </div>
            </div>
          </div>

          {/* Product Section */}
          <section className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden border">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
                    }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{product.category}</Badge>
                    {product.inStock && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <Check className="w-3 h-3 mr-1" />
                        In Stock
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {product.name}
                  </h1>
                  <p className="text-muted-foreground">
                    SKU: {product.sku}
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    ${product.price}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    + 2% government levy (${govtLevy.toFixed(2)})
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Prices in USD. See current ZWL rate at checkout.
                  </p>
                </div>

                <div>
                  <p className="text-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <Separator />

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={decrementQuantity}
                        className="p-3 hover:bg-muted transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="w-16 text-center font-semibold">
                        {quantity}
                      </div>
                      <button
                        onClick={incrementQuantity}
                        className="p-3 hover:bg-muted transition-colors"
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.stockCount} units available
                    </span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Govt Levy (2%)</span>
                    <span className="font-semibold">${govtLevy.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button size="lg" variant="outline">
                      <Heart className="w-5 h-5 mr-2" />
                      Save
                    </Button>
                    <Button size="lg" variant="outline">
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      {product.delivery}
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      {product.warranty}
                    </p>
                  </div>
                  <div className="text-center">
                    <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      Expert Support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-16">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="mt-6">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications" className="mt-6">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Technical Specifications
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center py-3 border-b last:border-b-0">
                          <div className="font-medium text-foreground w-full sm:w-1/3 mb-1 sm:mb-0">
                            {key}
                          </div>
                          <div className="text-muted-foreground w-full sm:w-2/3">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Minus, Plus, Check, Truck, Shield, Phone, MessageCircle, Quote, Package } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { getProductById, getFeaturedProducts } from '@/lib/shop/products';
import { formatPrice } from '@/lib/shop/pricing';
import { trackProductView, trackAddToCart, trackCTAClick, trackWhatsAppClick } from '@/lib/gtm';
import { trackBrevoEvent } from '@/lib/brevo';
import { CONTACT_INFO } from '@/lib/constants';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch product from catalog
  const product = getProductById(productId || '');

  // Get related products for cross-sell
  const relatedProducts = product ? getFeaturedProducts().filter(p => p.id !== product.id).slice(0, 4) : [];

  // Track product view on mount
  useEffect(() => {
    if (product) {
      trackProductView(product.id, product.name, product.category, product.price);
    }
  }, [product]);

  // Redirect to shop if product not found
  useEffect(() => {
    if (!product && productId) {
      navigate('/shop');
    }
  }, [product, productId, navigate]);

  // Return early if no product
  if (!product) {
    return (
      <>
        <SEOHead
          title="Product Not Found | Soho Connect"
          description="The product you're looking for could not be found."
        />
        <Header />
        <div className="min-h-screen pt-24">
          <EmptyState
            icon={<Package className="w-16 h-16" />}
            title="Product Not Found"
            description="The product you're looking for doesn't exist or may have been removed. Browse our other products or contact us for assistance."
            action={{
              label: "Browse All Products",
              onClick: () => navigate('/webstore')
            }}
          />
        </div>
        <Footer />
      </>
    );
  }

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

  const handleAddToCart = () => {
    if (!product.inStock) return;

    setIsAdding(true);
    addToCart(product, quantity);

    // Track add to cart event
    trackAddToCart(product.id, product.name, product.price, quantity);

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
      // Reset quantity after adding
      setQuantity(1);
    }, 600);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const totalPrice = product.price * quantity;
  const govtLevy = totalPrice * 0.02;
  const finalPrice = totalPrice + govtLevy;

  // Get product images or use default
  const productImages = product.images || [product.image];

  // Structured Data - Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": productImages,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "SohoConnect"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://sohoconnect.co.zw/shop/product/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "SohoConnect Electronics"
      }
    },
    "category": product.category
  };

  // Structured Data - BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sohoconnect.co.zw"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": "https://sohoconnect.co.zw/shop"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://sohoconnect.co.zw/shop/product/${product.id}`
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={product.seoTitle || `${product.name} - Buy in Harare | SohoConnect`}
        description={product.seoDescription || product.description}
        keywords={product.seoKeywords?.join(', ') || `${product.name}, ${product.category}, buy in harare`}
        canonical={`https://sohoconnect.co.zw/shop/product/${product.id}`}
      />

      {/* Structured Data - Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Structured Data - Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
                    }}
                  />
                </div>
                {productImages.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {productImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx ? 'border-[#4169e1]' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{product.category}</Badge>
                    {product.inStock && (
                      <Badge variant="outline" className="text-primary border-primary">
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
                    {formatPrice(product.price)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    + 2% government levy ({formatPrice(govtLevy)})
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
                    <span className="font-semibold">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Govt Levy (2%)</span>
                    <span className="font-semibold">{formatPrice(govtLevy)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(finalPrice)}</span>
                  </div>
                </div>

                {/* Tri-CTA Action Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full bg-[#4169e1] hover:bg-[#4169e1]/90 text-lg"
                    onClick={() => {
                      handleAddToCart();
                      trackAddToCart(product.id, product.name, product.price, quantity);
                    }}
                    disabled={!product.inStock || isAdding}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isAdding ? 'Added to Cart!' : isInCart(product.id) ? 'Add More to Cart' : 'Add to Cart'}
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        trackCTAClick('request_quote', 'product_detail_page');
                        const message = encodeURIComponent(`Hi! I'm interested in ${product.name}. Can you provide a quote for ${quantity} unit(s)? Product ID: ${product.id}`);
                        window.open(`https://wa.me/263714570414?text=${message}`, '_blank');
                        trackWhatsAppClick('quote_request', message);
                      }}
                    >
                      <Quote className="w-5 h-5 mr-2" />
                      Request Quote
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                      onClick={() => {
                        trackCTAClick('whatsapp_inquiry', 'product_detail_page');
                        const message = encodeURIComponent(`Hi! I'm looking at ${product.name} on your website. Can we discuss this product?`);
                        window.open(`https://wa.me/263714570414?text=${message}`, '_blank');
                        trackWhatsAppClick('product_inquiry', message);
                      }}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
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
                    {product.features && product.features.length > 0 ? (
                      <ul className="space-y-3">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#4169e1] flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No features listed for this product.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="mt-6">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Technical Specifications
                    </h3>
                    {product.specifications && Object.keys(product.specifications).length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="bg-muted/30 p-4 rounded-lg border border-border/50">
                            <div className="font-medium text-foreground text-sm uppercase tracking-wide mb-1">
                              {key}
                            </div>
                            <div className="text-muted-foreground font-mono text-sm">
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No specifications listed for this product.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Cross-sell Products */}
            {relatedProducts.length > 0 && (
              <section className="mt-16">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                    You Might Also Like
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((related) => (
                      <Card key={related.id} className="group hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                          <div
                            className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden cursor-pointer"
                            onClick={() => navigate(`/shop/product/${related.id}`)}
                          >
                            <img
                              src={related.image}
                              alt={related.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {related.name}
                          </h4>
                          <p className="text-xl font-bold text-primary mb-3">
                            {formatPrice(related.price)}
                          </p>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => navigate(`/shop/product/${related.id}`)}
                          >
                            View Product
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;

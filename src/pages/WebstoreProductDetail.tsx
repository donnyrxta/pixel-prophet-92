/**
 * WebstoreProductDetail - Individual product page
 * Features image gallery, reviews, stock status, and add to cart
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductBySlug } from '@/data/webstore-products';
import { useWebstoreCart } from '@/context/WebstoreCartContext';
import { useToast } from '@/hooks/use-toast';

const WebstoreProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useWebstoreCart();
  const { toast } = useToast();

  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/webstore')}>
            Back to Webstore
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast({
        title: 'Out of Stock',
        description: 'This product is currently out of stock.',
        variant: 'destructive',
      });
      return;
    }

    // Add items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        currency: product.currency,
      });
    }

    toast({
      title: 'Added to Cart',
      description: `${quantity} × ${product.name} added to your cart.`,
    });

    // Reset quantity after adding
    setQuantity(1);
  };

  return (
    <>
      <SEOHead
        title={`${product.name} - Soho Connect Webstore`}
        description={product.description}
        keywords={product.seoKeywords.join(', ')}
        canonical={`https://sohoconnect.co.zw/webstore/product/${product.slug}`}
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => navigate('/webstore')}
                className="text-gray-600 hover:text-blue-600"
              >
                Webstore
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => navigate(`/webstore/${product.categorySlug}`)}
                className="text-gray-600 hover:text-blue-600"
              >
                {product.category}
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Stock Badge */}
                <div className="absolute top-4 right-4">
                  {product.stock > 0 ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-full">
                      <Check className="w-4 h-4" />
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-sm font-semibold rounded-full">
                      <X className="w-4 h-4" />
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-blue-600 shadow-lg'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.subcategory && (
                <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                  {product.subcategory}
                </p>
              )}

              <h1 className="text-4xl font-bold text-gray-900 font-['Oswald']">
                {product.name}
              </h1>

              {/* Reviews Summary */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                  </span>
                </div>
              )}

              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Bundle Items */}
              {product.isBundle && product.bundleItems && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Bundle Includes:</h3>
                  <ul className="space-y-1">
                    {product.bundleItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-blue-800">
                        <Check className="w-4 h-4 text-blue-600" />
                        {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price */}
              <div className="border-t border-b py-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {product.currency} ${product.price.toFixed(2)}
                  </span>
                  {product.isBundle && (
                    <span className="text-sm text-gray-600">(Bundle Package)</span>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                      disabled={product.stock === 0}
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                      disabled={product.stock === 0}
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full py-6 text-lg font-semibold"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                <Button
                  onClick={() => navigate('/contact')}
                  variant="outline"
                  className="w-full py-6 text-lg font-semibold"
                  size="lg"
                >
                  Request Quote
                </Button>
              </div>

              {/* Product Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-16 pt-16 border-t">
              <h2 className="text-3xl font-bold mb-8 font-['Oswald']">
                Customer Reviews
              </h2>

              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default WebstoreProductDetail;

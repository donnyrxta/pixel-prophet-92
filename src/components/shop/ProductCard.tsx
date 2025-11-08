/**
 * ProductCard - Reusable product card component
 * Phase 3: Conversion-optimized with add-to-cart functionality
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types/shop';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/shop/pricing';
import { trackProductView } from '@/lib/gtm';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
  showQuickAdd?: boolean;
}

export function ProductCard({ product, layout = 'grid', showQuickAdd = true }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleCardClick = () => {
    trackProductView(product.id, product.name, product.category, product.price);
    navigate(`/shop/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!product.inStock) return;

    setIsAdding(true);
    addToCart(product, 1);

    // Visual feedback
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Open quick view modal
    navigate(`/shop/product/${product.id}`);
  };

  if (layout === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="group bg-card border rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-4"
      >
        {/* Image */}
        <div className="w-48 h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-[#4169e1] text-white z-10">
              Featured
            </Badge>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            {product.category}
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-[#4169e1] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.shortDescription || product.description}
          </p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <ul className="text-xs text-muted-foreground mb-4 space-y-1">
              {product.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
          )}

          {/* Price & Actions */}
          <div className="mt-auto flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {formatPrice(product.price)}
              </div>
              <div className="text-xs text-muted-foreground">
                + 2% govt levy
              </div>
            </div>

            <div className="flex gap-2">
              {showQuickAdd && product.inStock && (
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isAdding ? 'Added!' : isInCart(product.id) ? 'Add More' : 'Add to Cart'}
                </Button>
              )}
            </div>
          </div>

          {/* Stock Status */}
          {product.inStock ? (
            <div className="mt-2 text-xs text-[#4169e1]">
              ✓ In Stock ({product.stockCount} available)
            </div>
          ) : (
            <div className="mt-2 text-xs text-destructive">
              Out of Stock
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div
      onClick={handleCardClick}
      className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-[#4169e1] text-white z-10">
            Featured
          </Badge>
        )}

        {/* Quick View Button */}
        <button
          onClick={handleQuickView}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4 text-foreground" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          {product.category}
        </div>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-[#4169e1] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.shortDescription || product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </div>
            <div className="text-xs text-muted-foreground">
              + 2% govt levy
            </div>
          </div>

          {showQuickAdd && product.inStock && (
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-[#4169e1] hover:bg-[#4169e1]/90"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          )}
        </div>

        {product.inStock ? (
          <div className="text-xs text-[#4169e1]">
            ✓ In Stock
          </div>
        ) : (
          <div className="text-xs text-destructive">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
}

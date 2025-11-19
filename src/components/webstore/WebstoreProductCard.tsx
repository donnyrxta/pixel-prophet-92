/**
 * WebstoreProductCard - Premium neuromorphic product card
 * Features dark overlay with glassmorphic elements
 */

import { WebstoreProduct } from '@/data/webstore-products';
import { ShoppingCart } from 'lucide-react';

interface WebstoreProductCardProps {
  product: WebstoreProduct;
  onViewDetails?: (productId: string) => void;
  compact?: boolean;
}

export const WebstoreProductCard = ({
  product,
  onViewDetails,
  compact = false
}: WebstoreProductCardProps) => {
  const handleClick = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    }
  };

  return (
    <div
      className={`relative ${compact ? 'w-64 h-72' : 'w-full h-80'} rounded-xl overflow-hidden shadow-lg flex-shrink-0 group cursor-pointer transition-transform hover:scale-[1.02]`}
      onClick={handleClick}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* Tags */}
        {product.trending && (
          <div className="self-start">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
              Trending
            </span>
          </div>
        )}

        {/* Bottom Content */}
        <div className="space-y-2">
          {product.subcategory && (
            <p className="text-xs text-blue-300 uppercase tracking-wide font-medium">
              {product.subcategory}
            </p>
          )}

          <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
            {product.name}
          </h3>

          {!compact && (
            <p className="text-white/80 text-sm line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-lg md:text-xl font-bold text-blue-300">
                {product.currency} ${product.price.toFixed(2)}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * WebstoreProductCard - Premium product card with Royal Blue branding
 * Features enhanced hover effects, better typography, and polished design
 */

import { useState } from 'react';
import { WebstoreProduct } from '@/data/webstore-products';
import { ShoppingCart, Star, Tag } from 'lucide-react';
import { CompareButton } from './CompareButton';

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
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    }
  };

  // Calculate average rating from reviews
  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : null;

  // Stock status
  const stockStatus = product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : null;

  return (
    <div
      className={`relative ${compact ? 'w-64 h-[22rem]' : 'w-full h-[26rem]'} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl flex-shrink-0 group cursor-pointer transition-all duration-500 hover:scale-[1.03] border-2 border-transparent hover:border-[#4169e1]`}
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="absolute inset-0 bg-stone-100">
        {!imageLoaded && (
          <div className="skeleton w-full h-full" aria-label="Loading product image" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        {/* Top Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-4">
          <CompareButton productId={product.id} />
        </div>

        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-2">
            {product.trending && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#4169e1] text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm animate-pulse">
                <Tag className="w-3 h-3" />
                Trending
              </span>
            )}
            {product.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                <Star className="w-3 h-3" />
                Featured
              </span>
            )}
            {product.isBundle && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
                Bundle
              </span>
            )}
          </div>

          {stockStatus && (
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm ${
              product.stock === 0 ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
            }`}>
              {stockStatus}
            </span>
          )}
        </div>

        {/* Bottom Content */}
        <div className="space-y-3">
          {/* Category Tag */}
          {product.subcategory && (
            <p className="text-xs text-[#5a7fe8] uppercase tracking-widest font-bold">
              {product.subcategory}
            </p>
          )}

          {/* Product Name */}
          <h3 className="text-white text-lg md:text-xl font-bold leading-tight group-hover:text-[#4169e1] transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>

          {/* Description (only if not compact) */}
          {!compact && (
            <p className="text-white/90 text-sm line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {averageRating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-stone-400'}`}
                />
              ))}
              <span className="text-white/80 text-xs ml-1">
                ({product.reviews?.length})
              </span>
            </div>
          )}

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-white/20">
            <div>
              <div className="text-xl md:text-2xl font-black text-white">
                ${product.price.toLocaleString()}
              </div>
              <div className="text-xs text-white/60">
                {product.currency} • In stock: {product.stock}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              disabled={product.stock === 0}
              className="inline-flex items-center gap-2 bg-[#4169e1] text-white px-5 py-3 rounded-full text-sm font-bold hover:bg-[#3557c4] hover:shadow-2xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl"
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stock === 0 ? 'Sold Out' : 'View'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * OptimizedImage Component
 * Handles lazy loading, WebP fallback, and proper alt text
 * Implements performance best practices from whitehat playbook
 */

import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // For above-the-fold images
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover'
}: OptimizedImageProps) {
  // Generate WebP path (assuming WebP versions exist)
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebP = src.match(/\.(jpg|jpeg|png)$/i);

  // Object-fit mapping
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  }[objectFit];

  return (
    <picture>
      {hasWebP && (
        <source srcSet={webpSrc} type="image/webp" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={`${objectFitClass} ${className}`}
        onError={(e) => {
          // Fallback to placeholder on error
          const target = e.target as HTMLImageElement;
          if (target.src !== '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg') {
            target.src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
          }
        }}
      />
    </picture>
  );
}

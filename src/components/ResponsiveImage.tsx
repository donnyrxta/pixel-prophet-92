import React from 'react';

type ResponsiveImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  srcSet?: string;
  sizes?: string;
};

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  lazy = true,
  srcSet,
  sizes = '100vw',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      sizes={sizes}
      srcSet={srcSet}
    />
  );
};

export default ResponsiveImage;


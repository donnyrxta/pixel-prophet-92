import { useState } from "react";

type SafeImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean; // when true, set fetchPriority high and eager loading
  fallbackSrc?: string;
  sizes?: string;
};

// Reusable image component with graceful fallback and performance hints
export default function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  loading = "lazy",
  priority = false,
  fallbackSrc = "https://sohoconnect.co.zw/public/placeholder.svg",
  sizes,
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : loading}
      decoding="async"
      // fetchPriority is supported in modern browsers; harmless elsewhere
      // @ts-expect-error: fetchPriority not yet in React's img props typing
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      onError={handleError}
    />
  );
}

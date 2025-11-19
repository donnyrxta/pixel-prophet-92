import { useEffect, useState } from 'react';

/**
 * CategoryHero renders a large hero section for category landing
 * pages. The hero shows the category tagline, title and description
 * over a responsive background image. A floating card cycles through
 * provided feature objects every few seconds. This simple timed
 * carousel effect gives visitors multiple reasons to explore the
 * category without relying on external libraries. All text stays
 * accessible and is visible even on mobile thanks to the dark
 * backdrop overlay.
 *
 * @param {Object} props
 * @param {Object} props.category - Category object with hero info.
 */
export default function CategoryHero({ category }) {
  const { tagline, title, description, image, features } = category.hero;
  const [index, setIndex] = useState(0);
  // Rotate features every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);
  const currentFeature = features[index];
  return (
    <section
      className="relative text-white flex items-center justify-center"
      style={{ minHeight: '60vh' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-primary mb-2">
          {tagline}
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          {title}
        </h1>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          {description}
        </p>
        {/* Feature card */}
        <div className="inline-block bg-white bg-opacity-90 text-gray-800 rounded-lg p-6 shadow-lg backdrop-blur-sm transition-transform duration-500">
          <h3 className="text-xl font-semibold mb-1 text-primary">
            {currentFeature.title}
          </h3>
          <p className="text-sm leading-relaxed max-w-sm">
            {currentFeature.description}
          </p>
        </div>
      </div>
    </section>
  );
}
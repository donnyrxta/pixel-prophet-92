/**
 * TestimonialsSection - Glassmorphic testimonial cards
 * Social proof component with star ratings
 */

interface Testimonial {
  name: string;
  rating: number;
  text: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
}

export const TestimonialsSection = ({
  testimonials,
  title = "What Our Customers Say"
}: TestimonialsSectionProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-yellow-400">
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-600 font-['Oswald']">
        {title}
      </h2>

      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-3 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800 text-lg">
                {testimonial.name}
              </span>
              <div className="flex gap-0.5 text-sm">
                {renderStars(testimonial.rating)}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

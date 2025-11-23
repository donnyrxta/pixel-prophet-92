import { Star } from 'lucide-react';

/**
 * ReviewList displays a list of customer testimonials. Each review
 * shows the reviewer name, star rating and their feedback. Use this
 * component on product pages or category pages to build trust and
 * social proof. The default reviews can be replaced with data from
 * a CMS or API when available.
 */
export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) return null;
  return (
    <div className="space-y-6">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">{review.name}</span>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill={i < review.stars ? 'currentColor' : 'none'}
                  stroke="currentColor"
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
/**
 * Trust Band Component
 * Applies empirical frameworks:
 * - Social Proof (Cialdini's Principle)
 * - Serial Position Effect (trust signals early in page flow)
 * - Proximity (contact info near conversion points)
 * - Authority Bias (years in business, client count)
 */
import { Phone, Mail, MapPin, Clock, Award, Users, Zap, TrendingUp } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { trackCTAClick } from '@/lib/gtm';

const TrustBand = () => {
  const handleContactClick = (method: string) => {
    trackCTAClick(`trust_band_${method}`, 'trust_band_component');
  };

  return (
    <section className="bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 py-12 border-y-2 border-orange-200">
      <div className="container mx-auto px-4">

        {/* Stats Row - Social Proof */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center group hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">127+</div>
            <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
          </div>

          <div className="text-center group hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
            <div className="text-sm text-gray-600 font-medium">Projects Done</div>
          </div>

          <div className="text-center group hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">24hrs</div>
            <div className="text-sm text-gray-600 font-medium">Avg Response</div>
          </div>

          <div className="text-center group hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">5yrs+</div>
            <div className="text-sm text-gray-600 font-medium">In Business</div>
          </div>
        </div>

        {/* Contact Info Band - Proximity to conversion points */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">

            {/* Phone */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              onClick={() => handleContactClick('phone')}
              className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-lg transition-all group touch-target"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 font-medium">Call Us Now</div>
                <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {CONTACT_INFO.phone}
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              onClick={() => handleContactClick('email')}
              className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-lg transition-all group touch-target"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500 mb-1 font-medium">Email Us</div>
                <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                  {CONTACT_INFO.email}
                </div>
              </div>
            </a>

            {/* Location */}
            <a
              href="https://maps.google.com/?q=7+Luck+Street,+Harare+CBD"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleContactClick('location')}
              className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-lg transition-all group touch-target"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 font-medium">Visit Us</div>
                <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  7 Luck St, Harare CBD
                </div>
              </div>
            </a>
          </div>

          {/* Business Hours */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-medium">Mon-Fri: 8:00 AM - 5:00 PM</span>
              </div>
              <span className="hidden md:inline text-gray-300">|</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-medium">Sat: 9:00 AM - 1:00 PM</span>
              </div>
              <span className="hidden md:inline text-gray-300">|</span>
              <span className="font-medium text-red-600">Sun: Closed</span>
            </div>
          </div>
        </div>

        {/* Trust Message - Reciprocity */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            <strong className="text-orange-600">Same-day quotes</strong> available •
            <strong className="text-orange-600 ml-1">Free consultation</strong> on all projects •
            <strong className="text-orange-600 ml-1">100% satisfaction</strong> guaranteed
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustBand;

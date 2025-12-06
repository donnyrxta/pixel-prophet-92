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
import { motion } from 'framer-motion';

const TrustBand = () => {
  const handleContactClick = (method: string) => {
    trackCTAClick(`trust_band_${method}`, 'trust_band_component');
  };

  return (
    <motion.section 
      className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 py-12 border-y-2 border-primary/20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Glassmorphic background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">

        {/* Stats Row - Social Proof - Enhanced with glassmorphic effects */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="text-center group"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-neu-raised group-hover:shadow-neu-pressed transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div 
            className="text-3xl font-bold text-gray-900 mb-1"
            whileHover={{ scale: 1.1 }}
          >
            127+
          </motion.div>
          <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
        </motion.div>

        <motion.div 
          className="text-center group"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-neu-raised group-hover:shadow-neu-pressed transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div 
            className="text-3xl font-bold text-gray-900 mb-1"
            whileHover={{ scale: 1.1 }}
          >
            500+
          </motion.div>
          <div className="text-sm text-gray-600 font-medium">Projects Done</div>
        </motion.div>

        <motion.div 
          className="text-center group"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-neu-raised group-hover:shadow-neu-pressed transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div 
            className="text-3xl font-bold text-gray-900 mb-1"
            whileHover={{ scale: 1.1 }}
          >
            24hrs
          </motion.div>
          <div className="text-sm text-gray-600 font-medium">Avg Response</div>
        </motion.div>

        <motion.div 
          className="text-center group"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-neu-raised group-hover:shadow-neu-pressed transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div 
            className="text-3xl font-bold text-gray-900 mb-1"
            whileHover={{ scale: 1.1 }}
          >
            5yrs+
          </motion.div>
          <div className="text-sm text-gray-600 font-medium">In Business</div>
        </motion.div>
      </div>

        {/* Contact Info Band - Proximity to conversion points - Enhanced with glassmorphic effects */}
        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-glass hover:shadow-glass-lg transition-all duration-300"
          whileHover={{ scale: 1.01, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="grid md:grid-cols-3 gap-6">

            {/* Phone */}
            <motion.a
              href={`tel:${CONTACT_INFO.phone}`}
              onClick={() => handleContactClick('phone')}
              className="flex items-center gap-4 p-4 hover:bg-blue-50/50 rounded-lg transition-all group touch-target"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-neu-raised group-hover:shadow-neu-pressed transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="text-xs text-gray-500 mb-1 font-medium">Call Us Now</div>
                <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {CONTACT_INFO.phone}
                </div>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${CONTACT_INFO.email}`}
              onClick={() => handleContactClick('email')}
              className="flex items-center gap-4 p-4 hover:bg-blue-50/50 rounded-lg transition-all group touch-target"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-neu-raised group-hover:shadow-neu-pressed transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-6 h-6 text-white" />
              </motion.div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500 mb-1 font-medium">Email Us</div>
                <div className="font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                  {CONTACT_INFO.email}
                </div>
              </div>
            </motion.a>

            {/* Location */}
            <motion.a
              href="https://maps.google.com/?q=7+Luck+Street,+Harare+CBD"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleContactClick('location')}
              className="flex items-center gap-4 p-4 hover:bg-blue-50/50 rounded-lg transition-all group touch-target"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-neu-raised group-hover:shadow-neu-pressed transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="text-xs text-gray-500 mb-1 font-medium">Visit Us</div>
                <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  7 Luck St, Harare CBD
                </div>
              </div>
            </motion.a>
          </div>

          {/* Business Hours - Enhanced with glassmorphic effects */}
          <motion.div 
            className="mt-6 pt-6 border-t border-gray-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">Mon-Fri: 8:00 AM - 5:00 PM</span>
              </motion.div>
              <span className="hidden md:inline text-gray-300">|</span>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">Sat: 9:00 AM - 1:00 PM</span>
              </motion.div>
              <span className="hidden md:inline text-gray-300">|</span>
              <motion.span 
                className="font-medium text-primary"
                whileHover={{ scale: 1.05 }}
              >
                Sun: Closed
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Message - Reciprocity - Enhanced with glassmorphic effects */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.p 
            className="text-sm text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30 shadow-glass-sm"
            whileHover={{ scale: 1.02 }}
          >
            <strong className="text-primary">Same-day quotes</strong> available •
            <strong className="text-primary ml-1">Free consultation</strong> on all projects •
            <strong className="text-primary ml-1">100% satisfaction</strong> guaranteed
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrustBand;

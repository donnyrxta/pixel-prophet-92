/**
 * Footer Component - Site-wide footer with navigation, contact info, and trust signals
 * Optimized for SEO and conversion
 */
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { CONTACT_INFO, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants';
import TrustBadges from './TrustBadges';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Printing Services', href: '/services/printing' },
      { label: 'Branding & Design', href: '/services/branding' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Signage & Displays', href: '/services/signage' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/images/brand/logo-icon.png" 
                alt={BUSINESS_INFO.name}
                className="h-10 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              {BUSINESS_INFO.tagline}
            </p>
            <p className="text-accent font-semibold text-sm mb-4">
              {BUSINESS_INFO.trustSignal}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={SOCIAL_LINKS.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-start gap-2 text-gray-300 hover:text-accent transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-2 text-gray-300 hover:text-accent transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-gray-300 hover:text-accent transition-colors text-sm group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{CONTACT_INFO.address}</span>
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-1">Business Hours</p>
              <p className="text-xs text-gray-300">{CONTACT_INFO.businessHours.weekdays}</p>
              <p className="text-xs text-gray-300">{CONTACT_INFO.businessHours.saturday}</p>
            </div>
          </div>
        </div>

        {/* Trust Signals & Compliance */}
        <TrustBadges />

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href}
                  className="text-sm text-gray-400 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
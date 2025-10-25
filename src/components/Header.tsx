/**
 * Header Component - Mobile-responsive navigation with dropdown menus
 * Implements conversion-optimized CTAs and trust signals
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO, BUSINESS_INFO } from '@/lib/constants';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  // Handle scroll for sticky header with shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      submenu: [
        { name: 'All Services', path: '/services' },
        { name: 'Printing Services', path: '/services/printing' },
        { name: 'Branding & Design', path: '/services/branding' },
        { name: 'Digital Marketing', path: '/services/digital-marketing' },
        { name: 'Signage & Displays', path: '/services/signage' },
        { name: 'Payment Services', path: '/services/payment-services' },
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const whatsappNumber = CONTACT_INFO.whatsappNumber;
  const phoneNumber = CONTACT_INFO.phone;

  return (
    <>
      {/* Header with trust signal */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              aria-label="Soho Connect Home"
            >
              <img 
                src="/images/brand/logo-color-icon.png" 
                alt="Soho Connect Logo" 
                className="h-12 w-12"
              />
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-gray-900">{BUSINESS_INFO.name}</div>
                <div className="text-xs text-primary">{BUSINESS_INFO.trustSignal}</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <div key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={`font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                      location.pathname === link.path 
                        ? 'text-primary' 
                        : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                    {link.submenu && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>

                  {/* Dropdown for Services */}
                  {link.submenu && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg 
                                    shadow-xl opacity-0 invisible group-hover:opacity-100 
                                    group-hover:visible transition-all duration-200 py-2 border">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.path}
                          to={sublink.path}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-primary/5 
                                     hover:text-primary transition-colors text-sm"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 text-gray-700 hover:text-primary 
                           transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{phoneNumber}</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%20Soho%20Connect,%20I'd%20like%20to%20get%20a%20quote`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Get Instant Quote
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 
                    transform transition-transform duration-300 ease-in-out lg:hidden
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    overflow-y-auto`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="font-bold text-lg">Menu</div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.submenu ? (
                  <>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 
                                 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        openSubmenu === link.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {openSubmenu === link.name && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.path}
                            to={sublink.path}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 
                                       hover:text-primary rounded-lg transition-colors"
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                      location.pathname === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile CTAs */}
          <div className="mt-8 space-y-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%20Soho%20Connect,%20I'd%20like%20to%20get%20a%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white gap-2">
                <MessageCircle className="w-4 h-4" />
                Get Instant Quote
              </Button>
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className="block"
            >
              <Button variant="outline" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
            </a>
          </div>

          {/* Trust Signal */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            <div className="font-semibold text-primary mb-1">{BUSINESS_INFO.trustSignal}</div>
            <div>{CONTACT_INFO.address}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

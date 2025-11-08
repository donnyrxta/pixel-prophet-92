import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronRight, Truck, RotateCcw, CreditCard, Headphones } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  bgColor: string;
}

const categories = ['Smartphones', 'CCTV Systems', 'Tech Accessories', 'Business Consumables'];

const featuredProducts: FeaturedProduct[] = [
  {
    id: 'smartphone-1',
    name: 'SMARTPHONE',
    category: 'Premium Flagship',
    price: 899,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
    bgColor: 'from-primary/20 to-blue-600/20'
  },
  {
    id: 'cctv-1',
    name: 'CCTV SYSTEM',
    category: 'Security Solutions',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=800&fit=crop',
    bgColor: 'from-primary/20 to-blue-600/20'
  },
  {
    id: 'accessory-1',
    name: 'TECH GEAR',
    category: 'Premium Accessories',
    price: 149,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    bgColor: 'from-primary/20 to-blue-600/20'
  },
  {
    id: 'consumable-1',
    name: 'BUSINESS TECH',
    category: 'Office Solutions',
    price: 299,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=800&fit=crop',
    bgColor: 'from-primary/20 to-blue-600/20'
  }
];

const trustSignals = [
  { icon: Truck, title: 'FREE SHIPPING', subtitle: 'Fast nationwide delivery', detail: 'on all orders' },
  { icon: RotateCcw, title: '30 DAYS RETURN', subtitle: 'No questions asked', detail: 'money-back guarantee' },
  { icon: CreditCard, title: 'FLEXIBLE PAYMENT', subtitle: 'Multiple payment options', detail: 'including EcoCash' },
  { icon: Headphones, title: 'SUPPORT 24/7', subtitle: 'Get in touch with', detail: 'our support team' }
];

export default function ElectronicsHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (category: string) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `/shop?category=${categorySlug}`;
  };

  return (
    <>
      <SEOHead
        title="Soho Electronics - Premium Smartphones, CCTV & Tech Solutions | Harare"
        description="Shop premium electronics in Harare. Smartphones, CCTV systems, tech accessories & business consumables. Fast delivery, flexible payment, 30-day returns."
        keywords="electronics harare, smartphones zimbabwe, CCTV systems, tech accessories, business technology"
      />

      <Header />

      <div className="min-h-screen bg-background">
        {/* Top Navigation Bar */}
        <nav className="bg-stone-900 text-white sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">SE</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">Soho Electronics</span>
              </div>

              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pr-10 rounded-lg bg-stone-800 border border-stone-700 
                             focus:border-primary focus:ring-1 focus:ring-primary outline-none
                             text-white placeholder-stone-400"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-primary">Limited Time Offers!</span>
                <Link to="/shop" className="hover:text-primary transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                <button className="hover:text-primary transition-colors">
                  <User className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Category Navigation */}
            <div className="border-t border-stone-800">
              <div className="container mx-auto px-6 py-3 flex items-center justify-center gap-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="text-sm font-medium tracking-wide uppercase hover:text-primary 
                             transition-colors duration-300"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Slider */}
        <section className="relative h-[80vh] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="min-w-full h-full relative flex items-center"
              >
                <div className="absolute inset-0 bg-stone-950" />
                
                {/* Product Image */}
                <div className="absolute right-0 top-0 w-1/2 h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>

                {/* Circular Gradient Overlay */}
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[120%] 
                            rounded-l-full bg-gradient-to-l ${product.bgColor}`}
                  style={{ clipPath: 'ellipse(50% 60% at 70% 50%)' }}
                />

                {/* Content */}
                <div className="container mx-auto px-12 relative z-10">
                  <div className="max-w-xl">
                    <div className="text-primary text-sm font-medium tracking-[0.3em] mb-4">
                      {product.category}
                    </div>
                    <h1 className="text-7xl font-bold text-white mb-4 leading-tight">
                      {product.name.split(' ')[0]}
                      <br />
                      <span className="text-primary">NEW</span>
                      <br />
                      SEASON
                    </h1>
                    <div className="text-4xl font-bold text-white mb-8">
                      ${product.price.toLocaleString()}
                    </div>
                    <Link
                      to={`/shop/product/${product.id}`}
                      className="inline-block px-8 py-4 bg-white text-stone-900 font-bold 
                               rounded-lg hover:bg-primary hover:text-white transition-all 
                               duration-300 hover:scale-105 shadow-xl"
                    >
                      BUY NOW!
                    </Link>
                  </div>
                </div>

                {/* Slide Indicator */}
                <div className="absolute bottom-8 left-12 flex gap-3">
                  {featuredProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-12 h-1 rounded-full transition-all duration-300
                        ${idx === currentSlide ? 'bg-primary w-16' : 'bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                     bg-white/10 backdrop-blur-sm border border-white/20 flex items-center 
                     justify-center hover:bg-white/20 transition-all duration-300 z-20"
          >
            <ChevronRight className="w-6 h-6 text-white rotate-180" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                     bg-white/10 backdrop-blur-sm border border-white/20 flex items-center 
                     justify-center hover:bg-white/20 transition-all duration-300 z-20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </section>

        {/* Trust Signals */}
        <section className="bg-white py-12 border-y">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trustSignals.map((signal, index) => (
                <div key={index} className="text-center group cursor-default">
                  <div className="inline-flex items-center justify-center w-16 h-16 
                                rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 
                                transition-colors duration-300">
                    <signal.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">{signal.title}</h3>
                  <p className="text-sm text-stone-600">{signal.subtitle}</p>
                  <p className="text-xs text-stone-500">{signal.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20 bg-stone-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-stone-900">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-lg 
                           hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary 
                                group-hover:from-primary group-hover:to-primary/80 
                                transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center px-4">
                      {category}
                    </h3>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t 
                                from-black/50 to-transparent opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300">
                    <div className="flex items-center justify-center gap-2 text-white">
                      <span className="text-sm font-medium">Explore</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-stone-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6">
              Ready to Upgrade Your Tech?
            </h2>
            <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto">
              Discover premium electronics with nationwide delivery, flexible payments, 
              and expert support.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 bg-primary text-white font-bold rounded-lg 
                         hover:bg-primary/90 transition-all duration-300 hover:scale-105 
                         shadow-xl"
              >
                Browse All Products
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-stone-900 font-bold rounded-lg 
                         hover:bg-stone-100 transition-all duration-300 hover:scale-105 
                         shadow-xl"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

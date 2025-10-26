/**
 * Services Page - Main hub for all service categories
 * Conversion-optimized with customer segments and value propositions
 */
import { Link } from 'react-router-dom';
import { 
  Printer, 
  Palette, 
  TrendingUp, 
  SignpostBig, 
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import FloatingContact from '@/components/FloatingContact';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClientLogos from '@/components/ClientLogos';
import SEOHead from '@/components/SEOHead';

// Service categories structured for conversion and SEO
const serviceCategories = [
  {
    id: 'printing',
    title: 'Printing Services',
    slug: 'printing',
    icon: Printer,
    tagline: 'Professional printing that makes you stand out',
    description: 'From business cards to large-format banners, we deliver high-quality prints with fast turnaround times.',
    benefits: [
      'Same-day printing available',
      'Premium paper stocks',
      'Color accuracy guaranteed',
      'Bulk discounts available'
    ],
    services: ['Business Cards', 'Brochures', 'Flyers', 'Posters', 'Banners', 'Stationery'],
    ctaText: 'View Printing Services',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'branding',
    title: 'Branding & Design',
    slug: 'branding',
    icon: Palette,
    tagline: 'Build a brand that customers remember',
    description: 'Strategic brand identity design that captures your vision and resonates with your target audience.',
    benefits: [
      'Custom logo design',
      'Complete brand guidelines',
      'Unlimited revisions',
      'Print-ready files'
    ],
    services: ['Logo Design', 'Brand Identity', 'Packaging Design', 'Marketing Materials'],
    ctaText: 'Explore Branding',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: TrendingUp,
    tagline: 'Grow your business online',
    description: 'Data-driven digital marketing strategies that generate leads and increase sales.',
    benefits: [
      'Social media management',
      'SEO optimization',
      'Content marketing',
      'Performance tracking'
    ],
    services: ['Social Media', 'SEO', 'Email Campaigns', 'Content Strategy'],
    ctaText: 'Start Marketing',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'signage',
    title: 'Signage & Displays',
    slug: 'signage',
    icon: SignpostBig,
    tagline: 'Make your presence known',
    description: 'Eye-catching signage and display solutions for maximum visibility and impact.',
    benefits: [
      'Custom fabrication',
      'Indoor & outdoor options',
      'Installation included',
      'Durable materials'
    ],
    services: ['Shop Signs', 'Vehicle Wraps', 'Banners', 'Display Stands', 'Window Graphics'],
    ctaText: 'View Signage',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'payment-services',
    title: 'Payment Services',
    slug: 'payment-services',
    icon: CreditCard,
    tagline: 'Flexible payment solutions',
    description: 'Multiple payment options including EcoCash, mobile money, and installment plans.',
    benefits: [
      'EcoCash integration',
      'Flexible payment plans',
      'Secure transactions',
      'Invoice management'
    ],
    services: ['EcoCash', 'Mobile Money', 'Bank Transfers', 'Payment Plans'],
    ctaText: 'Learn About Payments',
    color: 'from-indigo-500 to-blue-500'
  }
];

const Services = () => {
  return (
    <>
      <SEOHead 
        title="Professional Services - Printing, Branding & Digital Marketing"
        description="Complete business solutions under one roof. Printing services, branding & design, digital marketing, signage, and flexible payment options in Harare, Zimbabwe."
        keywords="printing services harare, branding design zimbabwe, digital marketing, signage harare, business services zimbabwe"
        canonical="https://sohoconnect.co.zw/services"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <FloatingContact />
        <Breadcrumbs />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 
                          rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <Star className="w-4 h-4" />
            Trusted by 127+ Harare Businesses
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Complete Business Solutions
            <span className="block text-primary mt-2">Under One Roof</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-slide-up" 
             style={{ animationDelay: '0.1s' }}>
            From printing to digital marketing, we provide all the services your business needs to 
            grow and succeed in Zimbabwe's competitive market.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" 
               style={{ animationDelay: '0.2s' }}>
            <a href={`https://wa.me/263714570414?text=Hi%20Soho%20Connect,%20I'd%20like%20to%20get%20a%20quote`}>
              <Button size="lg" className="gap-2">
                Get Free Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <ClientLogos 
        title="Trusted by 127+ Businesses"
        subtitle="Join Harare's leading companies who trust us with their brand"
      />

      {/* Service Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => (
              <Card 
                key={category.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
                           border-2 hover:border-primary/50 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} 
                                  flex items-center justify-center mb-4 group-hover:scale-110 
                                  transition-transform duration-300`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl text-gray-900 group-hover:text-primary 
                                        transition-colors">
                    {category.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base font-medium text-primary">
                    {category.tagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    {category.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-2">
                    {category.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Service Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.services.slice(0, 4).map((service, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link to={`/services/${category.slug}`} className="block">
                    <Button 
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-white 
                                 transition-colors"
                      variant="outline"
                    >
                      {category.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 
                                             transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Choose Soho Connect
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine quality, speed, and local expertise to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Local Expertise',
                description: 'Based in Harare CBD, we understand Zimbabwe\'s business landscape',
                icon: '🇿🇼'
              },
              {
                title: 'Fast Turnaround',
                description: 'Same-day printing and quick project delivery when you need it',
                icon: '⚡'
              },
              {
                title: 'Trusted Quality',
                description: '127+ businesses trust us for consistent, professional results',
                icon: '⭐'
              }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get a free quote in minutes. No obligation, no hidden costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/263714570414?text=Hi%20Soho%20Connect,%20I'd%20like%20to%20get%20a%20quote">
              <Button size="lg" variant="secondary" className="gap-2">
                WhatsApp Us Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="tel:+263714570414">
              <Button size="lg" variant="outline" className="border-white text-white 
                                                              hover:bg-white hover:text-primary">
                Call +263 71 457 0414
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Services;

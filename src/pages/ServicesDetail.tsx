/**
 * Service Detail Page Template - Individual service showcase
 * Optimized for conversion with social proof and clear CTAs
 */
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import { useQuoteCalculator } from '@/context/QuoteCalculatorContext';
import { trackWhatsAppClick } from '@/lib/gtm';
import { CONTACT_INFO } from '@/lib/constants';

// Service detail data structure
const serviceDetails: Record<string, any> = {
  printing: {
    title: 'Printing Services',
    tagline: 'Professional printing that makes your business stand out',
    description: 'High-quality printing services with fast turnaround times. From business cards to large-format banners, we handle all your printing needs with precision and care.',
    heroImage: '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg',
    features: [
      {
        title: 'Same-Day Service',
        description: 'Rush orders completed within 24 hours',
        icon: Clock
      },
      {
        title: 'Premium Quality',
        description: 'Latest printing technology for perfect results',
        icon: Star
      },
      {
        title: 'Competitive Pricing',
        description: 'Best value with bulk discounts',
        icon: DollarSign
      }
    ],
    services: [
      {
        name: 'Business Cards',
        description: 'Premium business cards on quality stock',
        startingPrice: '$20/500 cards',
        turnaround: '24-48 hours',
        popular: true
      },
      {
        name: 'Brochures & Flyers',
        description: 'Full-color marketing materials',
        startingPrice: '$50/1000 pieces',
        turnaround: '2-3 days',
        popular: true
      },
      {
        name: 'Posters & Banners',
        description: 'Large format printing up to 5m wide',
        startingPrice: '$30/sqm',
        turnaround: '1-2 days',
        popular: false
      },
      {
        name: 'Stationery',
        description: 'Letterheads, envelopes, folders',
        startingPrice: '$40/500 pieces',
        turnaround: '3-5 days',
        popular: false
      }
    ],
    benefits: [
      'High-resolution printing up to 1440dpi',
      'Wide range of paper stocks and finishes',
      'Color matching and proofing available',
      'Delivery across Harare',
      'Volume discounts for bulk orders',
      'Professional finishing options'
    ],
    testimonial: {
      text: "Soho Connect delivered 1000 brochures in 48 hours. The quality exceeded our expectations!",
      author: "Sarah M.",
      company: "Tech Startup, Harare"
    }
  },
  branding: {
    title: 'Branding & Design',
    tagline: 'Build a brand that customers remember and trust',
    description: 'Strategic brand identity design that captures your vision and resonates with your target audience. Complete branding solutions from concept to execution.',
    heroImage: '/images/hero/creatopy-M35xxKGb_tA-unsplash.jpg',
    features: [
      {
        title: 'Custom Design',
        description: 'Unique concepts tailored to your business',
        icon: Star
      },
      {
        title: 'Full Ownership',
        description: 'All source files and rights included',
        icon: CheckCircle2
      },
      {
        title: 'Unlimited Revisions',
        description: 'Perfect your brand identity',
        icon: Clock
      }
    ],
    services: [
      {
        name: 'Logo Design',
        description: 'Professional logo with 3 concepts',
        startingPrice: '$150',
        turnaround: '5-7 days',
        popular: true
      },
      {
        name: 'Complete Brand Identity',
        description: 'Logo, colors, fonts, guidelines',
        startingPrice: '$500',
        turnaround: '2-3 weeks',
        popular: true
      },
      {
        name: 'Marketing Materials',
        description: 'Business cards, letterheads, brochures',
        startingPrice: '$200',
        turnaround: '1-2 weeks',
        popular: false
      },
      {
        name: 'Packaging Design',
        description: 'Product packaging and labels',
        startingPrice: '$300',
        turnaround: '2-3 weeks',
        popular: false
      }
    ],
    benefits: [
      'Strategic brand positioning',
      'Multiple design concepts',
      'Unlimited revision rounds',
      'Print-ready file formats',
      'Brand guidelines document',
      'Ongoing design support'
    ],
    testimonial: {
      text: "The branding transformed our business. Sales increased 40% after the rebrand!",
      author: "James K.",
      company: "Retail Business, Harare"
    }
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    tagline: 'Grow your business with data-driven online strategies',
    description: 'Comprehensive digital marketing services that drive traffic, generate leads, and increase sales. From social media to SEO, we handle your online presence.',
    heroImage: '/images/hero/kaffie-co-7hEZILVOcFU-unsplash.jpg',
    features: [
      {
        title: 'Results-Driven',
        description: 'Measurable ROI on every campaign',
        icon: Star
      },
      {
        title: 'Local Expertise',
        description: 'Deep understanding of Zimbabwe market',
        icon: CheckCircle2
      },
      {
        title: 'Full Management',
        description: 'We handle everything end-to-end',
        icon: Clock
      }
    ],
    services: [
      {
        name: 'Social Media Management',
        description: 'Facebook, Instagram, LinkedIn',
        startingPrice: '$200/month',
        turnaround: 'Ongoing',
        popular: true
      },
      {
        name: 'SEO Services',
        description: 'Rank higher on Google',
        startingPrice: '$300/month',
        turnaround: '3-6 months',
        popular: true
      },
      {
        name: 'Content Marketing',
        description: 'Blogs, videos, graphics',
        startingPrice: '$250/month',
        turnaround: 'Ongoing',
        popular: false
      },
      {
        name: 'Email Campaigns',
        description: 'Targeted email marketing',
        startingPrice: '$150/month',
        turnaround: 'Ongoing',
        popular: false
      }
    ],
    benefits: [
      'Monthly performance reports',
      'Dedicated account manager',
      'Custom content creation',
      'Ad campaign management',
      'Analytics and optimization',
      'Competitor analysis'
    ],
    testimonial: {
      text: "Our online sales tripled in 3 months. Soho Connect knows digital marketing!",
      author: "Patricia N.",
      company: "E-commerce Store, Harare"
    }
  },
  signage: {
    title: 'Signage & Displays',
    tagline: 'Make your presence known with professional signage',
    description: 'Custom signage and display solutions for businesses. From shop signs to vehicle wraps, we create eye-catching displays that attract customers.',
    heroImage: '/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg',
    features: [
      {
        title: 'Custom Fabrication',
        description: 'Made to your exact specifications',
        icon: Star
      },
      {
        title: 'Installation Included',
        description: 'Professional setup service',
        icon: CheckCircle2
      },
      {
        title: 'Durable Materials',
        description: 'Weather-resistant options',
        icon: Clock
      }
    ],
    services: [
      {
        name: 'Shop Signs',
        description: 'Illuminated and non-lit options',
        startingPrice: '$200',
        turnaround: '1-2 weeks',
        popular: true
      },
      {
        name: 'Vehicle Wraps',
        description: 'Full or partial vehicle branding',
        startingPrice: '$400',
        turnaround: '3-5 days',
        popular: true
      },
      {
        name: 'Banners & Flags',
        description: 'Indoor and outdoor banners',
        startingPrice: '$50',
        turnaround: '1-2 days',
        popular: false
      },
      {
        name: 'Display Stands',
        description: 'Pop-up and roll-up banners',
        startingPrice: '$80',
        turnaround: '2-3 days',
        popular: false
      }
    ],
    benefits: [
      'Professional design included',
      'Site survey before installation',
      'Quality vinyl and materials',
      'Warranty on installations',
      'Maintenance services available',
      'Fast turnaround times'
    ],
    testimonial: {
      text: "Our new shop sign increased foot traffic by 60%. Worth every dollar!",
      author: "Michael T.",
      company: "Restaurant, Harare CBD"
    }
  },
  'payment-services': {
    title: 'Payment Services',
    tagline: 'Flexible payment options for your convenience',
    description: 'Multiple payment methods including EcoCash, mobile money, bank transfers, and flexible payment plans to make our services accessible to all businesses.',
    heroImage: '/images/hero/kaffie-co-DJb2MdMuzbU-unsplash.jpg',
    features: [
      {
        title: 'Multiple Options',
        description: 'Pay however you prefer',
        icon: CheckCircle2
      },
      {
        title: 'Secure Transactions',
        description: 'Safe and encrypted payments',
        icon: Star
      },
      {
        title: 'Payment Plans',
        description: 'Installments for large orders',
        icon: DollarSign
      }
    ],
    services: [
      {
        name: 'EcoCash',
        description: 'Instant mobile money payments',
        startingPrice: 'No fees',
        turnaround: 'Instant',
        popular: true
      },
      {
        name: 'Bank Transfer',
        description: 'Direct bank deposits',
        startingPrice: 'No fees',
        turnaround: '24 hours',
        popular: true
      },
      {
        name: 'Payment Plans',
        description: 'Split payments over 3 months',
        startingPrice: 'Orders $500+',
        turnaround: 'Flexible',
        popular: false
      },
      {
        name: 'Cash on Delivery',
        description: 'Pay when you receive',
        startingPrice: 'Harare only',
        turnaround: 'Instant',
        popular: false
      }
    ],
    benefits: [
      'No hidden charges',
      'Instant payment confirmation',
      'Secure payment processing',
      'Invoice management',
      'Flexible terms for bulk orders',
      'Multiple currency options'
    ],
    testimonial: {
      text: "Payment plans made it easy to afford quality branding. Great service!",
      author: "Grace M.",
      company: "Beauty Salon, Harare"
    }
  }
};

const ServicesDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDetails[slug] : null;
  const { openCalculator } = useQuoteCalculator();

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={service.title}
        description={service.description}
        keywords={`${service.title}, ${slug} harare, ${slug} zimbabwe, professional ${slug} services`}
        canonical={`https://sohoconnect.co.zw/services/${slug}`}
        ogImage={service.heroImage}
      />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Breadcrumbs />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-4 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${service.heroImage})`
        }}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/80 
                                          hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {service.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            {service.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#128C7E] gap-2"
              onClick={() => {
                trackWhatsAppClick('service_detail_hero', `/services/${slug}`);
                openCalculator({
                  trigger: 'whatsapp_interest',
                  onComplete: (formData) => {
                    const message = encodeURIComponent(
                      `Hi! I just requested a quote for ${service.title}. Services: ${formData.services.join(', ')}`
                    );
                    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${message}`, '_blank');
                  }
                });
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Get Free Quote
            </Button>
            <a href="tel:+263714570414">
              <Button size="lg" variant="secondary" className="gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <p className="text-xl text-gray-700 leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our {service.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.features.map((feature: any, idx: number) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our {service.title} Options
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {service.services.map((item: any, idx: number) => (
              <Card key={idx} className={`hover:shadow-xl transition-all ${
                item.popular ? 'border-2 border-primary' : ''
              }`}>
                <CardContent className="p-6">
                  {item.popular && (
                    <span className="inline-block bg-primary text-white text-xs px-3 py-1 
                                     rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <div>
                      <div className="text-sm text-gray-500">Starting from</div>
                      <div className="text-2xl font-bold text-primary">{item.startingPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Turnaround</div>
                      <div className="font-semibold text-gray-900">{item.turnaround}</div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      trackWhatsAppClick('service_detail_card', `/services/${slug}`);
                      openCalculator({
                        trigger: 'whatsapp_interest',
                        onComplete: (formData) => {
                          const message = encodeURIComponent(
                            `Hi! I just requested a quote for ${item.name} (${service.title}). Services: ${formData.services.join(', ')}`
                          );
                          window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${message}`, '_blank');
                        }
                      });
                    }}
                  >
                    Get Quote for {item.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What You Get
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {service.benefits.map((benefit: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg 
                                        shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          
          <blockquote className="text-2xl font-medium text-gray-900 mb-6 italic">
            "{service.testimonial.text}"
          </blockquote>
          
          <div className="text-gray-700">
            <div className="font-bold">{service.testimonial.author}</div>
            <div>{service.testimonial.company}</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get your free quote now. No obligation, fast response guaranteed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              onClick={() => {
                trackWhatsAppClick('service_detail_final_cta', `/services/${slug}`);
                openCalculator({
                  trigger: 'whatsapp_interest',
                  onComplete: (formData) => {
                    const message = encodeURIComponent(
                      `Hi! I just requested a quote for ${service.title}. Services: ${formData.services.join(', ')}`
                    );
                    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${message}`, '_blank');
                  }
                });
              }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </Button>
            <a href="tel:+263714570414">
              <Button size="lg" variant="outline" className="border-white text-white
                                                              hover:bg-white hover:text-primary gap-2">
                <Phone className="w-5 h-5" />
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

export default ServicesDetail;

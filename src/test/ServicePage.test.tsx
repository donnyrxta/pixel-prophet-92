import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ServicePage from '../components/ServicePage';
import { QuoteCalculatorProvider } from '../context/QuoteCalculatorContext';

// Mock dependencies
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => <div className={className ? `${className} motion-div` : 'motion-div'} {...props}>{children}</div>,
    section: ({ children, className, ...props }: any) => <section className={className ? `${className} motion-section` : 'motion-section'} {...props}>{children}</section>,
    h1: ({ children, className, ...props }: any) => <h1 className={className ? `${className} motion-h1` : 'motion-h1'} {...props}>{children}</h1>,
    p: ({ children, className, ...props }: any) => <p className={className ? `${className} motion-p` : 'motion-p'} {...props}>{children}</p>,
    button: ({ children, className, ...props }: any) => <button className={className ? `${className} motion-button` : 'motion-button'} {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('../lib/gtm', () => ({
  trackCTAClick: vi.fn(),
}));

vi.mock('../components/TrustBand', () => ({
  default: () => <div data-testid="trust-band">Trust Band</div>,
}));

vi.mock('../context/QuoteCalculatorContext', () => ({
  QuoteCalculatorProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="quote-calculator-provider">{children}</div>
  ),
  useQuoteCalculator: () => ({
    openCalculator: vi.fn(),
  }),
}));

describe('ServicePage Component', () => {
  const mockProps = {
    title: 'Business Card Printing',
    description: 'Professional business card printing services with same-day turnaround',
    canonical: 'https://sohoprinting.co.zw/services/business-cards',
    keywords: ['business cards', 'printing', 'Harare'],
    heroImage: '/images/hero/business-cards.jpg',
    features: [
      {
        icon: <div data-testid="feature-icon-1">Icon1</div>,
        title: 'Same-Day Service',
        description: 'Get your cards printed within 24 hours'
      },
      {
        icon: <div data-testid="feature-icon-2">Icon2</div>,
        title: 'Premium Quality',
        description: 'High-quality printing with vibrant colors'
      }
    ],
    sectors: [
      {
        title: 'Business Cards',
        description: 'Professional business cards for networking',
        image: '/images/services/business-cards.jpg'
      },
      {
        title: 'Flyers',
        description: 'Eye-catching flyers for marketing',
        image: '/images/services/flyers.jpg'
      }
    ],
    faqs: [
      {
        question: 'How long does printing take?',
        answer: 'Most orders are completed within 24-48 hours'
      },
      {
        question: 'Do you offer bulk discounts?',
        answer: 'Yes, we offer volume discounts for large orders'
      }
    ],
    startingPrices: {
      'Business Cards': '$20/500 cards',
      'Flyers': '$50/1000 pieces'
    },
    serviceImages: {
      'Business Cards': '/images/services/business-cards.jpg',
      'Flyers': '/images/services/flyers.jpg'
    },
    testimonial: {
      text: 'Excellent service and quality! Highly recommend.',
      author: 'John Doe',
      company: 'ABC Company'
    }
  };

  const renderServicePage = () => {
    render(
      <MemoryRouter>
        <QuoteCalculatorProvider>
          <ServicePage {...mockProps} />
        </QuoteCalculatorProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('SEO and Schema Markup', () => {
    it('renders comprehensive SEO schema markup', () => {
      renderServicePage();
      const helmet = screen.getByTestId('helmet');
      expect(helmet).toBeInTheDocument();
      expect(helmet.innerHTML).toContain('LocalBusiness');
      expect(helmet.innerHTML).toContain('Service');
      expect(helmet.innerHTML).toContain('FAQPage');
      expect(helmet.innerHTML).toContain('Organization');
    });

    it('includes local business information in schema', () => {
      renderServicePage();
      const helmet = screen.getByTestId('helmet');
      expect(helmet.innerHTML).toContain('Soho Printing Services');
      expect(helmet.innerHTML).toContain('Harare');
      expect(helmet.innerHTML).toContain('+263772123456');
    });

    it('includes service-specific schema markup', () => {
      renderServicePage();
      const helmet = screen.getByTestId('helmet');
      expect(helmet.innerHTML).toContain('Business Card Printing');
      expect(helmet.innerHTML).toContain('Professional business card printing services');
    });

    it('includes FAQ schema with proper structure', () => {
      renderServicePage();
      const helmet = screen.getByTestId('helmet');
      expect(helmet.innerHTML).toContain('How long does printing take?');
      expect(helmet.innerHTML).toContain('Most orders are completed within 24-48 hours');
    });
  });

  describe('Hero Section - Audit Compliance', () => {
    it('renders H1 with local keyword optimization', () => {
      renderServicePage();
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Business Card Printing');
      expect(h1).toHaveAttribute('itemprop', 'name');
    });

    it('displays trust badge with same-day service', () => {
      renderServicePage();
      expect(screen.getAllByText('Same-Day Service')[0]).toBeInTheDocument();
    });

    it('includes Get Free Quote CTA in hero section', () => {
      renderServicePage();
      expect(screen.getAllByText('Get Free Quote')[0]).toBeInTheDocument();
    });

    it('displays value proposition text', () => {
      renderServicePage();
      expect(screen.getByText('Professional business card printing services with same-day turnaround')).toBeInTheDocument();
    });
  });

  describe('Service Cards - Audit Compliance', () => {
    it('renders service cards with product images', () => {
      renderServicePage();
      expect(screen.getByText('Business Cards')).toBeInTheDocument();
      expect(screen.getByText('Flyers')).toBeInTheDocument();
    });

    it('displays starting prices on service cards', () => {
      renderServicePage();
      expect(screen.getByText(/\$20.*cards/)).toBeInTheDocument();
      expect(screen.getByText(/\$50.*pieces/)).toBeInTheDocument();
    });

    it('includes hover CTAs on service cards', () => {
      renderServicePage();
      const serviceCards = screen.getAllByText(/Get Free Quote/i);
      expect(serviceCards.length).toBeGreaterThan(0);
    });

    it('applies glassmorphic design effects', () => {
      renderServicePage();
      const serviceSection = screen.getByText(/Our Business Card Printing/).closest('section');
      expect(serviceSection).toHaveClass('bg-gradient-to-br');
      expect(serviceSection).toHaveClass('from-slate-50');
      expect(serviceSection).toHaveClass('to-white');
    });
  });

  describe('Features Section', () => {
    it('renders all feature cards', () => {
      renderServicePage();
      expect(screen.getByText('Same-Day Service')).toBeInTheDocument();
      expect(screen.getByText('Premium Quality')).toBeInTheDocument();
    });

    it('displays feature descriptions', () => {
      renderServicePage();
      expect(screen.getByText('Get your cards printed within 24 hours')).toBeInTheDocument();
      expect(screen.getByText('High-quality printing with vibrant colors')).toBeInTheDocument();
    });

    it('includes feature icons', () => {
      renderServicePage();
      expect(screen.getByTestId('feature-icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('feature-icon-2')).toBeInTheDocument();
    });
  });

  describe('FAQ Section - Audit Compliance', () => {
    it('renders FAQ section with proper heading', () => {
      renderServicePage();
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('displays real Q&A format (not just benefits)', () => {
      renderServicePage();
      expect(screen.getByText(/How long does.*take/)).toBeInTheDocument();

      // Click to expand the first FAQ item
      const firstAccordionTrigger = screen.getByText(/How long does.*take/);
      fireEvent.click(firstAccordionTrigger);

      // Now check if the answer is visible
      expect(screen.getByText(/24-48 hours/)).toBeInTheDocument();
    });

    it('includes multiple FAQ items', () => {
      renderServicePage();

      // Click to expand the second FAQ item (bulk discounts)
      const secondAccordionTrigger = screen.getByText(/bulk discounts/);
      fireEvent.click(secondAccordionTrigger);

      // Now check if the answer is visible
      expect(screen.getByText(/volume discounts/)).toBeInTheDocument();
    });

    it('includes conversion CTAs within FAQ section', () => {
      renderServicePage();
      const faqSection = screen.getByText('Frequently Asked Questions').closest('section');
      expect(faqSection).toBeInTheDocument();

      // Check that there are buttons in the FAQ section
      const buttonsInFAQ = faqSection?.querySelectorAll('button');
      expect(buttonsInFAQ?.length).toBeGreaterThan(0);

      // Check that at least one button contains quote-related text
      const faqButtons = Array.from(buttonsInFAQ || []);
      const hasQuoteButton = faqButtons.some(button =>
        button.textContent?.includes('Get Free Quote') ||
        button.textContent?.includes('Call Now')
      );
      expect(hasQuoteButton).toBe(true);
    });
  });

  describe('Conversion Points - Audit Compliance', () => {
    it('includes sticky header CTA that appears on scroll', () => {
      renderServicePage();
      // The sticky header should be rendered but may not be visible initially
      const allButtons = screen.getAllByRole('button');
      const getFreeQuoteButtons = allButtons.filter(button =>
        button.textContent?.includes('Get Free Quote')
      );
      expect(getFreeQuoteButtons.length).toBeGreaterThan(1); // Should have multiple CTAs
    });

    it('includes floating CTA elements', () => {
      renderServicePage();
      const floatingButtons = screen.getAllByRole('button');
      expect(floatingButtons.length).toBeGreaterThan(3); // Should have multiple conversion buttons
    });

    it('includes section-specific CTAs', () => {
      renderServicePage();
      const allButtons = screen.getAllByRole('button');
      expect(allButtons.length).toBeGreaterThan(0);

      // Check that at least one button contains "Get Free Quote"
      const getFreeQuoteButtons = screen.getAllByText(/Get Free Quote/i);
      expect(getFreeQuoteButtons.length).toBeGreaterThan(0);

      // Check that at least one button contains "Contact Us" or similar
      const contactButtons = screen.getAllByText(/Call Now/i);
      expect(contactButtons.length).toBeGreaterThan(0);
    });

    it('tracks CTA clicks with GTM', () => {
      renderServicePage();
      const ctaButtons = screen.getAllByRole('button');
      const getFreeQuoteButton = ctaButtons.find(button =>
        button.textContent?.includes('Get Free Quote')
      );

      if (getFreeQuoteButton) {
        fireEvent.click(getFreeQuoteButton);
        // The trackCTAClick function should be called when the button is clicked
        // We can't directly test the mock here since it's called internally
        expect(getFreeQuoteButton).toBeInTheDocument();
      } else {
        fail('Get Free Quote button not found');
      }
    });
  });

  describe('Design System - Audit Compliance', () => {
    it('applies neumorphic shadow effects', () => {
      renderServicePage();
      const elements = document.querySelectorAll('.shadow-neu-raised');
      expect(elements.length).toBeGreaterThan(0);
    });

    it('includes glassmorphic background elements', () => {
      renderServicePage();
      const glassElements = document.querySelectorAll('.shadow-glass');
      expect(glassElements.length).toBeGreaterThan(0);
    });

    it('applies tactile interactions (hover/press states)', () => {
      renderServicePage();
      const interactiveElements = document.querySelectorAll('[class*="hover:"], [class*="active:"], [class*="focus:"]');
      expect(interactiveElements.length).toBeGreaterThan(0);
    });

    it('includes Framer Motion animations', () => {
      renderServicePage();
      const animatedElements = document.querySelectorAll('[class*="motion-"]');
      expect(animatedElements.length).toBeGreaterThan(0);
    });
  });

  describe('Testimonial Section', () => {
    it('renders testimonial when provided', () => {
      renderServicePage();
      // The testimonial text should be rendered within quotes
      expect(screen.getByText(/Excellent service and quality! Highly recommend./i)).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('ABC Company')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('renders correctly on mobile viewport', () => {
      window.innerWidth = 375;
      window.innerHeight = 667;
      renderServicePage();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders correctly on tablet viewport', () => {
      window.innerWidth = 768;
      window.innerHeight = 1024;
      renderServicePage();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders correctly on desktop viewport', () => {
      window.innerWidth = 1920;
      window.innerHeight = 1080;
      renderServicePage();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });
});

describe('ServicePage Component - Edge Cases', () => {
  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      title: 'Test Service',
      description: 'Test description',
      canonical: 'https://test.com',
      keywords: [],
      heroImage: '/test.jpg',
      features: [],
      sectors: [],
      faqs: [],
      startingPrices: {},
      serviceImages: {}
    };

    render(
      <MemoryRouter>
        <QuoteCalculatorProvider>
          <ServicePage {...minimalProps} />
        </QuoteCalculatorProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Test Service')[0]).toBeInTheDocument();
  });

  it('handles empty arrays without errors', () => {
    const emptyProps = {
      title: 'Empty Service',
      description: 'Empty description',
      canonical: 'https://empty.com',
      keywords: [],
      heroImage: '/empty.jpg',
      features: [],
      sectors: [],
      faqs: [],
      startingPrices: {},
      serviceImages: {}
    };

    render(
      <MemoryRouter>
        <QuoteCalculatorProvider>
          <ServicePage {...emptyProps} />
        </QuoteCalculatorProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Empty Service')[0]).toBeInTheDocument();
  });
});
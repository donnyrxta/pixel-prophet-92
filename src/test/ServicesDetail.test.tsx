import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ServicesDetail from '@/pages/ServicesDetail';
import ServicePage from '@/components/ServicePage';

// Mock ServicePage component
vi.mock('@/components/ServicePage', () => ({
  default: ({ title, description, canonical, keywords, heroImage, features, sectors, faqs, startingPrices, serviceImages, testimonial }: any) => (
    <div data-testid="service-page">
      <h1>{title}</h1>
      <p>{description}</p>
      <div data-testid="canonical">{canonical}</div>
      <div data-testid="keywords">{keywords.join(', ')}</div>
      <div data-testid="hero-image">{heroImage}</div>
      <div data-testid="features-count">{features.length}</div>
      <div data-testid="sectors-count">{sectors.length}</div>
      <div data-testid="faqs-count">{faqs.length}</div>
      <div data-testid="starting-prices">{JSON.stringify(startingPrices)}</div>
      <div data-testid="service-images">{JSON.stringify(serviceImages)}</div>
      <div data-testid="testimonial">{testimonial?.text}</div>
    </div>
  )
}));

// Mock QuoteCalculatorContext
vi.mock('@/context/QuoteCalculatorContext', () => ({
  QuoteCalculatorProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="quote-calculator-provider">{children}</div>
  ),
  useQuoteCalculator: () => ({
    isOpen: false,
    openQuoteCalculator: vi.fn(),
    closeQuoteCalculator: vi.fn(),
  }),
}));

const renderWithRouter = (route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/services/:slug" element={<ServicesDetail />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ServicesDetail', () => {
  it('renders printing service with correct data mapping', () => {
    renderWithRouter('/services/printing');
    
    const servicePage = screen.getByTestId('service-page');
    expect(servicePage).toBeInTheDocument();
    
    // Verify title and description
    expect(screen.getByText('Printing Services')).toBeInTheDocument();
    expect(screen.getByText('High-quality printing services with fast turnaround times. From business cards to large-format banners, we handle all your printing needs with precision and care.')).toBeInTheDocument();
    
    // Verify SEO data
    expect(screen.getByTestId('canonical')).toHaveTextContent('https://sohoconnect.co.zw/services/printing');
    expect(screen.getByTestId('keywords')).toHaveTextContent('Printing Services, printing harare, printing zimbabwe, professional printing services');
    expect(screen.getByTestId('hero-image')).toHaveTextContent('/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg');
    
    // Verify features mapping
    expect(screen.getByTestId('features-count')).toHaveTextContent('3');
    
    // Verify services mapping to sectors
    expect(screen.getByTestId('sectors-count')).toHaveTextContent('4');
    
    // Verify FAQs mapping
    expect(screen.getByTestId('faqs-count')).toHaveTextContent('4');
    
    // Verify starting prices mapping
    const startingPrices = JSON.parse(screen.getByTestId('starting-prices').textContent || '{}');
    expect(startingPrices['Business Cards']).toBe('$20/500 cards');
    expect(startingPrices['Brochures & Flyers']).toBe('$50/1000 pieces');
    expect(startingPrices['Posters & Banners']).toBe('$30/sqm');
    expect(startingPrices['Stationery']).toBe('$40/500 pieces');
    
    // Verify service images mapping
    const serviceImages = JSON.parse(screen.getByTestId('service-images').textContent || '{}');
    expect(serviceImages['Business Cards']).toBe('/images/services/printing/business-cards.jpg');
    expect(serviceImages['Brochures & Flyers']).toBe('/images/services/printing/brochures-&-flyers.jpg');
    expect(serviceImages['Posters & Banners']).toBe('/images/services/printing/posters-&-banners.jpg');
    expect(serviceImages['Stationery']).toBe('/images/services/printing/stationery.jpg');
    
    // Verify testimonial
    expect(screen.getByTestId('testimonial')).toHaveTextContent("Soho Connect delivered 1000 brochures in 48 hours. The quality exceeded our expectations!");
  });

  it('renders branding service with correct data mapping', () => {
    renderWithRouter('/services/branding');
    
    // Verify title and description
    expect(screen.getByText('Branding & Design')).toBeInTheDocument();
    expect(screen.getByText('Strategic brand identity design that captures your vision and resonates with your target audience. Complete branding solutions from concept to execution.')).toBeInTheDocument();
    
    // Verify SEO data
    expect(screen.getByTestId('canonical')).toHaveTextContent('https://sohoconnect.co.zw/services/branding');
    expect(screen.getByTestId('keywords')).toHaveTextContent('Branding & Design, branding harare, branding zimbabwe, professional branding services');
    
    // Verify starting prices mapping
    const startingPrices = JSON.parse(screen.getByTestId('starting-prices').textContent || '{}');
    expect(startingPrices['Logo Design']).toBe('$150');
    expect(startingPrices['Complete Brand Identity']).toBe('$500');
    
    // Verify service images mapping
    const serviceImages = JSON.parse(screen.getByTestId('service-images').textContent || '{}');
    expect(serviceImages['Logo Design']).toBe('/images/services/branding/logo-design.jpg');
    expect(serviceImages['Complete Brand Identity']).toBe('/images/services/branding/complete-brand-identity.jpg');
    
    // Verify testimonial
    expect(screen.getByTestId('testimonial')).toHaveTextContent("The branding transformed our business. Sales increased 40% after the rebrand!");
  });

  it('renders digital-marketing service with correct data mapping', () => {
    renderWithRouter('/services/digital-marketing');
    
    // Verify title and description
    expect(screen.getByText('Digital Marketing')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive digital marketing services that drive traffic, generate leads, and increase sales. From social media to SEO, we handle your online presence.')).toBeInTheDocument();
    
    // Verify SEO data
    expect(screen.getByTestId('canonical')).toHaveTextContent('https://sohoconnect.co.zw/services/digital-marketing');
    expect(screen.getByTestId('keywords')).toHaveTextContent('Digital Marketing, digital-marketing harare, digital-marketing zimbabwe, professional digital-marketing services');
    
    // Verify starting prices mapping
    const startingPrices = JSON.parse(screen.getByTestId('starting-prices').textContent || '{}');
    expect(startingPrices['Social Media Management']).toBe('$200/month');
    expect(startingPrices['SEO Services']).toBe('$300/month');
    
    // Verify service images mapping
    const serviceImages = JSON.parse(screen.getByTestId('service-images').textContent || '{}');
    expect(serviceImages['Social Media Management']).toBe('/images/services/digital-marketing/social-media-management.jpg');
    expect(serviceImages['SEO Services']).toBe('/images/services/digital-marketing/seo-services.jpg');
    
    // Verify testimonial
    expect(screen.getByTestId('testimonial')).toHaveTextContent("Our online sales tripled in 3 months. Soho Connect knows digital marketing!");
  });

  it('renders signage service with correct data mapping', () => {
    renderWithRouter('/services/signage');
    
    // Verify title and description
    expect(screen.getByText('Signage & Displays')).toBeInTheDocument();
    expect(screen.getByText('Custom signage and display solutions for businesses. From shop signs to vehicle wraps, we create eye-catching displays that attract customers.')).toBeInTheDocument();
    
    // Verify SEO data
    expect(screen.getByTestId('canonical')).toHaveTextContent('https://sohoconnect.co.zw/services/signage');
    expect(screen.getByTestId('keywords')).toHaveTextContent('Signage & Displays, signage harare, signage zimbabwe, professional signage services');
    
    // Verify starting prices mapping
    const startingPrices = JSON.parse(screen.getByTestId('starting-prices').textContent || '{}');
    expect(startingPrices['Shop Signs']).toBe('$200');
    expect(startingPrices['Vehicle Wraps']).toBe('$400');
    
    // Verify service images mapping
    const serviceImages = JSON.parse(screen.getByTestId('service-images').textContent || '{}');
    expect(serviceImages['Shop Signs']).toBe('/images/services/signage/shop-signs.jpg');
    expect(serviceImages['Vehicle Wraps']).toBe('/images/services/signage/vehicle-wraps.jpg');
    
    // Verify testimonial
    expect(screen.getByTestId('testimonial')).toHaveTextContent("Our new shop sign increased foot traffic by 60%. Worth every dollar!");
  });

  it('renders payment-services with correct data mapping', () => {
    renderWithRouter('/services/payment-services');
    
    // Verify title and description
    expect(screen.getByText('Payment Services')).toBeInTheDocument();
    expect(screen.getByText('Multiple payment methods including EcoCash, mobile money, bank transfers, and flexible payment plans to make our services accessible to all businesses.')).toBeInTheDocument();
    
    // Verify SEO data
    expect(screen.getByTestId('canonical')).toHaveTextContent('https://sohoconnect.co.zw/services/payment-services');
    expect(screen.getByTestId('keywords')).toHaveTextContent('Payment Services, payment-services harare, payment-services zimbabwe, professional payment-services');
    
    // Verify starting prices mapping
    const startingPrices = JSON.parse(screen.getByTestId('starting-prices').textContent || '{}');
    expect(startingPrices['EcoCash']).toBe('No fees');
    expect(startingPrices['Bank Transfer']).toBe('No fees');
    
    // Verify service images mapping
    const serviceImages = JSON.parse(screen.getByTestId('service-images').textContent || '{}');
    expect(serviceImages['EcoCash']).toBe('/images/services/payment-services/ecocash.jpg');
    expect(serviceImages['Bank Transfer']).toBe('/images/services/payment-services/bank-transfer.jpg');
    
    // Verify testimonial
    expect(screen.getByTestId('testimonial')).toHaveTextContent("Payment plans made it easy to afford quality branding. Great service!");
  });

  it('handles invalid service slug gracefully', () => {
    renderWithRouter('/services/invalid-service');
    
    // Should not render ServicePage for invalid slug
    expect(screen.queryByTestId('service-page')).not.toBeInTheDocument();
    
    // Should show not found message
    expect(screen.getByText('Service not found')).toBeInTheDocument();
    
    // Should have back button
    expect(screen.getByText('Back to Services')).toBeInTheDocument();
  });

  it('generates correct dynamic image paths for services with special characters', () => {
    renderWithRouter('/services/printing');
    
    const serviceImages = JSON.parse(screen.getByTestId('service-images').textContent || '{}');
    
    // Test that special characters are properly handled in URL paths
    expect(serviceImages['Brochures & Flyers']).toBe('/images/services/printing/brochures-&-flyers.jpg');
    expect(serviceImages['Posters & Banners']).toBe('/images/services/printing/posters-&-banners.jpg');
    expect(serviceImages['Business Cards']).toBe('/images/services/printing/business-cards.jpg');
  });

  it('maps service benefits to FAQ format correctly', () => {
    renderWithRouter('/services/printing');
    
    const faqs = JSON.parse(screen.getByTestId('faqs-count').textContent || '0');
    expect(faqs).toBe(4); // Should have 4 FAQ items mapped from benefits
  });

  it('includes all required SEO keywords for each service', () => {
    renderWithRouter('/services/printing');
    
    const keywords = screen.getByTestId('keywords').textContent;
    expect(keywords).toContain('Printing Services');
    expect(keywords).toContain('printing harare');
    expect(keywords).toContain('printing zimbabwe');
    expect(keywords).toContain('professional printing services');
  });

  it('passes testimonial data correctly to ServicePage', () => {
    renderWithRouter('/services/branding');
    
    const testimonial = screen.getByTestId('testimonial').textContent;
    expect(testimonial).toBe("The branding transformed our business. Sales increased 40% after the rebrand!");
  });
});
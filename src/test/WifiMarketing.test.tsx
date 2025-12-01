import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import WifiMarketing from '../pages/WifiMarketing';
import { WebstoreCartProvider } from '../context/WebstoreCartContext';

// Mock dependencies
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock the cart context
vi.mock('../context/WebstoreCartContext', async () => {
  const actual = await vi.importActual('../context/WebstoreCartContext');
  return {
    ...actual,
    WebstoreCartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useWebstoreCart: () => ({
      items: [],
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      total: 0,
      itemCount: 0,
    }),
  };
});

describe('WifiMarketing Page', () => {
  const renderPage = () => {
    render(
      <MemoryRouter>
        <WebstoreCartProvider>
          <WifiMarketing />
        </WebstoreCartProvider>
      </MemoryRouter>
    );
  };

  it('renders the hero section correctly', () => {
    renderPage();
    // Use more specific queries or getAllByText if duplication exists
    expect(screen.getAllByText(/Turn Free WiFi Into/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Measurable Growth/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Request a Demo/i)[0]).toBeInTheDocument();
  });

  it('displays all value proposition features', () => {
    renderPage();
    expect(screen.getByText('Captive Portals')).toBeInTheDocument();
    expect(screen.getByText('Customer Profiles')).toBeInTheDocument();
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Compliance & Security')).toBeInTheDocument();
  });

  it('renders sector solutions', () => {
    renderPage();
    expect(screen.getByText('Cafés & Restaurants')).toBeInTheDocument();
    expect(screen.getByText('Retail Stores')).toBeInTheDocument();
    expect(screen.getByText('Hospitality')).toBeInTheDocument();
    expect(screen.getByText('Co-working Spaces')).toBeInTheDocument();
  });

  it('shows the trust & metrics section', () => {
    renderPage();
    expect(screen.getAllByText(/Proven Results in/i)[0]).toBeInTheDocument();
    expect(screen.getByText('300% Database Growth')).toBeInTheDocument();
    expect(screen.getByText('25% Return Customer Uplift')).toBeInTheDocument();
  });

  it('renders the FAQ section', () => {
    renderPage();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Is this compliant with Zimbabwean data laws?')).toBeInTheDocument();
  });
});

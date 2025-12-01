import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header';
import { WebstoreCartProvider } from '../context/WebstoreCartContext';

// Mock the cart context provider to avoid actual implementation issues during testing
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

describe('Header Component', () => {
  const renderHeader = () => {
    render(
      <MemoryRouter>
        <WebstoreCartProvider>
          <Header />
        </WebstoreCartProvider>
      </MemoryRouter>
    );
  };

  it('renders the logo and business name', () => {
    renderHeader();
    const logo = screen.getByAltText('Soho Connect Logo');
    expect(logo).toBeInTheDocument();
  });

  it('contains the navigation links including WiFi Marketing', () => {
    renderHeader();
    // Use getAllByText because links appear in both desktop and mobile menus
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Services')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Webstore')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
  });

  it('shows WiFi Marketing in the Services dropdown', () => {
    renderHeader();
    // WiFi Marketing link exists in the DOM (dropdown)
    const wifiLinks = screen.getAllByText('WiFi Marketing');
    expect(wifiLinks.length).toBeGreaterThan(0);
    expect(wifiLinks[0].closest('a')).toHaveAttribute('href', '/services/wifi-marketing');
  });

  it('renders the "Get Instant Quote" CTA', () => {
    renderHeader();
    const ctaButtons = screen.getAllByText('Get Instant Quote');
    expect(ctaButtons.length).toBeGreaterThan(0);
    expect(ctaButtons[0]).toBeInTheDocument();
  });
});

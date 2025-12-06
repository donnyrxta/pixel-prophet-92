import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WifiMarketingHero from '../components/WifiMarketingHero';

// Mock AnimatePresence to render children immediately
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('WifiMarketingHero Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the first slide initially', () => {
    render(<WifiMarketingHero />);
    expect(screen.getByText(/Turn Free WiFi Into/i)).toBeInTheDocument();
  });

  it('advances to the next slide automatically', () => {
    render(<WifiMarketingHero />);
    
    // Fast-forward time by 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Check for second slide content
    expect(screen.getByText(/Build a Verified/i)).toBeInTheDocument();
  });

  it('navigates slides manually', () => {
    render(<WifiMarketingHero />);
    
    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);

    expect(screen.getByText(/Build a Verified/i)).toBeInTheDocument();
  });

  it('renders the "View Pricing" button and handles click', () => {
    render(<WifiMarketingHero />);
    const pricingBtn = screen.getByText('View Pricing');
    expect(pricingBtn).toBeInTheDocument();

    // Mock getElementById and scrollIntoView
    const scrollIntoViewMock = vi.fn();
    const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    } as any);

    fireEvent.click(pricingBtn);

    expect(getElementByIdSpy).toHaveBeenCalledWith('pricing');
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

    getElementByIdSpy.mockRestore();
  });

  it('stops auto-rotation after manual interaction', () => {
    render(<WifiMarketingHero />);
    
    // Initial auto-rotation
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText(/Build a Verified/i)).toBeInTheDocument();

    // Manual interaction (click next)
    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);
    expect(screen.getByText(/Bring Customers Back/i)).toBeInTheDocument();

    // Wait another 5 seconds - should NOT advance if auto-play is stopped
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    // Should still be on the same slide (slide 3)
    expect(screen.getByText(/Bring Customers Back/i)).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<WifiMarketingHero />);
    
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
    
    const dots = screen.getAllByRole('button', { name: /Go to slide/i });
    expect(dots).toHaveLength(4);
    expect(dots[0]).toHaveAttribute('aria-current', 'true');
    expect(dots[1]).toHaveAttribute('aria-current', 'false');
  });
});

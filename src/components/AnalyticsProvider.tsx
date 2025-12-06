import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/gtm';

export const AnalyticsProvider = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(document.title, location.pathname);
  }, [location]);

  return null;
};

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/gtm';

/**
 * Custom hook to automatically track page views in GTM
 * when route changes in the SPA
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Get page title from document or generate from path
    const pageTitle = document.title || location.pathname;
    
    // Track the page view
    trackPageView(pageTitle, location.pathname);
  }, [location]);
};

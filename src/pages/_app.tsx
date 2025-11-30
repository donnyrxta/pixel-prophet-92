import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ConsentBanner } from '../components/ConsentBanner';
import { AnalyticsProvider } from '../components/AnalyticsProvider';
import { ConsentProvider } from '../context/ConsentContext';

export default function App({ Component, pageProps }: AppProps) {
  // Global shell that injects analytics + consent and renders all pages.
  return (
    <ConsentProvider>
      <AnalyticsProvider />
      <Component {...pageProps} />
      <ConsentBanner />
    </ConsentProvider>
  );
}

import { useEffect } from 'react';
import Script from 'next/script';
import { useConsent } from '../context/ConsentContext';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function AnalyticsProvider() {
  // Injects GA4 and GTM when IDs are configured; keeps bundle clean otherwise.
  const { consent, ready } = useConsent();

  useEffect(() => {
    // dataLayer bootstrap for GTM if present.
    if (GTM_ID && consent.analytics && !(window as any).dataLayer) {
      (window as any).dataLayer = [];
      (window as any).dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    }
  }, [consent.analytics]);

  return (
    <>
      {ready && consent.analytics && GA_ID && (
        <>
          {/* GA4 config script */}
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: true });
            `}
          </Script>
        </>
      )}
      {ready && consent.analytics && GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}
    </>
  );
}

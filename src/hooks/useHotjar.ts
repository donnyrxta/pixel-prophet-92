import { useEffect } from 'react';

/**
 * Hook to initialize Hotjar tracking
 * Replace HJID and HJSV with actual values from Hotjar dashboard
 */
export const useHotjar = (hjid: number, hjsv: number) => {
  useEffect(() => {
    // @ts-ignore
    (function(h,o,t,j,a,r){
        // @ts-ignore
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        // @ts-ignore
        h._hjSettings={hjid:hjid,hjsv:hjsv};
        // @ts-ignore
        a=o.getElementsByTagName('head')[0];
        // @ts-ignore
        r=o.createElement('script');r.async=1;
        // @ts-ignore
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        // @ts-ignore
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  }, [hjid, hjsv]);
};

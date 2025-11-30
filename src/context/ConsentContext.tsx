import { createContext, useContext, useEffect, useState } from 'react';

type Consent = {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
};

const STORAGE_KEY = 'soho-consent';

const ConsentContext = createContext<{
  consent: Consent;
  setConsent: (c: Consent) => void;
  ready: boolean;
}>({
  consent: { analytics: false, marketing: false, necessary: true },
  setConsent: () => {},
  ready: false,
});

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // Provides consent state to both banner and analytics components.
  const [consent, setConsent] = useState<Consent>({
    analytics: false,
    marketing: false,
    necessary: true,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from storage on client.
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setConsent(JSON.parse(saved));
    }
    setReady(true);
  }, []);

  return <ConsentContext.Provider value={{ consent, setConsent, ready }}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  return useContext(ConsentContext);
}

export { STORAGE_KEY as CONSENT_STORAGE_KEY };

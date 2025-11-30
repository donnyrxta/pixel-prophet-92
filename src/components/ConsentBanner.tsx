import { useEffect, useState } from 'react';
import { CONSENT_STORAGE_KEY, useConsent } from '../context/ConsentContext';

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
};

export function ConsentBanner() {
  // Basic consent manager with marketing + analytics toggles and persistence.
  const [open, setOpen] = useState(false);
  const { consent, setConsent, ready } = useConsent();

  useEffect(() => {
    // Show banner only when no prior choice exists.
    if (ready) {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      setOpen(!saved);
    }
  }, [ready]);

  const persist = async (next: ConsentState) => {
    // Save locally for UX and send to API for compliance storage.
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
    setOpen(false);

    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...next, source: window.location.href }),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('consent save failed', error);
    }
  };

  if (!open) return null; // avoid rendering when consent is already set

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-3xl mx-auto rounded-2xl bg-white/80 backdrop-blur shadow-xl border border-white/60 p-4 sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">We respect your privacy</p>
            <p className="text-xs text-gray-700">
              We use necessary cookies for site stability, analytics to improve experience, and optional marketing to
              personalize offers. You can adjust anytime.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs text-gray-800">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) => setConsent((c) => ({ ...c, analytics: e.target.checked }))}
            />
            <span>Allow analytics</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))}
            />
            <span>Allow marketing</span>
          </label>
          <label className="flex items-center gap-2 opacity-70 cursor-not-allowed">
            <input type="checkbox" checked readOnly />
            <span>Necessary (required)</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-2 justify-end text-sm">
          <button
            className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800"
            onClick={() => persist({ ...consent, analytics: false, marketing: false })}
          >
            Decline non-essential
          </button>
          <button
            className="px-3 py-2 rounded-lg bg-black text-white"
            onClick={() => persist({ ...consent })}
          >
            Accept selected
          </button>
        </div>
      </div>
    </div>
  );
}

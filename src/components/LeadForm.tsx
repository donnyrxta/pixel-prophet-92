import { useState } from 'react';

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  category?: string;
};

export function LeadForm({ category }: { category?: string }) {
  // Lead capture form that posts to /api/lead and provides inline status feedback.
  const [payload, setPayload] = useState<LeadPayload>({
    name: '',
    email: '',
    phone: '',
    message: '',
    category,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source: window.location.href }),
      });
      setStatus('success'); // optimistic success for fast UX
      // Push event for GA4/GTM when available.
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_submit',
          email: payload.email,
          category: payload.category,
        });
      }
    } catch (error) {
      setStatus('error');
      // eslint-disable-next-line no-console
      console.error('lead submit failed', error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="Your name"
          value={payload.name}
          onChange={(e) => setPayload((p) => ({ ...p, name: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={payload.email}
          onChange={(e) => setPayload((p) => ({ ...p, email: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          placeholder="Phone (optional)"
          value={payload.phone}
          onChange={(e) => setPayload((p) => ({ ...p, phone: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
        <input
          placeholder="Category (optional)"
          value={payload.category || ''}
          onChange={(e) => setPayload((p) => ({ ...p, category: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>
      <textarea
        placeholder="What do you need?"
        value={payload.message}
        onChange={(e) => setPayload((p) => ({ ...p, message: e.target.value }))}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[120px]"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-black text-white disabled:opacity-70"
      >
        {status === 'loading' ? 'Sending…' : 'Send'}
      </button>
      {status === 'success' && <p className="text-green-700 text-sm">Thanks! Check your inbox for confirmation.</p>}
      {status === 'error' && (
        <p className="text-red-700 text-sm">Sorry, something went wrong. Please try again or email info@sohoconnect.co.zw</p>
      )}
    </form>
  );
}

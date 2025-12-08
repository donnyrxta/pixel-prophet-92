import { useState } from 'react';
import { useBrevoLead } from '@/hooks/useBrevoLead';

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  category?: string;
};

export function LeadForm({ category }: { category?: string }) {
  // Lead capture form that posts to Brevo CRM and provides inline status feedback.
  const [payload, setPayload] = useState<LeadPayload>({
    name: '',
    email: '',
    phone: '',
    message: '',
    category,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { captureLead } = useBrevoLead();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Split name into first/last
      const nameParts = payload.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const result = await captureLead({
        email: payload.email,
        firstName,
        lastName,
        phone: payload.phone,
        message: payload.message,
        services: payload.category ? [payload.category] : [],
        sourceForm: 'lead_form',
      });

      if (result.success) {
        setStatus('success');
        // Push event for GA4/GTM when available.
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'lead_submit',
            email: payload.email,
            category: payload.category,
          });
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
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
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={payload.email}
          onChange={(e) => setPayload((p) => ({ ...p, email: e.target.value }))}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          placeholder="Phone (optional)"
          value={payload.phone}
          onChange={(e) => setPayload((p) => ({ ...p, phone: e.target.value }))}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          placeholder="Category (optional)"
          value={payload.category || ''}
          onChange={(e) => setPayload((p) => ({ ...p, category: e.target.value }))}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <textarea
        placeholder="What do you need?"
        value={payload.message}
        onChange={(e) => setPayload((p) => ({ ...p, message: e.target.value }))}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px]"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-70 transition-colors"
      >
        {status === 'loading' ? 'Sending…' : 'Send'}
      </button>
      {status === 'success' && <p className="text-green-600 text-sm">Thanks! Check your inbox for confirmation.</p>}
      {status === 'error' && (
        <p className="text-destructive text-sm">Sorry, something went wrong. Please try again or email info@sohoconnect.co.zw</p>
      )}
    </form>
  );
}

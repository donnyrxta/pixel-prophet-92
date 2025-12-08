/**
 * Hook for capturing leads via Brevo CRM integration
 * Sends contact data to edge function which syncs with Brevo
 */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { BANTScore } from '@/lib/bantScoring';

export interface BrevoLeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  message?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  authority?: string;
  sourceForm: string;
  bantScore?: number;
  leadTier?: 'hot' | 'warm' | 'cold';
}

interface BrevoLeadResult {
  success: boolean;
  error?: string;
}

// Capture UTM parameters from URL
function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
  };
}

export function useBrevoLead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureLead = async (data: BrevoLeadData): Promise<BrevoLeadResult> => {
    setLoading(true);
    setError(null);

    try {
      const utmParams = getUTMParams();
      
      const payload = {
        ...data,
        ...utmParams,
        sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        referrerUrl: typeof document !== 'undefined' ? document.referrer : '',
        landingPage: typeof window !== 'undefined' ? window.location.pathname : '',
        consentText: 'I agree to receive communications from Soho Connect',
      };

      console.log('Capturing lead via Brevo:', data.sourceForm);

      const { data: result, error: fnError } = await supabase.functions.invoke('brevo-lead', {
        body: payload,
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to capture lead');
      }

      if (!result?.success) {
        throw new Error(result?.error || 'Failed to capture lead');
      }

      console.log('Lead captured successfully');
      return { success: true };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Lead capture error:', errorMessage);
      setError(errorMessage);
      return { success: false, error: errorMessage };

    } finally {
      setLoading(false);
    }
  };

  return {
    captureLead,
    loading,
    error,
  };
}

/**
 * Email sending hook for quote requests and contact forms
 * Integrates with Brevo (formerly Sendinblue) API via Vercel serverless function
 */

import { useState } from 'react';
import type { BANTScore } from '@/lib/bantScoring';

export interface EmailQuoteData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  budget: string;
  timeline: string;
  authority: string;
  additionalNotes?: string;
  metadata?: {
    bantScore: number;
    leadTier: 'hot' | 'warm' | 'cold';
    trigger: string;
    timestamp: string;
  };
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export function useSendEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuote = async (params: {
    data: EmailQuoteData;
    captchaToken?: string;
  }): Promise<SendEmailResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'quote',
          data: params.data,
          captchaToken: params.captchaToken
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      return {
        success: true,
        messageId: result.messageId
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendQuote,
    loading,
    error
  };
}
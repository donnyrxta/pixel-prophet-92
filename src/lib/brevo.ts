/**
 * Brevo API Integration Service
 * Provides CRM contact management and transactional email functionality
 */

import axios from 'axios';

interface BrevoContactAttributes {
  FIRSTNAME?: string;
  LASTNAME?: string;
  PHONE?: string;
  ADDRESS?: string;
  CITY?: string;
  STATE?: string;
  ZIPCODE?: string;
  COUNTRY?: string;
  [key: string]: string | undefined;
}

interface CreateBrevoContactParams {
  email: string;
  attributes?: BrevoContactAttributes;
  listIds?: number[];
}

interface SendBrevoEmailParams {
  toEmail: string;
  toName?: string;
  subject?: string;
  htmlContent?: string;
  templateId?: number;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

/**
 * Create or update a contact in Brevo CRM.
 *
 * When a lead form is submitted we use this helper to register the person
 * in the CRM. If the contact already exists the API will update their
 * attributes (controlled by updateEnabled=true).
 */
export async function createBrevoContact({
  email,
  attributes = {},
  listIds = [],
}: CreateBrevoContactParams): Promise<any> {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_BREVO_API_KEY environment variable is not defined');
  }

  const payload = {
    email,
    attributes,
    listIds,
    updateEnabled: true,
  };

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/contacts',
      payload,
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating Brevo contact:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Send a transactional email via Brevo.
 *
 * You can supply either a templateId (if you have created a template in
 * Brevo) or raw HTML content. When using templates you can also pass
 * dynamic variables via the `params` property.
 */
export async function sendBrevoEmail({
  toEmail,
  toName = '',
  subject,
  htmlContent,
  templateId,
  params = {},
  headers = {},
}: SendBrevoEmailParams): Promise<any> {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_BREVO_API_KEY environment variable is not defined');
  }

  // Ensure at least htmlContent or templateId is provided
  if (!htmlContent && !templateId) {
    throw new Error('Either htmlContent or templateId must be provided');
  }

  const sendSmtpEmail = {
    sender: {
      name: import.meta.env.VITE_BREVO_SENDER_NAME || 'Soho Connect',
      email: import.meta.env.VITE_BREVO_SENDER_EMAIL || 'no-reply@sohoconnect.com',
    },
    to: [
      {
        email: toEmail,
        name: toName,
      },
    ],
    subject,
    htmlContent,
    templateId,
    params,
    headers,
  };

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      sendSmtpEmail,
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error sending Brevo email:', error.response?.data || error.message);
    throw error;
  }
}

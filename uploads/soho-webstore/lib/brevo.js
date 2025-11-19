import axios from 'axios';

/**
 * Create or update a contact in Brevo.
 *
 * When a lead form is submitted we use this helper on the server to
 * register the person in the CRM. If the contact already exists the
 * API will update their attributes (controlled by updateEnabled=true).
 *
 * @param {Object} params - Contact parameters.
 * @param {string} params.email - The email address for the new contact.
 * @param {Object} [params.attributes] - Additional contact attributes (first/last name, phone, etc).
 * @param {number[]} [params.listIds] - IDs of the Brevo lists to add the contact to.
 * @returns {Promise<Object>} Response data from Brevo API.
 */
export async function createBrevoContact({ email, attributes = {}, listIds = [] }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error('BREVO_API_KEY environment variable is not defined');
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
  } catch (error) {
    // Return error information for debugging without exposing sensitive details
    console.error('Error creating Brevo contact:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Send a transactional email via Brevo.
 *
 * You can supply either a templateId (if you have created a template in
 * Brevo) or raw HTML content. When using templates you can also pass
 * dynamic variables via the `params` property. See the Brevo docs for
 * additional options.
 *
 * @param {Object} payload - Message parameters.
 * @param {string} payload.toEmail - Recipient email address.
 * @param {string} payload.toName - Recipient name (optional).
 * @param {string} [payload.subject] - Email subject (required when using htmlContent).
 * @param {string} [payload.htmlContent] - HTML body for the email. Either this
 *   or templateId must be provided.
 * @param {number} [payload.templateId] - ID of an existing Brevo email template.
 * @param {Object} [payload.params] - Dynamic parameters for template substitution.
 * @param {Object} [payload.headers] - Optional additional SMTP headers.
 * @returns {Promise<Object>} Response data from Brevo API.
 */
export async function sendBrevoEmail({
  toEmail,
  toName = '',
  subject,
  htmlContent,
  templateId,
  params = {},
  headers = {},
}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error('BREVO_API_KEY environment variable is not defined');
  }
  // Ensure at least htmlContent or templateId is provided
  if (!htmlContent && !templateId) {
    throw new Error('Either htmlContent or templateId must be provided');
  }
  const sendSmtpEmail = {
    sender: {
      name: process.env.BREVO_SENDER_NAME || 'Soho Connect',
      email: process.env.BREVO_SENDER_EMAIL || 'no-reply@sohoconnect.com',
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
  } catch (error) {
    console.error('Error sending Brevo email:', error.response?.data || error.message);
    throw error;
  }
}

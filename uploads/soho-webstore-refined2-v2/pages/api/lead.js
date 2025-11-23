import { createBrevoContact, sendBrevoEmail } from '../../lib/brevo';

/**
 * API route for handling lead capture submissions.
 *
 * Expects a JSON payload with `firstName`, `lastName`, `email`, `phone`,
 * and an optional `message`. When invoked it will create/update the
 * contact in Brevo and send an acknowledgement email to the user. A
 * notification can also be sent to an internal sales inbox by adding
 * another call to sendBrevoEmail.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName = '', lastName = '', email, phone = '', message = '' } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    // Create or update the contact in Brevo CRM
    await createBrevoContact({
      email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        PHONE: phone,
        MESSAGE: message,
      },
      listIds: process.env.BREVO_LEAD_LIST_ID ? [parseInt(process.env.BREVO_LEAD_LIST_ID, 10)] : [],
    });
    // Send acknowledgement email to the new lead
    await sendBrevoEmail({
      toEmail: email,
      toName: `${firstName} ${lastName}`.trim(),
      subject: 'Thank you for contacting Soho Connect',
      htmlContent: `<p>Hi ${firstName || 'there'},</p><p>Thank you for getting in touch with Soho Connect. We have received your message and will respond shortly.</p><p>In the meantime, feel free to explore our latest services and products on our website.</p><p>Best regards,<br/>The Soho Connect Team</p>`,
    });
    // Notify the internal sales/support team of the new lead (optional)
    if (process.env.INTERNAL_NOTIFICATION_EMAIL) {
      await sendBrevoEmail({
        toEmail: process.env.INTERNAL_NOTIFICATION_EMAIL,
        toName: 'Sales Team',
        subject: 'New lead captured via Soho Connect website',
        htmlContent: `<p>A new lead has been captured.</p><ul><li>Name: ${firstName} ${lastName}</li><li>Email: ${email}</li><li>Phone: ${phone}</li><li>Message: ${message}</li></ul>`,
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
}

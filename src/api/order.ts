/**
 * Order Processing API Handler
 * Handles checkout submissions, creates Brevo contacts, and sends confirmation emails
 */

import { createBrevoContact, sendBrevoEmail } from '@/lib/brevo';

export interface OrderItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  items: OrderItem[];
}

/**
 * Process an order submission
 */
export async function processOrder(orderData: OrderData): Promise<{ success: boolean; error?: string }> {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      items = [],
    } = orderData;

    // Basic validation
    if (!email || !firstName || !lastName || items.length === 0) {
      return { success: false, error: 'Missing required fields' };
    }

    // Construct contact attributes for Brevo
    const attributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      PHONE: phone,
      ADDRESS: address,
      CITY: city,
      STATE: state,
      ZIPCODE: postalCode,
      COUNTRY: country,
    };

    // Create or update the contact in Brevo CRM
    await createBrevoContact({ email, attributes });

    // Prepare order summary HTML
    const orderTableRows = items
      .map(
        (item) =>
          `<tr><td style="padding:8px 0;">${item.name} × ${item.quantity}</td><td style="text-align:right;">$${(
            item.price * item.quantity
          ).toFixed(2)}</td></tr>`
      )
      .join('');

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Compose confirmation email HTML
    const htmlContent = `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color:#4169e1;">Thank you for your order, ${firstName}!</h2>
        <p>We have received your order and are processing it. Below is a summary of your purchase:</p>
        <table style="width:100%; border-collapse: collapse;">
          <thead>
            <tr><th align="left">Product</th><th align="right">Total</th></tr>
          </thead>
          <tbody>${orderTableRows}</tbody>
          <tfoot>
            <tr style="border-top:1px solid #eee;">
              <td style="padding-top:8px; font-weight:bold;">Subtotal</td>
              <td style="padding-top:8px; text-align:right; font-weight:bold;">$${subtotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <p style="margin-top:16px;">We will contact you soon with delivery details.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br/>Soho Connect</p>
      </div>
    `;

    // Send confirmation email to customer
    await sendBrevoEmail({
      toEmail: email,
      toName: `${firstName} ${lastName}`,
      subject: 'Your Soho Connect Order Confirmation',
      htmlContent,
    });

    // Optionally notify internal sales team
    const internalEmail = import.meta.env.VITE_INTERNAL_NOTIFICATION_EMAIL;
    if (internalEmail) {
      await sendBrevoEmail({
        toEmail: internalEmail,
        subject: `New order from ${firstName} ${lastName}`,
        htmlContent: `<p>${firstName} ${lastName} placed a new order.</p>` + htmlContent,
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error('Order processing error:', error);
    return {
      success: false,
      error: 'An error occurred while processing your order',
    };
  }
}

/**
 * Process a lead form submission
 */
export async function processLead(leadData: {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  message?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { firstName, lastName, email, phone, message } = leadData;

    // Basic validation
    if (!email || !firstName) {
      return { success: false, error: 'Missing required fields' };
    }

    // Construct contact attributes
    const attributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      PHONE: phone,
      MESSAGE: message,
    };

    // Create or update contact in Brevo
    await createBrevoContact({ email, attributes });

    // Send acknowledgment email
    await sendBrevoEmail({
      toEmail: email,
      toName: `${firstName} ${lastName || ''}`.trim(),
      subject: 'Thank you for contacting Soho Connect',
      htmlContent: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color:#4169e1;">Thank you for your interest, ${firstName}!</h2>
          <p>We have received your message and will get back to you shortly.</p>
          ${message ? `<p><strong>Your message:</strong><br/>${message}</p>` : ''}
          <p>Best regards,<br/>Soho Connect Team</p>
        </div>
      `,
    });

    // Notify internal team
    const internalEmail = import.meta.env.VITE_INTERNAL_NOTIFICATION_EMAIL;
    if (internalEmail) {
      await sendBrevoEmail({
        toEmail: internalEmail,
        subject: `New lead from ${firstName} ${lastName || ''}`,
        htmlContent: `
          <p><strong>New lead submission:</strong></p>
          <ul>
            <li>Name: ${firstName} ${lastName || ''}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone || 'N/A'}</li>
            ${message ? `<li>Message: ${message}</li>` : ''}
          </ul>
        `,
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error('Lead processing error:', error);
    return {
      success: false,
      error: 'An error occurred while processing your request',
    };
  }
}

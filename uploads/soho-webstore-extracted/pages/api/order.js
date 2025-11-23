import { createBrevoContact, sendBrevoEmail } from '../../lib/brevo';

/**
 * API route to handle checkout submissions. When a user completes
 * the checkout form on the front‑end, their contact details and
 * cart contents are posted to this endpoint. We then create/update
 * the contact in Brevo and dispatch a transactional order
 * confirmation email both to the customer and our internal sales
 * address. If anything goes wrong, a 500 error is returned.
 *
 * Expects a JSON payload in the shape of:
 * {
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   phone: string,
 *   address: string,
 *   city: string,
 *   state: string,
 *   postalCode: string,
 *   country: string,
 *   items: [ { slug, name, price, quantity } ]
 * }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
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
    } = JSON.parse(req.body);

    // Basic validation: ensure required fields are present
    if (!email || !firstName || !lastName || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
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

    // Create or update the contact in Brevo CRM. We don't specify listIds
    // here but you could add a dedicated list for orders (e.g. process.env.BREVO_ORDER_LIST_ID).
    await createBrevoContact({ email, attributes });

    // Prepare a simple HTML summary of the order
    const orderTableRows = items
      .map(
        (item) =>
          `<tr><td style="padding:8px 0;">${item.name} × ${item.quantity}</td><td style="text-align:right;">$${(
            item.price * item.quantity
          ).toFixed(2)}</td></tr>`
      )
      .join('');
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Compose email body. In a real implementation you might use
    // Brevo templates instead of raw HTML. This is kept simple for
    // demonstration purposes.
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
            <tr style="border-top:1px solid #eee;"><td style="padding-top:8px; font-weight:bold;">Subtotal</td><td style="padding-top:8px; text-align:right; font-weight:bold;">$${subtotal.toFixed(
              2
            )}</td></tr>
          </tfoot>
        </table>
        <p style="margin-top:16px;">We will contact you soon with delivery details.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br/>Soho Connect</p>
      </div>
    `;

    // Send confirmation email to the customer
    await sendBrevoEmail({
      toEmail: email,
      toName: `${firstName} ${lastName}`,
      subject: 'Your Soho Connect Order Confirmation',
      htmlContent,
    });

    // Optionally notify internal sales team. Define INTERNAL_NOTIFICATION_EMAIL
    // in your environment variables if you wish to receive order alerts.
    const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL;
    if (internalEmail) {
      await sendBrevoEmail({
        toEmail: internalEmail,
        subject: `New order from ${firstName} ${lastName}`,
        htmlContent: `<p>${firstName} ${lastName} placed a new order.</p>` + htmlContent,
      });
    }

    // Respond success
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Order processing error:', error);
    return res.status(500).json({ error: 'An error occurred while processing your order' });
  }
}
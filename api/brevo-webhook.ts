import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Brevo Webhook Endpoint
 * Handles events from Brevo (Sendinblue) such as delivered, opened, clicked, etc.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const event = req.body;

        // Log the event for now. 
        // In a real application, you might update database records, trigger workflows, etc.
        console.log('Brevo Webhook Event Received:', JSON.stringify(event, null, 2));

        // Brevo expects a 200 OK response to confirm receipt
        return res.status(200).json({ received: true });
    } catch (error) {
        console.error('Error processing Brevo webhook:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

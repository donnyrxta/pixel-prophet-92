import type { NextApiRequest, NextApiResponse } from 'next';
import { createLeadEntry } from '../../lib/strapi-client';
import { addContactToList, extractClientMeta, sendTransactionalTemplate, upsertContact } from '../../lib/brevo';

type LeadBody = {
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  category?: string;
  utm?: Record<string, string>;
  source?: string;
};

const DEFAULT_LIST_ID = Number(process.env.BREVO_LIST_ID_DEFAULT || 0);
const DOI_TEMPLATE_ID = Number(process.env.BREVO_DOI_TEMPLATE_ID || 0);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Captures leads, syncs to Strapi, and mirrors to Brevo with optional DOI email.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, category, utm, source }: LeadBody = req.body;
    const meta = extractClientMeta(req); // gather request metadata for auditability

    // Save lead in Strapi for single source of truth.
    await createLeadEntry({
      name,
      email,
      phone,
      message,
      category,
      utm,
      source: source || meta.referer,
      ...meta,
    });

    // Prepare lightweight tags for segmentation in Brevo free tier.
    const tags: string[] = [];
    if (category) tags.push(`cat:${category}`);
    if (utm) {
      Object.entries(utm).forEach(([k, v]) => {
        if (v) tags.push(`utm:${k}:${v}`);
      });
    }

    // Create/update Brevo contact with segmentation tags.
    await upsertContact({
      email,
      attributes: {
        NAME: name,
        PHONE: phone,
        CATEGORY: category,
        SOURCE: source || meta.referer,
        ...(utm ? { UTM: JSON.stringify(utm) } : {}),
        TAGS: tags.join('|'),
      },
      listIds: DEFAULT_LIST_ID ? [DEFAULT_LIST_ID] : undefined,
    });

    // Add to default list if configured; helpful for newsletter/welcome flow.
    if (DEFAULT_LIST_ID) {
      await addContactToList(email, [DEFAULT_LIST_ID]);
    }

    // Optional double opt-in: send transactional template with confirmation link.
    if (DOI_TEMPLATE_ID) {
      await sendTransactionalTemplate(DOI_TEMPLATE_ID, [{ email, name }], {
        SOURCE: source || meta.referer,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('lead api error', error);
    return res.status(500).json({ error: 'Unable to capture lead' });
  }
}

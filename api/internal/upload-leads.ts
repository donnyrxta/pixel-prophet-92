/**
 * Internal API: Upload and Parse Leads
 * Accepts CSV/XLSX files and returns parsed lead data
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple auth check - password protected
const INTERNAL_PASSWORD = process.env.INTERNAL_API_PASSWORD || 'soho-internal-2024';

function checkAuth(req: VercelRequest): boolean {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    return authHeader.slice(7) === INTERNAL_PASSWORD;
}

// Parse CSV content
function parseCSV(content: string): Record<string, string>[] {
    const lines = content.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        const row: Record<string, string> = {};
        headers.forEach((header, idx) => {
            row[header] = values[idx] || '';
        });
        rows.push(row);
    }

    return rows;
}

// Map raw CSV headers to expected lead format
function mapToLeadFormat(row: Record<string, string>): {
    name: string;
    email: string;
    contactPerson?: string;
    website?: string;
    description?: string;
    rating?: number;
    numberOfReviews?: number;
    category?: string;
    address?: string;
} {
    return {
        name: row.name || row.property_name || row.company || row.business_name || '',
        email: row.email || row.contact_email || row.email_address || '',
        contactPerson: row.contact_person || row.contact_name || row.contact || row.person || undefined,
        website: row.website || row.url || row.site || undefined,
        description: row.description || row.about || row.bio || undefined,
        rating: row.rating ? parseFloat(row.rating) : undefined,
        numberOfReviews: row.reviews || row.review_count || row.number_of_reviews
            ? parseInt(row.reviews || row.review_count || row.number_of_reviews)
            : undefined,
        category: row.category || row.type || row.industry || undefined,
        address: row.address || row.location || row.city || undefined,
    };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Auth check
    if (!checkAuth(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { csvContent, googleDriveFileId } = req.body;

        // Option 1: Direct CSV content
        if (csvContent) {
            const rawRows = parseCSV(csvContent);
            const leads = rawRows
                .map(mapToLeadFormat)
                .filter(lead => lead.name && lead.email); // Filter invalid rows

            return res.status(200).json({
                success: true,
                leads,
                totalParsed: rawRows.length,
                validLeads: leads.length,
            });
        }

        // Option 2: Google Drive file ID (placeholder for future implementation)
        if (googleDriveFileId) {
            // TODO: Implement Google Drive download
            return res.status(501).json({
                error: 'Google Drive integration not yet implemented. Please upload CSV content directly.',
            });
        }

        return res.status(400).json({ error: 'Please provide csvContent or googleDriveFileId' });

    } catch (error) {
        console.error('Upload leads error:', error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to parse leads'
        });
    }
}

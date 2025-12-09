-- SoHo Connect Cold Outreach Schema
-- Migration: 20241208_outreach_tables

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'active', 'completed', 'paused')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  total_leads INT DEFAULT 0,
  sent_count INT DEFAULT 0,
  follow_up_count INT DEFAULT 0
);

-- Outreach logs table
CREATE TABLE IF NOT EXISTS outreach_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  property_name TEXT,
  contact_name TEXT,
  email TEXT NOT NULL,
  website TEXT,
  description TEXT,
  rating NUMERIC(2,1),
  review_count INT,
  email_subject TEXT,
  email_body TEXT,
  follow_up_subject TEXT,
  follow_up_body TEXT,
  lead_score INT CHECK (lead_score >= 0 AND lead_score <= 100),
  personalization_hook TEXT,
  offer_asset TEXT CHECK (offer_asset IN ('calculator', 'audit', 'both')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'manual_review', 'follow_up_sent', 'responded')),
  requires_manual_review BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ,
  follow_up_scheduled_at TIMESTAMPTZ,
  follow_up_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_outreach_logs_campaign ON outreach_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_outreach_logs_status ON outreach_logs(status);
CREATE INDEX IF NOT EXISTS idx_outreach_logs_lead_score ON outreach_logs(lead_score);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);

-- Updated at trigger for campaigns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON campaigns;
CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

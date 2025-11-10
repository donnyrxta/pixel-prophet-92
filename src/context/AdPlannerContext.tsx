import React, { createContext, useContext, useMemo, useState } from 'react';
import { Campaign, DEFAULT_PLANNER_CONFIG, Holiday, PlannerConfig } from '@/ads/types';
import { getUpcomingHolidays } from '@/ads/holidayApi';
import { buildCampaignFromHoliday } from '@/ads/scheduler';
import { attachCampaignMetrics } from '@/ads/analytics';

interface PlannerState {
  config: PlannerConfig;
  campaigns: Campaign[];
  loading: boolean;
  error?: string;
}

interface PlannerActions {
  setConfig: (c: Partial<PlannerConfig>) => void;
  fetchAndGenerate: (country?: string) => Promise<void>;
  approveCampaign: (id: string, approver: string) => void;
  scheduleCampaign: (id: string, whenISO: string) => void;
  markDeployed: (id: string) => void;
}

const STORAGE_KEY = 'sc_ad_planner_state_v1';

function readPersisted(): PlannerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persist(state: PlannerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const AdPlannerContext = createContext<(PlannerState & PlannerActions) | null>(null);

export const AdPlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const persisted = readPersisted();
  const [state, setState] = useState<PlannerState>(
    persisted ?? { config: DEFAULT_PLANNER_CONFIG, campaigns: [], loading: false }
  );

  const setConfig = (c: Partial<PlannerConfig>) => {
    setState((prev) => {
      const next = { ...prev, config: { ...prev.config, ...c } };
      persist(next);
      return next;
    });
  };

  const fetchAndGenerate = async (country?: string) => {
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
    try {
      const cc = country ?? state.config.defaultCountries[0];
      const holidays: Holiday[] = await getUpcomingHolidays(cc, state.config.monthsAhead);
      const campaigns = holidays.map((h) => buildCampaignFromHoliday(h, state.config.timezone));
      campaigns.forEach(attachCampaignMetrics);
      const next = { ...state, campaigns, loading: false };
      setState(next);
      persist(next);
    } catch (err: any) {
      setState((prev) => ({ ...prev, loading: false, error: String(err?.message ?? err) }));
    }
  };

  const approveCampaign = (id: string, approver: string) => {
    setState((prev) => {
      const campaigns = prev.campaigns.map((c) =>
        c.id === id ? { ...c, status: 'approved', approvedBy: approver, updatedAt: new Date().toISOString() } : c
      );
      const next = { ...prev, campaigns };
      persist(next);
      return next;
    });
  };

  const scheduleCampaign = (id: string, whenISO: string) => {
    setState((prev) => {
      const campaigns = prev.campaigns.map((c) =>
        c.id === id ? { ...c, scheduledAt: whenISO, status: c.status === 'approved' ? 'scheduled' : c.status, updatedAt: new Date().toISOString() } : c
      );
      const next = { ...prev, campaigns };
      persist(next);
      return next;
    });
  };

  const markDeployed = (id: string) => {
    setState((prev) => {
      const campaigns = prev.campaigns.map((c) =>
        c.id === id ? { ...c, status: 'deployed', updatedAt: new Date().toISOString() } : c
      );
      const next = { ...prev, campaigns };
      persist(next);
      return next;
    });
  };

  const value = useMemo(
    () => ({ ...state, setConfig, fetchAndGenerate, approveCampaign, scheduleCampaign, markDeployed }),
    [state]
  );

  return <AdPlannerContext.Provider value={value}>{children}</AdPlannerContext.Provider>;
};

export function useAdPlanner() {
  const ctx = useContext(AdPlannerContext);
  if (!ctx) throw new Error('useAdPlanner must be used within AdPlannerProvider');
  return ctx;
}


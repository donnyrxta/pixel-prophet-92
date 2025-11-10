import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAdPlanner } from '@/context/AdPlannerContext';
import AdSlot from '@/components/ads/AdSlot';

const AdPlannerPage: React.FC = () => {
  const { campaigns, loading, error, fetchAndGenerate, approveCampaign, scheduleCampaign, markDeployed, config } = useAdPlanner();

  useEffect(() => {
    if (!campaigns.length) {
      fetchAndGenerate().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Ad Planner</h1>
        <p className="text-gray-600 mb-6">Auto-generated holiday campaigns for {config.defaultCountries.join(', ')}.</p>

        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => fetchAndGenerate()} disabled={loading}>
            {loading ? 'Loading holidays…' : 'Refresh Holidays'}
          </Button>
          {error && <span className="text-red-600">{error}</span>}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {campaigns.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <span className="text-xs px-2 py-1 rounded bg-gray-100">{c.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{c.description}</p>

              <AdSlot campaign={c} />

              <div className="flex items-center gap-2 mt-4">
                <Button variant="secondary" onClick={() => approveCampaign(c.id, 'Soho Reviewer')} disabled={c.status !== 'pending_approval' && c.status !== 'draft'}>
                  Approve
                </Button>
                <Button variant="secondary" onClick={() => scheduleCampaign(c.id, new Date().toISOString())} disabled={c.status === 'deployed'}>
                  Schedule Now
                </Button>
                <Button variant="default" onClick={() => markDeployed(c.id)} disabled={c.status === 'deployed'}>
                  Mark Deployed
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdPlannerPage;


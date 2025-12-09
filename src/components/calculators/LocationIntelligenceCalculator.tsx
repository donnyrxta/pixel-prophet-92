/**
 * Location Intelligence Calculator
 *
 * Calculates ROI from Wi-Fi location analytics for retail/business locations.
 * Measures foot traffic, customer retention, and data-driven decision value.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, TrendingUp, Users, DollarSign,
  Info, Send, BarChart3, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useBrevoLead } from '@/hooks/useBrevoLead';
import { cn } from '@/lib/utils';

interface LocationResults {
  monthlyTransactions: number;
  monthlyRevenue: number;
  annualRevenue: number;
  currentReturnCustomers: number;
  targetReturnCustomers: number;
  additionalReturns: number;
  additionalRevenue: number;
  roi: number;
  insightsValue: {
    peakHours: number;
    dwellTime: number;
    heatmapping: number;
    customerJourney: number;
  };
  totalInsightsValue: number;
}

const LocationIntelligenceCalculator: React.FC = () => {
  const { toast } = useToast();
  const { captureLead, loading: submitting } = useBrevoLead();

  // Input state
  const [monthlyFootfall, setMonthlyFootfall] = useState(5000);
  const [avgTransactionValue, setAvgTransactionValue] = useState(25);
  const [conversionRate, setConversionRate] = useState(15);
  const [currentReturnRate, setCurrentReturnRate] = useState(10);
  const [targetReturnRate, setTargetReturnRate] = useState(25);
  const [avgVisitsPerCustomer, setAvgVisitsPerCustomer] = useState(2);
  const [marketingBudget, setMarketingBudget] = useState(500);
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Lead form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: ''
  });

  // Calculations
  const results: LocationResults = useMemo(() => {
    const monthlyTransactions = monthlyFootfall * (conversionRate / 100);
    const monthlyRevenue = monthlyTransactions * avgTransactionValue;
    const annualRevenue = monthlyRevenue * 12;

    const currentReturnCustomers = monthlyFootfall * (currentReturnRate / 100);
    const targetReturnCustomers = monthlyFootfall * (targetReturnRate / 100);
    const additionalReturns = targetReturnCustomers - currentReturnCustomers;

    const additionalRevenue = additionalReturns * avgTransactionValue * avgVisitsPerCustomer * 12;
    const roi = marketingBudget > 0 ? ((additionalRevenue / (marketingBudget * 12)) * 100) : 0;

    // Insights value calculation (percentages of monthly revenue)
    const insightsValue = {
      peakHours: monthlyRevenue * 0.08,
      dwellTime: monthlyRevenue * 0.05,
      heatmapping: monthlyRevenue * 0.06,
      customerJourney: monthlyRevenue * 0.04
    };
    const totalInsightsValue = (insightsValue.peakHours + insightsValue.dwellTime +
      insightsValue.heatmapping + insightsValue.customerJourney) * 12;

    return {
      monthlyTransactions: Math.round(monthlyTransactions),
      monthlyRevenue: Math.round(monthlyRevenue),
      annualRevenue: Math.round(annualRevenue),
      currentReturnCustomers: Math.round(currentReturnCustomers),
      targetReturnCustomers: Math.round(targetReturnCustomers),
      additionalReturns: Math.round(additionalReturns),
      additionalRevenue: Math.round(additionalRevenue),
      roi: Math.round(roi),
      insightsValue: {
        peakHours: Math.round(insightsValue.peakHours * 12),
        dwellTime: Math.round(insightsValue.dwellTime * 12),
        heatmapping: Math.round(insightsValue.heatmapping * 12),
        customerJourney: Math.round(insightsValue.customerJourney * 12)
      },
      totalInsightsValue: Math.round(totalInsightsValue)
    };
  }, [monthlyFootfall, avgTransactionValue, conversionRate, currentReturnRate,
      targetReturnRate, avgVisitsPerCustomer, marketingBudget]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const leadData = {
      email: formData.email,
      firstName: formData.name.split(' ')[0],
      lastName: formData.name.split(' ').slice(1).join(' ') || '',
      phone: formData.phone,
      company: formData.company,
      message: `Location Intelligence Calculator Lead
Business: ${formData.company}
Location: ${formData.location}
Monthly Footfall: ${monthlyFootfall.toLocaleString()}
Current Return Rate: ${currentReturnRate}%
Target Return Rate: ${targetReturnRate}%
Additional Revenue Potential: ${formatCurrency(results.additionalRevenue)}
Insights Value: ${formatCurrency(results.totalInsightsValue)}
Marketing ROI: ${results.roi}%`,
      services: ['wifi-marketing', 'location-intelligence'],
      budget: results.additionalRevenue < 5000 ? 'under-5000' :
              results.additionalRevenue < 20000 ? '5000-20000' : '20000-plus',
      timeline: 'soon',
      sourceForm: 'location-intelligence-calculator'
    };

    const result = await captureLead(leadData);

    if (result.success) {
      toast({
        title: 'Analysis Request Sent!',
        description: 'We\'ll contact you within 24 hours with a detailed report.',
      });
      setShowLeadForm(false);
    } else {
      toast({
        title: 'Submission Failed',
        description: 'Please try again or contact us directly.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              Enter Your Business Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Monthly Footfall */}
            <div className="space-y-2">
              <Label className="text-foreground">Monthly Foot Traffic</Label>
              <Input
                type="number"
                value={monthlyFootfall}
                onChange={(e) => setMonthlyFootfall(Number(e.target.value))}
                min={100}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">Estimated monthly visitors to your location</p>
            </div>

            {/* Avg Transaction Value */}
            <div className="space-y-2">
              <Label className="text-foreground">Avg Transaction Value (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={avgTransactionValue}
                  onChange={(e) => setAvgTransactionValue(Number(e.target.value))}
                  min={1}
                  className="pl-9 font-mono"
                />
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label className="text-foreground">Conversion Rate</Label>
                  <div className="relative group">
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity w-48 pointer-events-none z-50">
                      % of visitors who make a purchase
                    </div>
                  </div>
                </div>
                <span className="font-mono text-primary font-semibold">{conversionRate}%</span>
              </div>
              <Slider
                value={[conversionRate]}
                onValueChange={([val]) => setConversionRate(val)}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Current Return Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label className="text-foreground">Current Return Rate</Label>
                  <div className="relative group">
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity w-48 pointer-events-none z-50">
                      % of customers who return within 90 days
                    </div>
                  </div>
                </div>
                <span className="font-mono text-primary font-semibold">{currentReturnRate}%</span>
              </div>
              <Slider
                value={[currentReturnRate]}
                onValueChange={([val]) => setCurrentReturnRate(val)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Target Return Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-foreground">Target Return Rate</Label>
                <span className="font-mono text-primary font-semibold">{targetReturnRate}%</span>
              </div>
              <Slider
                value={[targetReturnRate]}
                onValueChange={([val]) => setTargetReturnRate(val)}
                min={currentReturnRate}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Goal with location intelligence</p>
            </div>

            {/* Visits per Customer and Marketing Budget */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Visits per Returner</Label>
                <Input
                  type="number"
                  value={avgVisitsPerCustomer}
                  onChange={(e) => setAvgVisitsPerCustomer(Number(e.target.value))}
                  min={1}
                  max={52}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Marketing Budget ($/mo)</Label>
                <Input
                  type="number"
                  value={marketingBudget}
                  onChange={(e) => setMarketingBudget(Number(e.target.value))}
                  min={0}
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="w-5 h-5 text-primary" />
              Location Intelligence ROI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-background rounded-xl border border-border text-center">
                <p className="text-xs text-muted-foreground">Monthly Transactions</p>
                <p className="text-xl font-bold text-foreground">{results.monthlyTransactions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-background rounded-xl border border-border text-center">
                <p className="text-xs text-muted-foreground">Annual Revenue</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(results.annualRevenue)}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/30 text-center">
                <p className="text-xs text-primary">Additional Returns/Mo</p>
                <p className="text-xl font-bold text-primary">+{results.additionalReturns.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800 text-center">
                <p className="text-xs text-green-600 dark:text-green-400">Marketing ROI</p>
                <p className="text-xl font-bold text-green-600">{results.roi}%</p>
              </div>
            </div>

            {/* Revenue Impact Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-950/20 rounded-xl border-2 border-green-200 dark:border-green-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">ADDITIONAL ANNUAL REVENUE</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(results.additionalRevenue)}</p>
                    <p className="text-xs text-green-500 mt-1">From improved customer retention</p>
                  </div>
                  <div className="p-2 bg-green-200 dark:bg-green-800 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-primary font-medium">INSIGHTS VALUE (Est.)</p>
                    <p className="text-3xl font-bold text-primary">{formatCurrency(results.totalInsightsValue)}</p>
                    <p className="text-xs text-primary/70 mt-1">Annual value from data-driven decisions</p>
                  </div>
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Insights Breakdown */}
            <div className="p-4 bg-muted/50 rounded-xl">
              <h4 className="font-semibold text-foreground mb-3 text-sm">Location Intelligence Value Breakdown:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-background rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">Peak Hours Optimization</span>
                  </div>
                  <span className="font-mono text-foreground">{formatCurrency(results.insightsValue.peakHours)}/yr</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-background rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">Dwell Time Analysis</span>
                  </div>
                  <span className="font-mono text-foreground">{formatCurrency(results.insightsValue.dwellTime)}/yr</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-background rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-muted-foreground">Heatmap & Flow Insights</span>
                  </div>
                  <span className="font-mono text-foreground">{formatCurrency(results.insightsValue.heatmapping)}/yr</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-background rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-muted-foreground">Customer Journey Mapping</span>
                  </div>
                  <span className="font-mono text-foreground">{formatCurrency(results.insightsValue.customerJourney)}/yr</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
                onClick={() => setShowLeadForm(true)}
              >
                <Send className="w-4 h-4 mr-2" />
                Get Custom Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Capture Modal */}
      {showLeadForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowLeadForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Get Your Location Analysis</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Potential additional revenue: <span className="font-bold text-green-600">{formatCurrency(results.additionalRevenue)}/year</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="loc-name">Full Name *</Label>
                <Input
                  id="loc-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="loc-email">Email Address *</Label>
                <Input
                  id="loc-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@business.co.zw"
                  required
                />
              </div>
              <div>
                <Label htmlFor="loc-phone">Phone (WhatsApp) *</Label>
                <Input
                  id="loc-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+263 77 123 4567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="loc-company">Business Name</Label>
                <Input
                  id="loc-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Sam Levy's Village"
                />
              </div>
              <div>
                <Label htmlFor="loc-location">Location</Label>
                <Input
                  id="loc-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Borrowdale, Harare"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowLeadForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Get My Report'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LocationIntelligenceCalculator;

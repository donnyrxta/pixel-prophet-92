/**
 * Wi-Fi Token Revenue Calculator
 * 
 * Multi-segment calculator for buildings, dormitories, mining camps, farms, schools, etc.
 * Includes solar bundle options for off-grid locations.
 * Integrates with Brevo for lead capture.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, Sun, Building2, Users, Home, Truck, TreePine, 
  GraduationCap, Hotel, Users2, Calculator, TrendingUp,
  Download, Send, Check, ChevronDown, Info, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useBrevoLead } from '@/hooks/useBrevoLead';
import { cn } from '@/lib/utils';

// ============== Types ==============

interface IndustryConfig {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  defaults: {
    population: number;
    paidPercent: number;
    avgSpendDaily: number;
  };
  needsSolar: boolean;
  color: 'primary' | 'solar';
}

interface SolarBundle {
  id: string;
  name: string;
  price: number;
  capacity: string;
  maxUsers: number;
  description: string;
}

interface CalculatorResults {
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  monthlyISPCost: number;
  monthlyProfit: number;
  annualProfit: number;
  totalInvestment: number;
  paybackMonths: number;
  roi12Month: number;
  yearOneNetGain: number;
}

// ============== Data ==============

const industries: IndustryConfig[] = [
  {
    id: 'building',
    name: 'Buildings & Apartments',
    icon: Building2,
    description: 'Residential & commercial buildings',
    defaults: { population: 150, paidPercent: 40, avgSpendDaily: 0.50 },
    needsSolar: false,
    color: 'primary'
  },
  {
    id: 'dorm',
    name: 'Dormitories',
    icon: Users,
    description: 'Student housing & hostels',
    defaults: { population: 200, paidPercent: 60, avgSpendDaily: 0.40 },
    needsSolar: false,
    color: 'primary'
  },
  {
    id: 'cluster',
    name: 'Cluster Homes',
    icon: Home,
    description: 'Gated communities & estates',
    defaults: { population: 80, paidPercent: 30, avgSpendDaily: 1.00 },
    needsSolar: false,
    color: 'primary'
  },
  {
    id: 'mining',
    name: 'Mining Operations',
    icon: Truck,
    description: 'Mining camps & sites (off-grid)',
    defaults: { population: 500, paidPercent: 70, avgSpendDaily: 0.75 },
    needsSolar: true,
    color: 'solar'
  },
  {
    id: 'farm',
    name: 'Farms & Agriculture',
    icon: TreePine,
    description: 'Farm workers & compounds (off-grid)',
    defaults: { population: 100, paidPercent: 50, avgSpendDaily: 0.50 },
    needsSolar: true,
    color: 'solar'
  },
  {
    id: 'school',
    name: 'Schools & Universities',
    icon: GraduationCap,
    description: 'Educational institutions',
    defaults: { population: 500, paidPercent: 25, avgSpendDaily: 0.30 },
    needsSolar: false,
    color: 'primary'
  },
  {
    id: 'hotel',
    name: 'Hotels & Lodges',
    icon: Hotel,
    description: 'Hospitality venues',
    defaults: { population: 100, paidPercent: 35, avgSpendDaily: 0.80 },
    needsSolar: false,
    color: 'primary'
  },
  {
    id: 'community',
    name: 'Community Centers',
    icon: Users2,
    description: 'Markets, bus terminals, public spaces',
    defaults: { population: 300, paidPercent: 45, avgSpendDaily: 0.35 },
    needsSolar: false,
    color: 'primary'
  }
];

const solarBundles: SolarBundle[] = [
  {
    id: 'starter',
    name: 'Starter Solar',
    price: 650,
    capacity: '2.5 kWh',
    maxUsers: 15,
    description: 'Perfect for small deployments (5-15 users)'
  },
  {
    id: 'standard',
    name: 'Standard Solar',
    price: 1150,
    capacity: '5 kWh',
    maxUsers: 50,
    description: 'Ideal for medium sites (15-50 users)'
  },
  {
    id: 'professional',
    name: 'Professional Solar',
    price: 1850,
    capacity: '5.12 kWh',
    maxUsers: 150,
    description: 'For larger deployments (50-150 users)'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Solar',
    price: 3200,
    capacity: '10.24 kWh',
    maxUsers: 500,
    description: 'Maximum capacity for 150+ users'
  }
];

const BASE_EQUIPMENT_COST = 500; // Router, captive portal, installation
const BASE_ISP_COST = 100; // Monthly ISP subscription

// ============== Calculator Component ==============

const WifiTokenRevenueCalculator: React.FC = () => {
  const { toast } = useToast();
  const { captureLead, loading: submitting } = useBrevoLead();
  
  // State
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryConfig>(industries[0]);
  const [population, setPopulation] = useState(industries[0].defaults.population);
  const [paidPercent, setPaidPercent] = useState(industries[0].defaults.paidPercent);
  const [freePercent, setFreePercent] = useState(30);
  const [avgSpendDaily, setAvgSpendDaily] = useState(industries[0].defaults.avgSpendDaily);
  const [includeSolar, setIncludeSolar] = useState(false);
  const [selectedSolarBundle, setSelectedSolarBundle] = useState<SolarBundle>(solarBundles[1]);
  const [showLeadForm, setShowLeadForm] = useState(false);
  
  // Lead form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: ''
  });

  // Update defaults when industry changes
  const handleIndustrySelect = useCallback((industry: IndustryConfig) => {
    setSelectedIndustry(industry);
    setPopulation(industry.defaults.population);
    setPaidPercent(industry.defaults.paidPercent);
    setAvgSpendDaily(industry.defaults.avgSpendDaily);
    setIncludeSolar(industry.needsSolar);
  }, []);

  // Calculate results
  const results: CalculatorResults = useMemo(() => {
    const paidUsers = Math.round(population * (paidPercent / 100));
    const freeUsers = Math.round(population * (freePercent / 100));
    
    const dailyRevenue = paidUsers * avgSpendDaily;
    const monthlyRevenue = dailyRevenue * 30;
    const annualRevenue = monthlyRevenue * 12;
    
    // Scale ISP cost with population
    const monthlyISPCost = BASE_ISP_COST + (population > 200 ? 50 : 0) + (population > 500 ? 100 : 0);
    
    const monthlyProfit = monthlyRevenue - monthlyISPCost;
    const annualProfit = monthlyProfit * 12;
    
    const solarCost = includeSolar ? selectedSolarBundle.price : 0;
    const totalInvestment = BASE_EQUIPMENT_COST + solarCost;
    
    const paybackMonths = monthlyProfit > 0 ? Math.ceil(totalInvestment / monthlyProfit) : 0;
    const yearOneProfit = annualProfit;
    const roi12Month = totalInvestment > 0 ? ((yearOneProfit - totalInvestment) / totalInvestment) * 100 : 0;
    const yearOneNetGain = yearOneProfit - totalInvestment;
    
    return {
      dailyRevenue,
      monthlyRevenue,
      annualRevenue,
      monthlyISPCost,
      monthlyProfit,
      annualProfit,
      totalInvestment,
      paybackMonths,
      roi12Month,
      yearOneNetGain
    };
  }, [population, paidPercent, avgSpendDaily, includeSolar, selectedSolarBundle]);

  // Handle form submission
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
      message: `WiFi Token Revenue Calculator Lead
Industry: ${selectedIndustry.name}
Location: ${formData.location}
Population: ${population}
Paid Users %: ${paidPercent}%
Daily Spend: $${avgSpendDaily}
Estimated Monthly Revenue: $${results.monthlyRevenue.toFixed(2)}
Solar Bundle: ${includeSolar ? selectedSolarBundle.name : 'Not needed'}
Total Investment: $${results.totalInvestment}`,
      services: ['wifi-marketing', 'wifi-token-reselling'],
      budget: results.totalInvestment < 1000 ? 'under-1000' : 
              results.totalInvestment < 2500 ? '1000-2500' : '2500-5000',
      timeline: 'soon',
      sourceForm: 'wifi-token-calculator'
    };

    const result = await captureLead(leadData);
    
    if (result.success) {
      toast({
        title: 'Quote Request Sent!',
        description: 'We\'ll contact you within 24 hours with a detailed proposal.',
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Industry Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Select Your Industry</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {industries.map((industry) => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry.id === industry.id;
            
            return (
              <motion.button
                key={industry.id}
                onClick={() => handleIndustrySelect(industry)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-all duration-300 text-left",
                  isSelected 
                    ? industry.color === 'solar' 
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                      : "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-2",
                  industry.color === 'solar' 
                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400"
                    : "bg-primary/10 text-primary"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-medium text-sm text-foreground">{industry.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{industry.description}</p>
                {industry.needsSolar && (
                  <div className="absolute top-2 right-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                  </div>
                )}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Check className={cn(
                      "w-4 h-4",
                      industry.color === 'solar' ? "text-amber-500" : "text-primary"
                    )} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calculator className="w-5 h-5 text-primary" />
              Configure Your Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Population */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-foreground">Total Population / Users</Label>
                <span className="font-mono text-primary font-semibold">{population}</span>
              </div>
              <Slider
                value={[population]}
                onValueChange={([val]) => setPopulation(val)}
                min={20}
                max={1000}
                step={10}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                People who can potentially connect to your Wi-Fi
              </p>
            </div>

            {/* Paid Users Percentage */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-foreground">Paid Users (%)</Label>
                <span className="font-mono text-primary font-semibold">{paidPercent}%</span>
              </div>
              <Slider
                value={[paidPercent]}
                onValueChange={([val]) => setPaidPercent(val)}
                min={5}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {Math.round(population * paidPercent / 100)} users paying for Wi-Fi tokens
              </p>
            </div>

            {/* Free Users Percentage */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-foreground">Free Users (%)</Label>
                <span className="font-mono text-muted-foreground">{freePercent}%</span>
              </div>
              <Slider
                value={[freePercent]}
                onValueChange={([val]) => setFreePercent(val)}
                min={0}
                max={50}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {Math.round(population * freePercent / 100)} users with free access (customers, tenants)
              </p>
            </div>

            {/* Average Daily Spend */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-foreground">Avg. Daily Token Spend (USD)</Label>
                <span className="font-mono text-primary font-semibold">${avgSpendDaily.toFixed(2)}</span>
              </div>
              <Slider
                value={[avgSpendDaily * 100]}
                onValueChange={([val]) => setAvgSpendDaily(val / 100)}
                min={10}
                max={200}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                How much each paid user spends on tokens per day
              </p>
            </div>

            {/* Solar Bundle Option */}
            {(selectedIndustry.needsSolar || includeSolar) && (
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="w-5 h-5 text-amber-500" />
                  <Label className="text-foreground font-semibold">Solar Power Bundle</Label>
                </div>
                
                <div className="space-y-3">
                  {solarBundles.map((bundle) => (
                    <button
                      key={bundle.id}
                      onClick={() => setSelectedSolarBundle(bundle)}
                      className={cn(
                        "w-full p-3 rounded-lg border-2 text-left transition-all",
                        selectedSolarBundle.id === bundle.id
                          ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                          : "border-border hover:border-amber-300"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-foreground">{bundle.name}</h5>
                          <p className="text-xs text-muted-foreground">{bundle.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-amber-600">${bundle.price}</span>
                          <p className="text-xs text-muted-foreground">{bundle.capacity}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!selectedIndustry.needsSolar && (
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => setIncludeSolar(!includeSolar)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 w-full transition-all",
                    includeSolar 
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                      : "border-border hover:border-amber-300"
                  )}
                >
                  <Sun className={cn("w-5 h-5", includeSolar ? "text-amber-500" : "text-muted-foreground")} />
                  <span className="text-sm text-foreground">Add Solar Bundle (for off-grid reliability)</span>
                  {includeSolar && <Check className="w-4 h-4 text-amber-500 ml-auto" />}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-5 h-5 text-primary" />
              Revenue Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Daily Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(results.dailyRevenue)}</p>
              </div>
              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Monthly Revenue</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(results.monthlyRevenue)}</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-700 dark:text-green-400 uppercase tracking-wide">Monthly Profit (After ISP Costs)</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(results.monthlyProfit)}</p>
              <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
                ISP Cost: ${results.monthlyISPCost}/month
              </p>
            </div>

            {/* Annual Summary */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Revenue</span>
                <span className="font-semibold text-foreground">{formatCurrency(results.annualRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Profit</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.annualProfit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Investment</span>
                <span className="font-semibold text-foreground">{formatCurrency(results.totalInvestment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payback Period</span>
                <span className="font-semibold text-primary">
                  {results.paybackMonths > 0 ? `${results.paybackMonths} months` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">12-Month ROI</span>
                <span className={cn(
                  "font-bold",
                  results.roi12Month > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {results.roi12Month > 0 ? '+' : ''}{results.roi12Month.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Year 1 Net Gain */}
            <div className={cn(
              "p-4 rounded-xl border text-center",
              results.yearOneNetGain > 0 
                ? "bg-green-100 dark:bg-green-950/50 border-green-300 dark:border-green-800"
                : "bg-red-100 dark:bg-red-950/50 border-red-300 dark:border-red-800"
            )}>
              <p className="text-sm text-muted-foreground">Year 1 Net Gain</p>
              <p className={cn(
                "text-3xl font-bold",
                results.yearOneNetGain > 0 ? "text-green-600" : "text-red-600"
              )}>
                {results.yearOneNetGain > 0 ? '+' : ''}{formatCurrency(results.yearOneNetGain)}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
                onClick={() => setShowLeadForm(true)}
              >
                <Send className="w-4 h-4 mr-2" />
                Get Custom Quote
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {showLeadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              <h3 className="text-xl font-bold text-foreground mb-4">Get Your Custom Quote</h3>
              <p className="text-muted-foreground text-sm mb-6">
                We'll prepare a detailed proposal for your {selectedIndustry.name.toLowerCase()} Wi-Fi deployment.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Moyo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.co.zw"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (WhatsApp) *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+263 77 123 4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company / Organization</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="ABC Mining Ltd"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location / Site</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Hwange, Matabeleland North"
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
                    {submitting ? 'Sending...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WifiTokenRevenueCalculator;

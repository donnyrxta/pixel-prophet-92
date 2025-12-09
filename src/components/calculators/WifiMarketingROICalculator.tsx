/**
 * Wi-Fi Marketing ROI Calculator
 *
 * Calculates potential revenue from Wi-Fi guest data capture for hospitality businesses.
 * Shows revenue leakage from uncaptured guest emails and OTA commission savings.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi, TrendingUp, TrendingDown, Users, DollarSign,
  Info, Send, Mail, PercentIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useBrevoLead } from '@/hooks/useBrevoLead';
import { cn } from '@/lib/utils';

interface MarketingROIResults {
  annualGuests: number;
  currentCaptured: number;
  emailsLost: number;
  potentialRebookings: number;
  rebookingRevenue: number;
  otaSavings: number;
  totalLoss: number;
  withSolutionCaptured: number;
  recoveredRevenue: number;
}

const WifiMarketingROICalculator: React.FC = () => {
  const { toast } = useToast();
  const { captureLead, loading: submitting } = useBrevoLead();

  // Input state
  const [rooms, setRooms] = useState(30);
  const [occupancy, setOccupancy] = useState(60);
  const [guestsPerRoom, setGuestsPerRoom] = useState(1.5);
  const [avgRate, setAvgRate] = useState(85);
  const [currentCapture, setCurrentCapture] = useState(0);
  const [remarketingRate, setRemarketingRate] = useState(8);
  const [otaCommission, setOtaCommission] = useState(18);
  const [avgStayNights, setAvgStayNights] = useState(2);
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
  const results: MarketingROIResults = useMemo(() => {
    const monthlyRoomNights = rooms * (occupancy / 100) * 30;
    const monthlyGuests = monthlyRoomNights * guestsPerRoom;
    const annualGuests = monthlyGuests * 12;
    const currentCaptured = annualGuests * (currentCapture / 100);
    const emailsLost = annualGuests - currentCaptured;

    const potentialRebookings = emailsLost * (remarketingRate / 100);
    const rebookingRevenue = potentialRebookings * avgRate * avgStayNights;
    const otaSavings = rebookingRevenue * (otaCommission / 100);
    const totalLoss = rebookingRevenue + otaSavings;

    // With solution (85% capture)
    const withSolutionCaptured = annualGuests * 0.85;
    const additionalBookings = (withSolutionCaptured - currentCaptured) * (remarketingRate / 100);
    const recoveredRevenue = additionalBookings * avgRate * avgStayNights * (1 + otaCommission / 100);

    return {
      annualGuests: Math.round(annualGuests),
      currentCaptured: Math.round(currentCaptured),
      emailsLost: Math.round(emailsLost),
      potentialRebookings: Math.round(potentialRebookings),
      rebookingRevenue: Math.round(rebookingRevenue),
      otaSavings: Math.round(otaSavings),
      totalLoss: Math.round(totalLoss),
      withSolutionCaptured: Math.round(withSolutionCaptured),
      recoveredRevenue: Math.round(recoveredRevenue)
    };
  }, [rooms, occupancy, guestsPerRoom, avgRate, currentCapture, remarketingRate, otaCommission, avgStayNights]);

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
      message: `WiFi Marketing ROI Calculator Lead
Property: ${formData.company}
Location: ${formData.location}
Rooms: ${rooms}
Occupancy: ${occupancy}%
Current Email Capture: ${currentCapture}%
Annual Revenue Leakage: ${formatCurrency(results.totalLoss)}
Potential Recovery with Wi-Fi Marketing: ${formatCurrency(results.recoveredRevenue)}`,
      services: ['wifi-marketing', 'guest-wifi'],
      budget: results.totalLoss < 5000 ? 'under-5000' :
              results.totalLoss < 15000 ? '5000-15000' : '15000-plus',
      timeline: 'soon',
      sourceForm: 'wifi-marketing-roi-calculator'
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
              <Wifi className="w-5 h-5 text-primary" />
              Enter Your Property Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rooms and Occupancy */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Number of Rooms</Label>
                <Input
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  min={1}
                  max={1000}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Occupancy Rate (%)</Label>
                <Input
                  type="number"
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                  min={1}
                  max={100}
                  className="font-mono"
                />
              </div>
            </div>

            {/* Guests per Room */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-foreground">Guests per Room (avg)</Label>
                <span className="font-mono text-primary font-semibold">{guestsPerRoom.toFixed(1)}</span>
              </div>
              <Slider
                value={[guestsPerRoom * 10]}
                onValueChange={([val]) => setGuestsPerRoom(val / 10)}
                min={10}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            {/* Average Rate */}
            <div className="space-y-2">
              <Label className="text-foreground">Average Room Rate (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={avgRate}
                  onChange={(e) => setAvgRate(Number(e.target.value))}
                  min={1}
                  className="pl-9 font-mono"
                />
              </div>
            </div>

            {/* Current Capture Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label className="text-foreground">Current Email Capture Rate</Label>
                  <div className="relative group">
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity w-48 pointer-events-none z-50">
                      % of guests whose email you currently collect (likely 0% without captive portal)
                    </div>
                  </div>
                </div>
                <span className="font-mono text-primary font-semibold">{currentCapture}%</span>
              </div>
              <Slider
                value={[currentCapture]}
                onValueChange={([val]) => setCurrentCapture(val)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Remarketing Conversion */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label className="text-foreground">Remarketing Conversion</Label>
                  <div className="relative group">
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity w-48 pointer-events-none z-50">
                      Industry average: 5-12% for hospitality email remarketing
                    </div>
                  </div>
                </div>
                <span className="font-mono text-primary font-semibold">{remarketingRate}%</span>
              </div>
              <Slider
                value={[remarketingRate]}
                onValueChange={([val]) => setRemarketingRate(val)}
                min={1}
                max={25}
                step={1}
                className="w-full"
              />
            </div>

            {/* OTA Commission and Stay Length */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">OTA Commission (%)</Label>
                <Input
                  type="number"
                  value={otaCommission}
                  onChange={(e) => setOtaCommission(Number(e.target.value))}
                  min={0}
                  max={35}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">Booking.com/Expedia: 15-25%</p>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Avg Stay (nights)</Label>
                <Input
                  type="number"
                  value={avgStayNights}
                  onChange={(e) => setAvgStayNights(Number(e.target.value))}
                  min={1}
                  max={14}
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
              <TrendingUp className="w-5 h-5 text-primary" />
              Revenue Leakage Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-background rounded-xl border border-border text-center">
                <p className="text-xs text-muted-foreground">Annual Wi-Fi Users</p>
                <p className="text-xl font-bold text-foreground">{results.annualGuests.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-background rounded-xl border border-border text-center">
                <p className="text-xs text-muted-foreground">Emails Captured</p>
                <p className="text-xl font-bold text-foreground">{results.currentCaptured.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800 text-center">
                <p className="text-xs text-red-600 dark:text-red-400">Emails LOST</p>
                <p className="text-xl font-bold text-red-600">{results.emailsLost.toLocaleString()}</p>
              </div>
            </div>

            {/* Revenue Impact Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-5 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-950/20 rounded-xl border-2 border-red-200 dark:border-red-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">ANNUAL REVENUE YOU'RE LOSING</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">{formatCurrency(results.totalLoss)}</p>
                    <p className="text-xs text-red-500 mt-1">
                      {formatCurrency(Math.round(results.totalLoss / 12))}/month walking out the door
                    </p>
                  </div>
                  <div className="p-2 bg-red-200 dark:bg-red-800 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-300" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-950/20 rounded-xl border-2 border-green-200 dark:border-green-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">WITH WI-FI MARKETING (85% Capture)</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(results.recoveredRevenue)}</p>
                    <p className="text-xs text-green-500 mt-1">Potential annual revenue recovered</p>
                  </div>
                  <div className="p-2 bg-green-200 dark:bg-green-800 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Breakdown */}
            <div className="p-4 bg-muted/50 rounded-xl">
              <h4 className="font-semibold text-foreground mb-3 text-sm">How We Calculated This:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Potential direct rebookings:</span>
                  <span className="font-mono text-foreground">{results.potentialRebookings.toLocaleString()} bookings</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue from rebookings:</span>
                  <span className="font-mono text-foreground">{formatCurrency(results.rebookingRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">OTA commission savings:</span>
                  <span className="font-mono text-foreground">{formatCurrency(results.otaSavings)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-foreground font-semibold">Total opportunity cost:</span>
                  <span className="font-mono font-bold text-red-600">{formatCurrency(results.totalLoss)}</span>
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
            <h3 className="text-xl font-bold text-foreground mb-4">Get Your Revenue Analysis</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Based on your calculation showing <span className="font-bold text-red-600">{formatCurrency(results.totalLoss)}</span> in annual leakage.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="roi-name">Full Name *</Label>
                <Input
                  id="roi-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="roi-email">Email Address *</Label>
                <Input
                  id="roi-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@hotel.co.zw"
                  required
                />
              </div>
              <div>
                <Label htmlFor="roi-phone">Phone (WhatsApp) *</Label>
                <Input
                  id="roi-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+263 77 123 4567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="roi-company">Property Name</Label>
                <Input
                  id="roi-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Grand Hotel Harare"
                />
              </div>
              <div>
                <Label htmlFor="roi-location">Location</Label>
                <Input
                  id="roi-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Harare, Zimbabwe"
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

export default WifiMarketingROICalculator;

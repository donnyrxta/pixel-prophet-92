/**
 * Trust Badges Component
 * Displays payment methods, compliance info, and trust signals
 * Implements: Cialdini's Authority & Social Proof principles
 * Styled for dark footer background
 */

import React from 'react';
import { Shield, Lock, Award } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="border-t border-white/10 pt-8 pb-4">
      {/* Payment Methods */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
          Accepted Payment Methods
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <img
            src="/images/trust/visa-logo.svg"
            alt="Visa payment accepted"
            className="h-8 opacity-70 hover:opacity-100 transition-opacity"
            width="60"
            height="40"
            loading="lazy"
          />
          <img
            src="/images/trust/mastercard-logo.svg"
            alt="Mastercard payment accepted"
            className="h-8 opacity-70 hover:opacity-100 transition-opacity"
            width="60"
            height="40"
            loading="lazy"
          />
          <img
            src="/images/trust/ecocash-logo.svg"
            alt="EcoCash payment accepted - Zimbabwe mobile money"
            className="h-10 opacity-70 hover:opacity-100 transition-opacity"
            width="80"
            height="40"
            loading="lazy"
          />
        </div>
      </div>

      {/* Security & Compliance Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-300 p-3 bg-white/5 rounded-lg border border-white/10">
          <Lock className="w-4 h-4 text-accent" />
          <span>Secure SSL Encryption</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-300 p-3 bg-white/5 rounded-lg border border-white/10">
          <Shield className="w-4 h-4 text-accent" />
          <span>ZIMRA VAT Registered</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-300 p-3 bg-white/5 rounded-lg border border-white/10">
          <Award className="w-4 h-4 text-accent" />
          <span>127+ Happy Clients</span>
        </div>
      </div>

      {/* Legal Disclaimers */}
      <div className="text-center space-y-2">
        <p className="text-xs text-gray-400">
          <strong className="text-accent">ZIMRA VAT Registration:</strong> 10123456789 (Zimbabwe Revenue Authority)
        </p>
        <p className="text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
          <strong className="text-accent">RBZ Forex Disclaimer:</strong> All USD prices are indicative. 
          ZWL rates calculated using mid-market rate from{' '}
          <a 
            href="https://www.rbz.co.zw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Reserve Bank of Zimbabwe
          </a>
          . 2% government levy applies to all transactions.
        </p>
        <p className="text-xs text-gray-500">
          Licensed business operating at 7 Luck Street, Harare CBD, Zimbabwe
        </p>
      </div>
    </div>
  );
}

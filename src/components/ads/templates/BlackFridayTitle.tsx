import React, { useMemo } from 'react';
import './black-friday-title.css';
import { trackClick, trackImpression } from '@/ads/analytics';

interface Props {
  campaignId: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  theme?: 'light' | 'dark';
}

/**
 * BlackFridayTitle – React version inspired by provided HTML/CSS/TS assets.
 * - SALE diagonal ribbons
 * - Big stacked headline
 * - CTA button with click tracking
 */
export const BlackFridayTitle: React.FC<Props> = ({
  campaignId,
  headline = 'Black Friday Sale',
  subheadline = '25% OFF',
  ctaText = 'Shop Now',
  ctaHref = '/shop',
  theme = 'light',
}) => {
  useMemo(() => trackImpression(campaignId), [campaignId]);

  const ribbonStyle = useMemo(() => {
    // Randomize ribbon palette per mount to echo original template behavior
    const colors = ['#e6e6e6', 'yellow', '#01adee', '#ec008b'];
    const bg = colors[Math.floor(Math.random() * colors.length)];
    const text = bg === '#e6e6e6' || bg === 'yellow' ? 'black' : 'white';
    return { ['--bf-ribbon-bg' as any]: bg, ['--bf-ribbon-color' as any]: text };
  }, []);

  const rootStyle = theme === 'dark'
    ? { ['--bf-title-color' as any]: '#fff', ['--bf-accent' as any]: '#f84342' }
    : { ['--bf-title-color' as any]: '#111', ['--bf-accent' as any]: '#f84342' };

  return (
    <div className="bf-canvas" style={rootStyle}>
      <div id="sale">
        <a className="bf-sale-ribbon r1" style={ribbonStyle} href={ctaHref} onClick={() => trackClick(campaignId)}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={`r1-${i}`}>SALE</span>
          ))}
        </a>
        <a className="bf-sale-ribbon r2" style={ribbonStyle} href={ctaHref} onClick={() => trackClick(campaignId)}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={`r2-${i}`}>SALE</span>
          ))}
        </a>
      </div>

      <div className="bf-title-wrap">
        <div className="bf-title">
          <p className="line1">{headline}</p>
          <p className="line2">{subheadline}</p>
          <p className="line3">on everything</p>
          <p className="fineprint">*Runs until midnight, local time</p>
        </div>
        <a className="bf-cta" href={ctaHref} onClick={() => trackClick(campaignId)}>
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default BlackFridayTitle;


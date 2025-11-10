import React from 'react';
import { Campaign } from '@/ads/types';
import { chooseVariant } from '@/ads/abTesting';
import BlackFridayTitle from './templates/BlackFridayTitle';

interface Props {
  campaign: Campaign;
}

export const AdSlot: React.FC<Props> = ({ campaign }) => {
  const assignment = chooseVariant(campaign.variants);
  const variant = campaign.variants.find((v) => v.id === assignment.variantId) ?? campaign.variants[0];

  switch (variant.templateId) {
    case 'black_friday_title':
      return (
        <BlackFridayTitle
          campaignId={campaign.id}
          headline={campaign.title}
          subheadline={variant?.props?.['subheadline'] as string ?? 'Special Offer'}
          ctaText={(variant?.props?.['ctaText'] as string) ?? 'Learn More'}
          ctaHref={(variant?.props?.['ctaHref'] as string) ?? '/shop'}
          theme={(variant?.props?.['theme'] as 'light' | 'dark') ?? 'light'}
        />
      );
    default:
      return null;
  }
};

export default AdSlot;


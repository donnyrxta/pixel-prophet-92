/**
 * SocialProof - Trust signals component
 * Displays statistics to build credibility (Cialdini's Social Proof principle)
 */

export const SocialProof = () => (
  <div className="bg-stone-50 border-2 border-stone-200 rounded-lg p-6">
    <div className="flex items-center justify-around flex-wrap gap-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-[#4169e1]">127+</div>
        <div className="text-sm text-stone-600">Brands Served</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-[#4169e1]">4.8★</div>
        <div className="text-sm text-stone-600">Average Rating</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-[#4169e1]">15+</div>
        <div className="text-sm text-stone-600">Years Experience</div>
      </div>
    </div>
  </div>
);

/**
 * ScarcityBadge - Creates urgency (Cialdini's Scarcity principle)
 */
export const ScarcityBadge = () => (
  <div className="flex items-center gap-2 text-sm text-stone-600">
    <div className="w-2 h-2 bg-[#4169e1] rounded-full animate-pulse" />
    <span>3 consultation slots left this week</span>
  </div>
);

/**
 * PriceAnchoring - Shows value proposition
 */
interface PriceAnchoringProps {
  actualPrice: number;
  anchorPrice?: number;
}

export const PriceAnchoring = ({ actualPrice, anchorPrice = 5000 }: PriceAnchoringProps) => (
  <div>
    <div className="text-sm text-stone-500 line-through mb-1">
      Similar services: ${anchorPrice.toLocaleString()}-{(anchorPrice * 2).toLocaleString()}
    </div>
    <div className="text-3xl font-bold text-[#4169e1]">
      Your Quote: ${actualPrice.toLocaleString()}
    </div>
    <div className="text-sm text-green-600 font-semibold">
      Save ${(anchorPrice - actualPrice).toLocaleString()}+ (50% off typical rates)
    </div>
  </div>
);
# Ask Soho Connect - AI Assistant Implementation

## Overview
The Ask Soho Connect AI Assistant is a branded, conversion-focused chatbot that provides free branding and marketing advice to Zimbabwean businesses. It uses the ApiFreeLLM API to deliver immediate value while funneling visitors toward Soho Connect's paid services.

## Features

### 1. **Retro Newspaper Style Design**
- Professional appearance matching Soho Connect's brand identity
- Oswald font for headings (newspaper headline style)
- Blue color palette (primary, accent) with newspaper column aesthetic
- Clean, trustworthy design that builds credibility

### 2. **Free API Integration**
- Uses **ApiFreeLLM.com** - completely free, no API key required
- No backend needed - client-side integration
- Simple fetch-based implementation
- 5-second rate limit for free tier (automatically handled)

### 3. **Conversion-Focused UX**
- **Starter Prompts**: 5 pre-written questions for instant engagement
  - "How do I make my brand stand out in Harare?"
  - "What's the best way to combine print + digital?"
  - "Why does consistent branding matter?"
  - "How can I improve my business cards?"
  - "What colors work best for Zimbabwean audiences?"

- **AI Response Format**: Every answer includes:
  1. Direct answer (2-3 sentences)
  2. Practical tip with local context
  3. **Call-to-Action** (→ symbol) leading to Soho Connect services

### 4. **Smart System Prompt**
The AI is instructed to:
- Answer only in Zimbabwean business context
- Keep responses under 150 words
- Use friendly, professional "advice column" tone
- Always end with specific Soho Connect CTA
- Provide actionable, practical advice

### 5. **Analytics Integration**
Tracks the following events via Google Tag Manager:
- `ai_assistant_question` - User asks a question
- `ai_assistant_response` - AI responds (includes response length)
- `cta_click` - User accesses AI from floating contact

## User Journey

```
1. User clicks "Ask AI" in Floating Contact Widget
   ↓
2. Modal opens with welcome message + 5 starter prompts
   ↓
3. User clicks starter prompt OR types custom question
   ↓
4. AI provides Zimbabwe-focused answer with CTA
   ↓
5. User continues conversation OR clicks CTA
   ↓
6. CTA leads to Quote Calculator → WhatsApp → Conversion
```

## Technical Implementation

### Component Structure
```
src/components/
  ├── AskSohoAI.tsx          # Main AI assistant modal
  ├── FloatingContact.tsx    # Updated to include AI option
  └── QuotationCalculator.tsx # Quote form (conversion endpoint)
```

### API Integration
```typescript
// Dynamically loads ApiFreeLLM script
const script = document.createElement('script');
script.src = 'https://apifreellm.com/apifree.min.js';

// Simple API call (no auth required)
const response = await window.apifree.chat(fullPrompt);
```

### Rate Limiting
- Free API: 1 request per 5 seconds per IP
- Component tracks last request time
- Shows friendly countdown if user tries too soon
- No backend throttling needed

## Positioning Strategy

### Value Proposition
**"Ask Soho Connect"** - Free branding & marketing advice for Zimbabwean businesses

### Trust Building
- Disclaimer: "AI insights by Soho Connect — for guidance, not a substitute for consulting"
- Professional design signals credibility
- Local context in every answer builds relevance

### Conversion Path
```
Free AI Advice → Trust → CTA → Quote → Service Purchase
```

## CTAs Used in AI Responses

The system prompt includes these conversion options:
- "→ Book a free consult with Soho Connect to apply this insight."
- "→ Request a sample print design from Soho Connect."
- "→ Get an instant quote for professional printing."
- "→ Explore Soho Connect's branding services."
- "→ Contact Soho Connect for a full brand audit."

## Accessibility Features
- Keyboard navigation (Enter to send)
- ARIA labels for all interactive elements
- Semantic HTML structure
- Focus management
- Screen reader friendly message flow

## Responsive Design
- Mobile-optimized layout
- Touch-friendly buttons (48px minimum)
- Smooth animations (300ms transitions)
- Proper text wrapping for long messages
- Scrollable message history

## Future Enhancements

### Phase 2 (Optional)
1. **Lead Capture**: Email gate for "full brand audit report"
2. **Airtable Logging**: Store questions for content ideas
3. **LinkedIn Integration**: Convert questions into posts
4. **Premium API**: Upgrade to remove rate limits

### Phase 3 (Optional)
1. **Conversation Memory**: Store chat history locally
2. **Follow-up Prompts**: AI suggests next questions
3. **A/B Testing**: Different CTA variations
4. **Chat-to-Quote**: Pre-fill calculator from chat context

## Maintenance

### Monitoring
- Track GTM events weekly
- Review common questions monthly
- Update system prompt as needed
- Monitor API uptime

### Content Updates
- Refine starter prompts based on usage
- Update CTAs based on conversion rates
- Add Zimbabwe-specific context as market evolves

## Cost Structure
- **Current**: 100% free (ApiFreeLLM)
- **Upgrade Option**: Premium API ($9/mo) removes rate limits
- **ROI**: Track AI chat → quote → customer conversion rate

## Support & Documentation
- ApiFreeLLM Docs: https://www.apifreellm.com
- GTM Implementation: `/docs/GTM_IMPLEMENTATION.md`
- Component API: See inline code comments

---

**Last Updated**: 2025-11-03  
**Version**: 1.0  
**Maintained By**: Soho Connect Development Team

# Wifi Marketing Revenue Calculator Audit

## 1. Executive Summary
The Wifi Customer Revenue Calculator is a well-structured React component that serves its primary purpose of estimating potential revenue for various industry segments. The implementation relies on hardcoded constants and assumptions which simplify the logic but may compromise accuracy for larger deployments. The backend integration with Brevo is functional but fragile due to heavy reliance on specific attribute naming conventions.

## 2. Code Quality & Architecture

### **Strengths**
- **Component Modularity**: The code is well-separated into the calculator component (`WifiTokenRevenueCalculator.tsx`) and the page wrapper (`WifiTokenCalculatorPage.tsx`).
- **State Management**: React hooks (`useState`, `useMemo`) are used effectively to manage state and derived calculations without unnecessary re-renders.
- **Type Safety**: TypeScript interfaces (`IndustryConfig`, `SolarBundle`, `CalculatorResults`) are well-defined.
- **UI Libraries**: Effective use of `shadcn/ui` components and `framer-motion` for a polished look.

### **Weaknesses**
- **Hardcoded constants**: Critical business values like `BASE_EQUIPMENT_COST` ($500) and `BASE_ISP_COST` ($100) are hardcoded within the component file.
- **Inline Data**: `industries` and `solarBundles` configuration arrays are defined inside the component file. This makes it harder to maintain or update pricing without touching the UI code.
- **Currency formatting**: Manually implemented `formatCurrency` instead of a shared utility or hook, leading to potential inconsistency across the app.

## 3. Business Logic & Math Audit

### **Revenue Logic (`useMemo` block)**
- **Formula**: `Revenue = Population * (Paid% / 100) * AvgDailySpend * 30 days`
- **Verdict**: ✅ **Accurate** for the intended simplified estimation.

### **Cost Logic**
- **Equipment Cost**: `BASE_EQUIPMENT_COST` is fixed at $500 regardless of population.
    - 🚩 **Issue**: This is unrealistic. A deployment for 1,000 users requires significantly more hardware (APs, switches) than one for 20 users. The cost should likely scale with population or be tiered.
- **ISP Cost**: Scales with population using a simple step function:
    ```typescript
    const monthlyISPCost = BASE_ISP_COST + (population > 200 ? 50 : 0) + (population > 500 ? 100 : 0);
    ```
    - 🚩 **Issue**: This scaling ($50-$100 steps) seems very conservative for a jump in hundreds of users. Bandwidth costs usually scale more linearly or with larger tier jumps.
- **Free Users**: Calculated (`freeUsers`) but **unused** in any financial logic.
    - 🚩 **Issue**: Free users consume bandwidth and router capacity. They often represent a hidden cost (higher ISP tier needed) or an opportunity (ad revenue). Currently, they are just a "vanity metric" in the calculator.

### **ROI Calculations**
- **ROI Formula**: `((yearOneProfit - totalInvestment) / totalInvestment) * 100`
- **Verdict**: ✅ **Standard** implementation for simple ROI.
- **Payback Period**: `Math.ceil(totalInvestment / monthlyProfit)`
- **Verdict**: ✅ **Correctly** handles edge cases where profit is <= 0.

### **Solar Bundles**
- **Logic**: Users can select any solar bundle regardless of their population setting.
- **Verdict**: ⚠️ **Risk**. A user can select a "Starter Solar" (max 15 users) while setting population to 500. The calculator does not warn them, potentially leading to an under-quoted system proposal.

## 4. Backend & Integration Audit

### **Lead Capture (`useBrevoLead` & Edge Function)**
- **Data Flow**: Component -> `useBrevoLead` hook -> Supabase Edge Function (`brevo-lead`) -> Brevo API.
- **Security**: Good. Uses sanitized inputs and environment variable for API keys.
- **Fragility**: The Edge Function maps fields to specific Brevo attributes (e.g., `BANT_SCORE`, `LEAD_TIER`).
    - ⚠️ **Critical Check**: If these custom attributes do not exist in the Brevo CRM account exactly as spelled (often Brevo requires `SC_` prefix or specific casing), the API call may fail or drop data.
- **Phone Number Parsing**: The generic logic (`263` prefixing) is sufficient for Zimbabwe but brittle for international numbers.

## 5. UI/UX & SEO

### **User Experience**
- **Input Feedback**: Sliders provide immediate feedback, which is good.
- **Responsiveness**: Grid layout adapts well to mobile (`grid-cols-2` to `grid-cols-4`).
- **Visuals**: Distinct styling for "Solar" vs "Standard" industries helps guide the user.

### **SEO (`WifiTokenCalculatorPage.tsx`)**
- **Metadata**: Comprehensive `react-helmet` usage with Title, Description, and Keywords.
- **Structured Data**: Includes `application/ld+json` for `WebApplication` and `FAQPage`, which is excellent for rich search results.

## 6. Recommendations

1.  **Refactor Constants**: Move `industries`, `solarBundles`, and cost constants to a separate configuration file (e.g., `src/config/calculatorData.ts`).
2.  **Improve Cost Scaling**: Update `totalInvestment` logic to scale equipment cost based on population tiers (e.g., +$X for every 50 users beyond base).
3.  **Validate Solar Selection**: Add a validation/warning if the selected solar bundle capacity (`maxUsers`) is less than the input `population`.
4.  **Utilize 'Free Users'**: Either assign a "cost per user" to free users (bandwidth usage) or a "value per user" (ad impressions audit) to make this input meaningful.
5.  **Verify Brevo Attributes**: Confirm that `BANT_SCORE`, `LEAD_TIER`, `SOURCE_FORM` fields are created in the Brevo CRM.

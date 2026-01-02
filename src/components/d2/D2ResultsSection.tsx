/**
 * D2ResultsSection - Verified results with case study snapshots
 */
import { RESULTS, CASE_STUDIES } from "@/lib/constants";

export function D2ResultsSection() {
  return (
    <section id="results" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✓ Data-Verified Results
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Measuring Impact & ROI
          </h2>
          <p className="text-lg text-muted-foreground">
            Real metrics from real Zimbabwe businesses
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          {RESULTS.map((result, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-lg text-center border"
            >
              <div className="text-5xl font-display font-bold text-primary mb-3">
                {result.value}
              </div>
              <div className="text-xl font-bold text-foreground mb-2">
                {result.label}
              </div>
              <p className="text-muted-foreground">{result.description}</p>
            </div>
          ))}
        </div>
        
        {/* Measurement Protocol */}
        <div className="bg-card rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mb-12 border">
          <h3 className="text-xl font-display font-bold text-foreground mb-4">
            📋 How We Verify Results (Transparent)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <p className="text-muted-foreground">Baseline: pre-install revenue and foot traffic (owner records or POS)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <p className="text-muted-foreground">Measurement window: 30/60/90 days post-install</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <p className="text-muted-foreground">Tracked metrics: captured leads, repeat rate, revenue lift, theft incidents</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <p className="text-muted-foreground">Independent corroboration: POS logs, CCTV timestamps, mobile payment records</p>
            </div>
          </div>
        </div>
        
        {/* Case Studies */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-display font-bold text-foreground mb-6 text-center">
            Short Case Snapshots
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border-l-4 border-primary shadow-sm"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {study.type}
                </span>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {study.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

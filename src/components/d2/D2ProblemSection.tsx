/**
 * D2ProblemSection - Loss aversion framing for conversion
 * Highlights pain points before showing solution
 */
import { PROBLEMS } from "@/lib/constants";

export function D2ProblemSection() {
  return (
    <section className="py-16 bg-destructive/5 border-y-4 border-destructive/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-destructive mb-6">
            ⚠️ The Silent Revenue Leak Every Day
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {PROBLEMS.map((problem, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-md border-l-4 border-destructive"
              >
                <div className="text-4xl mb-3">{problem.icon}</div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-lg font-semibold text-destructive">
              <span className="text-2xl">💸</span> The cost of doing nothing is higher than the cost of fixing it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

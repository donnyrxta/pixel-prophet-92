import { MessageCircle, FileCheck, Printer, Truck } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Contact Us",
    description: "Reach out via WhatsApp or phone",
    time: "2 minutes",
  },
  {
    icon: FileCheck,
    title: "2. Get Quote",
    description: "Receive detailed quote and timeline",
    time: "Within 1 hour",
  },
  {
    icon: Printer,
    title: "3. We Print",
    description: "Expert production with quality checks",
    time: "24-48 hours",
  },
  {
    icon: Truck,
    title: "4. Delivery",
    description: "Fast delivery or pickup",
    time: "Same day",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Simple Process, Amazing Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From first contact to final delivery in as little as 48 hours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="relative bg-card border-2 border-border rounded-2xl p-8 text-center space-y-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="relative w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Time Badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full">
                    <span className="text-sm font-semibold text-accent">
                      {step.time}
                    </span>
                  </div>
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 text-primary text-4xl z-10">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Total Time Highlight */}
        <div className="mt-16 text-center p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border-2 border-dashed border-primary/20 animate-fade-in">
          <p className="text-lg text-muted-foreground mb-2">
            Total turnaround time
          </p>
          <p className="text-4xl md:text-5xl font-bold gradient-text">
            24-48 Hours
          </p>
          <p className="text-muted-foreground mt-2">
            Rush orders available for urgent needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

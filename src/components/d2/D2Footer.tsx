/**
 * D2Footer - Simple footer with copyright
 */
import { BUSINESS_INFO, CONTACT_INFO } from "@/lib/constants";

export function D2Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg">{BUSINESS_INFO.name}</span>
            <span className="text-background/60">— {CONTACT_INFO.city}</span>
          </div>
          
          <div className="text-sm text-background/60">
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

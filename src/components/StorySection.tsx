import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Palette, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Problem Section Animations
      const problemTl = gsap.timeline({
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      problemTl.fromTo(".problem-text", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }
      );

      // Solution Section Animations
      const solutionTl = gsap.timeline({
        scrollTrigger: {
          trigger: solutionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      solutionTl.fromTo(".solution-card", 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );

      // Proof Section Animations
      const proofTl = gsap.timeline({
        scrollTrigger: {
          trigger: proofRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      proofTl.fromTo(".proof-stat", 
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      {/* 1. PROBLEM: The Invisible Business */}
      <section 
        ref={problemRef} 
        className="min-h-[80vh] flex flex-col justify-center items-center bg-stone-950 text-white px-6 py-20 relative bg-hero-pattern"
      >
        <div className="bg-image-enhanced" style={{ backgroundImage: "url('/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg')" }} />
        <div className="bg-image-gradient" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="problem-text text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Is Your Business <span className="text-[#4169e1]">Invisible?</span>
          </h2>
          <p className="problem-text text-xl md:text-2xl text-stone-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            In a digital world, blending in means disappearing. 
            Without a commanding visual identity, you risk losing customers to competitors who simply look the part.
          </p>
          <div className="problem-text">
             <div className="h-1 w-32 bg-[#4169e1] mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. SOLUTION: The Soho Connect Ecosystem */}
      <section 
        ref={solutionRef}
        className="min-h-screen flex flex-col justify-center bg-stone-50 px-6 py-24 bg-section-enhanced"
      >
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#4169e1] font-bold tracking-widest uppercase text-sm mb-2 block">The Solution</span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
              We Craft Your <span className="text-[#4169e1]">Visual Authority</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Design */}
            <div className="solution-card bg-white p-8 rounded-2xl shadow-xl border border-stone-100 hover:border-[#4169e1]/30 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-[#4169e1]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4169e1] transition-colors duration-300">
                <Palette className="w-7 h-7 text-[#4169e1] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900">Strategic Design</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                From logos to comprehensive brand guidelines, we forge identities that command respect and inspire trust.
              </p>
              <Button variant="ghost" className="btn-glass w-full justify-center" onClick={() => navigate('/services/branding')}>
                Explore Branding <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Card 2: Print */}
            <div className="solution-card bg-white p-8 rounded-2xl shadow-xl border border-stone-100 hover:border-[#4169e1]/30 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-[#4169e1]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4169e1] transition-colors duration-300">
                <Printer className="w-7 h-7 text-[#4169e1] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900">Premium Print</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Tangible assets that leave a lasting impression. High-quality business cards, banners, and flyers.
              </p>
              <Button variant="ghost" className="btn-glass w-full justify-center" onClick={() => navigate('/webstore')}>
                View Products <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Card 3: Security */}
            <div className="solution-card bg-white p-8 rounded-2xl shadow-xl border border-stone-100 hover:border-[#4169e1]/30 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-[#4169e1]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4169e1] transition-colors duration-300">
                <ShieldCheck className="w-7 h-7 text-[#4169e1] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900">Secure Business</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Protect your assets with state-of-the-art CCTV and access control systems.
              </p>
              <Button variant="ghost" className="btn-glass w-full justify-center" onClick={() => navigate('/services/cctv')}>
                Secure Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROOF: Social Proof & CTA */}
      <section 
        ref={proofRef}
        className="py-24 bg-[#4169e1] text-white overflow-hidden relative"
      >
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Trusted by Leaders</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="proof-stat">
              <div className="text-4xl md:text-6xl font-black mb-2">127+</div>
              <div className="text-blue-100 font-medium">Happy Clients</div>
            </div>
            <div className="proof-stat">
              <div className="text-4xl md:text-6xl font-black mb-2">500+</div>
              <div className="text-blue-100 font-medium">Projects Done</div>
            </div>
            <div className="proof-stat">
              <div className="text-4xl md:text-6xl font-black mb-2">24h</div>
              <div className="text-blue-100 font-medium">Support</div>
            </div>
            <div className="proof-stat">
              <div className="text-4xl md:text-6xl font-black mb-2">100%</div>
              <div className="text-blue-100 font-medium">Satisfaction</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-[#4169e1] hover:bg-stone-100 text-lg rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-bold btn-hero"
              onClick={() => navigate('/contact')}
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 text-lg rounded-full transition-all duration-300 bg-transparent btn-hero"
              onClick={() => navigate('/portfolio')}
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorySection;

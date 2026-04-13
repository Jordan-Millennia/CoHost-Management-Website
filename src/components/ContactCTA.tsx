"use client";

import { useRef, useEffect, useState } from "react";

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="transition-all duration-700 ease-out" style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)" }}>
      {children}
    </div>
  );
}

export default function ContactCTA() {
  return (
    <section className="py-24" id="contact">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-3xl border border-white/[0.06] bg-bg-1/60 backdrop-blur-sm p-10 md:p-16 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />

          <Reveal>
            <div className="relative z-10 text-center max-w-lg mx-auto mb-10">
              <span className="inline-block text-teal text-xs font-medium uppercase tracking-[0.2em] mb-3">Get Started</span>
              <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-bold text-text-0 leading-tight">
                Ready to Maximize Your Portfolio?
              </h2>
              <p className="mt-4 text-text-1 text-base">
                Free property assessment. Custom revenue projection. No obligations.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <form
              action="https://formspree.io/f/xpwdqdqk"
              method="POST"
              className="relative z-10 max-w-2xl mx-auto space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-text-1 text-xs mb-1.5">Name</label>
                  <input
                    type="text" id="name" name="name" required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-0 text-sm placeholder:text-text-2 focus:border-teal/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-text-1 text-xs mb-1.5">Email</label>
                  <input
                    type="email" id="email" name="email" required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-0 text-sm placeholder:text-text-2 focus:border-teal/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-text-1 text-xs mb-1.5">Phone</label>
                  <input
                    type="tel" id="phone" name="phone"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-0 text-sm placeholder:text-text-2 focus:border-teal/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="units" className="block text-text-1 text-xs mb-1.5">Number of Properties</label>
                  <input
                    type="number" id="units" name="units" min="1"
                    placeholder="How many properties?"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-0 text-sm placeholder:text-text-2 focus:border-teal/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="propertyLocation" className="block text-text-1 text-xs mb-1.5">Property Location</label>
                <input
                  type="text" id="propertyLocation" name="propertyLocation"
                  placeholder="City, State"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-0 text-sm placeholder:text-text-2 focus:border-teal/50 focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-teal text-bg-0 font-medium text-sm hover:bg-teal-dark transition-colors cursor-pointer"
              >
                Get My Free Analysis
              </button>
            </form>
          </Reveal>

          <Reveal>
            <div className="relative z-10 flex items-center justify-center gap-6 mt-8">
              {["No setup fees", "Free analysis", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-text-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

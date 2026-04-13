"use client";

import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "CoHost transformed my rental income. I went from $1,900 to $4,200 per month with their co-living management. The process was seamless and the support is outstanding.",
    name: "Marcus Thompson",
    role: "3 Co-Living Units · Jacksonville, FL",
    initials: "MT",
    color: "bg-teal/20 text-teal",
  },
  {
    quote:
      "In two years of working with CoHost, we haven't had a single eviction. Their member screening process is thorough and their management is professional. Exactly what we needed.",
    name: "Sarah Chen",
    role: "2 PadSplit Properties · Orlando, FL",
    initials: "SC",
    color: "bg-blue/20 text-blue",
  },
  {
    quote:
      "I'm now managing 6 co-living properties with CoHost. They handle everything so well that I've been able to focus on growing my portfolio. 94% occupancy across the board.",
    name: "David Rodriguez",
    role: "6 Co-Living Units · Multi-Market",
    initials: "DR",
    color: "bg-purple/20 text-purple",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="transition-all duration-700 ease-out" style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24" id="testimonials">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="inline-block text-teal text-xs font-medium uppercase tracking-[0.2em] mb-3">Testimonials</span>
            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-bold text-text-0 leading-tight">Trusted by Owners Nationwide</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-white/[0.12] transition-all duration-300">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-text-1 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-text-0 text-sm font-medium">{t.name}</div>
                    <div className="text-text-2 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

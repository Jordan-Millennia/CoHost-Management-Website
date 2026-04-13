"use client";

import { UserPlus, TrendingUp, DollarSign } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const STEPS = [
  {
    num: "01",
    icon: UserPlus,
    title: "Onboard",
    desc: "Free property assessment, revenue projections, and a custom management plan. We handle setup, furnishing, smart lock installation, PadSplit listing, and room optimization.",
  },
  {
    num: "02",
    icon: TrendingUp,
    title: "We Operate",
    desc: "Room-by-room leasing, member screening, cleaning coordination, maintenance, inspections, and 24/7 monitoring. Every operational detail handled by our team and tech stack.",
  },
  {
    num: "03",
    icon: DollarSign,
    title: "Collect Returns",
    desc: "Track revenue, occupancy, and expenses in your live owner portal. Automated payouts, transparent reporting, and ongoing optimization to maximize your returns.",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 bg-bg-1/40" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="inline-block text-teal text-xs font-medium uppercase tracking-[0.2em] mb-3">
              How It Works
            </span>
            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-bold text-text-0 leading-tight">
              Three Steps to Passive Income
            </h2>
            <p className="mt-4 text-text-1 text-base">
              We handle every detail so you can focus on growing your portfolio.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 120}>
              <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 group overflow-hidden">
                {/* Ghost number */}
                <span className="absolute -top-4 -right-2 font-display text-[120px] font-extrabold text-white/[0.02] leading-none select-none pointer-events-none">
                  {step.num}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-6 group-hover:bg-teal/20 transition-colors">
                    <step.icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-0 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-1 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Home, ShieldCheck, Wrench, BarChart3, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const SERVICES = [
  {
    icon: Home,
    color: "text-teal",
    glow: "group-hover:shadow-teal/10",
    title: "Room-by-Room Optimization",
    desc: "Individual room marketing, competitive per-room pricing, and fast vacancy fills through PadSplit. Earn 2-3x gross revenue versus traditional leasing.",
    tags: ["PadSplit", "Per-Room Pricing", "2-3x Revenue"],
  },
  {
    icon: ShieldCheck,
    color: "text-blue",
    glow: "group-hover:shadow-blue/10",
    title: "Member Screening & Placement",
    desc: "Background, credit, income, and compatibility screening for every applicant. Fewer turnovers, better households, zero evictions track record.",
    tags: ["Background Checks", "Compatibility", "Zero Evictions"],
  },
  {
    icon: Wrench,
    color: "text-purple",
    glow: "group-hover:shadow-purple/10",
    title: "Property Operations",
    desc: "24/7 maintenance coordination, smart lock management, cleaning, inspections, and vendor oversight. Turnkey operations from setup to daily management.",
    tags: ["Smart Locks", "Maintenance", "24/7 Support"],
  },
  {
    icon: BarChart3,
    color: "text-gold",
    glow: "group-hover:shadow-gold/10",
    title: "Revenue & Reporting",
    desc: "Real-time owner portal with revenue, occupancy, and expense tracking. Automated rent collection, monthly disbursements, and transparent financials.",
    tags: ["Live Portal", "Auto Payouts", "Monthly Reports"],
  },
];

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <section className="py-24 bg-bg-1/40" id="services">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="inline-block text-teal text-xs font-medium uppercase tracking-[0.2em] mb-3">
              Our Services
            </span>
            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-bold text-text-0 leading-tight">
              Full-Spectrum Co-Living Management
            </h2>
            <p className="mt-4 text-text-1 text-base leading-relaxed">
              From property setup to daily operations — we optimize every room for maximum occupancy and returns.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((svc, i) => (
            <RevealOnScroll key={svc.title} delay={i * 100}>
              <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
                <div className={`w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5 ${svc.color}`}>
                  <svc.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold text-text-0 mb-2">
                  {svc.title}
                </h3>
                <p className="text-text-1 text-sm leading-relaxed mb-5">
                  {svc.desc}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-text-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-text-2 group-hover:text-teal group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  MessageSquare,
  Lock,
  TrendingUp,
  Clock,
  FileText,
  LayoutGrid,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

const FEATURES = [
  { icon: MessageSquare, title: "AI-Powered Communications", desc: "Automated member messaging, issue responses, and owner updates" },
  { icon: Lock, title: "Smart Lock Integration", desc: "TTLock keyless entry, automated codes, real-time access monitoring" },
  { icon: TrendingUp, title: "Revenue Optimization", desc: "Room-by-room pricing, comp analysis, market-responsive adjustments" },
  { icon: Clock, title: "24/7 Operations", desc: "Round-the-clock monitoring, emergency response, member support" },
  { icon: FileText, title: "Transparent Reporting", desc: "Real-time portal with revenue, occupancy, and maintenance data" },
  { icon: LayoutGrid, title: "PadSplit Integration", desc: "Seamless listing, member management, and payout tracking" },
];

const MICRO_STATS = [
  { value: "94%", label: "Avg Occupancy" },
  { value: "2.1x", label: "Revenue vs Traditional" },
  { value: "4.9★", label: "Avg Member Rating" },
  { value: "<3min", label: "Avg Response Time" },
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

export default function WhyCoHost() {
  return (
    <section className="py-24" id="why">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <Reveal>
              <span className="inline-block text-teal text-xs font-medium uppercase tracking-[0.2em] mb-3">
                Why CoHost
              </span>
              <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-bold text-text-0 leading-tight">
                Built Different.<br />Backed by Data.
              </h2>
              <p className="mt-4 text-text-1 text-base leading-relaxed max-w-md">
                Institutional-grade operations meets co-living innovation. Outsized returns through room-by-room optimization.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-5 mt-10">
              {MICRO_STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <div className="font-display text-2xl font-bold text-teal">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-2 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {FEATURES.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 80}>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0 text-teal group-hover:bg-teal/20 transition-colors">
                    <feat.icon size={20} />
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-text-0">
                      {feat.title}
                    </div>
                    <div className="text-text-2 text-sm mt-0.5">
                      {feat.desc}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

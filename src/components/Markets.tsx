"use client";

import { useRef, useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const MARKETS = [
  { city: "Jacksonville", state: "Florida", status: "active" },
  { city: "Tampa", state: "Florida", status: "active" },
  { city: "Orlando", state: "Florida", status: "active" },
  { city: "Sarasota", state: "Florida", status: "active" },
  { city: "Cape Coral", state: "Florida", status: "active" },
  { city: "Miami", state: "Florida", status: "active" },
  { city: "Fort Lauderdale", state: "Florida", status: "active" },
  { city: "Gainesville", state: "Florida", status: "active" },
  { city: "Houston", state: "Texas", status: "active" },
  { city: "San Antonio", state: "Texas", status: "expanding" },
  { city: "Denver", state: "Colorado", status: "expanding" },
  { city: "New Orleans", state: "Louisiana", status: "expanding" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
    <div ref={ref} className="transition-all duration-700 ease-out" style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Markets() {
  return (
    <section className="py-24 bg-bg-1/40" id="markets">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="inline-block text-teal text-xs font-medium uppercase tracking-[0.2em] mb-3">Our Markets</span>
            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-bold text-text-0 leading-tight">National Reach. Local Expertise.</h2>
            <p className="mt-4 text-text-1 text-base">Boots-on-the-ground teams with market-specific co-living strategies across high-growth metros.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MARKETS.map((m, i) => (
            <Reveal key={m.city} delay={i * 60}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-teal opacity-60" />
                  <span className="font-display text-sm font-bold text-text-0 group-hover:text-teal transition-colors">
                    {m.city}
                  </span>
                </div>
                <div className="text-text-2 text-xs">{m.state}</div>
                <span className={`inline-block mt-3 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  m.status === "active"
                    ? "bg-teal/10 text-teal"
                    : "bg-blue/10 text-blue"
                }`}>
                  {m.status === "active" ? "Active" : "Expanding"}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

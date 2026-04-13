"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SplineRobot = dynamic(() => import("./SplineRobot"), { ssr: false });

const STATS = [
  { target: 500, suffix: "+", label: "Units Managed" },
  { target: 94, suffix: "%", label: "Avg Occupancy" },
  { target: 18, suffix: "", label: "Markets" },
  { target: 0, suffix: "", label: "Setup Fee", prefix: "$", display: "$0" },
];

function AnimatedCounter({
  target,
  suffix,
  prefix = "",
  display,
  decimals = 0,
}: {
  target: number;
  suffix: string;
  prefix?: string;
  display?: string;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (display) {
            setValue(target);
            return;
          }
          const start = performance.now();
          const duration = 2000;
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(
              decimals > 0
                ? parseFloat((target * eased).toFixed(decimals))
                : Math.round(target * eased)
            );
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, display, decimals]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-2xl md:text-3xl font-bold text-text-0">
        {display || `${prefix}${value}${suffix}`}
      </div>
      <div className="text-xs text-text-2 mt-1 uppercase tracking-wider">
        {/* label passed via parent */}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <section className="relative min-h-screen pt-[100px] pb-16 overflow-hidden" id="hero">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 items-center min-h-[70vh]">
            {/* Left content */}
            <div className="z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-teal text-[13px] font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                Now Operating in 18 Markets
              </div>

              <h1 className="font-display font-extrabold leading-[1.05] tracking-tight">
                <span className="block text-text-0 text-[clamp(34px,3.6vw,52px)]">
                  Intelligent
                </span>
                <span className="block text-[clamp(34px,3.6vw,52px)] bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
                  Co-Living Management.
                </span>
                <span className="block text-text-2 text-[clamp(34px,3.6vw,52px)]">
                  Maximum Returns.
                </span>
              </h1>

              <p className="mt-6 text-text-1 text-base md:text-lg leading-relaxed max-w-lg">
                Done-for-you co-living operations powered by smart technology. Room-by-room
                optimization, member screening, and real-time reporting — earn 2-3x more per door.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="#contact"
                  className="px-7 py-3.5 rounded-lg bg-teal text-bg-0 font-medium text-sm hover:bg-teal-dark transition-colors cursor-pointer"
                >
                  Get a Free Analysis
                </a>
                <a
                  href="#portal"
                  className="px-7 py-3.5 rounded-lg border border-white/10 text-text-0 font-medium text-sm hover:border-white/25 transition-colors cursor-pointer"
                >
                  View Owner Portal &rarr;
                </a>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  PadSplit
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                  Co-Living
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple" />
                  Room-by-Room
                </span>
              </div>
            </div>

            {/* Right: Spline robot */}
            <div className="relative hidden lg:block h-[600px]">
              {/* Glow behind robot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[120px] pointer-events-none" />
              <SplineRobot className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="relative border-y border-white/[0.06] bg-bg-1/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  display={stat.display}
                />
                <div className="text-xs text-text-2 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

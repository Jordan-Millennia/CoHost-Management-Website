"use client";

const ITEMS = ["PadSplit", "Co-Living", "Smart Locks", "TTLock", "Room-by-Room", "AI Comms", "Real-Time Portal"];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <section className="py-8 border-y border-white/[0.06] overflow-hidden">
      <div className="mb-3">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {row.map((item, i) => (
            <span key={`l-${i}`} className="inline-flex items-center gap-2 mx-3 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-text-1 text-sm shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="flex animate-marquee-right whitespace-nowrap">
          {[...row].reverse().map((item, i) => (
            <span key={`r-${i}`} className="inline-flex items-center gap-2 mx-3 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-text-1 text-sm shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

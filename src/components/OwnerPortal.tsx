"use client";

import { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const REVENUE = [31200, 34800, 42100, 45600, 38900, 41200, 39800, 43100, 44200, 42800, 46100, 47280];

const TABS = ["Overview", "Revenue", "Properties", "Maintenance"] as const;

const KPI_OVERVIEW = [
  { label: "Monthly Revenue", value: "$47,280", delta: "+12.3% vs last month", up: true },
  { label: "Occupancy Rate", value: "94.2%", delta: "+3.1% vs last month", up: true },
  { label: "Active Rooms", value: "48", delta: "+8 new this quarter", up: true },
  { label: "Open Work Orders", value: "3", delta: "1 high priority", up: false },
];

const KPI_REVENUE = [
  { label: "Gross Revenue (YTD)", value: "$412,840", delta: "+18.7% vs last year", up: true },
  { label: "Net Payouts (YTD)", value: "$329,272", delta: "80% net margin", up: true },
  { label: "Avg Per-Room Rate", value: "$685", delta: "+$120 vs market", up: true },
  { label: "MoM Growth", value: "+12.3%", delta: "Trending up", up: true },
];

const PROPERTIES = [
  { dot: "green", address: "1842 Riverside Dr, Jacksonville", type: "PadSplit", occ: "97%", payout: "$4,180", status: "Active" },
  { dot: "green", address: "305 Palm Ave, Tampa", type: "Co-Living", occ: "100%", payout: "$3,450", status: "Active" },
  { dot: "green", address: "927 Oak St A-D, Orlando", type: "PadSplit", occ: "92%", payout: "$5,820", status: "Active" },
  { dot: "green", address: "4401 Magnolia Blvd, Houston", type: "Co-Living", occ: "100%", payout: "$2,100", status: "Active" },
  { dot: "yellow", address: "612 Bayshore Dr, Sarasota", type: "PadSplit", occ: "88%", payout: "$3,920", status: "Maintenance" },
];

const TICKETS = [
  { priority: "high", title: "HVAC Unit Not Cooling — 612 Bayshore Dr", meta: "Reported Apr 10 · Member complaint", badge: "High", status: "In Progress", vendor: "CoolAir HVAC LLC" },
  { priority: "med", title: "Dishwasher Leak — 1842 Riverside Dr", meta: "Reported Apr 8 · Turnover inspection", badge: "Medium", status: "Open", vendor: "FlowFix Plumbing" },
  { priority: "low", title: "Smart Lock Battery — 927 Oak St", meta: "Reported Apr 6 · Automated alert", badge: "Low", status: "Open", vendor: "In-House Tech" },
  { priority: "low", title: "Exterior Paint Touch-Up — 305 Palm Ave", meta: "Reported Mar 28 · Quarterly inspection", badge: "Low", status: "Resolved", vendor: "ProCoat Painting" },
  { priority: "med", title: "Garage Door Sensor — 4401 Magnolia Blvd", meta: "Reported Mar 22 · Member request", badge: "Medium", status: "Resolved", vendor: "AllDoor Garage Co" },
];

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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "#4A6180", font: { size: 11 } } },
    y: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "#4A6180", font: { size: 11 }, callback: (v: number | string) => `$${Number(v) / 1000}k` } },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" as const, labels: { color: "#8FA3BC", font: { size: 11 }, padding: 16 } } },
  cutout: "65%",
};

export default function OwnerPortal() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");

  const revenueData = {
    labels: MONTHS,
    datasets: [{
      data: REVENUE,
      backgroundColor: REVENUE.map((_, i) => (i === 11 ? "#00D4AA" : "#1A6FF5")),
      borderRadius: 4,
      borderSkipped: false,
    }],
  };

  const occupancyData = {
    labels: ["Occupied", "Vacant", "Maintenance"],
    datasets: [{ data: [45, 2, 1], backgroundColor: ["#00D4AA", "#1A6FF5", "#F5A623"], borderWidth: 0 }],
  };

  return (
    <section className="py-24" id="portal">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-12">
            <span className="inline-block text-teal text-xs font-medium uppercase tracking-[0.2em] mb-3">Owner Portal</span>
            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-bold text-text-0 leading-tight">Your Properties. Real-Time Data.</h2>
            <p className="mt-4 text-text-1 text-base">Every metric, every payout, every work order — accessible 24/7.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-white/[0.06] bg-bg-1/60 backdrop-blur-sm overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-text-2 text-xs ml-4">portal.cohostmanagement.com</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-[10px] font-bold text-teal">JR</span>
                <span className="text-text-1 text-xs">Jordan R.</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b border-white/[0.06]">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-3 text-xs font-medium transition-colors cursor-pointer ${
                    tab === t ? "text-teal border-b-2 border-teal" : "text-text-2 hover:text-text-1"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* OVERVIEW */}
              {tab === "Overview" && (
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {KPI_OVERVIEW.map((kpi) => (
                      <div key={kpi.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <div className="text-text-2 text-xs mb-1">{kpi.label}</div>
                        <div className="font-display text-xl font-bold text-text-0">{kpi.value}</div>
                        <div className={`text-xs mt-1 ${kpi.up ? "text-teal" : "text-gold"}`}>{kpi.delta}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-6">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <div className="text-text-1 text-xs mb-4">Monthly Revenue — Last 12 Months</div>
                      <div className="h-[200px]"><Bar data={revenueData} options={chartOptions as never} /></div>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <div className="text-text-1 text-xs mb-4">Occupancy Breakdown</div>
                      <div className="h-[200px]"><Doughnut data={occupancyData} options={doughnutOptions as never} /></div>
                    </div>
                  </div>
                  {/* Property list */}
                  <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-4 py-2.5 bg-white/[0.02] text-text-2 text-[11px] uppercase tracking-wider">
                      <span></span><span>Property</span><span>Type</span><span>Occupancy</span><span>Payout</span><span>Status</span>
                    </div>
                    {PROPERTIES.map((p) => (
                      <div key={p.address} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-4 py-3 border-t border-white/[0.04] items-center text-sm">
                        <span className={`w-2 h-2 rounded-full ${p.dot === "green" ? "bg-teal" : "bg-gold"}`} />
                        <span className="text-text-0 text-xs truncate">{p.address}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-teal/10 text-teal">{p.type}</span>
                        <span className="text-teal text-xs">{p.occ}</span>
                        <span className="text-text-1 text-xs">{p.payout}</span>
                        <span className="text-text-2 text-xs">{p.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REVENUE */}
              {tab === "Revenue" && (
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {KPI_REVENUE.map((kpi) => (
                      <div key={kpi.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <div className="text-text-2 text-xs mb-1">{kpi.label}</div>
                        <div className="font-display text-xl font-bold text-text-0">{kpi.value}</div>
                        <div className="text-xs mt-1 text-teal">{kpi.delta}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <div className="text-text-1 text-xs mb-4">Revenue by Month</div>
                    <div className="h-[250px]"><Bar data={revenueData} options={chartOptions as never} /></div>
                  </div>
                </div>
              )}

              {/* PROPERTIES */}
              {tab === "Properties" && (
                <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                  <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-4 py-2.5 bg-white/[0.02] text-text-2 text-[11px] uppercase tracking-wider">
                    <span></span><span>Address</span><span>Type</span><span>Occupancy</span><span>Payout</span><span>Status</span>
                  </div>
                  {PROPERTIES.map((p) => (
                    <div key={p.address} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-4 py-3 border-t border-white/[0.04] items-center text-sm">
                      <span className={`w-2 h-2 rounded-full ${p.dot === "green" ? "bg-teal" : "bg-gold"}`} />
                      <span className="text-text-0 text-xs">{p.address}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-teal/10 text-teal">{p.type}</span>
                      <span className="text-teal text-xs">{p.occ}</span>
                      <span className="text-text-1 text-xs">{p.payout}</span>
                      <span className="text-text-2 text-xs">{p.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* MAINTENANCE */}
              {tab === "Maintenance" && (
                <div className="space-y-3">
                  {TICKETS.map((t) => (
                    <div key={t.title} className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <div className={`w-1 h-12 rounded-full ${t.priority === "high" ? "bg-red-500" : t.priority === "med" ? "bg-gold" : "bg-blue"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-text-0 text-sm font-medium truncate">{t.title}</div>
                        <div className="text-text-2 text-xs mt-0.5">{t.meta}</div>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded ${
                        t.priority === "high" ? "bg-red-500/10 text-red-400" : t.priority === "med" ? "bg-gold/10 text-gold" : "bg-blue/10 text-blue"
                      }`}>{t.badge}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded ${
                        t.status === "In Progress" ? "bg-teal/10 text-teal" : t.status === "Open" ? "bg-blue/10 text-blue" : "bg-white/[0.05] text-text-2"
                      }`}>{t.status}</span>
                      <span className="text-text-2 text-xs hidden md:block">{t.vendor}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center px-6 py-6 border-t border-white/[0.06]">
              <p className="text-text-1 text-sm"><strong className="text-text-0">Your live portal activates at onboarding.</strong> Real-time access from day one.</p>
              <a href="#contact" className="inline-block mt-4 px-6 py-2.5 rounded-lg bg-teal text-bg-0 text-sm font-medium hover:bg-teal-dark transition-colors cursor-pointer">Get Started &rarr;</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

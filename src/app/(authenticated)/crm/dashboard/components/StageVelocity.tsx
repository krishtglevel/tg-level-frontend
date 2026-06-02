"use client";

import React, { useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface StageCard {
  label: string;
  count: string;
  pct: string;
  time: string;
  velocity: "fast" | "moderate" | "slow";
  dropped: string;
  droppedPct: string;
  vsColor: "green" | "red";
  vsPct: string;
  cardBg: string;
  cardBorder: string;
  icon: React.ReactNode;
}

interface SummaryRow {
  num: number;
  journey: string;
  avgTime: string;
  vsPrev: string;
  vsPrevUp: boolean;
  status: "Excellent" | "Good" | "Average" | "Poor";
  trendColor: string;
  trendPoints: string;
}

interface TimeDist {
  label: string;
  pct: number;
  dot: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const STAGES: StageCard[] = [
  {
    label: "leads entered",
    count: "8250",
    pct: "",
    time: "5m",
    velocity: "fast",
    dropped: "130",
    droppedPct: "1.6%",
    vsColor: "green",
    vsPct: "7.2 %",
    cardBg: "#F6F9FE",
    cardBorder: "#003CA0",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003CA0" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "assigned",
    count: "8,120",
    pct: "98.4 %",
    time: "7m",
    velocity: "fast",
    dropped: "470",
    droppedPct: "6.3%",
    vsColor: "green",
    vsPct: "7.2 %",
    cardBg: "#F8FCFB",
    cardBorder: "#00946F",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00946F" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M9 16l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: "contacted",
    count: "7,650",
    pct: "92.1 %",
    time: "45m",
    velocity: "moderate",
    dropped: "2,670",
    droppedPct: "34.8%",
    vsColor: "green",
    vsPct: "7.2 %",
    cardBg: "#FAF7FE",
    cardBorder: "#43009C",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#43009C" strokeWidth="1.6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.18 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.53a16 16 0 0 0 5.56 5.56l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
      </svg>
    ),
  },
  {
    label: "trail started",
    count: "4,980",
    pct: "60.4 %",
    time: "120 h",
    velocity: "slow",
    dropped: "2,530",
    droppedPct: "50.8%",
    vsColor: "green",
    vsPct: "7.2 %",
    cardBg: "#FEFBF3",
    cardBorder: "#946B00",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#946B00" strokeWidth="1.6">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
  },
  {
    label: "active in trial",
    count: "2,450",
    pct: "29.7 %",
    time: "3h 15m",
    velocity: "moderate",
    dropped: "1,690",
    droppedPct: "69.0%",
    vsColor: "red",
    vsPct: "7.2 %",
    cardBg: "#FDF7F9",
    cardBorder: "#990033",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#990033" strokeWidth="1.6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    label: "payment intent",
    count: "760",
    pct: "9.2 %",
    time: "1h 10m",
    velocity: "fast",
    dropped: "400",
    droppedPct: "52.6%",
    vsColor: "green",
    vsPct: "7.2 %",
    cardBg: "#F5FDFC",
    cardBorder: "#008C7B",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008C7B" strokeWidth="1.6">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    label: "paid",
    count: "360",
    pct: "4.4 %",
    time: "",
    velocity: "fast",
    dropped: "",
    droppedPct: "",
    vsColor: "green",
    vsPct: "7.2 %",
    cardBg: "#F9FFF8",
    cardBorder: "#148C00",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#148C00" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

const SUMMARY_ROWS: SummaryRow[] = [
  { num: 1, journey: "Lead → Assigned", avgTime: "5m", vsPrev: "▼ 1m (16.7%)", vsPrevUp: false, status: "Excellent", trendColor: "#10b981", trendPoints: "0,35 22,28 45,32 67,20 90,25 112,15 135,18" },
  { num: 2, journey: "Assigned → Contacted", avgTime: "7m", vsPrev: "▼ 2m (22.2%)", vsPrevUp: false, status: "Excellent", trendColor: "#10b981", trendPoints: "0,30 22,22 45,26 67,15 90,18 112,10 135,12" },
  { num: 3, journey: "Contacted → Trial Started", avgTime: "45m", vsPrev: "▲ 5m (12.5%)", vsPrevUp: true, status: "Good", trendColor: "#3b82f6", trendPoints: "0,20 22,28 45,22 67,32 90,26 112,35 135,30" },
  { num: 4, journey: "Trial Started → Active in Trial", avgTime: "7h 45m", vsPrev: "▲ 2h 10m (38.9%)", vsPrevUp: true, status: "Poor", trendColor: "#ef4444", trendPoints: "0,15 22,25 45,18 67,35 90,28 112,40 135,38" },
  { num: 5, journey: "Active in Trial → Payment Intent", avgTime: "3h 15m", vsPrev: "▲ 40m (25.6%)", vsPrevUp: true, status: "Average", trendColor: "#f59e0b", trendPoints: "0,20 22,28 45,24 67,32 90,28 112,36 135,32" },
  { num: 6, journey: "Payment Intent → Paid", avgTime: "1h 10m", vsPrev: "▼ 10m (12.5%)", vsPrevUp: false, status: "Good", trendColor: "#3b82f6", trendPoints: "0,35 22,28 45,32 67,22 90,26 112,18 135,20" },
];

const TIME_DIST: TimeDist[] = [
  { label: "< 2 Hours", pct: 8.6, dot: "bg-emerald-500" },
  { label: "2 – 6 Hours", pct: 22.4, dot: "bg-blue-500" },
  { label: "6 – 12 Hours", pct: 31.7, dot: "bg-violet-500" },
  { label: "12 – 24 Hours", pct: 24.3, dot: "bg-pink-500" },
  { label: "> 24 Hours", pct: 13.0, dot: "bg-red-500" },
];

// ─── Donut for time distribution ─────────────────────────────────────────────
const DONUT_COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#ef4444"];
const RADIUS = 52;
const CIRC = 2 * Math.PI * RADIUS;

function buildArcs() {
  let cumPct = 0;
  return TIME_DIST.map((d, i) => {
    const dash = (d.pct / 100) * CIRC;
    const gap = CIRC - dash;
    const rot = (cumPct / 100) * 360 - 90;
    cumPct += d.pct;
    return { dash, gap, rot, color: DONUT_COLORS[i] };
  });
}
const ARCS = buildArcs();

// ─── Helpers ─────────────────────────────────────────────────────────────────
const velocityStyle = (v: StageCard["velocity"]) => {
  if (v === "fast") return "bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]";
  if (v === "moderate") return "bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]";
  return "bg-[#FFF1F2] text-[#9F1239] border border-[#FECDD3]";
};

const statusStyle = (s: SummaryRow["status"]) => {
  if (s === "Excellent") return "text-emerald-500";
  if (s === "Good") return "text-blue-500";
  if (s === "Average") return "text-[#F59E0B]";
  return "text-red-500";
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function StageVelocity() {
  const [showCount, setShowCount] = useState(true);

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-[22px] font-bold text-[#1B1B24] leading-none">
            Stage Velocity Flow
          </span>
          <span className="text-gray-400 text-[10px] md:text-[11px]">(Last 48 Hours)</span>
          <span className="w-4 h-4 rounded-full bg-[#EDEEF5] flex items-center justify-center text-[9px] font-bold text-[#464555]">i</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#4B5568]">Show count</span>
            <button
              onClick={() => setShowCount(true)}
              className={`flex items-center py-[3px] rounded-full w-9 transition-colors ${showCount ? "bg-indigo-500 justify-end pr-0.5" : "bg-gray-200 justify-start pl-0.5"}`}
            >
              <div className="bg-white w-3 h-3 rounded-md shadow-sm" />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#4B5568]">Show %</span>
            <button
              onClick={() => setShowCount(false)}
              className={`flex items-center py-[3px] rounded-full w-9 transition-colors ${!showCount ? "bg-indigo-500 justify-end pr-0.5" : "bg-gray-200 justify-start pl-0.5"}`}
            >
              <div className="bg-white w-3 h-3 rounded-md shadow-sm" />
            </button>
          </div>
          <button className="flex items-center gap-1 bg-white border border-gray-200 rounded-md py-1.5 px-3 text-gray-700 text-[11px]">
            All Stages
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5l3 3 3-3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="w-7 h-7 rounded-md bg-[#3525CD] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stage cards row – horizontal scroll on mobile */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-start bg-white py-3 px-2 rounded-xl border border-[#EDEEF5] shadow-sm min-w-[900px] md:min-w-full">
          {STAGES.map((stage, idx) => (
            <React.Fragment key={idx}>
              {/* Card */}
              <div
                className="flex flex-1 flex-col items-center py-3 px-2 rounded-md"
                style={{ backgroundColor: stage.cardBg, border: `1px solid ${stage.cardBorder}` }}
              >
                <div className="mb-2">{stage.icon}</div>
                <span className="text-black text-[11px] text-center mb-2">{stage.label}</span>
                <div className="flex flex-col items-center mb-3">
                  <span className="text-black text-base font-bold">{stage.count}</span>
                  {stage.pct && <span className="text-black text-[9px]">{stage.pct}</span>}
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-black text-[11px]">vs prev 48hrs</span>
                  <div className="flex items-center gap-0.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      {stage.vsColor === "green" ? (
                        <path d="M8 3l4 5H4l4-5z" fill="#0BA50B" />
                      ) : (
                        <path d="M8 13l4-5H4l4 5z" fill="#A50B0B" />
                      )}
                    </svg>
                    <span className={`text-[11px] ${stage.vsColor === "green" ? "text-[#0BA50B]" : "text-[#A50B0B]"}`}>
                      {stage.vsPct}
                    </span>
                  </div>
                </div>
              </div>

              {/* Connector between cards – time, velocity, dropped */}
              {idx < STAGES.length - 1 && (
                <div className="flex flex-col items-center self-stretch justify-center mx-1">
                  <div className="flex flex-col items-center gap-1">
                    {STAGES[idx + 1].time && (
                      <>
                        <span className="text-black text-[11px] bg-neutral-50 border border-[#909090] px-2 py-0.5 rounded whitespace-nowrap">
                          {STAGES[idx + 1].time}
                        </span>
                        <span className="text-black text-[11px]">{STAGES[idx + 1].velocity}</span>
                      </>
                    )}
                    <div className="w-px h-12 bg-gray-300" />
                  </div>
                  {stage.dropped && (
                    <span className="text-black text-[11px] bg-neutral-50 border border-[#909090] px-1.5 py-0.5 rounded whitespace-nowrap mt-1">
                      {stage.dropped} ({stage.droppedPct})
                    </span>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom row: Summary Table + Time Distribution Donut */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Stage Velocity Summary Table – horizontal scroll on mobile */}
        <div className="flex-1 overflow-x-auto">
          <div className="bg-white rounded-xl border border-[#EDEEF5] shadow-sm min-w-[700px]">
            <div className="flex items-center gap-2 p-4 border-b border-[#EDEEF5]">
              <span className="text-[#1A1D2E] text-sm font-bold">Stage Velocity Summary</span>
              <span className="text-gray-400 text-[10px]">(Last 48 Hours)</span>
              <span className="w-4 h-4 rounded-full bg-[#EDEEF5] flex items-center justify-center text-[9px] font-bold text-[#464555]">i</span>
            </div>
            <div className="grid grid-cols-[40px_minmax(150px,2fr)_100px_130px_100px_130px] bg-slate-50 py-2 px-4 border-b border-[#EDEEF5] text-[10px] font-bold text-gray-400">
              <span>#</span><span>Journey</span><span>Avg. Time (Last 48H)</span><span>vs Prev 48H</span><span>Velocity Status</span><span>Trend (Last 48H)</span>
            </div>
            {SUMMARY_ROWS.map((row) => (
              <div
                key={row.num}
                className="grid grid-cols-[40px_minmax(150px,2fr)_100px_130px_100px_130px] items-center px-4 py-3 border-b border-[#EDEEF5] last:border-0 hover:bg-[#FAFAFA] text-xs"
              >
                <span className="text-gray-400 text-[10px]">{row.num}</span>
                <span className="text-gray-700 text-[11px]">{row.journey}</span>
                <span className="text-gray-700 text-[11px]">{row.avgTime}</span>
                <span className={`text-[10px] font-bold ${row.vsPrevUp ? "text-red-500" : "text-emerald-500"}`}>
                  {row.vsPrev}
                </span>
                <span className={`text-[10px] font-bold ${statusStyle(row.status)}`}>{row.status}</span>
                <svg viewBox="0 0 135 45" width="100" height="30">
                  <polyline points={row.trendPoints} fill="none" stroke={row.trendColor} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Time Distribution Donut */}
        <div className="bg-white rounded-xl border border-[#EDEEF5] shadow-sm p-4 w-full lg:w-80 flex-shrink-0">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[#1A1D2E] text-sm font-bold">Stage Time Distribution</span>
            </div>
            <span className="text-gray-400 text-[10px]">(Last 48 Hours)</span>
          </div>
          <div className="text-center text-gray-500 text-[10px] my-2">% of leads by time taken in Trial Phase</div>
          <div className="flex justify-center mb-3">
            <div className="relative w-[140px] h-[140px]">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="#F1F5F9" strokeWidth="18" />
                {ARCS.map((arc, i) => (
                  <circle
                    key={i}
                    cx="70" cy="70" r={RADIUS}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="18"
                    strokeDasharray={`${arc.dash} ${arc.gap}`}
                    transform={`rotate(${arc.rot} 70 70)`}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-gray-500 text-[9px] text-center leading-tight">Avg. Trial<br/>Time</span>
                <span className="text-[#1A1D2E] text-base font-bold mt-0.5">7h 45m</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {TIME_DIST.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${d.dot}`} />
                <span className="text-[#4B5568] text-[11px] flex-1">{d.label}</span>
                <span className="text-[#1A1D2E] text-[11px] font-bold">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Users, CalendarCheck, Phone, Play, Heart, CreditCard, Check } from "lucide-react";

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
  iconColor: string;
  Icon: React.ElementType;
}

interface SummaryRow {
  num: number; journey: string; avgTime: string;
  vsPrev: string; vsPrevUp: boolean;
  status: "Excellent" | "Good" | "Average" | "Poor";
  trendColor: string; trendPoints: string;
}

interface TimeDist { label: string; pct: number; dot: string; }

const STAGES: StageCard[] = [
  { label: "Leads Entered",   count: "8250",  pct: "",       time: "5m",     velocity: "fast",     dropped: "130",   droppedPct: "1.6%",  vsColor: "green", vsPct: "7.2 %", cardBg: "#F6F9FE", cardBorder: "#003CA0", iconColor: "#003CA0", Icon: Users         },
  { label: "Assigned",        count: "8,120", pct: "98.4 %", time: "7m",     velocity: "fast",     dropped: "470",   droppedPct: "6.3%",  vsColor: "green", vsPct: "7.2 %", cardBg: "#F8FCFB", cardBorder: "#00946F", iconColor: "#00946F", Icon: CalendarCheck },
  { label: "Contacted",       count: "7,650", pct: "92.1 %", time: "45m",    velocity: "moderate", dropped: "2,670", droppedPct: "34.8%", vsColor: "green", vsPct: "7.2 %", cardBg: "#FAF7FE", cardBorder: "#43009C", iconColor: "#43009C", Icon: Phone         },
  { label: "Trail Started",   count: "4,980", pct: "60.4 %", time: "120 H",  velocity: "slow",     dropped: "2,530", droppedPct: "50.8%", vsColor: "green", vsPct: "7.2 %", cardBg: "#FEFBF3", cardBorder: "#946B00", iconColor: "#946B00", Icon: Play          },
  { label: "Active In Trial", count: "2,450", pct: "29.7 %", time: "3h 15m", velocity: "moderate", dropped: "1,690", droppedPct: "69.0%", vsColor: "red",   vsPct: "7.2 %", cardBg: "#FDF7F9", cardBorder: "#990033", iconColor: "#990033", Icon: Heart         },
  { label: "Payment Intent",  count: "760",   pct: "9.2 %",  time: "1h 10m", velocity: "fast",     dropped: "400",   droppedPct: "52.6%", vsColor: "green", vsPct: "7.2 %", cardBg: "#F5FDFC", cardBorder: "#008C7B", iconColor: "#008C7B", Icon: CreditCard    },
  { label: "Paid",            count: "360",   pct: "4.4 %",  time: "",       velocity: "fast",     dropped: "",      droppedPct: "",      vsColor: "green", vsPct: "7.2 %", cardBg: "#F9FFF8", cardBorder: "#148C00", iconColor: "#148C00", Icon: Check         },
];

const SUMMARY_ROWS: SummaryRow[] = [
  { num: 1, journey: "Lead → Assigned",                avgTime: "5m",     vsPrev: "▼ 1m (16.7%)",     vsPrevUp: false, status: "Excellent", trendColor: "#10b981", trendPoints: "0,35 22,28 45,32 67,20 90,25 112,15 135,18" },
  { num: 2, journey: "Assigned → Contacted",           avgTime: "7m",     vsPrev: "▼ 2m (22.2%)",     vsPrevUp: false, status: "Excellent", trendColor: "#10b981", trendPoints: "0,30 22,22 45,26 67,15 90,18 112,10 135,12" },
  { num: 3, journey: "Contacted → Trial Started",      avgTime: "45m",    vsPrev: "▲ 5m (12.5%)",     vsPrevUp: true,  status: "Good",      trendColor: "#3b82f6", trendPoints: "0,20 22,28 45,22 67,32 90,26 112,35 135,30" },
  { num: 4, journey: "Trial Started → Active in Trial",avgTime: "7h 45m", vsPrev: "▲ 2h 10m (38.9%)", vsPrevUp: true,  status: "Poor",      trendColor: "#ef4444", trendPoints: "0,15 22,25 45,18 67,35 90,28 112,40 135,38" },
  { num: 5, journey: "Active in Trial → Payment Intent",avgTime:"3h 15m", vsPrev: "▲ 40m (25.6%)",    vsPrevUp: true,  status: "Average",   trendColor: "#f59e0b", trendPoints: "0,20 22,28 45,24 67,32 90,28 112,36 135,32" },
  { num: 6, journey: "Payment Intent → Paid",          avgTime: "1h 10m", vsPrev: "▼ 10m (12.5%)",    vsPrevUp: false, status: "Good",      trendColor: "#3b82f6", trendPoints: "0,35 22,28 45,32 67,22 90,26 112,18 135,20" },
];

const TIME_DIST: TimeDist[] = [
  { label: "< 2 Hours",     pct: 8.6,  dot: "bg-emerald-500" },
  { label: "2 – 6 Hours",   pct: 22.4, dot: "bg-blue-500"    },
  { label: "6 – 12 Hours",  pct: 31.7, dot: "bg-violet-500"  },
  { label: "12 – 24 Hours", pct: 24.3, dot: "bg-pink-500"    },
  { label: "> 24 Hours",    pct: 13.0, dot: "bg-red-500"     },
];

const DONUT_COLORS = ["#10b981","#3b82f6","#8b5cf6","#ec4899","#ef4444"];
const RADIUS = 52;
const CIRC = 2 * Math.PI * RADIUS;
function buildArcs() {
  let cum = 0;
  return TIME_DIST.map((d, i) => {
    const dash = (d.pct / 100) * CIRC;
    const gap  = CIRC - dash;
    const rot  = (cum / 100) * 360 - 90;
    cum += d.pct;
    return { dash, gap, rot, color: DONUT_COLORS[i] };
  });
}
const ARCS = buildArcs();

const statusStyle = (s: SummaryRow["status"]) => {
  if (s === "Excellent") return "text-emerald-500";
  if (s === "Good")      return "text-blue-500";
  if (s === "Average")   return "text-[#F59E0B]";
  return "text-red-500";
};

export default function StageVelocity() {
  const [showCount, setShowCount] = useState(true);

  return (
    <div className="flex flex-col gap-[9px] bg-white">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[#1B1B24] text-xl font-bold">Stage Velocity Flow</span>
          <span className="text-gray-400 text-[11px]">(Last 48 Hours)</span>
          <span className="w-[18px] h-[18px] rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] text-[#464555] font-bold">i</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[#4B5568] text-[11px]">Show count</span>
            <button onClick={() => setShowCount(true)}
              className={`flex items-center py-[3px] rounded-full w-9 transition-colors ${showCount ? "bg-indigo-500 justify-end pr-0.5" : "bg-gray-200 justify-start pl-0.5"}`}>
              <div className="bg-white w-[13px] h-[13px] rounded-md shadow-sm" />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#4B5568] text-[11px]">Show %</span>
            <button onClick={() => setShowCount(false)}
              className={`flex items-center py-[3px] rounded-full w-9 transition-colors ${!showCount ? "bg-indigo-500 justify-end pr-0.5" : "bg-gray-200 justify-start pl-0.5"}`}>
              <div className="bg-white w-[13px] h-[13px] rounded-md shadow-sm" />
            </button>
          </div>
          <button className="flex items-center gap-1 bg-white border border-gray-200 rounded-md py-1.5 px-3 text-gray-700 text-[11px]">
            All Stages
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="w-8 h-8 rounded-md bg-[#3525CD] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Stage cards ── */}
      <div className="bg-white rounded-[13px] border border-[#EDEEF5] px-3 pt-4 pb-3" style={{ boxShadow: "0px 3px 6px rgba(0,0,0,0.05)" }}>

        {/* Cards + connectors row */}
        <div className="flex items-stretch w-full">
          {STAGES.map((s, i) => {
            const { Icon } = s;
            const isLast = i === STAGES.length - 1;
            const next = STAGES[i + 1];

            return (
              <React.Fragment key={i}>
                {/* ── Card ── */}
                <div className="flex-1 min-w-0 flex flex-col items-center rounded-[7px] py-3 px-2 text-center"
                  style={{ backgroundColor: s.cardBg, border: `1px solid ${s.cardBorder}` }}>
                  {/* Icon */}
                  <Icon size={24} color={s.iconColor} className="mb-2 shrink-0" />
                  {/* Label */}
                  <span className="text-black text-[10px] leading-tight mb-2 font-normal">{s.label}</span>
                  {/* Count */}
                  <span className="text-black text-[15px] font-bold leading-tight">{s.count}</span>
                  {/* Pct */}
                  {s.pct
                    ? <span className="text-black text-[9px] mb-3">{s.pct}</span>
                    : <div className="mb-3" />
                  }
                  {/* Spacer pushes vs prev to bottom */}
                  <div className="flex-1" />
                  {/* Vs Prev */}
                  <div className="flex flex-col items-center gap-[2px]">
                    <span className="text-black text-[9px]">Vs Prev 48hrs</span>
                    <div className="flex items-center gap-0.5">
                      {/* triangle */}
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        {s.vsColor === "green"
                          ? <path d="M8 3l4 5H4l4-5z" fill="#0BA50B"/>
                          : <path d="M8 13l4-5H4l4 5z" fill="#A50B0B"/>}
                      </svg>
                      <span className={`text-[9px] font-semibold ${s.vsColor === "green" ? "text-[#0BA50B]" : "text-[#A50B0B]"}`}>
                        {s.vsPct}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Connector ── */}
                {!isLast && (
                  <div className="flex flex-col items-center shrink-0 w-[44px] self-stretch">
                    {/* Top spacer — pushes badges to ~40% height */}
                    <div style={{ flex: "0 0 28%" }} />

                    {/* Time badge */}
                    {next.time && (
                      <span className="text-black text-[9px] bg-white border border-[#909090] px-1.5 py-[2px] rounded-[3px] whitespace-nowrap mb-[3px]">
                        {next.time}
                      </span>
                    )}
                    {/* Velocity */}
                    {next.time && (
                      <span className="text-black text-[9px] mb-[3px]">{next.velocity}</span>
                    )}
                    {/* Down arrow */}
                    <svg width="10" height="14" viewBox="0 0 10 20" fill="none" className="mb-[3px]">
                      <line x1="5" y1="0" x2="5" y2="16" stroke="#9CA3AF" strokeWidth="1.5"/>
                      <path d="M1 12l4 6 4-6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>

                    {/* Bottom spacer */}
                    <div className="flex-1" />

                    {/* Dropped — sits at bottom */}
                    {s.dropped && (
                      <span className="text-black text-[9px] bg-white border border-[#909090] px-1 py-[2px] rounded-[3px] whitespace-nowrap text-center leading-tight mb-1">
                        {s.dropped}<br/>({s.droppedPct})
                      </span>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="flex flex-col lg:flex-row items-start gap-4">

        {/* Summary table */}
        <div className="flex flex-1 flex-col bg-white py-4 rounded-[13px] border border-[#EDEEF5] overflow-x-auto" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2 ml-5 mb-3">
            <span className="text-[#1A1D2E] text-[13px] font-bold">Stage Velocity Summary</span>
            <span className="text-gray-400 text-[10px]">(Last 48 Hours)</span>
            <span className="w-[18px] h-[18px] rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] text-[#464555] font-bold">i</span>
          </div>
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[32px_1fr_110px_140px_90px_140px] px-5 pb-2 border-b border-[#EDEEF5]">
              {["#","Journey","Avg. Time (Last 48H)","vs Prev 48H","Velocity Status","Trend (Last 48H)"].map(h => (
                <span key={h} className="text-gray-400 text-[10px] font-bold">{h}</span>
              ))}
            </div>
            {SUMMARY_ROWS.map(r => (
              <div key={r.num} className="grid grid-cols-[32px_1fr_110px_140px_90px_140px] px-5 py-3 border-b border-[#EDEEF5] last:border-0 items-center hover:bg-[#FAFAFA]">
                <span className="text-gray-400 text-[10px]">{r.num}</span>
                <span className="text-gray-700 text-[11px] truncate pr-2">{r.journey}</span>
                <span className="text-gray-700 text-[11px]">{r.avgTime}</span>
                <span className={`text-[10px] font-bold ${r.vsPrevUp ? "text-red-500" : "text-emerald-500"}`}>{r.vsPrev}</span>
                <span className={`text-[10px] font-bold ${statusStyle(r.status)}`}>{r.status}</span>
                <svg viewBox="0 0 135 45" width="135" height="45">
                  <polyline points={r.trendPoints} fill="none" stroke={r.trendColor} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="flex flex-col bg-white pt-4 pb-4 rounded-[13px] border border-[#EDEEF5] shrink-0 w-full lg:w-[220px]" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
          <div className="flex flex-col items-center pb-1 px-4">
            <span className="text-[#1A1D2E] text-[13px] font-bold text-center">Stage Time Distribution</span>
            <span className="text-gray-400 text-[10px] mt-0.5">(Last 48 Hours)</span>
          </div>
          <span className="text-gray-500 text-[10px] text-center mb-3 px-4">% of leads by time taken in Trial Phase</span>
          <div className="flex justify-center mb-4">
            <div className="relative w-[140px] h-[140px]">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="#F1F5F9" strokeWidth="18"/>
                {ARCS.map((arc, i) => (
                  <circle key={i} cx="70" cy="70" r={RADIUS} fill="none"
                    stroke={arc.color} strokeWidth="18"
                    strokeDasharray={`${arc.dash} ${arc.gap}`}
                    transform={`rotate(${arc.rot} 70 70)`}
                    strokeLinecap="butt"/>
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-gray-500 text-[9px] text-center leading-tight">Avg. Trial<br/>Time</span>
                <span className="text-[#1A1D2E] text-[17px] font-bold leading-none mt-0.5">7h 45m</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[11px] px-6">
            {TIME_DIST.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-[9px] h-[9px] rounded shrink-0 ${d.dot}`}/>
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
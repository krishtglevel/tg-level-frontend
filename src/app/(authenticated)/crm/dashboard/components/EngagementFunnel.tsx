"use client";

import React, { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────
interface StageCard {
  label: string;
  pct: number;
  dropOff: number;
  cardBg: string;
  cardBorder: string;
  barFill: string;
  icon: string;
}

const STAGES: StageCard[] = [
  { label: "trail stared", pct: 100, dropOff: 22.4, cardBg: "#F6F9FE", cardBorder: "#003CA0", barFill: "#003CA1", icon: "🚀" },
  { label: "community\njoined", pct: 77.6, dropOff: 22.2, cardBg: "#F8FCFB", cardBorder: "#00946F", barFill: "#00946F", icon: "👥" },
  { label: "viewed trades", pct: 60.4, dropOff: 24.7, cardBg: "#FAF7FE", cardBorder: "#43009C", barFill: "#43009C", icon: "📈" },
  { label: "engaged in poll", pct: 45.5, dropOff: 22.7, cardBg: "#FEFBF3", cardBorder: "#946B00", barFill: "#946B00", icon: "📊" },
  { label: "asked questions", pct: 35.2, dropOff: 30.3, cardBg: "#FDF7F9", cardBorder: "#990033", barFill: "#990033", icon: "💬" },
  { label: "viewed pricing", pct: 24.5, dropOff: 56.3, cardBg: "#F5FDFC", cardBorder: "#008C7B", barFill: "#008D7B", icon: "💰" },
  { label: "payment intent", pct: 10.5, dropOff: 58.6, cardBg: "#F7FDF9", cardBorder: "#00802A", barFill: "#00812B", icon: "💳" },
  { label: "paid", pct: 4.4, dropOff: 0, cardBg: "#F9FFF8", cardBorder: "#148C00", barFill: "#148C00", icon: "✅" },
];

interface ScoreBand {
  range: string;
  label: string;
  count: string;
  pct: string;
  dot: string;
  countColor: string;
}

const SCORE_BANDS: ScoreBand[] = [
  { range: "90 – 100", label: "Highly Engaged", count: "1,120", pct: "13.6%", dot: "bg-emerald-400", countColor: "text-emerald-700" },
  { range: "70 – 89", label: "Engaged", count: "2,130", pct: "30.9%", dot: "bg-blue-500", countColor: "text-blue-700" },
  { range: "40 – 69", label: "Moderate", count: "2,260", pct: "37.2%", dot: "bg-amber-400", countColor: "text-amber-700" },
  { range: "20 – 39", label: "Low", count: "800", pct: "12.4%", dot: "bg-orange-500", countColor: "text-orange-700" },
  { range: "0 – 19", label: "Not Engaged", count: "1,400", pct: "5.9%", dot: "bg-red-500", countColor: "text-red-700" },
];

// Donut chart data (same percentages as SCORE_BANDS)
const DONUT_BANDS = [
  { pct: 13.6, color: "#4ade80" },
  { pct: 30.9, color: "#3b82f6" },
  { pct: 37.2, color: "#fbbf24" },
  { pct: 12.4, color: "#f97316" },
  { pct: 5.9, color: "#ef4444" },
];
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function buildDonutArcs() {
  let offset = 0;
  return DONUT_BANDS.map((b) => {
    const dash = (b.pct / 100) * CIRCUMFERENCE;
    const gap = CIRCUMFERENCE - dash;
    const rotation = (offset / 100) * 360 - 90;
    offset += b.pct;
    return { ...b, dash, gap, rotation };
  });
}
const ARCS = buildDonutArcs();

// ─── Component ──────────────────────────────────────────────────────────────
export default function EngagementFunnel() {
  const [showCount, setShowCount] = useState(true);

  return (
    <div className="w-full bg-white rounded-xl border border-[#EDEEF5] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg md:text-xl font-bold text-[#1B1B24]">Engagement funnel Flow</h2>
          <span className="text-gray-400 text-[10px]">(Last 48 Hours)</span>
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
        </div>
      </div>

      {/* Stage cards – horizontal scroll on mobile */}
      <div className="overflow-x-auto pb-2 px-4">
        <div className="flex gap-3 min-w-[800px] md:min-w-full">
          {STAGES.map((stage, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center rounded-lg py-3 px-2"
              style={{ backgroundColor: stage.cardBg, border: `1px solid ${stage.cardBorder}` }}
            >
              <span className="text-2xl mb-1.5">{stage.icon}</span>
              <span className="text-black text-[11px] text-center mb-2 leading-tight whitespace-pre-line">
                {stage.label}
              </span>
              <div className="w-full bg-[#D9D9D9] rounded-md h-1.5 mb-1.5">
                <div className="h-full rounded-md" style={{ width: `${stage.pct}%`, backgroundColor: stage.barFill }} />
              </div>
              <span className="text-black text-[11px] font-medium">{stage.pct} %</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drop‑off badges row – aligned under each card */}
      <div className="overflow-x-auto pb-3 px-4">
        <div className="flex gap-3 min-w-[800px] md:min-w-full">
          {STAGES.map((stage, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              {stage.dropOff > 0 ? (
                <>
                  <span className="text-black text-[11px] mb-1">drop off</span>
                  <button
                    className="w-full bg-white py-1.5 rounded text-black text-sm font-medium shadow-sm border border-gray-200"
                    style={{ boxShadow: "0px 1px 4px rgba(0,0,0,0.1)" }}
                  >
                    {stage.dropOff} %
                  </button>
                </>
              ) : (
                <div className="h-12" /> // placeholder for "paid" (no drop-off)
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section: Donut + Table + Trend */}
      <div className="flex flex-col lg:flex-row gap-5 p-5 pt-2">
        {/* Left: Engagement Score Distribution */}
        <div className="bg-white rounded-lg border border-[#EDEEF5] shadow-sm p-4 w-full lg:w-80 flex-shrink-0">
          <div className="mb-3">
            <div className="text-slate-700 text-sm font-bold">Engagement Score Distribution</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-slate-500 text-[10px]">(Last 48 Hours)</span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#EDEEF5] flex items-center justify-center text-[8px] font-bold text-[#464555]">i</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Donut */}
            <div className="relative w-[100px] h-[100px] flex-shrink-0">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={RADIUS - 5} fill="none" stroke="#F1F5F9" strokeWidth="10" />
                {ARCS.map((arc, i) => (
                  <circle
                    key={i}
                    cx="50" cy="50" r={RADIUS - 5}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="10"
                    strokeDasharray={`${arc.dash} ${arc.gap}`}
                    transform={`rotate(${arc.rotation} 50 50)`}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-[8px] font-medium">AVG. SCORE</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-slate-800 text-lg font-bold">68</span>
                  <span className="text-slate-400 text-[9px]">/100</span>
                </div>
              </div>
            </div>
            {/* Band list */}
            <div className="flex-1 space-y-2">
              {SCORE_BANDS.map((band) => (
                <div key={band.range} className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${band.dot}`} />
                    <span className="text-slate-600 text-[10px]">{band.range} ({band.label})</span>
                  </div>
                  <span className={`text-[10px] font-bold ml-3 ${band.countColor}`}>
                    {band.count} ({band.pct})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Table + Trend */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Table */}
          <div className="bg-white rounded-lg border border-[#EDEEF5] overflow-hidden shadow-sm">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#EDEEF5]">
              <span className="text-slate-800 text-sm font-bold">Engagement Score Band Insights</span>
              <span className="text-slate-500 text-[10px]">(Last 48H)</span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[500px]">
                <div className="grid grid-cols-[150px_80px_1fr_100px] bg-[#F8FAFC] px-4 py-2 text-[10px] font-bold text-slate-500 border-b">
                  <span>BAND</span><span>LEADS</span><span>KEY BEHAVIOR</span><span className="text-right">CONVERSION RATE</span>
                </div>
                {[
                  { band: "90 – 100", label: "Highly Engaged", dot: "bg-emerald-400", leads: "1,120", behavior: "Active in community, views trades, reacts", rate: "12.4%", rateColor: "text-emerald-700" },
                  { band: "70 – 89", label: "Engaged", dot: "bg-blue-500", leads: "2,130", behavior: "Regular activity, consuming content", rate: "7.1%", rateColor: "text-blue-700" },
                  { band: "40 – 69", label: "Moderate", dot: "bg-amber-400", leads: "2,260", behavior: "Some activity, inconsistent", rate: "3.2%", rateColor: "text-amber-700" },
                  { band: "20 – 39", label: "Low", dot: "bg-orange-500", leads: "800", behavior: "Low activity, rarely interacts", rate: "1.2%", rateColor: "text-orange-700" },
                  { band: "0 – 19", label: "Not Engaged", dot: "bg-red-500", leads: "1,400", behavior: "Inactive, no meaningful actions", rate: "0.4%", rateColor: "text-red-700" },
                ].map((row) => (
                  <div key={row.band} className="grid grid-cols-[150px_80px_1fr_100px] items-center px-4 py-2.5 border-b last:border-0 hover:bg-[#FAFAFA] text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${row.dot}`} />
                      <div>
                        <div className="text-slate-700 text-[11px] font-medium">{row.band}</div>
                        <div className="text-slate-500 text-[9px]">({row.label})</div>
                      </div>
                    </div>
                    <span className="text-slate-700 text-[11px]">{row.leads}</span>
                    <span className="text-slate-600 text-[11px]">{row.behavior}</span>
                    <span className={`text-[11px] font-bold text-right ${row.rateColor}`}>{row.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Trend mini chart */}
          <div className="bg-white rounded-lg border border-[#EAECF0] p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-gray-800 text-sm font-bold">Engagement Trend</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "90–100", color: "#4ade80" },
                  { label: "70–89", color: "#3b82f6" },
                  { label: "40–69", color: "#fbbf24" },
                  { label: "20–39", color: "#f97316" },
                  { label: "0–19", color: "#ef4444" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                    <div className="w-2 h-px" style={{ backgroundColor: l.color }} />
                    <span className="text-gray-700 text-[9px]">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex flex-col justify-between items-end h-32 text-[9px] text-gray-500">
                <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
              </div>
              <div className="flex-1 h-32">
                <svg viewBox="0 0 500 130" width="100%" height="130" preserveAspectRatio="none">
                  <line x1="0" y1="32" x2="500" y2="32" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="65" x2="500" y2="65" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="97" x2="500" y2="97" stroke="#F1F5F9" strokeWidth="1" />
                  <path d="M0,12 L62,10 L125,14 L187,8 L250,11 L312,7 L375,9 L437,6 L500,5" stroke="#4ade80" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,35 L62,30 L125,34 L187,26 L250,28 L312,22 L375,24 L437,19 L500,17" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,55 L62,53 L125,58 L187,50 L250,52 L312,45 L375,47 L437,42 L500,40" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,82 L62,80 L125,84 L187,77 L250,79 L312,72 L375,74 L437,69 L500,67" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,105 L62,102 L125,108 L187,100 L250,103 L312,98 L375,100 L437,95 L500,94" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between mt-1 text-[9px] text-gray-500">
              <span>May 13, 8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span>
              <span>May 14, 12 AM</span><span>4 AM</span><span>8 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
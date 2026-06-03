"use client";

import React, { useState } from "react";
import {
  Rocket, Users, TrendingUp, BarChart2, MessageCircle,
  DollarSign, CreditCard, CheckCircle2,
} from "lucide-react";

interface StageCard {
  label: string;
  pct: number;
  dropOff: number;
  cardBg: string;
  cardBorder: string;
  barFill: string;
  iconColor: string;
  Icon: React.ElementType;
}

const STAGES: StageCard[] = [
  { label: "Trail Stared",      pct: 100,  dropOff: 22.4, cardBg: "#F6F9FE", cardBorder: "#003CA0", barFill: "#003CA1", iconColor: "#003CA1", Icon: Rocket        },
  { label: "Community\nJoined", pct: 77.6, dropOff: 22.2, cardBg: "#F8FCFB", cardBorder: "#00946F", barFill: "#00946F", iconColor: "#00946F", Icon: Users         },
  { label: "Viewed Trades",     pct: 60.4, dropOff: 24.7, cardBg: "#FAF7FE", cardBorder: "#43009C", barFill: "#43009C", iconColor: "#43009C", Icon: TrendingUp    },
  { label: "Engaged In Poll",   pct: 45.5, dropOff: 22.7, cardBg: "#FEFBF3", cardBorder: "#946B00", barFill: "#946B00", iconColor: "#946B00", Icon: BarChart2     },
  { label: "Asked Questions",   pct: 35.2, dropOff: 30.3, cardBg: "#FDF7F9", cardBorder: "#990033", barFill: "#990033", iconColor: "#990033", Icon: MessageCircle },
  { label: "Viewed Pricing",    pct: 24.5, dropOff: 56.3, cardBg: "#F5FDFC", cardBorder: "#008C7B", barFill: "#008D7B", iconColor: "#008D7B", Icon: DollarSign   },
  { label: "Payment Intent",    pct: 10.5, dropOff: 58.6, cardBg: "#F7FDF9", cardBorder: "#00802A", barFill: "#00812B", iconColor: "#00812B", Icon: CreditCard    },
  { label: "Paid",              pct: 4.4,  dropOff: 0,    cardBg: "#F9FFF8", cardBorder: "#148C00", barFill: "#148C00", iconColor: "#148C00", Icon: CheckCircle2  },
];

interface ScoreBand {
  range: string; label: string; count: string; pct: string;
  dot: string; countColor: string; value: number;
}
const SCORE_BANDS: ScoreBand[] = [
  { range: "90 – 100", label: "Highly Engaged", count: "1,120", pct: "13.6%", dot: "bg-emerald-400", countColor: "text-emerald-700", value: 13.6 },
  { range: "70 – 89",  label: "Engaged",        count: "2,130", pct: "30.9%", dot: "bg-blue-500",    countColor: "text-blue-700",    value: 30.9 },
  { range: "40 – 69",  label: "Moderate",       count: "2,260", pct: "37.2%", dot: "bg-amber-400",   countColor: "text-amber-700",   value: 37.2 },
  { range: "20 – 39",  label: "Low",            count: "800",   pct: "12.4%", dot: "bg-orange-500",  countColor: "text-orange-700",  value: 12.4 },
  { range: "0 – 19",   label: "Not Engaged",    count: "1,400", pct: "5.9%",  dot: "bg-red-500",     countColor: "text-red-700",     value: 5.9  },
];

const DONUT_BANDS = [
  { pct: 13.6, color: "#4ade80" }, { pct: 30.9, color: "#3b82f6" },
  { pct: 37.2, color: "#fbbf24" }, { pct: 12.4, color: "#f97316" },
  { pct: 5.9,  color: "#ef4444" },
];
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
function buildDonutArcs() {
  let offset = 0;
  return DONUT_BANDS.map((b) => {
    const dash = (b.pct / 100) * CIRCUMFERENCE;
    const gap  = CIRCUMFERENCE - dash;
    const rotation = (offset / 100) * 360 - 90;
    offset += b.pct;
    return { ...b, dash, gap, rotation };
  });
}
const ARCS = buildDonutArcs();

export default function EngagementFunnel() {
  const [showCount, setShowCount] = useState(true);

  // There are 7 arrows (between 8 cards). Each arrow sits between two cards.
  // We build the layout as two rows:
  //   Row 1: card | arrow | card | arrow | ... (no drop-off here)
  //   Row 2: spacer(card-width) | drop-off(arrow-width) | spacer | drop-off | ...

  return (
    <div className="w-full bg-white rounded-xl border border-[#EDEEF5] shadow-sm font-['Inter',sans-serif]">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg md:text-xl font-bold text-[#1B1B24]">Engagement funnel Flow</h2>
          <span className="text-gray-400 text-[10px]">(Last 48 Hours)</span>
          <span className="w-4 h-4 rounded-full bg-[#EDEEF5] flex items-center justify-center text-[9px] font-bold text-[#464555]">i</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#4B5568]">Show count</span>
            <button onClick={() => setShowCount(true)}
              className={`flex items-center py-[3px] rounded-full w-9 transition-colors ${showCount ? "bg-indigo-500 justify-end pr-0.5" : "bg-gray-200 justify-start pl-0.5"}`}>
              <div className="bg-white w-3 h-3 rounded-md shadow-sm" />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#4B5568]">Show %</span>
            <button onClick={() => setShowCount(false)}
              className={`flex items-center py-[3px] rounded-full w-9 transition-colors ${!showCount ? "bg-indigo-500 justify-end pr-0.5" : "bg-gray-200 justify-start pl-0.5"}`}>
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

      {/* ── Funnel ── */}
      <div className="px-4 pb-5">
        {/*
          Single flex row where each "slot" is either a card (flex-1) or an arrow+dropoff column (flex-shrink-0).
          The drop-off badge lives BELOW the arrow inside the same narrow column.
          No overflow-x — everything scales within viewport.
        */}
        {/* Row 1: cards + arrows */}
        <div className="flex items-center w-full gap-0">
          {STAGES.map((stage, idx) => {
            const { Icon } = stage;
            const isLast = idx === STAGES.length - 1;
            return (
              <React.Fragment key={idx}>
                <div className="flex-1 min-w-0">
                  <div
                    className="flex flex-col items-center rounded-xl py-3 px-1 w-full"
                    style={{ backgroundColor: stage.cardBg, border: `1.5px solid ${stage.cardBorder}` }}
                  >
                    <Icon size={18} color={stage.iconColor} className="mb-1 shrink-0" />
                    <span className="text-black text-[9px] md:text-[10px] text-center mb-2 leading-tight whitespace-pre-line font-medium w-full px-0.5">
                      {stage.label}
                    </span>
                    <div className="w-full bg-[#D9D9D9] rounded-full h-1 mb-1">
                      <div className="h-full rounded-full" style={{ width: `${stage.pct}%`, backgroundColor: stage.barFill }} />
                    </div>
                    <span className="text-black text-[9px] md:text-[10px] font-semibold">{stage.pct}%</span>
                  </div>
                </div>
                {!isLast && (
                  <div className="flex items-center justify-center shrink-0 w-6 md:w-8">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Row 2: drop-off badges aligned under each arrow */}
        <div className="flex items-start w-full gap-0 mt-2">
          {STAGES.map((stage, idx) => {
            const isLast = idx === STAGES.length - 1;
            return (
              <React.Fragment key={idx}>
                {/* Spacer matching card width */}
                <div className="flex-1 min-w-0" />
                {/* Drop-off under the arrow */}
                {!isLast && (
                  <div className="flex items-start justify-center shrink-0 w-6 md:w-8">
                    {stage.dropOff > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-1 py-0.5 text-gray-800 text-[8px] md:text-[9px] font-semibold text-center leading-tight whitespace-nowrap">
                        Drop Off<br />{stage.dropOff}%
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Bottom section ── */}
      <div className="flex flex-col lg:flex-row gap-4 p-5 pt-2 border-t border-[#EDEEF5]">

        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">

          {/* Engagement Score Band Insights */}
          <div className="bg-white rounded-xl border border-[#EDEEF5] overflow-hidden shadow-sm">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#EDEEF5]">
              <span className="text-slate-800 text-sm font-bold">Engagement Score Band Insights</span>
              <span className="text-slate-500 text-[10px]">(Last 48H)</span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <div className="grid grid-cols-[140px_70px_1fr_100px] bg-[#F8FAFC] px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wide border-b border-[#EDEEF5]">
                  <span>Band</span><span>Leads</span><span>Key Behavior</span><span className="text-right">Conv. Rate</span>
                </div>
                {[
                  { band: "90–100", label: "Highly Engaged", dot: "bg-emerald-400", leads: "1,120", behavior: "Active in community, views trades, reacts", rate: "12.4%", rateColor: "text-emerald-700" },
                  { band: "70–89",  label: "Engaged",        dot: "bg-blue-500",    leads: "2,130", behavior: "Regular activity, consuming content",     rate: "7.1%",  rateColor: "text-blue-700"    },
                  { band: "40–69",  label: "Moderate",       dot: "bg-amber-400",   leads: "2,260", behavior: "Some activity, inconsistent",             rate: "3.2%",  rateColor: "text-amber-700"   },
                  { band: "20–39",  label: "Low",            dot: "bg-orange-500",  leads: "800",   behavior: "Low activity, rarely interacts",          rate: "1.2%",  rateColor: "text-orange-700"  },
                  { band: "0–19",   label: "Not Engaged",    dot: "bg-red-500",     leads: "1,400", behavior: "Inactive, no meaningful actions",         rate: "0.4%",  rateColor: "text-red-500"     },
                ].map((row) => (
                  <div key={row.band} className="grid grid-cols-[140px_70px_1fr_100px] items-center px-4 py-2.5 border-b last:border-0 hover:bg-[#FAFAFA]">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${row.dot}`} />
                      <div>
                        <div className="text-slate-700 text-[11px] font-medium">{row.band}</div>
                        <div className="text-slate-400 text-[9px]">({row.label})</div>
                      </div>
                    </div>
                    <span className="text-slate-700 text-[11px]">{row.leads}</span>
                    <span className="text-slate-500 text-[11px]">{row.behavior}</span>
                    <span className={`text-[11px] font-bold text-right ${row.rateColor}`}>{row.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Trend */}
          <div className="bg-white rounded-xl border border-[#EDEEF5] p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-gray-800 text-sm font-bold">Engagement Trend</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "90–100", color: "#4ade80" }, { label: "70–89", color: "#3b82f6" },
                  { label: "40–69", color: "#fbbf24" },  { label: "20–39", color: "#f97316" },
                  { label: "0–19",  color: "#ef4444" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                    <div className="w-3 h-px" style={{ backgroundColor: l.color }} />
                    <span className="text-gray-600 text-[9px]">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex flex-col justify-between items-end h-32 text-[9px] text-gray-400 shrink-0 pr-1">
                <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
              </div>
              <div className="flex-1 h-32">
                <svg viewBox="0 0 500 130" width="100%" height="130" preserveAspectRatio="none">
                  <line x1="0" y1="32"  x2="500" y2="32"  stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="65"  x2="500" y2="65"  stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="97"  x2="500" y2="97"  stroke="#F1F5F9" strokeWidth="1" />
                  <path d="M0,12 L62,10 L125,14 L187,8  L250,11 L312,7  L375,9  L437,6  L500,5"  stroke="#4ade80" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,35 L62,30 L125,34 L187,26 L250,28 L312,22 L375,24 L437,19 L500,17" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,55 L62,53 L125,58 L187,50 L250,52 L312,45 L375,47 L437,42 L500,40" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,82 L62,80 L125,84 L187,77 L250,79 L312,72 L375,74 L437,69 L500,67" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,105 L62,102 L125,108 L187,100 L250,103 L312,98 L375,100 L437,95 L500,94" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between mt-1 text-[9px] text-gray-400">
              <span>May 13, 8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span>
              <span>May 14, 12 AM</span><span>4 AM</span><span>8 AM</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Score Distribution */}
        <div className="bg-white rounded-xl border border-[#EDEEF5] shadow-sm p-4 w-full lg:w-72 shrink-0 flex flex-col">
          <div className="mb-4">
            <div className="text-slate-700 text-sm font-bold">Engagement Score Distribution</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-slate-400 text-[10px]">(Last 48 Hours)</span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#EDEEF5] flex items-center justify-center text-[8px] font-bold text-[#464555]">i</span>
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <div className="relative w-[140px] h-[140px]">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="#F1F5F9" strokeWidth="14" />
                {ARCS.map((arc, i) => (
                  <circle key={i} cx="70" cy="70" r={RADIUS} fill="none"
                    stroke={arc.color} strokeWidth="14"
                    strokeDasharray={`${arc.dash} ${arc.gap}`}
                    transform={`rotate(${arc.rotation} 70 70)`}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-slate-400 text-[9px] font-semibold tracking-wide">AVG. SCORE</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-slate-800 text-2xl font-bold">68</span>
                  <span className="text-slate-400 text-[10px]">/100</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {SCORE_BANDS.map((band) => (
              <div key={band.range} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${band.dot}`} />
                  <span className="text-slate-500 text-[11px]">{band.range}</span>
                  <span className="text-slate-400 text-[10px]">({band.label})</span>
                </div>
                <div className="flex items-center justify-between ml-3.5">
                  <span className={`text-[11px] font-bold ${band.countColor}`}>{band.count}</span>
                  <span className="text-slate-400 text-[10px]">{band.pct}</span>
                </div>
                <div className="ml-3.5 mt-0.5 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="h-full rounded-full"
                    style={{
                      width: `${band.value}%`,
                      backgroundColor: band.dot.replace("bg-emerald-400","#4ade80").replace("bg-blue-500","#3b82f6").replace("bg-amber-400","#fbbf24").replace("bg-orange-500","#f97316").replace("bg-red-500","#ef4444"),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
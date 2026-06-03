"use client";

import React, { useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface PipelineStage {
  label: string;
  count: string;
  dropped: string | null;
  bgColor: string;
  textColor: string;
  width: string;
}

interface ReasonItem {
  label: string;
  pct: number;
  pctLabel: string;
  barColor: string;
}

interface StageReason {
  stageNum: number;
  stageLabel: string;
  failurePct: string;
  failurePctNum: number;
  reasons: ReasonItem[];
  ringColor: string;
}

// ─── Pipeline Cards (exactly as in Figma) ───────────────────────────────────
const PIPELINE_CARDS: PipelineStage[] = [
  { label: "Leads Created", count: "8,250", dropped: null, bgColor: "#DFEEFD", textColor: "#1A1D23", width: "233.71px" },
  { label: "Contacted", count: "5,840", dropped: "2,410 dropped", bgColor: "#C9E4FE", textColor: "#1A1D23", width: "269.28px" },
  { label: "Demo Not Joined", count: "3,430", dropped: "2,410 dropped", bgColor: "#A7D3FC", textColor: "#1A1D23", width: "269.28px" },
  { label: "Trial Started", count: "2,150", dropped: "1,280 dropped", bgColor: "#4AAEF0", textColor: "#FFFFFF", width: "269.28px" },
  { label: "Payment Intent", count: "820", dropped: "1,330 dropped", bgColor: "#0A92B2", textColor: "#FFFFFF", width: "269.28px" },
  { label: "Paid", count: "360", dropped: "460 dropped", bgColor: "#057271", textColor: "#FFFFFF", width: "213.39px" },
];

// ─── Stage Reasons with 6 DISTINCT COLORS for donut rings ───────────────────
const STAGE_REASONS: StageReason[] = [
  {
    stageNum: 1, stageLabel: "did not get contacted", failurePct: "29.2%", failurePctNum: 29.2, ringColor: "#EF4444", // red
    reasons: [
      { label: "No Call Made", pct: 13.6, pctLabel: "13.6%", barColor: "bg-red-500" },
      { label: "Call Made - No Pickup", pct: 9.5, pctLabel: "9.5%", barColor: "bg-pink-500" },
      { label: "Invalid/Wrg No.", pct: 4.4, pctLabel: "4.4%", barColor: "bg-violet-500" },
      { label: "Others", pct: 1.8, pctLabel: "1.8%", barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 2, stageLabel: "contacted but no response", failurePct: "42.8%", failurePctNum: 42.8, ringColor: "#3B82F6", // blue
    reasons: [
      { label: "No Response", pct: 12.1, pctLabel: "12.1%", barColor: "bg-red-500" },
      { label: "Will Think Later", pct: 13.3, pctLabel: "13.3%", barColor: "bg-pink-500" },
      { label: "Not Interested", pct: 24.0, pctLabel: "24.0%", barColor: "bg-violet-500" },
      { label: "Lang/Trust Issue", pct: 3.9, pctLabel: "3.9%", barColor: "bg-blue-500" },
      { label: "Others", pct: 2.0, pctLabel: "2.0%", barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 3, stageLabel: "demo not joined", failurePct: "37.3%", failurePctNum: 37.3, ringColor: "#10B981", // green
    reasons: [
      { label: "No Show", pct: 20.9, pctLabel: "20.9%", barColor: "bg-red-500" },
      { label: "Rescheduled / NJ", pct: 10.5, pctLabel: "10.5%", barColor: "bg-pink-500" },
      { label: "Lost Interest", pct: 4.4, pctLabel: "4.4%", barColor: "bg-violet-500" },
      { label: "Technical Issue", pct: 0.9, pctLabel: "0.9%", barColor: "bg-blue-500" },
      { label: "Others", pct: 0.6, pctLabel: "0.6%", barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 4, stageLabel: "trial not activated", failurePct: "61.9%", failurePctNum: 61.9, ringColor: "#EC4899", // pink
    reasons: [
      { label: "Did Not Install", pct: 24.2, pctLabel: "24.2%", barColor: "bg-red-500" },
      { label: "Installed Not Activated", pct: 19.5, pctLabel: "19.5%", barColor: "bg-pink-500" },
      { label: "Conf Or Need Help", pct: 11.2, pctLabel: "11.2%", barColor: "bg-violet-500" },
      { label: "No Time", pct: 4.7, pctLabel: "4.7%", barColor: "bg-blue-500" },
      { label: "Others", pct: 2.3, pctLabel: "2.3%", barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 5, stageLabel: "payment not completed", failurePct: "56.1%", failurePctNum: 56.1, ringColor: "#8B5CF6", // purple
    reasons: [
      { label: "Price Objection", pct: 17.1, pctLabel: "17.1%", barColor: "bg-red-500" },
      { label: "Pay Link Not Used", pct: 22.0, pctLabel: "22.0%", barColor: "bg-pink-500" },
      { label: "Pay Failed", pct: 11.0, pctLabel: "11.0%", barColor: "bg-violet-500" },
      { label: "Need More Time", pct: 3.7, pctLabel: "3.7%", barColor: "bg-blue-500" },
      { label: "Others", pct: 2.4, pctLabel: "2.4%", barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 6, stageLabel: "did not become paid", failurePct: "44.0%", failurePctNum: 44.0, ringColor: "#F59E0B", // amber (sixth distinct color)
    reasons: [
      { label: "Last Min Drop", pct: 17.1, pctLabel: "17.1%", barColor: "bg-red-500" },
      { label: "Trust Issue", pct: 22.0, pctLabel: "22.0%", barColor: "bg-pink-500" },
      { label: "Chose Competitor", pct: 11.0, pctLabel: "11.0%", barColor: "bg-violet-500" },
      { label: "Others", pct: 2.4, pctLabel: "2.4%", barColor: "bg-emerald-500" },
    ],
  },
];

// ─── Summary Table Data ──────────────────────────────────────────────────────
const SUMMARY_ROWS = [
  { stage: "1. Did Not Get Contacted", entered: "8,250", failed: "2,410", failurePct: "29.2%", vsPrev: "▲ 5.2 pp", topReason: "1A. No Call Made", topReasonPct: "13.6%", highlight: false },
  { stage: "2. Contacted but No Response", entered: "5,840", failed: "2,410", failurePct: "42.8%", vsPrev: "▲ 6.8 pp", topReason: "2C. No Response", topReasonPct: "24.0%", highlight: true },
  { stage: "3. Demo Not Joined", entered: "3,430", failed: "1,280", failurePct: "37.3%", vsPrev: "▲ 4.1 pp", topReason: "3A. No Show", topReasonPct: "20.9%", highlight: false },
  { stage: "4. Trial Not Activated", entered: "2,150", failed: "1,330", failurePct: "61.9%", vsPrev: "▲ 7.6 pp", topReason: "4A. Did Not Install", topReasonPct: "24.2%", highlight: false },
  { stage: "5. Payment Not Completed", entered: "820", failed: "460", failurePct: "56.1%", vsPrev: "▲ 5.9 pp", topReason: "5B. Payment Link Not Used", topReasonPct: "22.0%", highlight: false },
  { stage: "6. Did Not Become Paid", entered: "360", failed: "360", failurePct: "44.0%", vsPrev: "▲ 3.2 pp", topReason: "6A. Last Minute Drop", topReasonPct: "14.6%", highlight: false },
  { stage: "Total", entered: "8,250", failed: "5,630", failurePct: "68.2%", vsPrev: "▲ 3.8 pp", topReason: "2C. No Response", topReasonPct: "24.0%", highlight: false },
];

// ─── Mini Donut Ring – clean, open ring with distinct colors ─────────────────
const RING_RADIUS = 30;
const RING_STROKE = 6;
const RING_SIZE = 76;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function MiniRing({ pct, color }: { pct: number; color: string }) {
  const filled = (pct / 100) * CIRCUMFERENCE;
  const gap = 2.5; // small opening to match Figma
  const dashArray = `${filled} ${CIRCUMFERENCE - filled - gap}`;

  return (
    <div className="relative w-[76px] h-[76px] flex-shrink-0">
      <svg width={RING_SIZE} height={RING_SIZE} viewBox="0 0 76 76">
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={RING_STROKE}
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={RING_STROKE}
          strokeDasharray={dashArray}
          transform="rotate(-90 38 38)"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#1A1D23] text-[14px] font-bold">{pct}%</span>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function FailureFlow() {
  const [showCount, setShowCount] = useState(true);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl md:text-[22px] font-bold text-[#1B1B24] leading-none">
            Failure Flow Every stage
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
              <path d="M3 4.5l3 3 3-3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Pipeline Flow Cards */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-stretch gap-0 min-w-[1534px] md:min-w-full">
          {PIPELINE_CARDS.map((card, idx) => (
            <React.Fragment key={idx}>
              <div
                className="flex flex-col justify-between py-4 px-3 rounded-lg shadow-sm"
                style={{
                  backgroundColor: card.bgColor,
                  width: card.width,
                  minHeight: "152px",
                }}
              >
                <div>
                  <div className="text-center">
                    <span
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: card.textColor }}
                    >
                      {card.count}
                    </span>
                  </div>
                  <div className="text-center mt-1">
                    <span
                      className="text-[11px] md:text-xs font-medium"
                      style={{ color: card.textColor }}
                    >
                      {card.label}
                    </span>
                  </div>
                </div>
                {card.dropped && (
                  <div className="mt-3 text-center">
                    <span
                      className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${card.textColor === "#FFFFFF" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)"}`,
                        color: card.textColor,
                      }}
                    >
                      {card.dropped}
                    </span>
                  </div>
                )}
              </div>
              {idx < PIPELINE_CARDS.length - 1 && (
                <div className="flex items-center justify-center px-1">
                  <svg width="20" height="16" viewBox="0 0 24 18" fill="none">
                    <path
                      d="M1 9h18M13 2l6 7-6 7"
                      stroke="#94A3B8"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Top Failure Reasons by Stage – with 6 distinct ring colors */}
      <div className="bg-white pt-5 pb-6 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2 ml-4 mb-3">
          <span className="text-[#1A1D23] text-sm md:text-[13px] font-bold">Top Failure Reasons by Stage</span>
          <span className="text-[#7C85A2] text-[10px] md:text-[11px]">(Click a stage to see details)</span>
          <span className="w-4 h-4 rounded-full bg-[#EDEEF5] flex items-center justify-center text-[9px] font-bold text-[#464555]">i</span>
        </div>

        <div className="overflow-x-auto">
          <div className="flex items-stretch min-w-[900px] md:min-w-full border border-[#E8EAF0] rounded-lg overflow-hidden">
            {STAGE_REASONS.map((sr, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col min-w-0"
                style={{ borderRight: i < STAGE_REASONS.length - 1 ? "1px solid #E8EAF0" : "none" }}
              >
                <div className="flex flex-col items-center bg-white pt-3 pb-2 px-1 border-b border-[#E8EAF0]">
                  <span className="text-[#1A1D23] text-[10px] md:text-[11px] font-bold mb-0.5">Stage {sr.stageNum}</span>
                  <span className="text-gray-400 text-[8px] md:text-[9px] mb-2 text-center leading-tight">{sr.stageLabel}</span>
                  <MiniRing pct={sr.failurePctNum} color={sr.ringColor} />
                </div>
                <div className="bg-white p-2 flex flex-col gap-1.5">
                  {sr.reasons.map((r, ri) => (
                    <div key={ri}>
                      <div className="flex items-center gap-1 mb-0.5">
                        <div className="w-1.5 h-1.5 rounded-sm bg-[#1A1D23]" />
                        <span className="text-[#1A1D23] text-[9px] md:text-[10px] flex-1 leading-tight">{r.label}</span>
                        <span className="text-[#1A1D23] text-[9px] md:text-[10px] font-bold">{r.pctLabel}</span>
                      </div>
                      <div className="bg-[#E8EAF0] rounded-sm h-1">
                        <div className={`h-full rounded-sm ${r.barColor}`} style={{ width: `${Math.min(r.pct * 3, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Failure Summary Table */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-900 text-base md:text-[18px] font-bold">Failure Summary Table (Last 48H)</span>
          <span className="w-4 h-4 rounded-full bg-[#EDEEF5] flex items-center justify-center text-[9px] font-bold text-[#464555]">i</span>
        </div>

        <div className="overflow-x-auto">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm min-w-[800px] md:min-w-full">
            <div className="grid grid-cols-[minmax(180px,2fr)_90px_90px_90px_100px_minmax(150px,2fr)_100px] bg-slate-50 py-3 px-4 border-b border-slate-200 text-xs md:text-[13px] font-bold text-slate-500">
              <span>Stage</span> <span>Entered</span> <span>Failed</span> <span>Failure %</span>
              <span>vs Prev 48H</span> <span>Top Reason</span> <span>Top Reason %</span>
            </div>
            {SUMMARY_ROWS.map((row, i) => {
              const isTotal = row.stage === "Total";
              return (
                <div
                  key={i}
                  className={`grid grid-cols-[minmax(180px,2fr)_90px_90px_90px_100px_minmax(150px,2fr)_100px] items-center px-4 py-3 border-b border-slate-100 last:border-0 ${
                    row.highlight ? "bg-red-50" : isTotal ? "bg-slate-50" : "hover:bg-slate-50/60"
                  } transition-colors text-xs md:text-[13px]`}
                >
                  <span className={`${isTotal ? "text-slate-900 font-bold" : row.highlight ? "text-red-800 font-bold" : "text-slate-700"}`}>{row.stage}</span>
                  <span className={`${isTotal ? "text-slate-900 font-bold" : "text-slate-600"}`}>{row.entered}</span>
                  <span className={`${isTotal ? "text-slate-900 font-bold" : row.highlight ? "text-red-800" : "text-slate-600"}`}>{row.failed}</span>
                  <span className={`${isTotal ? "text-slate-900 font-bold" : row.highlight ? "text-red-800" : "text-slate-600"}`}>{row.failurePct}</span>
                  <span className={`font-bold ${isTotal ? "text-red-800" : "text-green-800"}`}>{row.vsPrev}</span>
                  <span className={`${isTotal ? "text-slate-900 font-bold" : "text-slate-500"}`}>{row.topReason}</span>
                  <span className={`${isTotal ? "text-slate-900 font-bold" : "text-slate-600"}`}>{row.topReasonPct}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
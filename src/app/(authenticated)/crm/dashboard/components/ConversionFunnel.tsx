"use client";

import React, { useState } from "react";

type Tab = "Count" | "Conversion %" | "Drop %" | "Velocity";

const STAGES = [
  {
    subLabel: "LEADS TO",
    label: "Contacted",
    current: 48720,
    prev: 20500,
    trend: "up",
    badgeBg: "#F0FDF4",
    badgeBorder: "#BBF7D0",
    badgeText: "#15803D",
    showGap: true,
  },
  {
    subLabel: "CONTACTED TO",
    label: "Interested",
    current: 23480,
    prev: 19000,
    trend: "up",
    badgeBg: "#F0FDF4",
    badgeBorder: "#BBF7D0",
    badgeText: "#15803D",
    showGap: true,
  },
  {
    subLabel: "INTERESTED TO",
    label: "Trial",
    current: 11230,
    prev: 10200,
    trend: "down",
    badgeBg: "#FFDAD6",
    badgeBorder: "#BA1A1A33",
    badgeText: "#BA1A1A",
    showGap: true,
  },
  {
    subLabel: "TRIAL TO",
    label: "Intent",
    current: 3520,
    prev: 6200,
    trend: "down",
    badgeBg: "#FFDAD6",
    badgeBorder: "#BA1A1A33",
    badgeText: "#BA1A1A",
    showGap: false,
  },
  {
    subLabel: "INTENT TO",
    label: "Paid",
    current: 1240,
    prev: 4100,
    trend: "down",
    badgeBg: "#FFDAD6",
    badgeBorder: "#BA1A1A33",
    badgeText: "#BA1A1A",
    showGap: false,
  },
];

const Y_LABELS = [50000, 40000, 30000, 20000, 10000, 0];
const MAX_VALUE = 50000;
const BAR_MAX_HEIGHT = 220;

const ArrowUp = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M5 8V2M5 2L2 5M5 2L8 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M5 2V8M5 8L2 5M5 8L8 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
    <rect
      x="2"
      y="3"
      width="14"
      height="13"
      rx="2"
      stroke="#464555"
      strokeWidth="1.4"
    />
    <path d="M2 7H16" stroke="#464555" strokeWidth="1.4" />
    <path
      d="M6 1V4M12 1V4"
      stroke="#464555"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const InfoIcon = () => (
  <div className="w-[18px] h-[18px] rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] font-bold text-[#464555] flex-shrink-0 select-none">
    i
  </div>
);

const PerformanceGapPopup = () => (
  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white border border-[#C7C4D8] rounded-xl py-3.5 px-[18px] min-w-[220px] shadow-[0_8px_32px_rgba(53,37,205,0.13),0_2px_8px_rgba(0,0,0,0.06)] pointer-events-none">
    {/* Arrow caret */}
    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 overflow-hidden">
      <div className="w-2.5 h-2.5 bg-white border border-[#C7C4D8] rotate-45 mt-[3px] ml-[1px]" />
    </div>

    <div className="flex items-center justify-between mb-3">
      <span className="text-[11px] font-bold text-[#464555] tracking-[0.07em]">
        PERFORMANCE GAP
      </span>
      <span className="bg-[#FFDAD6] text-[#BA1A1A] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[rgba(186,26,26,0.2)]">
        Alert
      </span>
    </div>

    <div className="flex justify-between items-center pb-2 border-b border-dashed border-[#EBEBF5] mb-2">
      <span className="text-[13px] text-[#464555]">Current Path</span>
      <span className="text-lg font-bold text-[#1B1B24]">11,230</span>
    </div>
    <div className="flex justify-between items-center pb-2 border-b border-dashed border-[#FFDAD6] mb-2">
      <span className="text-[13px] text-[#464555]">Target Goal</span>
      <span className="text-lg font-bold text-[#1B1B24]">20,000</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-xs font-semibold text-[#BA1A1A]">Net Variance</span>
      <span className="text-xl font-bold text-[#BA1A1A]">-8,770</span>
    </div>
  </div>
);

export default function ConversionFunnel() {
  const [activeTab, setActiveTab] = useState<Tab>("Conversion %");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="font-sans bg-[#FCF8FF] border border-[rgba(199,196,216,0.3)] rounded-2xl overflow-visible w-full">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-3 pt-10 px-6 pb-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="m-0 text-xl font-bold text-[#1B1B24] tracking-[-0.3px]">
              Conversion Funnel Analysis
            </h2>
            <InfoIcon />
          </div>
          <p className="mt-1 mb-0 text-[13px] text-[#464555] font-normal">
            Last 48 Hours Comparison (14 May 2025 – 15 May 2025)
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button className="bg-[#FCF8FF] border border-[#C7C4D8] rounded-lg px-[9px] py-[7px] cursor-pointer flex items-center">
            <CalendarIcon />
          </button>

          <div className="flex bg-[#F5F2FF] rounded-xl p-1 gap-0.5">
            {(["Count", "Conversion %", "Drop %", "Velocity"] as Tab[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg border-none cursor-pointer text-[13px] font-medium font-sans transition-all duration-150 whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-[#2563EB] text-white shadow-[0_1px_4px_rgba(37,99,235,0.25)]"
                      : "bg-transparent text-[#464555]"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Chart card ── */}
      <div className="mt-6 mx-6 mb-5 bg-white border border-[#C7C4D8] rounded-xl p-[18px] pb-5 overflow-visible">
        {/* Flow Distribution header + legend */}
        <div className="flex flex-wrap items-center justify-between mb-[18px] gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#3525CD] text-lg leading-5">✦</span>
            <span className="font-bold text-[15px] text-[#1B1B24]">
              Flow Distribution
            </span>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-[4px] bg-gradient-to-t from-[#3525CD] to-[rgba(53,37,205,0.6)]" />
              <span className="text-xs text-[#464555]">Current Period</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-[4px] bg-[rgba(228,225,238,0.6)]" />
              <span className="text-xs text-[#464555]">Previous Baseline</span>
            </div>
          </div>
        </div>

        {/* Chart body */}
        <div className="flex gap-1.5">
          {/* Y-axis */}
          <div className="flex flex-col justify-between pb-[52px] min-w-[40px] text-right">
            {Y_LABELS.map((v) => (
              <div
                key={v}
                className="text-[11px] text-[#8E8CA0] leading-5"
              >
                {v === 0 ? "0" : `${v / 1000}0K`}
              </div>
            ))}
          </div>

          {/* Bars grid */}
          <div className="flex-1 grid grid-cols-5 gap-1 relative">
            {/* Grid lines (z-0 ensures they stay behind bars) */}
            <div className="absolute top-0 left-0 right-0 h-[220px] flex flex-col justify-between pointer-events-none z-0">
              {Y_LABELS.map((v) => (
                <div
                  key={v}
                  className="w-full h-px bg-[#F0EEF8]"
                />
              ))}
            </div>

            {/* Chevron separators */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 left-[calc((20%*_+_1)_+_2px)] translate-y-[-50%] z-[3] pointer-events-none"
                style={{ left: `${(i + 1) * 20}%` }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 3L9 7L5 11"
                    stroke="#C7C4D8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}

            {STAGES.map((stage, idx) => {
              const currentH = (stage.current / MAX_VALUE) * BAR_MAX_HEIGHT;
              const prevH = (stage.prev / MAX_VALUE) * BAR_MAX_HEIGHT;
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center relative z-10"
                >
                  {/* Badge with hover trigger */}
                  <div
                    className="relative -mt-4"
                    onMouseEnter={() =>
                      stage.showGap ? setHoveredIdx(idx) : null
                    }
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div
                      className={`text-[11px] font-bold py-[3px] px-[9px] rounded-full flex items-center gap-[3px] whitespace-nowrap transition-shadow duration-150 ${
                        stage.showGap ? "cursor-pointer" : "cursor-default"
                      } ${
                        isHovered ? "shadow-[0_2px_10px_rgba(53,37,205,0.15)]" : ""
                      }`}
                      style={{
                        background: stage.badgeBg,
                        border: `1.53px solid ${stage.badgeBorder}`,
                        color: stage.badgeText,
                      }}
                    >
                      <span className="text-current flex">
                        {stage.trend === "up" ? <ArrowUp /> : <ArrowDown />}
                      </span>
                      {stage.current.toLocaleString()}
                    </div>

                    {/* Popup */}
                    {isHovered && stage.showGap && <PerformanceGapPopup />}
                  </div>

                  {/* Bar pair */}
                  <div className="w-full h-[220px] flex items-end justify-center gap-1">
                    <div
                      className="w-[36%] max-w-[36px] rounded-t-md flex-shrink-0 bg-gradient-to-t from-[#3525CD] to-[rgba(53,37,205,0.6)]"
                      style={{ height: currentH }}
                    />
                    <div
                      className="w-[25%] max-w-[26px] rounded-t-md flex-shrink-0 bg-[rgba(228,225,238,0.9)]"
                      style={{ height: prevH }}
                    />
                  </div>

                  {/* Stage label */}
                  <div className="text-center mt-2">
                    <div className="text-[9px] font-medium text-[#8E8CA0] tracking-[0.06em] uppercase">
                      {stage.subLabel}
                    </div>
                    <div
                      className={`text-[13px] font-bold mt-0.5 ${
                        idx === STAGES.length - 1 ? "text-[#3525CD]" : "text-[#1B1B24]"
                      }`}
                    >
                      {stage.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
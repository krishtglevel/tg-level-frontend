"use client";

import React, { useState } from "react";

type Tab = "Count" | "Conversion %" | "Drop %" | "Velocity";

const STAGES = [
  { subLabel: "LEADS TO", label: "Contacted", current: 48720, prev: 23480, color: "#4F46E5" },
  { subLabel: "CONTACTED TO", label: "Interested", current: 23480, prev: 11230, color: "#6366F1" },
  { subLabel: "INTERESTED TO", label: "Trial", current: 11230, prev: 10000, color: "#6366F1" },
  { subLabel: "TRIAL TO", label: "Intent", current: 3520, prev: 6200, color: "#6366F1" },
  { subLabel: "INTENT TO", label: "Paid", current: 1240, prev: 4200, color: "#6366F1" },
];

export default function ConversionFunnel() {
  const [activeTab, setActiveTab] = useState<Tab>("Conversion %");
  const maxValue = 50000;
  const maxBarHeight = 210;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-[#E4E1EE] overflow-hidden">
      {/* Header section – responsive stack on mobile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#1B1B24] tracking-tight">
              Conversion Funnel Analysis
            </h2>
            <div className="w-5 h-5 rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] font-bold text-[#464555]">
              i
            </div>
          </div>
          <p className="text-sm md:text-base text-[#464555] mt-1">
            Last 48 Hours Comparison (14 May 2025 – 15 May 2025)
          </p>
        </div>

        {/* Tabs – scrollable on small screens */}
        <div className="flex bg-[#F5F2FF] rounded-xl p-1 overflow-x-auto">
          {["Count", "Conversion %", "Drop %", "Velocity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`whitespace-nowrap px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-[#464555] hover:bg-white/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Flow Distribution legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-6 mt-1 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#3525CD] text-lg">✦</span>
          <span className="font-semibold text-[#1B1B24] text-base md:text-lg">
            Flow Distribution
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-t from-[#3525CD] to-[#818CF8]" />
            <span className="text-[#464555]">Current Period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#E4E1EE]" />
            <span className="text-[#464555]">Previous Baseline</span>
          </div>
        </div>
      </div>

      {/* Chart container – relative for the floating card */}
      <div className="relative px-3 pb-6 md:px-6">
        <div className="flex gap-3 md:gap-6">
          {/* Y‑axis labels */}
          <div className="flex flex-col justify-between text-right pr-2 pt-2 pb-8 text-[11px] md:text-sm text-[#464555] min-w-[45px] md:min-w-[60px]">
            {[50000, 40000, 30000, 20000, 10000, 0].map((v) => (
              <div key={v} className="leading-5 md:leading-6">
                {v.toLocaleString()}
              </div>
            ))}
          </div>

          {/* Bars grid – responsive gaps */}
          <div className="flex-1 grid grid-cols-5 gap-2 md:gap-6">
            {STAGES.map((stage, idx) => {
              const currentHeight = (stage.current / maxValue) * maxBarHeight;
              const prevHeight = (stage.prev / maxValue) * maxBarHeight;

              return (
                <div key={idx} className="flex flex-col items-center">
                  {/* Value badge */}
                  <div
                    className={`text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full mb-2 md:mb-3 ${
                      idx <= 1
                        ? "bg-[#D1FAE5] text-[#047857]"
                        : "bg-[#FFDAD6] text-[#BA1A1A]"
                    }`}
                  >
                    {stage.current.toLocaleString()}
                  </div>

                  {/* Bars container */}
                  <div
                    className="relative w-full flex justify-center"
                    style={{ height: maxBarHeight + 16 }}
                  >
                    {/* Current bar */}
                    <div
                      className="absolute bottom-0 w-6 md:w-10 rounded-t-md md:rounded-xl shadow-sm"
                      style={{
                        height: `${currentHeight}px`,
                        background: `linear-gradient(to top, ${stage.color}, #818CF8)`,
                      }}
                    />
                    {/* Previous bar */}
                    <div
                      className="absolute bottom-0 w-4 md:w-7 rounded-t-md md:rounded-xl bg-[#E4E1EE]"
                      style={{
                        height: `${prevHeight}px`,
                        left: "50%",
                        transform: "translateX(12px) md:translateX(18px)",
                      }}
                    />
                  </div>

                  {/* Stage labels */}
                  <div className="text-center mt-3 md:mt-5">
                    <div className="text-[9px] md:text-xs font-medium text-[#464555] tracking-wide">
                      {stage.subLabel}
                    </div>
                    <div className="text-[11px] md:text-base font-bold text-[#1B1B24] mt-0.5 md:mt-1">
                      {stage.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Gap Card – responsive positioning */}
        <div
          className="absolute hidden lg:block bg-white rounded-xl shadow-xl border border-[#C7C4D8] p-4 w-64"
          style={{
            top: "50%",
            right: "5%",
            transform: "translateY(-50%)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-[#464555] text-xs tracking-wide">
              PERFORMANCE GAP
            </span>
            <span className="bg-[#FFDAD6] text-[#BA1A1A] text-[10px] font-bold px-2 py-0.5 rounded-full">
              Alert
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#464555] text-sm">Current Path</span>
              <span className="font-bold text-[#1B1B24] text-lg">11,230</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#464555] text-sm">Target Goal</span>
              <span className="font-bold text-[#1B1B24] text-lg">20,000</span>
            </div>
            <div className="pt-2 border-t border-dashed border-[#FFDAD6]">
              <div className="flex justify-between items-end">
                <span className="text-[#BA1A1A] font-semibold text-xs">Net Variance</span>
                <span className="text-[#BA1A1A] text-xl font-bold">-8,770</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: show the performance gap card differently on small screens */}
      <div className="block lg:hidden px-5 pb-5">
        <div className="bg-white rounded-xl shadow-md border border-[#C7C4D8] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-[#464555] text-sm">PERFORMANCE GAP</span>
            <span className="bg-[#FFDAD6] text-[#BA1A1A] text-xs font-bold px-3 py-1 rounded-full">
              Alert
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100">
            <span className="text-[#464555]">Current Path</span>
            <span className="font-bold text-[#1B1B24] text-xl">11,230</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100">
            <span className="text-[#464555]">Target Goal</span>
            <span className="font-bold text-[#1B1B24] text-xl">20,000</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[#BA1A1A] font-semibold">Net Variance</span>
            <span className="text-[#BA1A1A] text-2xl font-bold">-8,770</span>
          </div>
        </div>
      </div>
    </div>
  );
}
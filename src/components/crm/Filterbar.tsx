"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";

export default function FiltersBar() {
  const filters = [
    { label: "TIMEFRAME", value: "04 May - 10 May", valueColor: "text-[#3525CD]", valueBold: true, hasToggle: false },
    { label: "DATE BASIS", value: "Lead Created", valueColor: "text-[#1B1B24]", valueBold: false, hasToggle: false },
    { label: "COMPARISON", value: "Prev 7 Days", valueColor: "text-[#1B1B24]", valueBold: false, hasToggle: true },
    { label: "TEAM LEAD", value: "All Leads", valueColor: "text-[#1B1B24]", valueBold: false, hasToggle: false },
    { label: "ASSIGNMENT", value: "All Agents", valueColor: "text-[#1B1B24]", valueBold: false, hasToggle: false },
    { label: "SOURCE", value: "All Sources", valueColor: "text-[#1B1B24]", valueBold: false, hasToggle: false },
  ];

  const activeFilters = [
    { label: "04 May - 10 May 2025", color: "#3525CD", bg: "#3525CD0D", border: "#3525CD33" },
    { label: "Vs. Prev 7 Days", color: "#464555", bg: "#565E740D", border: "#C7C4D8" },
  ];

  return (
    <div
      className="bg-white rounded-b-xl border border-[#C7C4D8] mx-4 mt-2 mb-4"
      style={{
        padding: "16px 20px",
        borderBottomRightRadius: "12px",
        borderBottomLeftRadius: "12px",
        borderWidth: "1px",
      }}
    >
      {/* Filter dropdowns grid */}
      <div className="grid grid-cols-6 gap-3">
        {filters.map((filter) => (
          <div key={filter.label} className="flex flex-col gap-1.5">
            {/* Label row */}
            <div className="flex items-center px-0.5">
              <div className="w-2.5 h-2.5 mr-1.5 rounded-sm bg-[#565E74] opacity-50" />
              <span className="text-[10px] font-semibold text-[#565E74] mr-1.5">{filter.label}</span>
              <div className="flex-1 h-px bg-[#C7C4D8] opacity-40" />
            </div>

            {/* Value field */}
            {filter.hasToggle ? (
              <div className="flex justify-between items-center bg-[#F5F2FF66] py-2 px-3 rounded-lg border border-[#C7C4D899]">
                <span className={`${filter.valueColor} text-[13px] ${filter.valueBold ? "font-semibold" : ""}`}>
                  {filter.value}
                </span>
                <div className="flex items-center bg-indigo-600 py-0.5 pl-4 pr-1 rounded-full">
                  <div className="bg-white w-2.5 h-2.5 rounded-full shadow-sm" />
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center bg-[#F5F2FF66] py-2 px-3 rounded-lg border border-[#C7C4D899]">
                <span className={`${filter.valueColor} text-[13px] ${filter.valueBold ? "font-semibold" : ""}`}>
                  {filter.value}
                </span>
                <ChevronDown className="w-3 h-3 text-[#1B1B24]" strokeWidth={1.5} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active filters and action buttons */}
      <div className="flex justify-between items-center mt-3 pt-1.5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-[#464555]">ACTIVE FILTERS</span>
          <div className="flex items-center gap-2">
            {activeFilters.map((f, idx) => (
              <div
                key={idx}
                className="flex items-center py-1.5 px-3 gap-1.5 rounded-lg border"
                style={{ backgroundColor: f.bg, borderColor: f.border }}
              >
                <span className="text-[12px] font-semibold" style={{ color: f.color }}>{f.label}</span>
                <button>
                  <X className="w-2.5 h-2.5" strokeWidth={1.5} style={{ color: f.color }} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#F5F2FF] text-[#565E74] text-[13px] font-semibold py-2 px-5 rounded-lg border border-[#C7C4D8] hover:bg-[#EAE6F4]">
            Reset
          </button>
          <button className="bg-[#3525CD] text-white text-[13px] font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-[#2910B9]">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
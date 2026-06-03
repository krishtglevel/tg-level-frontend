"use client";

import * as React from "react";
import { ChevronDown, X, Calendar } from "lucide-react";
import { useFilters } from "./FilterContext";
import { format } from "date-fns";

export default function FiltersBar() {
  const { filters, updateFilter, resetFilters, applyFilters, activeFilters } = useFilters();
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  // Safe timeframe formatter with fallback
  const formatTimeframe = () => {
    const tf = filters?.timeframe || { start: "2025-05-04", end: "2025-05-10" };
    try {
      const start = format(new Date(tf.start), "dd MMM");
      const end = format(new Date(tf.end), "dd MMM");
      return `${start} - ${end}`;
    } catch {
      return "04 May - 10 May";
    }
  };

  const hasChanges = JSON.stringify(filters) !== JSON.stringify(activeFilters);

  const filterConfigs = [
    {
      label: "TIMEFRAME",
      value: formatTimeframe(),
      valueColor: "text-[#3525CD]",
      valueBold: true,
      hasToggle: false,
      key: "timeframe" as const,
      options: [
        { label: "Last 7 Days", value: { start: "2025-05-04", end: "2025-05-10" } },
        { label: "Last 14 Days", value: { start: "2025-04-27", end: "2025-05-10" } },
        { label: "Last 30 Days", value: { start: "2025-04-11", end: "2025-05-10" } },
        { label: "This Month", value: { start: "2025-05-01", end: "2025-05-31" } },
      ],
    },
    {
      label: "DATE BASIS",
      value: filters?.dateBasis || "Lead Created",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
      hasToggle: false,
      key: "dateBasis" as const,
      options: [
        { label: "Lead Created", value: "Lead Created" },
        { label: "Lead Updated", value: "Lead Updated" },
        { label: "Deal Closed", value: "Deal Closed" },
        { label: "First Contact", value: "First Contact" },
      ],
    },
    {
      label: "COMPARISON",
      value: filters?.comparison?.value || "Prev 7 Days",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
      hasToggle: true,
      key: "comparison" as const,
      options: [],
    },
    {
      label: "TEAM LEAD",
      value: filters?.teamLead || "All Leads",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
      hasToggle: false,
      key: "teamLead" as const,
      options: [
        { label: "All Leads", value: "All Leads" },
        { label: "John Doe", value: "John Doe" },
        { label: "Jane Smith", value: "Jane Smith" },
        { label: "Mike Johnson", value: "Mike Johnson" },
      ],
    },
    {
      label: "ASSIGNMENT",
      value: filters?.assignment || "All Agents",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
      hasToggle: false,
      key: "assignment" as const,
      options: [
        { label: "All Agents", value: "All Agents" },
        { label: "Sales Team", value: "Sales Team" },
        { label: "Support Team", value: "Support Team" },
        { label: "Unassigned", value: "Unassigned" },
      ],
    },
    {
      label: "SOURCE",
      value: filters?.source || "All Sources",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
      hasToggle: false,
      key: "source" as const,
      options: [
        { label: "All Sources", value: "All Sources" },
        { label: "Website", value: "Website" },
        { label: "Referral", value: "Referral" },
        { label: "Social Media", value: "Social Media" },
        { label: "Email Campaign", value: "Email Campaign" },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-b-xl border border-[#C7C4D8] mx-4 mt-2 mb-4 relative p-5">
      {/* Filter dropdowns grid */}
      <div className="grid grid-cols-6 gap-3">
        {filterConfigs.map((filter) => (
          <div key={filter.label} className="flex flex-col gap-1.5 relative">
            {/* Label row */}
            <div className="flex items-center px-0.5">
              <div className="w-2.5 h-2.5 mr-1.5 rounded-sm bg-[#565E74] opacity-50" />
              <span className="text-[10px] font-semibold text-[#565E74] mr-1.5">
                {filter.label}
              </span>
              <div className="flex-1 h-px bg-[#C7C4D8] opacity-40" />
            </div>

            {/* Value field */}
            {filter.hasToggle ? (
              <div className="flex justify-between items-center bg-[#F5F2FF66] py-2 px-3 rounded-lg border border-[#C7C4D899]">
                <span className={`${filter.valueColor} text-[13px]`}>
                  {filter.value}
                </span>
                <button
                  onClick={() => {
                    updateFilter("comparison", {
                      ...filters.comparison,
                      enabled: !filters.comparison?.enabled,
                    });
                  }}
                  className={`flex items-center py-0.5 pl-4 pr-1 rounded-full transition-colors ${
                    filters.comparison?.enabled ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <div className="bg-white w-2.5 h-2.5 rounded-full shadow-sm" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === filter.key ? null : filter.key)
                  }
                  className="w-full flex justify-between items-center bg-[#F5F2FF66] py-2 px-3 rounded-lg border border-[#C7C4D899] hover:bg-[#F5F2FF99] transition-colors"
                >
                  <span
                    className={`${filter.valueColor} text-[13px] ${
                      filter.valueBold ? "font-semibold" : ""
                    }`}
                  >
                    {filter.value}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#1B1B24]" strokeWidth={1.5} />
                </button>

                {/* Dropdown */}
                {openDropdown === filter.key && filter.options.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#C7C4D8] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                    {filter.options.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => {
                          updateFilter(filter.key, option.value);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 text-[13px] hover:bg-[#F5F2FF] transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active filters and action buttons */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#C7C4D8]">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-[#464555]">ACTIVE FILTERS</span>
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="flex items-center py-1.5 px-3 gap-1.5 rounded-lg border"
              style={{
                backgroundColor: "#3525CD0D",
                borderColor: "#3525CD33",
              }}
            >
              <span className="text-[12px] font-semibold" style={{ color: "#3525CD" }}>
                {formatTimeframe()}
              </span>
              <button onClick={() => updateFilter("timeframe", { start: "2025-05-04", end: "2025-05-10" })}>
                <X className="w-2.5 h-2.5" strokeWidth={1.5} style={{ color: "#3525CD" }} />
              </button>
            </div>

            {activeFilters?.comparison?.enabled && (
              <div
                className="flex items-center py-1.5 px-3 gap-1.5 rounded-lg border"
                style={{
                  backgroundColor: "#565E740D",
                  borderColor: "#C7C4D8",
                }}
              >
                <span className="text-[12px] font-semibold" style={{ color: "#464555" }}>
                  Vs. {activeFilters.comparison.value}
                </span>
                <button
                  onClick={() =>
                    updateFilter("comparison", { ...activeFilters.comparison, enabled: false })
                  }
                >
                  <X className="w-2.5 h-2.5" strokeWidth={1.5} style={{ color: "#464555" }} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetFilters}
            className="bg-[#F5F2FF] text-[#565E74] text-[13px] font-semibold py-2 px-5 rounded-lg border border-[#C7C4D8] hover:bg-[#EAE6F4] transition-colors"
          >
            Reset
          </button>
          <button
            onClick={applyFilters}
            disabled={!hasChanges}
            className={`text-white text-[13px] font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors ${
              hasChanges
                ? "bg-[#3525CD] hover:bg-[#2910B9]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Apply Filters {hasChanges && "•"}
          </button>
        </div>
      </div>
    </div>
  );
}
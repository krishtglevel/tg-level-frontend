"use client";

import React from "react";

const metrics = [
  { label: "LEADS CREATED", value: "3,250", change: "+8.7%", pct: null, up: true, barWidth: 100, color: "#3525CD" },
  { label: "CONTACTED", value: "2,210", change: "+6.1%", pct: "67.9%", up: true, barWidth: 68, color: "#06B6D4" },
  { label: "INTERESTED", value: "1,420", change: "-4.3%", pct: "43.7%", up: false, barWidth: 44, color: "#A855F7" },
  { label: "TRIAL ACTIVE", value: "720", change: "-8.9%", pct: "22.2%", up: false, barWidth: 22, color: "#F97316" },
  { label: "PAYMENT INTENT", value: "310", change: "-11.2%", pct: "9.5%", up: false, barWidth: 10, color: "#EC4899" },
  { label: "PAID", value: "132", change: "-9.6%", pct: "4.1%", up: false, barWidth: 4, color: "#10B981" },
];

export default function MetricsRow() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {metrics.map((m, idx) => (
        <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold tracking-wide text-gray-500">{m.label}</span>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${m.up ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
              {m.up ? "↑" : "↓"} {m.change.replace(/[+-]/, "")}
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[#1B1B24] text-2xl font-bold tracking-tight">{m.value}</span>
            {m.pct && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ color: m.color, background: m.color + "18" }}>
                ({m.pct})
              </span>
            )}
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${m.barWidth}%`, backgroundColor: m.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
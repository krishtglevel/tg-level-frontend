"use client";

import * as React from "react";
import { Info, Bot, Sparkles } from "lucide-react";

const DonutChart = () => {
  const donutData = [
    { color: "#10B981", label: "MTD ACTUAL", amount: "Rs 2,45,80,000", pct: 45 },
    { color: "#3B82F6", label: "REMAINING TARGET", amount: "Rs 2,38,20,000", pct: 44 },
    { color: "#EF4444", label: "REVENUE GAP", amount: "Rs 58,00,000", pct: 11 },
  ];

  const size = 200;
  const radius = 68;
  const strokeWidth = 24;
  const center = size / 2;

  let cumulativeAngle = 0;
  const arcs = donutData.map((item) => {
    const angle = (item.pct / 100) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;
    return { ...item, startAngle, endAngle };
  });

  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const radian = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(radian), y: cy + r * Math.sin(radian) };
  };

  const describeArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#F0ECF9" strokeWidth={strokeWidth} />
        {arcs.map((arc) => (
          <path
            key={arc.label}
            d={describeArc(arc.startAngle, arc.endAngle)}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ))}
        <text x={center} y={center - 6} textAnchor="middle" fill="#777587" fontSize="10" fontWeight="500">
          TOTAL TARGET
        </text>
        <text x={center} y={center + 12} textAnchor="middle" fill="#1B1B24" fontSize="15" fontWeight="700">
          Rs 5.42 Cr
        </text>
      </svg>
    </div>
  );
};

export default function IntelligencePanel() {
  const donutLegend = [
    { color: "#10B981", label: "MTD ACTUAL", amount: "Rs 2,45,80,000", pct: "45%" },
    { color: "#3B82F6", label: "REMAINING TARGET", amount: "Rs 2,38,20,000", pct: "44%" },
    { color: "#EF4444", label: "REVENUE GAP", amount: "Rs 58,00,000", pct: "11%" },
  ];

  const recoveryItems = [
    { label: "Payment Pending", leads: "87 leads", amount: "Rs 32.4L" },
    { label: "Demo Unseen", leads: "97 leads", amount: "Rs 18.2L" },
    { label: "Hot Leads", leads: "64 leads", amount: "Rs 14.1L" },
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Main Intelligence Card */}
      <div className="bg-white rounded-2xl border border-[#C7C4D880] p-5 shadow-md">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 mt-0.5 rounded-full bg-[#3525CD1A] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#3525CD]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1B1B24] leading-tight">
                Forecast vs Actual Intelligence
              </h3>
              <p className="text-xs text-[#464555] mt-0.5">
                Real-time revenue distribution analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C7C4D8]" />
            <div className="bg-[#F0ECF9] px-1.5 py-0.5 rounded-md">
              <span className="text-[#777587] text-[10px] font-medium">2</span>
            </div>
          </div>
        </div>

        {/* Donut and Legend */}
        <div className="flex flex-col items-center gap-4 mt-3">
          <DonutChart />
          <div className="w-full space-y-2">
            {donutLegend.map((item) => (
              <div
                key={item.label}
                className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl border border-[#C7C4D833] bg-white"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#777587] text-[10px] font-semibold">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold" style={{ color: item.color }}>
                    {item.amount}
                  </span>
                  <span className="text-[#777587] text-[10px]">({item.pct})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recovery Card */}
      <div className="bg-[#F5F2FF] rounded-xl border border-[#C7C4D84D] p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#C7C4D81A]">
          <div className="flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-[#3525CD]" />
            <div>
              <span className="text-black text-[9px] font-bold block">AI RECOVERY POTENTIAL</span>
              <span className="text-[#3525CD] text-base md:text-lg font-bold">Rs 64,75,600</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/50 px-1.5 py-0.5 rounded-full border border-[#C7C4D81A]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#777587]" />
            <span className="text-[#777587] text-[7px] font-medium">Ranked by probability</span>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {recoveryItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-wrap items-center justify-between gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#C7C4D81A] shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#1B1B24] text-[11px] font-semibold">{item.label}</span>
                <span className="text-[#777587] text-[9px]">{item.leads}</span>
              </div>
              <div className="bg-[#3525CD0D] px-2 py-0.5 rounded border border-[#3525CD1A]">
                <span className="text-[#3525CD] text-[11px] font-bold">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
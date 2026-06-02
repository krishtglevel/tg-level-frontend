"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { Calendar, ChevronDown } from "lucide-react";

// Generate data matching the Y-axis scale (₹17K to ₹70K)
const generateChartData = () =>
  Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const forecast = 18500 + day * 1750 + Math.sin(day / 3) * 1500;
    const actual = day <= 22 ? 17000 + day * 1820 + Math.cos(day / 2.5) * 1800 : null;
    const revisedRunRate = forecast * 1.07 + Math.sin(day / 4) * 1200;
    const totalRevenue = forecast * 1.14 + day * 350;
    return {
      day,
      forecast: Math.min(forecast, 71000),
      actual: actual ? Math.min(actual, 69000) : null,
      revisedRunRate: Math.min(revisedRunRate, 75000),
      totalRevenue: Math.min(totalRevenue, 79000),
    };
  });

const data = generateChartData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-[#C7C4D8] rounded-md p-2 shadow-md min-w-[140px]">
        <p className="text-[#565E74] text-[10px] font-medium mb-1">Day {label}</p>
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex items-center gap-1.5 text-[10px] mb-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[#464555]">{entry.name}:</span>
            <span className="text-[#1B1B24] font-medium">
              ₹{(entry.value / 1000).toFixed(0)}K
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ForecastChart() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-[#C7C4D880] overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-b border-[#C7C4D84D]">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-base md:text-lg font-semibold text-[#1B1B24]">
            FORECAST VS ACTUAL GRAPH
          </h2>
          <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[#F5F2FF] text-[#3525CD] border border-[#3525CD33]">
            PHASE 1 • FROZEN MEMORY
          </span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F2FF] text-[#565E74] text-xs font-medium rounded-md border border-[#C7C4D8] hover:bg-[#EAE6F4]">
          <Calendar className="w-3 h-3" /> Freeze Forecast
        </button>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-b border-[#C7C4D833] bg-white/50">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[#565E74] text-[9px] font-medium">FORECAST MONTH</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-white border border-[#C7C4D8] rounded-md">
              <span className="text-[#1B1B24] text-xs font-normal">May, 2026</span>
              <ChevronDown className="w-2.5 h-2.5 text-[#565E74]" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#565E74] text-[9px] font-medium">HISTORICAL VIEW</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-white border border-[#C7C4D8] rounded-md">
              <span className="text-[#1B1B24] text-xs font-normal">2026-05 frozen forecast</span>
              <ChevronDown className="w-2.5 h-2.5 text-[#565E74]" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#565E74] text-[9px] font-medium">VIEW</span>
          <div className="flex bg-[#F5F2FF] rounded-md border border-[#C7C4D8] p-0.5">
            {["Daily", "Weekly", "Monthly"].map((v) => (
              <button
                key={v}
                className={`px-3 py-0.5 text-[10px] font-medium rounded ${
                  v === "Daily" ? "bg-[#3525CD] text-white" : "text-[#565E74]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2 p-4">
        <span className="text-[#565E74] text-[9px] font-medium">FILTERS</span>
        {["Equity", "Swing", "Nifty", "Commodities", "Repeat Sales"].map((f, idx) => (
          <button
            key={f}
            className={`px-2.5 py-0.5 text-[10px] font-medium rounded-full ${
              idx === 0
                ? "bg-[#3525CD] text-white"
                : "bg-[#F5F2FF] text-[#565E74] border border-[#C7C4D8]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full px-4 pb-2">
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 9, fill: "#737686" }}
              tickLine={false}
              axisLine={{ stroke: "#C7C4D8", strokeWidth: 1 }}
              domain={[1, 30]}
              ticks={[1, 5, 9, 13, 17, 21, 25, 29]}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#737686" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
              domain={[0, 80000]}
              ticks={[17000, 35000, 52000, 70000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "8px" }}
              iconType="circle"
              iconSize={8}
              formatter={(v) => <span className="text-[#464555] text-[9px]">{v}</span>}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecast Line"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="actual"
              name="Actual Line"
              stroke="#10B981"
              strokeWidth={2}
              fill="#10B98120"
              dot={{ r: 2.5, fill: "#10B981", strokeWidth: 1, stroke: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="revisedRunRate"
              name="Revised Run-rate"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              name="Total Revenue"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 4 KPI Cards – exactly as per your second image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {/* Original Target */}
        <div className="rounded-lg p-3 bg-[#F5F2FF4D] border border-[#C7C4D81A]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            <span className="text-[#565E74] text-[10px] font-semibold tracking-wide">ORIGINAL TARGET</span>
          </div>
          <div className="text-base md:text-lg font-bold text-[#1B1B24] mb-1">Rs 2,03,226</div>
          <div className="text-[9px] text-[#737686]">Stable Baseline</div>
        </div>

        {/* Revised Target */}
        <div className="rounded-lg p-3 bg-[#F5F2FF4D] border border-[#C7C4D81A]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#F97316]" />
            <span className="text-[#565E74] text-[10px] font-semibold tracking-wide">REVISED TARGET</span>
          </div>
          <div className="text-base md:text-lg font-bold text-[#1B1B24] mb-1">Rs 2,84,614</div>
          <div className="text-[9px] text-[#737686]">+40.0% Adjustment</div>
        </div>

        {/* Actual Revenue */}
        <div className="rounded-lg p-3 bg-[#F5F2FF4D] border border-[#C7C4D81A]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[#565E74] text-[10px] font-semibold tracking-wide">ACTUAL REVENUE</span>
          </div>
          <div className="text-base md:text-lg font-bold text-[#1B1B24] mb-1">Rs 26,00,020</div>
          <div className="text-[9px] text-[#737686]">MTD Cumulative</div>
        </div>

        {/* Variance */}
        <div className="rounded-lg p-3 bg-[#F5F2FF4D] border border-[#C7C4D81A]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-[#565E74] text-[10px] font-semibold tracking-wide">VARIANCE</span>
          </div>
          <div className="text-base md:text-lg font-bold text-[#EF4444] mb-1">-Rs 10,31,745</div>
          <div className="text-[9px] text-[#737686]">Critical Deficit</div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#C7C4D84D] px-4 py-2 text-right">
        <span className="text-[#777587] text-[9px] italic">Ask to edit</span>
      </div>
    </div>
  );
}
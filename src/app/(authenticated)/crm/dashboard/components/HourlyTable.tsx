"use client";

import React from "react";
import { Info, ToggleRight } from "lucide-react";

const rows = [
  {
    time: "May 14, 8 AM – 10 AM",
    leads: "300",
    contacted: "210",
    contactedPct: "70.0%",
    interested: "100",
    interestedPct: "33.3%",
    trial: "60",
    trialPct: "20.0%",
    paid: "14",
    paidPct: "4.7%",
  },
  {
    time: "10 AM – 12 PM",
    leads: "340",
    contacted: "240",
    contactedPct: "70.6%",
    interested: "130",
    interestedPct: "38.2%",
    trial: "70",
    trialPct: "20.6%",
    paid: "16",
    paidPct: "4.7%",
  },
  {
    time: "12 PM – 2 PM",
    leads: "360",
    contacted: "250",
    contactedPct: "69.4%",
    interested: "140",
    interestedPct: "38.9%",
    trial: "75",
    trialPct: "20.8%",
    paid: "18",
    paidPct: "5.0%",
  },
];

export default function HourlyFunnelData() {
  return (
    <div className="w-full bg-white rounded-2xl md:rounded-3xl border border-[#E4E1EE] shadow-sm overflow-hidden">
      {/* Header - background #F5F2FF */}
      <div className="bg-[#F5F2FF] px-4 md:px-6 py-3 md:py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#C7C4D8]">
        <div className="flex items-center gap-2">
          <h3 className="text-base md:text-lg font-bold text-[#1B1B24]">
            Hourly Funnel Data (Last 48H)
          </h3>
          <Info className="w-4 h-4 text-[#777587]" />
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-medium text-[#464555]">
            Show % Columns
          </span>
          <div className="relative">
            <ToggleRight className="w-8 h-5 md:w-10 md:h-6 text-[#3525CD]" />
          </div>
        </div>
      </div>

      {/* Table - horizontally scrollable, with proper border lines */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr className="bg-[#F5F2FF]/50 border-b border-[#C7C4D8]">
              <th className="text-left pl-4 md:pl-6 py-3 text-xs font-medium text-[#464555] w-44">
                Time (2 Hour)
              </th>
              <th className="text-right pr-4 md:pr-6 py-3 text-xs font-medium text-[#3525CD]">
                Leads Created
              </th>
              <th className="text-right pr-4 md:pr-6 py-3 text-xs font-medium text-[#3525CD]">
                Contacted
              </th>
              <th className="text-right pr-4 md:pr-6 py-3 text-xs font-medium text-[#3525CD]">
                Interested
              </th>
              <th className="text-right pr-4 md:pr-6 py-3 text-xs font-medium text-[#3525CD]">
                Trial Active
              </th>
              <th className="text-right pr-4 md:pr-6 py-3 text-xs font-medium text-[#3525CD]">
                Paid
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-[#C7C4D8] last:border-none ${
                  index === 1 ? "bg-[#3525CD0D]" : ""
                }`}
              >
                {/* Time column */}
                <td className="pl-4 md:pl-6 py-3 text-xs md:text-sm font-semibold text-[#1B1B24] align-middle">
                  {row.time}
                </td>

                {/* Leads Created – value + dash */}
                <td className="text-right pr-4 md:pr-6 py-3 align-middle">
                  <span className="text-xs md:text-sm font-semibold text-[#1B1B24]">{row.leads}</span>
                  <span className="text-xs text-[#464555] ml-1">-</span>
                </td>

                {/* Contacted – number + percentage below */}
                <td className="text-right pr-4 md:pr-6 py-3 align-middle">
                  <div className="flex flex-col items-end">
                    <span className="text-xs md:text-sm font-semibold text-[#1B1B24]">{row.contacted}</span>
                    <span className="text-[#16A34A] font-bold text-[10px] md:text-xs">{row.contactedPct}</span>
                  </div>
                </td>

                {/* Interested */}
                <td className="text-right pr-4 md:pr-6 py-3 align-middle">
                  <div className="flex flex-col items-end">
                    <span className="text-xs md:text-sm font-semibold text-[#1B1B24]">{row.interested}</span>
                    <span className="text-[#16A34A] font-bold text-[10px] md:text-xs">{row.interestedPct}</span>
                  </div>
                </td>

                {/* Trial Active */}
                <td className="text-right pr-4 md:pr-6 py-3 align-middle">
                  <div className="flex flex-col items-end">
                    <span className="text-xs md:text-sm font-semibold text-[#1B1B24]">{row.trial}</span>
                    <span className="text-[#16A34A] font-bold text-[10px] md:text-xs">{row.trialPct}</span>
                  </div>
                </td>

                {/* Paid */}
                <td className="text-right pr-4 md:pr-6 py-3 align-middle">
                  <div className="flex flex-col items-end">
                    <span className="text-xs md:text-sm font-semibold text-[#1B1B24]">{row.paid}</span>
                    <span className="text-[#16A34A] font-bold text-[10px] md:text-xs">{row.paidPct}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom gradient bar (as per image) */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    </div>
  );
}
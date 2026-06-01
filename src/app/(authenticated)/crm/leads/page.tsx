"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { Search, Calendar, Tag, Gauge, ChevronDown } from "lucide-react";

const leads = [
  { id: "#US-9210", name: "Rahul Sharma", role: "Bank Nifty Trader", score: 92, stage: "Pricing Discussed", risk: "High", source: "Instagram", avatar: "grad-orange" },
  { id: "#US-7840", name: "Anjali Patel", role: "New Trader · Intraday", score: 78, stage: "Need Identified", risk: "Medium", source: "Webinar", avatar: "grad-pink" },
  { id: "#US-9150", name: "Vikram Kumar", role: "Swing Trader", score: 91, stage: "Payment Pending", risk: "Critical", source: "Referral", avatar: "grad-cyan" },
  { id: "#US-6321", name: "Pooja Singh", role: "Options Trader", score: 84, stage: "Demo Scheduled", risk: "High", source: "Facebook", avatar: "grad-lavender" },
  { id: "#US-5410", name: "Raj Malhotra", role: "Beginner", score: 65, stage: "Contacted", risk: "Low", source: "Organic", avatar: "grad-mint" },
  { id: "#US-8842", name: "Aarav Gupta", role: "Algo Trader", score: 88, stage: "Proposal Sent", risk: "High", source: "Instagram", avatar: "grad-purple" },
  { id: "#US-4023", name: "Neha Kapoor", role: "Commodities", score: 72, stage: "Interested", risk: "Medium", source: "Referral", avatar: "grad-orange" },
];

const riskStyle = (r: string) =>
  r === "Critical"
    ? "bg-rose-100 text-rose-700"
    : r === "High"
    ? "bg-orange-100 text-orange-700"
    : r === "Medium"
    ? "bg-amber-100 text-amber-700"
    : "bg-emerald-100 text-emerald-700";

function FilterChip({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 h-9 pl-2.5 pr-3 rounded-xl border border-border bg-card">
      <Icon className="size-3.5 text-muted-foreground" />
      <span className="text-[10px] font-bold tracking-wider text-muted-foreground">{label}</span>
      <span className="text-[12px] font-semibold">{value}</span>
      <ChevronDown className="size-3.5 text-muted-foreground" />
    </div>
  );
}

export default function LeadsPage() {
  return (
    <CrmLayout>
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[18px] font-bold">Hot Leads</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">High-intent prospects ranked by score and drop-risk</p>
          </div>
          <div className="relative w-72">
            <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search leads..."
              className="w-full h-10 pl-10 pr-4 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <FilterChip icon={Calendar} label="DATE" value="05/08/2026 → 05/14/2026" />
          <FilterChip icon={Tag} label="TAGS" value="All" />
          <FilterChip icon={Gauge} label="LEAD SCORE" value="All" />
          <button className="ml-auto h-9 px-4 rounded-xl text-[12px] font-semibold bg-primary text-primary-foreground">
            Apply
          </button>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary/60 text-muted-foreground text-[10px] font-bold tracking-wider">
                {["USER ID", "LEAD", "SCORE", "FUNNEL STAGE", "DROP RISK", "SOURCE", "ACCESS"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-border hover:bg-secondary/30 transition">
                  <td className="px-5 py-4 font-mono text-[12px] text-muted-foreground">{l.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-full ${l.avatar} flex items-center justify-center text-white text-[11px] font-bold`}>
                        {l.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold">{l.name}</div>
                        <div className="text-[11px] text-muted-foreground">{l.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full grad-mint" style={{ width: `${l.score}%` }} />
                      </div>
                      <span className="font-semibold">{l.score}<span className="text-muted-foreground text-[10px]">/100</span></span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[12px] px-2.5 py-1 rounded-lg bg-secondary font-medium">{l.stage}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${riskStyle(l.risk)}`}>{l.risk}</span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{l.source}</td>
                  <td className="px-5 py-4">
                    <button className="h-8 px-3 rounded-xl text-[11px] font-semibold bg-primary text-primary-foreground hover:opacity-90">
                      Give Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-[12px]">
          <span className="text-muted-foreground">Showing 1–7 of 142</span>
          <div className="flex items-center gap-1">
            <button className="h-8 px-3 rounded-lg border border-border bg-card">Prev</button>
            <span className="text-muted-foreground px-2">Page 1 of 21</span>
            <button className="h-8 px-3 rounded-lg border border-border bg-card">Next</button>
          </div>
        </div>
      </div>
    </CrmLayout>
  );
}

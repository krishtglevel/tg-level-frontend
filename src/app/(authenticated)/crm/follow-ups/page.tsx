"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { Phone, MessageSquare, Search, Calendar, Tag, Gauge, ChevronDown } from "lucide-react";

const rows = [
  { id: "#US-9210", name: "Rahul Sharma", role: "Bank Nifty Trader", score: 92, stage: "Pricing Discussed", risk: "High", src: "Instagram", avatar: "grad-orange" },
  { id: "#US-7840", name: "Anjali Patel", role: "New Trader · Intraday", score: 78, stage: "Need Identified", risk: "Medium", src: "Webinar", avatar: "grad-pink" },
  { id: "#US-9150", name: "Vikram Kumar", role: "Swing Trader", score: 91, stage: "Payment Pending", risk: "Critical", src: "Referral", avatar: "grad-cyan" },
  { id: "#US-6321", name: "Pooja Singh", role: "Options Trader", score: 84, stage: "Demo Scheduled", risk: "High", src: "Facebook", avatar: "grad-lavender" },
  { id: "#US-5410", name: "Raj Malhotra", role: "Beginner", score: 65, stage: "Contacted", risk: "Low", src: "Organic", avatar: "grad-mint" },
  { id: "#US-8842", name: "Aarav Gupta", role: "Algo Trader", score: 88, stage: "Proposal Sent", risk: "High", src: "Instagram", avatar: "grad-purple" },
];

const riskStyle = (r: string) =>
  r === "Critical" ? "bg-rose-100 text-rose-700"
  : r === "High" ? "bg-orange-100 text-orange-700"
  : r === "Medium" ? "bg-amber-100 text-amber-700"
  : "bg-emerald-100 text-emerald-700";

function Chip({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 h-9 pl-2.5 pr-3 rounded-xl border border-border bg-card">
      <Icon className="size-3.5 text-muted-foreground" />
      <span className="text-[10px] font-bold tracking-wider text-muted-foreground">{label}</span>
      <span className="text-[12px] font-semibold">{value}</span>
      <ChevronDown className="size-3.5 text-muted-foreground" />
    </div>
  );
}

export default function FollowUpsPage() {
  return (
    <CrmLayout>
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[18px] font-bold">Follow-ups</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">Leads awaiting your next touchpoint</p>
          </div>
          <div className="relative w-72">
            <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search leads..." className="w-full h-10 pl-10 pr-4 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <Chip icon={Calendar} label="DATE" value="05/08/2026 → 05/14/2026" />
          <Chip icon={Tag} label="TAGS" value="All" />
          <Chip icon={Gauge} label="LEAD SCORE" value="All" />
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary/60 text-muted-foreground text-[10px] font-bold tracking-wider">
                {["USER ID", "LEAD", "SCORE", "STAGE", "DROP RISK", "SOURCE", "ACTIONS"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((l, i) => (
                <tr key={i} className="border-t border-border hover:bg-secondary/30">
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
                  <td className="px-5 py-4 font-semibold">{l.score}<span className="text-muted-foreground text-[10px]">/100</span></td>
                  <td className="px-5 py-4"><span className="text-[12px] px-2.5 py-1 rounded-lg bg-secondary font-medium">{l.stage}</span></td>
                  <td className="px-5 py-4"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${riskStyle(l.risk)}`}>{l.risk}</span></td>
                  <td className="px-5 py-4 text-muted-foreground">{l.src}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button className="size-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent">
                        <Phone className="size-4 text-emerald-600" />
                      </button>
                      <button className="size-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent">
                        <MessageSquare className="size-4 text-primary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CrmLayout>
  );
}

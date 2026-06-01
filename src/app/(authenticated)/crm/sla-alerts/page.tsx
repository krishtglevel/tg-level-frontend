"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { Phone, MessageSquare, AlertCircle, Clock, ArrowLeftRight, TrendingDown } from "lucide-react";

const alerts = [
  { icon: AlertCircle, iconCls: "text-rose-600 bg-rose-50",
    type: "Payment Pending · 72H", status: "OVERDUE", statusCls: "bg-rose-100 text-rose-700",
    lead: "Vikram Kumar", subLead: "Enterprise Plan", avatar: "grad-cyan",
    rule: "Payment Pending > 48h", time: "12 May 2025, 10:30 AM", priority: "HIGH" },
  { icon: AlertCircle, iconCls: "text-rose-600 bg-rose-50",
    type: "No Response · 24H", status: "OVERDUE", statusCls: "bg-rose-100 text-rose-700",
    lead: "Anjali Patel", subLead: "Last: 12 May 2025", avatar: "grad-pink",
    rule: "No Response 24h", time: "13 May 2025, 09:15 AM", priority: "MEDIUM" },
  { icon: Clock, iconCls: "text-amber-600 bg-amber-50",
    type: "Trial Expiry Reminder", status: "DUE SOON", statusCls: "bg-amber-100 text-amber-700",
    lead: "Pooja Singh", subLead: "Expires: 14 May", avatar: "grad-lavender",
    rule: "Trial Expiry Reminder", time: "10h 30m", priority: "MEDIUM" },
  { icon: ArrowLeftRight, iconCls: "text-sky-600 bg-sky-50",
    type: "Follow-up Overdue", status: "DUE SOON", statusCls: "bg-sky-100 text-sky-700",
    lead: "Raj Malhotra", subLead: "Standard Plan", avatar: "grad-mint",
    rule: "Follow-up Overdue", time: "5h 10m", priority: "LOW" },
  { icon: TrendingDown, iconCls: "text-purple-600 bg-purple-50",
    type: "Funnel Drop Risk", status: "RISK", statusCls: "bg-purple-100 text-purple-700",
    lead: "Aarav Gupta", subLead: "Proposal Sent", avatar: "grad-purple",
    rule: "Funnel Drop Risk", time: "Since 6 May (9d overdue)", priority: "HIGH" },
];

const prioCls = (p: string) =>
  p === "HIGH" ? "bg-rose-100 text-rose-700" : p === "MEDIUM" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700";

export default function SlaPage() {
  return (
    <CrmLayout>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Overdue", v: 12, color: "grad-pink" },
          { label: "Due Soon", v: 8, color: "grad-orange" },
          { label: "Risk", v: 5, color: "grad-lavender" },
          { label: "Resolved Today", v: 23, color: "grad-mint" },
        ].map((s) => (
          <div key={s.label} className="card-elevated p-4 flex items-center gap-4">
            <div className={`${s.color} size-12 rounded-2xl flex items-center justify-center text-white font-bold`}>
              {s.v}
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground font-semibold tracking-wider">{s.label.toUpperCase()}</div>
              <div className="text-[15px] font-bold">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[18px] font-bold">SLA Alerts</h2>
          <div className="flex gap-1.5">
            {["All", "Overdue", "Due Soon", "Risk"].map((t, i) => (
              <button key={t} className={`h-8 px-3 rounded-lg text-[11px] font-semibold ${i === 0 ? "bg-foreground text-background" : "border border-border bg-card text-muted-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary/60 text-muted-foreground text-[10px] font-bold tracking-wider">
                {["TYPE", "LEAD", "SLA RULE", "TRIGGERED / DUE", "PRIORITY", "ACTIONS"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alerts.map((a, i) => {
                const Icon = a.icon;
                return (
                  <tr key={i} className="border-t border-border hover:bg-secondary/30">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className={`size-9 rounded-xl flex items-center justify-center ${a.iconCls}`}>
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <div className="font-semibold">{a.type}</div>
                          <span className={`mt-1 inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md ${a.statusCls}`}>
                            {a.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-full ${a.avatar} flex items-center justify-center text-white text-[10px] font-bold`}>
                          {a.lead.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-semibold">{a.lead}</div>
                          <div className="text-[11px] text-muted-foreground">{a.subLead}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{a.rule}</td>
                    <td className="px-5 py-4 font-medium">{a.time}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md ${prioCls(a.priority)}`}>
                        {a.priority}
                      </span>
                    </td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </CrmLayout>
  );
}

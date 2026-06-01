"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { Phone, MessageSquare, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";

const calls = [
  { id: "#US-9210", name: "Rahul Sharma", phone: "+91 98765 43210", type: "out", dur: "05:32", date: "Today · 11:15 AM", agent: "Amit S.", team: "Team A", outcome: "Interested", outCls: "bg-emerald-100 text-emerald-700", tag: "Hot Lead", avatar: "grad-orange" },
  { id: "#US-7840", name: "Anjali Patel", phone: "+91 99876 11122", type: "in", dur: "02:14", date: "Today · 10:48 AM", agent: "Neha K.", team: "Team B", outcome: "Will Think", outCls: "bg-amber-100 text-amber-700", tag: "Warm", avatar: "grad-pink" },
  { id: "#US-9150", name: "Vikram Kumar", phone: "+91 90909 12345", type: "missed", dur: "—", date: "Today · 10:22 AM", agent: "Rohit V.", team: "Team A", outcome: "No Pickup", outCls: "bg-rose-100 text-rose-700", tag: "Follow-up", avatar: "grad-cyan" },
  { id: "#US-6321", name: "Pooja Singh", phone: "+91 91111 33344", type: "out", dur: "07:48", date: "Today · 09:45 AM", agent: "Amit S.", team: "Team A", outcome: "Converted", outCls: "bg-emerald-100 text-emerald-700", tag: "Paid", avatar: "grad-lavender" },
  { id: "#US-5410", name: "Raj Malhotra", phone: "+91 93232 22221", type: "out", dur: "03:11", date: "Today · 09:20 AM", agent: "Neha K.", team: "Team B", outcome: "Not Interested", outCls: "bg-rose-100 text-rose-700", tag: "Cold", avatar: "grad-mint" },
  { id: "#US-8842", name: "Aarav Gupta", phone: "+91 94444 55667", type: "in", dur: "06:09", date: "Yesterday · 6:11 PM", agent: "Rohit V.", team: "Team A", outcome: "Demo Booked", outCls: "bg-sky-100 text-sky-700", tag: "Hot Lead", avatar: "grad-purple" },
];

const callIcon = (t: string) =>
  t === "in" ? <PhoneIncoming className="size-4 text-emerald-600" />
  : t === "out" ? <PhoneOutgoing className="size-4 text-primary" />
  : <PhoneMissed className="size-4 text-rose-600" />;

export default function CallLogsPage() {
  return (
    <CrmLayout>
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[18px] font-bold">Call Logs</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">Detailed history of inbound and outbound calls</p>
          </div>
          <div className="flex gap-1.5">
            {["All", "Inbound", "Outbound", "Missed"].map((t, i) => (
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
                {["USER ID", "CONTACT", "TYPE", "DURATION", "DATE & TIME", "AGENT (TEAM)", "OUTCOME", "TAG", "ACTIONS"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calls.map((c, i) => (
                <tr key={i} className="border-t border-border hover:bg-secondary/30">
                  <td className="px-5 py-4 font-mono text-[12px] text-muted-foreground">{c.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-full ${c.avatar} flex items-center justify-center text-white text-[11px] font-bold`}>
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground">{c.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="size-8 rounded-lg bg-secondary flex items-center justify-center">{callIcon(c.type)}</div>
                  </td>
                  <td className="px-5 py-4 font-mono">{c.dur}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.date}</td>
                  <td className="px-5 py-4">
                    <div className="font-semibold">{c.agent}</div>
                    <div className="text-[11px] text-muted-foreground">{c.team}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${c.outCls}`}>{c.outcome}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[11px] font-medium px-2 py-1 rounded-md bg-secondary">{c.tag}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button className="size-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent">
                        <MessageSquare className="size-4 text-primary" />
                      </button>
                      <button className="size-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent">
                        <Phone className="size-4 text-emerald-600" />
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

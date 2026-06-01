"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";

const board = [
  { rank: 1, name: "Amit Sharma", team: "Team A", conv: "₹18.4L", deals: 42, score: 968, grad: "grad-orange" },
  { rank: 2, name: "Neha Kapoor", team: "Team B", conv: "₹15.1L", deals: 38, score: 901, grad: "grad-pink" },
  { rank: 3, name: "Rohit Verma", team: "Team A", conv: "₹13.9L", deals: 35, score: 884, grad: "grad-cyan" },
  { rank: 4, name: "Sandeep R.", team: "Team C", conv: "₹11.2L", deals: 30, score: 812, grad: "grad-lavender" },
  { rank: 5, name: "Pooja Singh", team: "Team B", conv: "₹9.6L",  deals: 27, score: 768, grad: "grad-mint" },
];

export default function LeadershipPage() {
  return (
    <CrmLayout showSubNav={false}>
      <div className="card-elevated p-6">
        <h2 className="text-[18px] font-bold mb-1">Leadership Hub</h2>
        <p className="text-[12px] text-muted-foreground mb-5">Top performers this week</p>
        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary/60 text-muted-foreground text-[10px] font-bold tracking-wider">
                {["RANK", "AGENT", "TEAM", "CONVERTED", "DEALS", "SCORE"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {board.map((r) => (
                <tr key={r.rank} className="border-t border-border">
                  <td className="px-5 py-4">
                    <div className={`size-8 rounded-xl ${r.rank <= 3 ? "grad-orange" : "bg-secondary"} ${r.rank <= 3 ? "text-white" : "text-foreground"} flex items-center justify-center text-[12px] font-bold`}>
                      {r.rank}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-full ${r.grad} flex items-center justify-center text-white text-[11px] font-bold`}>
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-semibold">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{r.team}</td>
                  <td className="px-5 py-4 font-bold">{r.conv}</td>
                  <td className="px-5 py-4">{r.deals}</td>
                  <td className="px-5 py-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-primary/10 text-primary">{r.score}</span>
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

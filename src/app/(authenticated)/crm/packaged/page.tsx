"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";

const plans = [
  { name: "Starter", price: "₹4,999", users: "1 trader", color: "grad-cyan", features: ["Daily signals", "Community access", "1 strategy"] },
  { name: "Pro", price: "₹12,999", users: "Most popular", color: "grad-purple", features: ["All starter", "3 strategies", "Live mentoring", "Weekly review"] },
  { name: "Enterprise", price: "₹29,999", users: "Teams 5+", color: "grad-orange", features: ["All pro", "Dedicated coach", "Custom strategy", "Priority support"] },
];

export default function PackagedPage() {
  return (
    <CrmLayout showSubNav={false}>
      <div className="text-center py-2">
        <h2 className="text-[22px] font-bold">Packaged Plans</h2>
        <p className="text-[13px] text-muted-foreground mt-1">Tier offerings synced with finance & marketing</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {plans.map((p) => (
          <div key={p.name} className="card-elevated p-6">
            <div className={`inline-flex h-7 px-3 rounded-full ${p.color} text-white text-[11px] font-bold items-center`}>
              {p.name}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-[32px] font-bold">{p.price}</span>
              <span className="text-[12px] text-muted-foreground">/ quarter</span>
            </div>
            <div className="text-[12px] text-muted-foreground">{p.users}</div>
            <ul className="mt-5 space-y-2 text-[13px]">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" /> {f}
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full h-11 rounded-2xl bg-primary text-primary-foreground font-semibold">
              Manage Plan
            </button>
          </div>
        ))}
      </div>
    </CrmLayout>
  );
}

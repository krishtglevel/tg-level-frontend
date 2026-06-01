"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { Trophy, Flame, Star, Zap, Target, Award } from "lucide-react";

const badges = [
  { icon: Trophy, name: "Top Closer", desc: "10+ conversions this week", grad: "grad-orange", earned: true },
  { icon: Flame, name: "Hot Streak", desc: "5 consecutive deals", grad: "grad-pink", earned: true },
  { icon: Star, name: "Customer Hero", desc: "100% CSAT 30 days", grad: "grad-lavender", earned: true },
  { icon: Zap, name: "Speed Demon", desc: "< 5 min first response", grad: "grad-cyan", earned: false },
  { icon: Target, name: "Sniper", desc: "90%+ pitch-to-paid", grad: "grad-mint", earned: false },
  { icon: Award, name: "Quarter MVP", desc: "Top 1% in Q2", grad: "grad-purple", earned: false },
];

export default function BadgesPage() {
  return (
    <CrmLayout showSubNav={false}>
      <div className="card-elevated p-6">
        <h2 className="text-[18px] font-bold mb-1">Agent Badges</h2>
        <p className="text-[12px] text-muted-foreground mb-6">Earn recognition for performance milestones</p>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.name} className={`card-elevated p-5 ${!b.earned ? "opacity-60" : ""}`}>
                <div className={`size-14 rounded-2xl ${b.grad} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="size-7" />
                </div>
                <div className="mt-4 font-bold text-[15px]">{b.name}</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">{b.desc}</div>
                <div className="mt-3 text-[11px] font-semibold">
                  {b.earned ? <span className="text-emerald-600">✓ Earned</span> : <span className="text-muted-foreground">Locked</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CrmLayout>
  );
}

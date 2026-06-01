import * as React from "react";
import { Sparkles, Zap } from "lucide-react";

export default function IntelligencePanel() {
  const items = [
    { label: "MTD Actual", v: 45, color: "#7C3AED", amount: "₹2.45 Cr" },
    { label: "Remaining", v: 44, color: "#22D3EE", amount: "₹2.38 Cr" },
    { label: "Revenue Gap", v: 11, color: "#FB923C", amount: "₹58.0 L" },
  ];
  let cum = 0;
  const r = 64;
  const c = 2 * Math.PI * r;

  return (
    <div className="card-elevated p-6 flex flex-col">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <h3 className="text-[15px] font-bold">Forecast vs Actual Intelligence</h3>
      </div>
      <p className="text-[12px] text-muted-foreground mt-1">Real-time revenue distribution</p>

      <div className="relative mt-4 self-center">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <g transform="translate(90,90) rotate(-90)">
            {items.map((s) => {
              const dash = (s.v / 100) * c;
              const el = (
                <circle
                  key={s.label}
                  r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="22"
                  strokeDasharray={`${dash} ${c - dash}`}
                  strokeDashoffset={-cum}
                  strokeLinecap="butt"
                />
              );
              cum += dash;
              return el;
            })}
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] text-muted-foreground font-semibold">TOTAL TARGET</div>
          <div className="text-[20px] font-bold leading-tight">₹5.42 Cr</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm" style={{ background: s.color }} />
              <span className="text-muted-foreground">{s.label}</span>
            </div>
            <div className="font-semibold">
              {s.amount} <span className="text-muted-foreground font-normal">({s.v}%)</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-primary/5 border border-primary/15 p-3">
        <div className="text-[10px] font-bold tracking-wider text-primary flex items-center gap-1">
          <Zap className="size-3" /> AI RECOVERY POTENTIAL
        </div>
        <div className="text-[18px] font-bold mt-0.5">₹64,75,600</div>
        <div className="space-y-1 mt-2 text-[11px]">
          {[
            ["Payment Pending", "87 leads", "₹32.4L"],
            ["Demo Unseen", "97 leads", "₹18.2L"],
            ["Hot Leads", "64 leads", "₹14.1L"],
          ].map(([a, b, c]) => (
            <div key={a} className="flex justify-between">
              <span className="text-foreground/80">{a}</span>
              <span className="text-muted-foreground">
                {b} · <span className="font-semibold text-foreground">{c}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

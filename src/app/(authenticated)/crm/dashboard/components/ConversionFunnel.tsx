import * as React from "react";
import { AlertTriangle } from "lucide-react";

export default function ConversionFunnel() {
  const data = [
    { label: "Leads", current: 48720, prev: 23480, color: "grad-purple" },
    { label: "Contacted", current: 23480, prev: 11230, color: "grad-cyan" },
    { label: "Interested", current: 11230, prev: 3520, color: "grad-lavender" },
    { label: "Trial", current: 3520, prev: 1240, color: "grad-orange" },
    { label: "Intent", current: 1240, prev: 360, color: "grad-pink" },
    { label: "Paid", current: 360, prev: 132, color: "grad-mint" },
  ];
  const max = Math.max(...data.map((d) => d.current));

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-bold">Conversion Funnel Analysis</h3>
          <p className="text-[12px] text-muted-foreground mt-1">
            Last 48 Hours · 14 May – 15 May 2025
          </p>
        </div>
        <div className="flex gap-1.5">
          {["Count", "Conversion %", "Drop %", "Velocity"].map((t, i) => (
            <button
              key={t}
              className={`h-8 px-3 rounded-lg text-[11px] font-semibold ${
                i === 0
                  ? "bg-foreground text-background"
                  : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mt-6">
        {data.map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-2">
            <div className="h-44 w-full flex items-end justify-center gap-2">
              <div
                className={`${d.color} rounded-t-xl w-7`}
                style={{ height: `${(d.current / max) * 100}%` }}
                title={`${d.current}`}
              />
              <div
                className="bg-border rounded-t-xl w-7"
                style={{ height: `${(d.prev / max) * 100}%` }}
                title={`${d.prev}`}
              />
            </div>
            <div className="text-[12px] font-bold">{d.current.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground">{d.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded grad-purple" /> Current Period
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded bg-border" /> Previous Baseline
        </div>
        <div className="ml-auto rounded-xl bg-destructive/10 text-destructive px-3 py-1.5 text-[11px] font-semibold inline-flex items-center gap-2">
          <AlertTriangle className="size-3.5" /> Performance Gap: -8,770 vs target 20,000
        </div>
      </div>
    </div>
  );
}

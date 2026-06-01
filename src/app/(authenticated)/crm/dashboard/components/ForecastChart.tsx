import * as React from "react";

export default function ForecastChart() {
  const w = 720;
  const h = 260;
  const days = 30;
  const forecast = Array.from({ length: days }, (_, i) => 30 + i * 4 + Math.sin(i / 2) * 6);
  const actual = Array.from({ length: days }, (_, i) =>
    i < 20 ? 28 + i * 4.4 + Math.cos(i / 3) * 8 : null
  );
  const revised = Array.from({ length: days }, (_, i) => 35 + i * 5.2);

  const maxY = 200;
  const x = (i: number) => (i / (days - 1)) * (w - 60) + 50;
  const y = (v: number) => h - 30 - (v / maxY) * (h - 60);

  const path = (arr: (number | null)[]) =>
    arr
      .map((v, i) => (v == null ? null : `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`))
      .filter(Boolean)
      .join(" ");

  return (
    <div className="col-span-2 card-elevated p-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-bold">Forecast vs Actual</h3>
            <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">
              PHASE 1 · FROZEN MEMORY
            </span>
          </div>
          <p className="text-[12px] text-muted-foreground mt-1">May 2026 · Daily view</p>
        </div>
        <button className="h-8 px-3 rounded-lg text-[11px] font-semibold border border-border bg-card hover:bg-accent">
          Freeze Forecast
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {["Equity", "Swing", "Nifty", "Commodities", "Repeat Sales"].map((t, i) => (
          <span
            key={t}
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
              i === 0
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full mt-4">
        <defs>
          <linearGradient id="fillActual" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={50}
            x2={w - 10}
            y1={30 + i * 50}
            y2={30 + i * 50}
            stroke="oklch(0.92 0.01 255)"
            strokeDasharray="3 4"
          />
        ))}
        <path
          d={`${path(actual)} L ${x(19)} ${h - 30} L ${x(0)} ${h - 30} Z`}
          fill="url(#fillActual)"
        />
        <path d={path(forecast)} stroke="#22D3EE" strokeWidth="2.5" fill="none" strokeDasharray="6 4" />
        <path d={path(revised)} stroke="#FB923C" strokeWidth="2.5" fill="none" />
        <path d={path(actual)} stroke="#7C3AED" strokeWidth="3" fill="none" />
        {actual.map((v, i) =>
          v != null ? <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#7C3AED" /> : null
        )}
      </svg>

      <div className="grid grid-cols-4 gap-3 mt-4">
        {[
          { label: "Original Target", val: "₹2,03,226", note: "Stable Baseline", grad: "grad-cyan" },
          { label: "Revised Target", val: "₹2,84,614", note: "+40.0% Adjustment", grad: "grad-orange" },
          { label: "Actual Revenue", val: "₹26,00,020", note: "MTD Cumulative", grad: "grad-mint" },
          { label: "Variance", val: "-₹10,31,745", note: "Critical Deficit", grad: "grad-pink" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-3 border border-border bg-secondary/60">
            <div className={`size-2 rounded-full ${s.grad}`} />
            <div className="text-[10px] font-bold tracking-wider text-muted-foreground mt-2">
              {s.label}
            </div>
            <div className="text-[16px] font-bold mt-1">{s.val}</div>
            <div className="text-[10px] text-muted-foreground">{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

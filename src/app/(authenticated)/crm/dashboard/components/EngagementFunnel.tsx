import * as React from "react";
import { Activity, TrendingUp } from "lucide-react";

export default function EngagementFunnel() {
  const flow = [
    ["Trial Started", 100, 22.4],
    ["Community Joined", 77.6, 22.2],
    ["Viewed Trades", 60.4, 24.7],
    ["Engaged In Poll", 45.5, 22.7],
    ["Asked Questions", 35.2, 30.3],
    ["Viewed Pricing", 24.5, 56.3],
    ["Payment Intent", 10.5, 58.6],
    ["Paid", 4.4, 0],
  ] as const;
  const dist = [
    ["90–100 Highly Engaged", 1120, "grad-mint"],
    ["70–89 Engaged", 2130, "grad-cyan"],
    ["40–69 Moderate", 2260, "grad-lavender"],
    ["20–39 Low", 800, "grad-orange"],
    ["0–19 Not Engaged", 1400, "grad-pink"],
  ] as const;

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-2 mb-1">
        <Activity className="size-4 text-primary" />
        <h3 className="text-[16px] font-bold">Engagement Funnel (Last 48H)</h3>
      </div>
      <p className="text-[12px] text-muted-foreground mb-4">Drop-off by behavioral stage</p>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-2">
          {flow.map(([label, val, drop]) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-32 text-[12px] font-semibold">{label}</div>
              <div className="flex-1 h-7 rounded-lg bg-secondary overflow-hidden">
                <div
                  className="h-full grad-purple flex items-center px-3 text-white text-[11px] font-semibold"
                  style={{ width: `${val}%` }}
                >
                  {val}%
                </div>
              </div>
              {drop > 0 && (
                <div className="w-20 text-right text-[11px] text-destructive font-semibold">
                  ▼ {drop}%
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="card-elevated p-4 flex items-center gap-4">
            <div className="relative size-24">
              <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
                <circle cx="50" cy="50" r="42" stroke="oklch(0.93 0.01 255)" strokeWidth="10" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#engGrad)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(68 / 100) * 264} 264`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="engGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#7C3AED" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[20px] font-bold">68</div>
                <div className="text-[9px] text-muted-foreground">/ 100</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-wider text-muted-foreground">AVG SCORE</div>
              <div className="text-[13px] font-semibold mt-1">Moderately Engaged</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
                <TrendingUp className="size-3" /> +4.2 pts
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {dist.map(([label, count, color]) => (
              <div key={label} className="flex items-center gap-2 text-[11px]">
                <span className={`size-2.5 rounded-sm ${color}`} />
                <span className="flex-1 text-foreground/80">{label}</span>
                <span className="font-semibold">{count.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="card-elevated p-3 mt-3">
            <div className="text-[10px] font-bold tracking-wider text-muted-foreground">ENGAGEMENT TREND</div>
            <svg viewBox="0 0 200 60" className="w-full mt-1">
              <path
                d="M0,40 L30,32 L60,36 L90,22 L120,28 L150,16 L180,20 L200,12"
                stroke="#7C3AED"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M0,48 L30,42 L60,45 L90,38 L120,40 L150,32 L180,34 L200,28"
                stroke="#22D3EE"
                strokeWidth="2"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

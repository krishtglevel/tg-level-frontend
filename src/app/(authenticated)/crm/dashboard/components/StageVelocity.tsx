import * as React from "react";
import { Clock } from "lucide-react";

export default function StageVelocity() {
  const stages = [
    { name: "Leads Entered", v: "8,250", t: "5m", status: "Fast", color: "grad-purple" },
    { name: "Assigned", v: "8,120", t: "7m", status: "Fast", color: "grad-cyan" },
    { name: "Contacted", v: "7,650", t: "45m", status: "Moderate", color: "grad-lavender" },
    { name: "Trial Started", v: "4,980", t: "7h 45m", status: "Slow", color: "grad-orange" },
    { name: "Active in Trial", v: "2,450", t: "3h 15m", status: "Moderate", color: "grad-pink" },
    { name: "Payment Intent", v: "760", t: "1h 10m", status: "Fast", color: "grad-mint" },
    { name: "Paid", v: "360", t: "—", status: "Fast", color: "grad-purple" },
  ];
  const dist = [
    { label: "< 2 Hours", v: 8.6 },
    { label: "2 – 6 Hours", v: 22.4 },
    { label: "6 – 12 Hours", v: 31.7 },
    { label: "12 – 24 Hours", v: 24.3 },
    { label: "> 24 Hours", v: 13.0 },
  ];
  const statusColor = (s: string) =>
    s === "Fast" ? "text-emerald-600 bg-emerald-50" : s === "Moderate" ? "text-amber-700 bg-amber-50" : "text-rose-700 bg-rose-50";

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="size-4 text-primary" />
        <h3 className="text-[16px] font-bold">Stage Velocity Flow (Last 48H)</h3>
      </div>
      <div className="grid grid-cols-7 gap-3">
        {stages.map((s) => (
          <div key={s.name} className="card-elevated p-3">
            <div className={`${s.color} h-1.5 w-10 rounded-full`} />
            <div className="text-[18px] font-bold mt-2">{s.v}</div>
            <div className="text-[11px] text-muted-foreground">{s.name}</div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${statusColor(s.status)}`}>
                {s.status}
              </span>
              <span className="text-[10px] text-muted-foreground">{s.t}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-secondary/60 text-muted-foreground text-[10px] font-bold tracking-wider">
                {["Journey", "Avg Time", "vs Prev 48H", "Status"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Lead → Assigned", "5m", "▼ 1m (16.7%)", "Excellent"],
                ["Assigned → Contacted", "7m", "▼ 2m (22.2%)", "Excellent"],
                ["Contacted → Trial", "45m", "▲ 5m (12.5%)", "Good"],
                ["Trial → Active", "7h 45m", "▲ 2h 10m", "Poor"],
                ["Active → Intent", "3h 15m", "▲ 40m", "Average"],
                ["Intent → Paid", "1h 10m", "▼ 10m", "Good"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-3 py-2.5 font-semibold">{r[0]}</td>
                  <td className="px-3 py-2.5">{r[1]}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{r[2]}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                        r[3] === "Excellent"
                          ? "bg-emerald-50 text-emerald-700"
                          : r[3] === "Good"
                          ? "bg-sky-50 text-sky-700"
                          : r[3] === "Average"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {r[3]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="text-[12px] font-bold mb-2">Stage Time Distribution — Trial Phase</div>
          <div className="text-[11px] text-muted-foreground mb-3">Avg time: 7h 45m</div>
          <div className="space-y-2.5">
            {dist.map((d, i) => (
              <div key={d.label}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>{d.label}</span>
                  <span className="font-semibold">{d.v}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={["grad-purple", "grad-cyan", "grad-lavender", "grad-orange", "grad-pink"][i]}
                    style={{ width: `${d.v * 3}%`, height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

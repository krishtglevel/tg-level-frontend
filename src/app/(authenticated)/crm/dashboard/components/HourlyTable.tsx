import * as React from "react";

export default function HourlyTable() {
  const rows = [
    ["May 14, 8 AM – 10 AM", 300, [210, 70], [100, 33.3], [60, 20], [14, 4.7]],
    ["10 AM – 12 PM", 340, [240, 70.6], [130, 38.2], [70, 20.6], [16, 4.7]],
    ["12 PM – 2 PM", 360, [250, 69.4], [140, 38.9], [75, 20.8], [18, 5.0]],
    ["2 PM – 4 PM", 320, [225, 70.3], [120, 37.5], [68, 21.3], [15, 4.7]],
    ["4 PM – 6 PM", 280, [200, 71.4], [110, 39.3], [62, 22.1], [13, 4.6]],
  ] as const;

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-bold">Hourly Funnel Data (Last 48H)</h3>
        <label className="text-[11px] text-muted-foreground flex items-center gap-2">
          Show % columns
          <span className="relative inline-flex h-5 w-9 rounded-full bg-primary">
            <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow" />
          </span>
        </label>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-secondary/60 text-muted-foreground text-[10px] font-bold tracking-wider">
              {["Time (2H)", "Leads", "Contacted", "Interested", "Trial Active", "Paid"].map((h) => (
                <th key={h} className="px-4 py-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30">
                <td className="px-4 py-3 font-semibold">{r[0]}</td>
                <td className="px-4 py-3 font-medium">{r[1]}</td>
                {(r.slice(2) as [number, number][]).map(([v, p], k) => (
                  <td key={k} className="px-4 py-3">
                    <span className="font-medium">{v}</span>{" "}
                    <span className="text-muted-foreground">({p}%)</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

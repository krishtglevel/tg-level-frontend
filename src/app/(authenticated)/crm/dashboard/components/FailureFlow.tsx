import * as React from "react";

export default function FailureFlow() {
  const stages = [
    { n: "8,250", label: "Leads", drop: null, color: "grad-purple" },
    { n: "5,840", label: "Contacted", drop: "2,410", color: "grad-cyan" },
    { n: "3,430", label: "Demo Joined", drop: "2,410", color: "grad-lavender" },
    { n: "2,150", label: "Trial Started", drop: "1,280", color: "grad-orange" },
    { n: "820", label: "Payment Intent", drop: "1,330", color: "grad-pink" },
    { n: "360", label: "Paid", drop: "460", color: "grad-mint" },
  ];
  const reasons = [
    { stage: "1. Did Not Get Contacted", pct: "29.2%", items: [["No Call Made", "13.6%"], ["No Pickup", "9.5%"], ["Invalid No.", "4.4%"]] },
    { stage: "2. Contacted, No Response", pct: "42.8%", items: [["Not Interested", "24.0%"], ["Will Think Later", "13.3%"], ["No Response", "12.1%"]] },
    { stage: "3. Demo Not Joined", pct: "37.3%", items: [["No Show", "20.9%"], ["Rescheduled", "10.5%"], ["Lost Interest", "4.4%"]] },
    { stage: "4. Trial Not Activated", pct: "61.9%", items: [["Did Not Install", "24.2%"], ["Not Activated", "19.5%"], ["Need Help", "11.2%"]] },
    { stage: "5. Payment Not Completed", pct: "56.1%", items: [["Pay Link Unused", "22.0%"], ["Price Objection", "17.1%"], ["Pay Failed", "11.0%"]] },
    { stage: "6. Did Not Become Paid", pct: "44.0%", items: [["Trust Issue", "22.0%"], ["Last Min Drop", "17.1%"], ["Chose Competitor", "11.0%"]] },
  ];

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[16px] font-bold">Failure Flow · Every stage (Last 48H)</h3>
        <span className="text-[11px] text-muted-foreground">Click a stage to drill in</span>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {stages.map((s, i) => (
          <div key={s.label} className="relative">
            <div className={`${s.color} rounded-2xl p-3 text-white`}>
              <div className="text-[20px] font-bold leading-tight">{s.n}</div>
              <div className="text-[11px] font-medium text-white/85">{s.label}</div>
            </div>
            {s.drop && (
              <div className="mt-2 rounded-xl border border-destructive/30 bg-destructive/5 px-2.5 py-1.5 text-[10px] text-destructive font-semibold">
                ▼ {s.drop} dropped
              </div>
            )}
            {i < stages.length - 1 && (
              <div className="hidden lg:block absolute -right-2 top-5 text-muted-foreground/40">→</div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {reasons.map((r) => (
          <div key={r.stage} className="rounded-2xl border border-border p-3">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold">{r.stage}</div>
              <div className="text-[11px] font-bold text-destructive">{r.pct}</div>
            </div>
            <div className="mt-2 space-y-1.5">
              {r.items.map(([k, v]) => (
                <div key={k}>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                  <div className="h-1 rounded-full bg-secondary mt-1 overflow-hidden">
                    <div className="h-full grad-pink" style={{ width: v }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

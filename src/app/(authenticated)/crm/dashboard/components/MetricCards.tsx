import { MetricCard } from "@/components/ui/MetricCard";

const metrics = [
  { label: "LEADS CREATED", value: "3,250", change: "+8.7%", pct: null, up: true, grad: "grad-purple", bar: 100 },
  { label: "CONTACTED", value: "2,210", change: "+6.1%", pct: "67.9%", up: true, grad: "grad-cyan", bar: 68 },
  { label: "INTERESTED", value: "1,420", change: "-4.3%", pct: "43.7%", up: false, grad: "grad-lavender", bar: 44 },
  { label: "TRIAL ACTIVE", value: "720", change: "-8.9%", pct: "22.2%", up: false, grad: "grad-orange", bar: 22 },
  { label: "PAYMENT INTENT", value: "310", change: "-11.2%", pct: "9.5%", up: false, grad: "grad-pink", bar: 10 },
  { label: "PAID", value: "132", change: "-9.6%", pct: "4.1%", up: false, grad: "grad-mint", bar: 4 },
];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {metrics.map((m) => (
        <MetricCard
          key={m.label}
          label={m.label}
          value={m.value}
          change={m.change}
          pct={m.pct}
          up={m.up}
          grad={m.grad}
          bar={m.bar}
        />
      ))}
    </div>
  );
}

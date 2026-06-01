import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  pct?: string | null;
  up: boolean;
  grad: string;
  bar: number;
}

export function MetricCard({ label, value, change, pct, up, grad, bar }: MetricCardProps) {
  return (
    <div
      className={`${grad} rounded-3xl p-4 text-white relative overflow-hidden shadow-lg shadow-black/5`}
    >
      <div className="absolute -right-8 -top-8 size-28 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">
        <div className="text-[10px] font-bold tracking-[0.15em] text-white/85">{label}</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[26px] font-bold leading-none">{value}</span>
          {pct && <span className="text-[11px] font-semibold text-white/85">({pct})</span>}
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {up ? (
            <TrendingUp className="size-3.5 text-white" />
          ) : (
            <TrendingDown className="size-3.5 text-white" />
          )}
          <span className="text-[11px] font-semibold">{change}</span>
          <span className="text-[10px] text-white/70 ml-1">vs prev 48h</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: `${bar}%` }} />
        </div>
      </div>
    </div>
  );
}

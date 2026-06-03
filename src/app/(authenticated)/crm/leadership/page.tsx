"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilters, generateMetrics, FilterProvider } from "@/components/crm/FilterContext";
import { format } from "date-fns";

type Tab = "DAILY" | "MONTHLY" | "QUARTERLY";

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({
  initials, bg, size = "md", ring,
}: {
  initials: string; bg: string;
  size?: "sm" | "md" | "lg" | "xl"; ring?: string;
}) {
  const sizeMap = { sm: "size-9 text-[11px]", md: "size-11 text-[12px]", lg: "size-20 text-[20px]", xl: "size-28 text-[28px]" };
  return (
    <div className={cn("rounded-full flex items-center justify-center font-bold text-white shrink-0", sizeMap[size], bg, ring && `ring-4 ${ring}`)}>
      {initials}
    </div>
  );
}

// ─── Sales Metric Card ────────────────────────────────────────────────────────
interface SalesCard {
  label: string; value: number; percentage?: string;
  trend: string; positive: boolean;
  cardBg: string; dotColor: string; barColor: string; barBg: string; barWidth: string;
}

function SalesMetricCard({ m, showComparison }: { m: SalesCard; showComparison: boolean }) {
  return (
    <div className={cn("rounded-2xl p-4 flex flex-col gap-2 min-w-0 transition-all duration-500", m.cardBg)}>
      <div className="flex items-center justify-between">
        <span className={cn("size-2.5 rounded-full shrink-0", m.dotColor)} />
        {showComparison && (
          <span className={cn("text-[11px] font-bold flex items-center gap-0.5 shrink-0", m.positive ? "text-green-600" : "text-red-500")}>
            {m.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {m.trend}
          </span>
        )}
      </div>
      <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase leading-tight">
        {m.label}
      </p>
      <div className="flex items-baseline gap-1 flex-wrap">
        <span className="text-[22px] font-bold text-gray-800 leading-none">
          {m.value.toLocaleString()}
        </span>
        {m.percentage && <span className="text-[11px] text-gray-500">({m.percentage})</span>}
      </div>
      <div className={cn("h-1.5 rounded-full mt-1", m.barBg)}>
        <div className={cn("h-full rounded-full transition-all duration-700", m.barColor)} style={{ width: m.barWidth }} />
      </div>
    </div>
  );
}

// ─── Podium ───────────────────────────────────────────────────────────────────
function Podium({ leaderboard }: { leaderboard: any[] }) {
  const gold = leaderboard[0];
  const silver = leaderboard[1];
  const bronze = leaderboard[2];

  return (
    <div className="flex-1 min-w-0 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 p-6 flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-[34px] font-black tracking-tight text-gray-900">Sales Champions</h2>
        <p className="text-[14px] text-gray-500 mt-1">Celebrating this period's top revenue drivers</p>
      </div>

      <div className="flex items-end justify-center gap-0 mt-auto">
        {/* Silver #2 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <Avatar initials={silver.initials} bg={silver.avatarBg} size="lg" ring="ring-gray-300" />
            <span className="absolute -bottom-1 -right-1 size-6 rounded-md bg-gray-400 text-white text-[11px] font-black flex items-center justify-center shadow">2</span>
          </div>
          <p className="font-black text-[16px] text-gray-900 text-center">{silver.name}</p>
          <p className="text-[15px] font-bold text-blue-600">{silver.revenue}</p>
          <p className="text-[10px] font-semibold text-gray-500 tracking-wider mb-3">{silver.progress}% OF TARGET</p>
          <div className="w-36 rounded-t-lg flex items-center justify-center" style={{ height: 120, background: "linear-gradient(180deg,#e8e8e8 0%,#b0b0b0 50%,#d0d0d0 100%)" }}>
            <span className="text-[22px] font-black tracking-[0.25em] text-gray-600/80">SILVER</span>
          </div>
        </div>

        {/* Gold #1 */}
        <div className="flex flex-col items-center z-10">
          <div className="relative mb-3">
            <Avatar initials={gold.initials} bg={gold.avatarBg} size="xl" ring="ring-yellow-400" />
            <span className="absolute -bottom-1 -right-1 size-7 rounded-md bg-yellow-500 text-white text-[12px] font-black flex items-center justify-center shadow-lg">1</span>
          </div>
          <p className="font-black text-[20px] text-gray-900 text-center">{gold.name}</p>
          <p className="text-[22px] font-black text-yellow-600">{gold.revenue}</p>
          <div className="mt-1 mb-4 px-4 py-1 rounded-full bg-yellow-100 border border-yellow-300 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[10px] font-extrabold tracking-wider text-yellow-700">{gold.progress}% OF TARGET</span>
          </div>
          <div className="w-44 rounded-t-lg flex items-center justify-center" style={{ height: 170, background: "linear-gradient(180deg,#ffe066 0%,#c8900a 50%,#e8c040 100%)" }}>
            <span className="text-[26px] font-black tracking-[0.25em] text-orange-700/80">GOLD</span>
          </div>
        </div>

        {/* Bronze #3 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <Avatar initials={bronze.initials} bg={bronze.avatarBg} size="lg" ring="ring-amber-700" />
            <span className="absolute -bottom-1 -right-1 size-6 rounded-md bg-amber-700 text-white text-[11px] font-black flex items-center justify-center shadow">3</span>
          </div>
          <p className="font-black text-[16px] text-gray-900 text-center">{bronze.name}</p>
          <p className="text-[15px] font-bold text-blue-600">{bronze.revenue}</p>
          <p className="text-[10px] font-semibold text-gray-500 tracking-wider mb-3">{bronze.progress}% OF TARGET</p>
          <div className="w-36 rounded-t-lg flex items-center justify-center" style={{ height: 90, background: "linear-gradient(180deg,#e8b880 0%,#a0622a 50%,#c8845a 100%)" }}>
            <span className="text-[22px] font-black tracking-[0.25em] text-orange-900/80">BRONZE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Best Performers ──────────────────────────────────────────────────────────
function BestPerformers({ leaderboard }: { leaderboard: any[] }) {
  return (
    <div className="w-[340px] shrink-0 rounded-2xl border border-border bg-white p-5 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[16px] font-bold">Best Performers - Today</h3>
        <span className="text-[9px] font-extrabold tracking-widest text-white bg-blue-500 px-2.5 py-0.5 rounded">LIVE</span>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto">
        {leaderboard.slice(0, 7).map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <Avatar initials={p.initials} bg={p.avatarBg} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-gray-900 truncate">{p.name}</p>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400">{p.deals} DEALS</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[13px] font-bold text-gray-900">{p.dealRevenue}</p>
              <p className="text-[11px] font-bold text-green-500 flex items-center justify-end gap-0.5">
                {p.change}<TrendingUp className="size-3" />
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-5 w-full py-2.5 rounded-xl border border-border text-[11px] font-extrabold tracking-widest text-gray-500 hover:bg-muted/40 transition-colors">
        VIEW ALL ACTIVITY
      </button>
    </div>
  );
}

// ─── Rankings Table ───────────────────────────────────────────────────────────
function RankingsTable({ leaderboard }: { leaderboard: any[] }) {
  const lower = leaderboard.slice(3);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[80px_1fr_2fr_180px] px-6 py-2">
        {["RANK", "SALES AGENT", "PERFORMANCE PROGRESS", "REVENUE / TARGET"].map((h, i) => (
          <span key={h} className={cn("text-[10px] font-extrabold tracking-[0.15em] text-gray-400", i === 3 && "text-right")}>{h}</span>
        ))}
      </div>
      {lower.map((r) => (
        <div key={r.rank} className="card-elevated grid grid-cols-[80px_1fr_2fr_180px] items-center px-6 py-4 rounded-2xl">
          <span className="text-[26px] font-black text-gray-800">{r.rank}</span>
          <div className="flex items-center gap-3">
            <Avatar initials={r.initials} bg={r.avatarBg} size="md" />
            <div>
              <p className="text-[14px] font-bold text-gray-900">{r.name}</p>
              <p className="text-[11px] text-gray-400">{r.title}</p>
            </div>
          </div>
          <div className="pr-8">
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-2">
              <div className={cn("h-full rounded-full transition-all duration-700", r.barColor)} style={{ width: `${r.progress}%` }} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-gray-500">{r.progress}% COMPLETE</span>
              {r.weekChange && <span className="text-[11px] font-bold text-blue-500">{r.weekChange}</span>}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[15px] font-black text-gray-900">{r.revenue}</span>
            <span className="text-[13px] text-gray-400 ml-1">/ {r.target}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Content Component ────────────────────────────────────────────────────────
function LeadershipPageContent() {
  const [tab, setTab] = React.useState<Tab>("QUARTERLY");
  const { activeFilters } = useFilters();
  const metrics = React.useMemo(() => generateMetrics(activeFilters), [activeFilters]);

  const leaderboard = metrics?.leaderboard || [];
  const f = metrics?.funnel || {};
  const showComparison = activeFilters?.comparison?.enabled ?? true;

  const SALES_CARDS: SalesCard[] = [
    { label: "TOTAL LEADS",     value: f.totalLeads?.value || 1240,    trend: f.totalLeads?.trend || "+12.4", positive: true, cardBg: "bg-indigo-100", dotColor: "bg-indigo-500", barColor: "bg-indigo-500", barBg: "bg-indigo-200", barWidth: "62%" },
    { label: "QUALIFIED",       value: f.qualified?.value || 682,     percentage: `${Math.round(((f.qualified?.value || 0) / (f.totalLeads?.value || 1)) * 100)}%`, trend: f.qualified?.trend || "+8.2", positive: true, cardBg: "bg-cyan-100", dotColor: "bg-cyan-500", barColor: "bg-cyan-500", barBg: "bg-cyan-200", barWidth: "55%" },
    { label: "CONTACTED",       value: f.contacted?.value || 410,     percentage: "33%", trend: f.contacted?.trend || "-2.1", positive: false, cardBg: "bg-purple-100", dotColor: "bg-purple-500", barColor: "bg-purple-500", barBg: "bg-purple-200", barWidth: "33%" },
    { label: "DEMO SCHEDULED",  value: f.demoScheduled?.value || 164, percentage: "13%", trend: f.demoScheduled?.trend || "+15.3", positive: true, cardBg: "bg-orange-100", dotColor: "bg-orange-400", barColor: "bg-orange-400", barBg: "bg-orange-200", barWidth: "13%" },
    { label: "PROPOSALS SENT",  value: f.proposalsSent?.value || 74,  percentage: "6%", trend: f.proposalsSent?.trend || "+4.8", positive: true, cardBg: "bg-pink-100", dotColor: "bg-pink-500", barColor: "bg-pink-500", barBg: "bg-pink-200", barWidth: "6%" },
    { label: "DEALS CLOSED",    value: f.dealsClosed?.value || 26,    percentage: "2%", trend: f.dealsClosed?.trend || "-5.2", positive: false, cardBg: "bg-green-100", dotColor: "bg-green-500", barColor: "bg-green-500", barBg: "bg-green-200", barWidth: "2%" },
  ];

  const titleMap: Record<Tab, string> = {
    DAILY: "Daily Rankings",
    MONTHLY: "Monthly Rankings",
    QUARTERLY: "Quarterly Rankings",
  };

  return (
    <CrmLayout showSubNav={false} showMetrics={false}>
      <div className="space-y-6">
        {/* Header + tabs */}
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-black tracking-tight">{titleMap[tab]}</h2>
          <div className="flex rounded-xl border border-border overflow-hidden">
            {(["DAILY", "MONTHLY", "QUARTERLY"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-5 py-2 text-[12px] font-extrabold tracking-wider transition-colors",
                  tab === t ? "bg-primary text-white" : "bg-white text-muted-foreground hover:bg-muted/40"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Filter banner */}
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground bg-muted/30 rounded-lg px-4 py-2 border border-border">
          <span className="font-semibold text-foreground">Showing:</span>
          <span>{format(new Date(activeFilters.timeframe.start), "dd MMM")} – {format(new Date(activeFilters.timeframe.end), "dd MMM yyyy")}</span>
          <span className="text-border">|</span>
          <span>{activeFilters.teamLead}</span>
          <span className="text-border">|</span>
          <span>{activeFilters.assignment}</span>
          {showComparison && (
            <>
              <span className="text-border">|</span>
              <span className="text-primary font-semibold">vs {activeFilters.comparison.value}</span>
            </>
          )}
        </div>

        {/* Sales metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SALES_CARDS.map((m) => (
            <SalesMetricCard key={m.label} m={m} showComparison={showComparison} />
          ))}
        </div>

        {/* Podium + Best Performers */}
        <div className="flex gap-5">
          <Podium leaderboard={leaderboard} />
          <BestPerformers leaderboard={leaderboard} />
        </div>

        {/* Rankings table */}
        <RankingsTable leaderboard={leaderboard} />
      </div>
    </CrmLayout>
  );
}

// ─── Page Wrapper ─────────────────────────────────────────────────────────────
export default function LeadershipPage() {
  return (
    <FilterProvider>
      <LeadershipPageContent />
    </FilterProvider>
  );
}
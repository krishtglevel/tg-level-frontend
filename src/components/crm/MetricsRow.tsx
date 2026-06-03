"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilters, generateMetrics } from "./FilterContext";

interface MetricCard {
  label: string;
  value: number;
  percentage?: string;
  trend: string;
  positive: boolean;
  cardBg: string;
  dotColor: string;
  barColor: string;
  barBg: string;
  barWidth: string;
}

function MetricCard({ m, showComparison }: { m: MetricCard; showComparison: boolean }) {
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

export default function MetricsRow() {
  const { activeFilters } = useFilters();
  const metrics = React.useMemo(() => generateMetrics(activeFilters), [activeFilters]);
  
  const f = metrics?.funnel || {};
  const showComparison = activeFilters?.comparison?.enabled ?? true;

  const METRIC_CARDS: MetricCard[] = [
    {
      label: "LEAD CREATED",
      value: f.totalLeads?.value || 1240,
      percentage: undefined,
      trend: f.totalLeads?.trend || "+12.4%",
      positive: f.totalLeads?.positive ?? true,
      cardBg: "bg-indigo-100",
      dotColor: "bg-indigo-500",
      barColor: "bg-indigo-500",
      barBg: "bg-indigo-200",
      barWidth: "100%",
    },
    {
      label: "CONTACTED",
      value: f.qualified?.value || 682,
      percentage: `${Math.round(((f.qualified?.value || 682) / (f.totalLeads?.value || 1240)) * 100)}%`,
      trend: f.qualified?.trend || "+8.3%",
      positive: f.qualified?.positive ?? true,
      cardBg: "bg-cyan-100",
      dotColor: "bg-cyan-500",
      barColor: "bg-cyan-500",
      barBg: "bg-cyan-200",
      barWidth: `${Math.round(((f.qualified?.value || 682) / (f.totalLeads?.value || 1240)) * 100)}%`,
    },
    {
      label: "INTERESTED",
      value: f.contacted?.value || 410,
      percentage: `${Math.round(((f.contacted?.value || 410) / (f.totalLeads?.value || 1240)) * 100)}%`,
      trend: f.contacted?.trend || "-3.2%",
      positive: f.contacted?.positive ?? false,
      cardBg: "bg-purple-100",
      dotColor: "bg-purple-500",
      barColor: "bg-purple-500",
      barBg: "bg-purple-200",
      barWidth: `${Math.round(((f.contacted?.value || 410) / (f.totalLeads?.value || 1240)) * 100)}%`,
    },
    {
      label: "TRIAL ACTIVE",
      value: f.demoScheduled?.value || 164,
      percentage: `${Math.round(((f.demoScheduled?.value || 164) / (f.totalLeads?.value || 1240)) * 100)}%`,
      trend: f.demoScheduled?.trend || "+15.7%",
      positive: f.demoScheduled?.positive ?? true,
      cardBg: "bg-orange-100",
      dotColor: "bg-orange-400",
      barColor: "bg-orange-400",
      barBg: "bg-orange-200",
      barWidth: `${Math.round(((f.demoScheduled?.value || 164) / (f.totalLeads?.value || 1240)) * 100)}%`,
    },
    {
      label: "PAYMENT INTENT",
      value: f.proposalsSent?.value || 74,
      percentage: `${Math.round(((f.proposalsSent?.value || 74) / (f.totalLeads?.value || 1240)) * 100)}%`,
      trend: f.proposalsSent?.trend || "+5.4%",
      positive: f.proposalsSent?.positive ?? true,
      cardBg: "bg-pink-100",
      dotColor: "bg-pink-500",
      barColor: "bg-pink-500",
      barBg: "bg-pink-200",
      barWidth: `${Math.round(((f.proposalsSent?.value || 74) / (f.totalLeads?.value || 1240)) * 100)}%`,
    },
    {
      label: "PAID",
      value: f.dealsClosed?.value || 26,
      percentage: `${Math.round(((f.dealsClosed?.value || 26) / (f.totalLeads?.value || 1240)) * 100)}%`,
      trend: f.dealsClosed?.trend || "+22.1%",
      positive: f.dealsClosed?.positive ?? true,
      cardBg: "bg-green-100",
      dotColor: "bg-green-500",
      barColor: "bg-green-500",
      barBg: "bg-green-200",
      barWidth: `${Math.round(((f.dealsClosed?.value || 26) / (f.totalLeads?.value || 1240)) * 100)}%`,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {METRIC_CARDS.map((m) => (
        <MetricCard key={m.label} m={m} showComparison={showComparison} />
      ))}
    </div>
  );
}
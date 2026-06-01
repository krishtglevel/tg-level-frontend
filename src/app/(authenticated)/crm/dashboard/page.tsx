"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { ArrowUpRight } from "lucide-react";
import ForecastChart from "./components/ForecastChart";
import IntelligencePanel from "./components/IntelligencePanel";
import ConversionFunnel from "./components/ConversionFunnel";
import HourlyTable from "./components/HourlyTable";
import FailureFlow from "./components/FailureFlow";
import StageVelocity from "./components/StageVelocity";
import EngagementFunnel from "./components/EngagementFunnel";

function FiltersBar() {
  const filters = [
    { label: "TIMEFRAME", value: "04 May – 10 May" },
    { label: "DATE BASIS", value: "Lead Created" },
    { label: "COMPARISON", value: "Prev 7 Days" },
    { label: "TEAM LEAD", value: "All Leads" },
    { label: "ASSIGNMENT", value: "All Agents" },
    { label: "SOURCE", value: "All Sources" },
  ];
  return (
    <div className="card-elevated p-4 flex items-center gap-3 flex-wrap">
      {filters.map((f) => (
        <div key={f.label} className="flex flex-col gap-0.5 px-3 py-1.5 rounded-xl bg-secondary">
          <span className="text-[9px] font-bold tracking-widest text-muted-foreground">{f.label}</span>
          <span className="text-[12px] font-semibold text-foreground">{f.value}</span>
        </div>
      ))}
      <div className="ml-auto flex items-center gap-2">
        <button className="h-9 px-4 rounded-xl text-[12px] font-semibold border border-border bg-card hover:bg-accent">
          Reset
        </button>
        <button className="h-9 px-4 rounded-xl text-[12px] font-semibold bg-primary text-primary-foreground hover:opacity-90">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

function RealTimeFunnelHeader() {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-[20px] font-bold tracking-tight">Real-time Funnel Progress</h2>
        <p className="text-[13px] text-muted-foreground mt-1">
          Live performance metrics compared to previous 48-hour window.
        </p>
      </div>
      <button className="text-[12px] font-semibold text-primary inline-flex items-center gap-1">
        View Detailed Report <ArrowUpRight className="size-3.5" />
      </button>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <CrmLayout showSubNav={false}>
      <FiltersBar />
      <RealTimeFunnelHeader />
      <div className="grid grid-cols-3 gap-6">
        <ForecastChart />
        <IntelligencePanel />
      </div>
      <ConversionFunnel />
      <HourlyTable />
      <FailureFlow />
      <StageVelocity />
      <EngagementFunnel />
    </CrmLayout>
  );
}

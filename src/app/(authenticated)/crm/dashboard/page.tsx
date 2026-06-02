"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import ForecastChart from "./components/ForecastChart";
import IntelligencePanel from "./components/IntelligencePanel";
import ConversionFunnel from "./components/ConversionFunnel";
import HourlyTable from "./components/HourlyTable";
import FailureFlow from "./components/FailureFlow";
import StageVelocity from "./components/StageVelocity";
import EngagementFunnel from "./components/EngagementFunnel";
// import MetricCards from "./components/MetricCards";

export default function DashboardPage() {
  return (
    <CrmLayout showSubNav={false}>
      {/* Two columns – chart (flexible) + intelligence panel (fixed width on large screens) */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        <div className="flex-1 min-w-0">
          <ForecastChart />
        </div>
        <div className="w-full xl:w-[360px] shrink-0">
          <IntelligencePanel />
        </div>
      </div>

      {/* Other dashboard sections */}
      <div className="space-y-6">
        <ConversionFunnel />
        <HourlyTable />
        <FailureFlow />
        <StageVelocity />
        <EngagementFunnel />
        {/* <MetricCards /> */}
      </div>
    </CrmLayout>
  );
}
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import MetricsRow from "./MetricsRow";
import { SubNav } from "./SubNav";
import FiltersBar from "./Filterbar";
import { ArrowUpRight } from "lucide-react";

function RealTimeFunnelHeader() {
  return (
    <div className="flex items-end justify-between px-4 pt-2 pb-1">
      <div>
        <h2 className="text-[20px] font-bold tracking-tight">Real-time Funnel Progress</h2>
        <p className="text-[13px] text-muted-foreground mt-1">Live performance metrics compared to previous 48-hour window.</p>
      </div>
      <button className="text-[12px] font-semibold text-primary inline-flex items-center gap-1">
        View Detailed Report <ArrowUpRight className="size-3.5" />
      </button>
    </div>
  );
}

export function CrmLayout({
  children,
  showSubNav = true,
  showMetrics = true,
}: {
  children: ReactNode;
  showSubNav?: boolean;
  showMetrics?: boolean;
}) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <RealTimeFunnelHeader />
        <FiltersBar />
        {showMetrics && (
          <div className="px-8 pt-6">
            <MetricsRow />
          </div>
        )}
        {showSubNav && <SubNav />}
        <main className="flex-1 p-8 space-y-6">{children}</main>
      </div>
    </div>
  );
}

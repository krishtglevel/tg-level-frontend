import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MetricsRow } from "./MetricsRow";
import { SubNav } from "./SubNav";

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

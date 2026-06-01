import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  Trophy,
  Award,
  Package,
  ChevronsLeft,
  LifeBuoy,
} from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/crm/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/crm/broadcast", label: "Broadcast Center", icon: Radio },
  { to: "/crm/leadership", label: "Leadership Hub", icon: Trophy },
  { to: "/crm/badges", label: "Agent Badges", icon: Award },
  { to: "/crm/packaged", label: "Packaged", icon: Package },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();

  return (
    <aside
      className="sticky top-0 h-screen shrink-0 bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-200"
      style={{ width: collapsed ? 76 : 248 }}
    >
      <div className="flex items-center gap-2 px-5 pt-6 pb-8">
        <div className="size-9 rounded-xl grad-purple flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
          TG
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <div className="font-bold text-[15px] tracking-tight">TG Levels</div>
            <div className="text-[11px] text-sidebar-muted">CRM Platform</div>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="px-5 pb-2 text-[10px] font-semibold tracking-[0.18em] text-sidebar-muted">
          MAIN
        </div>
      )}

      <nav className="flex-1 px-3 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = path === item.to;
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-sidebar-active text-white shadow-lg shadow-blue-500/20"
                  : "text-sidebar-foreground/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-sidebar-muted hover:text-white hover:bg-white/5"
        >
          <ChevronsLeft className={`size-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && "Collapse"}
        </button>
      </div>

      <div className="m-3 rounded-2xl bg-white/5 p-3 flex items-center gap-3 border border-white/5">
        <div className="size-9 rounded-full grad-cyan flex items-center justify-center text-white text-xs font-bold">
          AN
        </div>
        {!collapsed && (
          <div className="leading-tight min-w-0">
            <div className="text-[13px] font-semibold truncate">Admin Node</div>
            <div className="text-[11px] text-sidebar-muted truncate">Sales Agent</div>
          </div>
        )}
        {!collapsed && <LifeBuoy className="size-4 text-sidebar-muted ml-auto" />}
      </div>
    </aside>
  );
}

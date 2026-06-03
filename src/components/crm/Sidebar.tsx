"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Radio,
  BarChart2,
  Award,
  Package,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/crm/dashboard",  label: "Dashboard",        icon: LayoutDashboard },
  { to: "/crm/broadcast",  label: "Broadcast Center", icon: Radio           },
  { to: "/crm/leadership", label: "leadership hub",   icon: BarChart2       },
  { to: "/crm/badges",     label: "agent badges",     icon: Award           },
];

export function Sidebar() {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[210px]"
      )}
    >
      {/* ── Logo Section ── */}
      <div className="flex items-center justify-center px-3 pt-6 pb-7">
        <div className={cn("flex items-center gap-2.5", collapsed && "justify-center w-full")}>
          {/* Logo Container */}
          <div className="size-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm overflow-hidden bg-gradient-to-br from-teal-600 to-teal-500">
            {!logoError ? (
              <Image
                src="/logo.jpeg" // ✅ Correct: No "public" in the path
                alt="TG Levels Logo"
                width={36}
                height={36}
                className="object-contain"
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              // Fallback SVG if image fails to load
              <svg viewBox="0 0 20 20" className="size-5" fill="none">
                <rect x="3" y="3" width="6" height="6" rx="1" fill="white" opacity="0.9" />
                <rect x="11" y="3" width="6" height="6" rx="1" fill="white" opacity="0.9" />
                <rect x="3" y="11" width="6" height="6" rx="1" fill="white" opacity="0.9" />
                <rect x="11" y="11" width="6" height="6" rx="1" fill="white" opacity="0.5" />
              </svg>
            )}
          </div>

          {/* Brand Text */}
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-black text-[14px] tracking-tight text-gray-900">
                TG LEVELS
              </div>
              <div className="text-[10px] text-gray-400 tracking-wide font-medium">CRM</div>
            </div>
          )}
        </div>
      </div>

      {/* Section label */}
      {!collapsed && (
        <div className="px-5 pb-2 text-[9px] font-extrabold tracking-[0.22em] text-gray-400">
          MAIN
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2.5 space-y-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = path === item.to || path.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all",
                active
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "size-[17px] shrink-0",
                  active ? "text-white" : "text-gray-400"
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* ── Collapse toggle button ── */}
      <div className={cn("px-3 py-2", collapsed && "flex justify-center")}>
        <button
          onClick={toggleCollapse}
          className="w-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <div className="flex items-center gap-2 w-full">
              <ChevronLeft className="size-4" />
              <span className="text-[11px] font-medium">Collapse</span>
            </div>
          )}
        </button>
      </div>

      {/* User card */}
      <div
        className={cn(
          "m-3 p-3 flex items-center gap-2.5 border-t border-gray-100 pt-4",
          collapsed && "justify-center px-0"
        )}
      >
        <div
          className="size-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
          style={{
            background: "linear-gradient(135deg, #0d9488, #14b8a6)",
          }}
        >
          AN
        </div>
        {!collapsed && (
          <div className="leading-tight min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-gray-900 truncate">
              Admin Node
            </div>
            <div className="text-[10px] text-gray-400 truncate">Sales Agent</div>
          </div>
        )}
        <button className="shrink-0 text-gray-400 hover:text-gray-700 transition-colors">
          <LogOut className="size-4" />
        </button>
      </div>
    </aside>
  );
}
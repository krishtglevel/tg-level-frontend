"use client";

import { Search, Bell, Settings, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Topbar() {
  const pathname = usePathname();
  
  // Check if we're on any chats page
  const isChats = pathname === "/crm/chats" || pathname === "/chats";
  
  // Check if we're on ANY CRM dashboard/analytics page (not chats)
  const isDashboard = pathname?.startsWith("/crm") && !isChats;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#EDEEF5]">
      <div className="flex items-center gap-6 px-4 py-2">
        {/* Left section: Search + Toggle */}
        <div className="flex flex-1 items-center gap-3">
          {/* Search bar */}
          <div className="flex flex-1 items-center bg-white pl-3 rounded-3xl border border-[#B3B3B3] max-w-xs">
            <Search className="size-4 text-[#727272] shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Search By Name, Number"
              className="flex-1 text-[#727272] bg-transparent text-sm py-2 border-0 outline-none"
            />
          </div>

          {/* Toggle pills: My Chats & Dashboard */}
          <div className="flex items-center bg-white rounded-full border border-black overflow-hidden">
            {isChats ? (
              <span
                className="bg-[#3525CD] text-white text-sm font-bold py-2.5 px-10 rounded-[50px] inline-block"
                style={{ boxShadow: "0 0 2px #00000057" }}
              >
              </span>
            ) : (
              <Link
                href="/crm/chats"
                className="text-[#5F6265] text-sm font-bold px-8 py-2.5 no-underline hover:text-[#3525CD] transition-colors"
              >
                My Chats
              </Link>
            )}
            {isDashboard ? (
              <span
                className="bg-[#3525CD] text-white text-sm font-bold py-2.5 px-10 rounded-[50px] inline-block"
                style={{ boxShadow: "0 0 2px #00000057" }}
              >
                Dashboard
              </span>
            ) : (
              <Link
                href="/crm/dashboard"
                className="text-[#5F6265] text-sm font-bold px-8 py-2.5 no-underline hover:text-[#3525CD] transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Right section: Icons + User + Plus */}
        <div className="flex shrink-0 items-center gap-4">
          {/* Bell + Settings */}
          <div className="flex items-center gap-3">
            <button className="relative hover:opacity-70 transition-opacity">
              <Bell className="size-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-red-500" />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <Settings className="size-5 text-gray-600" />
            </button>
          </div>

          {/* User info + avatar + plus button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-gray-800 text-sm font-medium leading-tight">
                  First And Last Name
                </span>
                <span className="text-[#6D6D6D] text-[9px]">Designation</span>
              </div>
              <div className="size-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                AS
              </div>
            </div>
            <button className="size-7 flex items-center justify-center bg-black rounded-full text-white hover:bg-gray-800 transition-colors">
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
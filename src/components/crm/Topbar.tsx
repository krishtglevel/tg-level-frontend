"use client";

import { Search, Bell, Settings, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Topbar() {
  const pathname = usePathname();
  const isChats = pathname === "/chats";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#EDEEF5]">
      <div className="flex items-center gap-6 px-4 py-2">

        {/* Search + My Chats / Dashboard toggle */}
        <div className="flex flex-1 items-center gap-3">
          {/* Search */}
          <div className="flex flex-1 items-center bg-white pl-3 rounded-2xl border border-[#B3B3B3] max-w-xs">
            <Search className="size-4 text-[#727272] shrink-0 mr-2" />
            <input
              type="text"
              placeholder="search by name, number"
              className="flex-1 text-[#727272] bg-transparent text-sm py-2 border-0 outline-none"
            />
          </div>

          {/* My Chats + Dashboard pill */}
          <div className="flex items-center bg-white rounded-full border border-black overflow-hidden">
            <Link
              href="/crm/chats"
              className={`text-sm font-semibold py-2 px-6 transition-colors no-underline ${
                isChats
                  ? "bg-[#3525CD] text-white"
                  : "text-[#5F6265] bg-transparent"
              }`}
              style={isChats ? { boxShadow: "0px 0px 1px #00000057" } : {}}
            >
              my chats
            </Link>
            <Link
              href="/"
              className={`text-sm font-semibold py-2 px-6 transition-colors no-underline ${
                !isChats
                  ? "bg-[#3525CD] text-white"
                  : "text-[#5F6265] bg-transparent"
              }`}
              style={!isChats ? { boxShadow: "0px 0px 1px #00000057" } : {}}
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Right side icons + user */}
        <div className="flex shrink-0 items-center gap-4">
          {/* Bell + Settings */}
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell className="size-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-red-500" />
            </button>
            <button>
              <Settings className="size-5 text-gray-600" />
            </button>
          </div>

          {/* User info + avatar + plus */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-gray-800 text-sm font-medium leading-tight">
                  first and last name
                </span>
                <span className="text-[#6D6D6D] text-[9px]">designation</span>
              </div>
              <div className="size-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                AS
              </div>
            </div>
            <button className="size-7 flex items-center justify-center bg-black rounded-full text-white">
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
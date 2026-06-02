"use client";

import { Search, Bell, Settings, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Topbar() {
  const pathname = usePathname();
  const isChats = pathname === "/chats";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#EDEEF5]">
      <div className="flex items-center gap-10 px-4 py-[7px]">

        {/* Search + My Chats / Dashboard toggle */}
        <div className="flex flex-1 items-center gap-4">
          {/* Search */}
          <div className="flex flex-1 items-center bg-white pl-3 rounded-3xl border border-[#B3B3B3] max-w-sm">
            <Search className="size-6 text-[#727272] shrink-0 mr-3" />
            <input
              type="text"
              placeholder="search by name, number"
              className="flex-1 text-[#727272] bg-transparent text-base py-2.5 border-0 outline-none"
            />
          </div>

          {/* My Chats + Dashboard pill */}
          <div className="flex items-center bg-white rounded-[73px] border border-black">
            <Link
              href="/crm/chats"
              className={`text-[17px] font-bold py-[11px] px-[72px] rounded-[73px] transition-colors no-underline ${
                isChats
                  ? "bg-[#3525CD] text-white"
                  : "text-[#5F6265] bg-transparent"
              }`}
              style={isChats ? { boxShadow: "0px 0px 2px #00000057" } : {}}
            >
              my chats
            </Link>
            <Link
              href="/"
              className={`text-[17px] font-bold py-[11px] px-[72px] rounded-[73px] transition-colors no-underline ${
                !isChats
                  ? "bg-[#3525CD] text-white"
                  : "text-[#5F6265] bg-transparent"
              }`}
              style={!isChats ? { boxShadow: "0px 0px 2px #00000057" } : {}}
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Right side icons + user */}
        <div className="flex shrink-0 items-center gap-6">
          {/* Bell + Settings */}
          <div className="flex shrink-0 items-center gap-4 py-[3px]">
            <button className="size-8 flex items-center justify-center relative">
              <Bell className="size-8 text-foreground/80" />
              <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-red-500" />
            </button>
            <button className="size-8 flex items-center justify-center">
              <Settings className="size-8 text-foreground/80" />
            </button>
          </div>

          {/* User info + avatar + plus */}
          <div className="flex shrink-0 items-center gap-8">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex flex-col items-start">
                <span className="text-black text-base leading-tight">
                  first and last name
                </span>
                <span className="text-[#6D6D6D] text-[8px]">designation</span>
              </div>
              {/* Avatar circle */}
              <div className="size-[46px] rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-sm font-bold">
                AS
              </div>
            </div>
            {/* Plus button */}
            <button className="size-8 flex items-center justify-center bg-black rounded-full text-white">
              <Plus className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
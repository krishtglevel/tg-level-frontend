import { Search, Bell, Settings, MessageSquare, ChevronDown, Plus } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-4 px-8 h-16">
        <div className="relative w-[360px]">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search by name, number..."
            className="w-full h-10 pl-10 pr-4 rounded-2xl border border-border bg-card text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>

        <button className="h-10 px-4 rounded-2xl grad-purple text-white text-sm font-semibold inline-flex items-center gap-2 shadow-lg shadow-purple-500/20">
          <MessageSquare className="size-4" />
          My Chats
        </button>

        <button className="h-10 px-4 rounded-2xl bg-foreground text-background text-sm font-semibold inline-flex items-center gap-2">
          Dashboard
          <ChevronDown className="size-4 opacity-70" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button className="size-10 rounded-2xl border border-border bg-card flex items-center justify-center hover:bg-accent relative">
            <Bell className="size-[18px] text-foreground/80" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-destructive" />
          </button>
          <button className="size-10 rounded-2xl border border-border bg-card flex items-center justify-center hover:bg-accent">
            <Settings className="size-[18px] text-foreground/80" />
          </button>
          <div className="flex items-center gap-2.5 pl-2.5 pr-3 h-10 rounded-2xl border border-border bg-card">
            <div className="size-7 rounded-full grad-pink flex items-center justify-center text-white text-[11px] font-bold">
              AS
            </div>
            <div className="leading-tight">
              <div className="text-[12px] font-semibold">Amit Sharma</div>
              <div className="text-[10px] text-muted-foreground">Team Lead</div>
            </div>
          </div>
          <button className="size-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
            <Plus className="size-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}

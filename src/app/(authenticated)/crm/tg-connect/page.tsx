"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { Hash, Search, Paperclip, Smile, Send, BarChart3, Mic, FileText, Users } from "lucide-react";

const channels = [
  { name: "General Announcements", active: true, unread: 3 },
  { name: "Sales Team", unread: 12 },
  { name: "Market Updates", unread: 5 },
  { name: "Conversion Tips", unread: 0 },
  { name: "Payment Team", unread: 2 },
];

const messages = [
  { who: "ATL Sandeep", role: "Team Lead", time: "10:34 AM", text: "Team, today market is highly volatile. Focus on risk management and education-led selling.", avatar: "grad-purple", pinned: true },
  { who: "Neha Kapoor", role: "Sales Agent", time: "10:42 AM", text: "Shared a document: Nifty Market Outlook – 17 May.pdf", avatar: "grad-pink", file: true },
  { who: "Rohit Verma", role: "Sales Agent", time: "10:48 AM", text: "Great analysis. Sharing with my leads now.", avatar: "grad-cyan" },
  { who: "Amit Sharma", role: "TL", time: "10:55 AM", text: "Reminder — payment follow-ups for pending leads before EOD.", avatar: "grad-orange" },
];

export default function TGConnectPage() {
  return (
    <CrmLayout>
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)] min-h-[600px]">
        {/* Channels */}
        <aside className="col-span-3 card-elevated p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-bold tracking-wider text-muted-foreground">CHANNELS</h3>
            <button className="size-7 rounded-lg bg-secondary text-foreground text-sm">+</button>
          </div>
          <div className="relative mb-3">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search" className="w-full h-9 pl-9 pr-3 rounded-xl bg-secondary text-[12px] focus:outline-none" />
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto scrollbar-thin">
            {channels.map((c) => (
              <button
                key={c.name}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] ${
                  c.active ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-secondary"
                }`}
              >
                <Hash className="size-3.5" />
                <span className="text-left truncate flex-1">{c.name}</span>
                {c.unread > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-[11px] text-muted-foreground">
            <Users className="size-3.5" /> 24 members online
          </div>
        </aside>

        {/* Feed */}
        <section className="col-span-6 card-elevated flex flex-col">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="size-4 text-muted-foreground" />
              <div>
                <h3 className="text-[15px] font-bold">General Announcements</h3>
                <div className="text-[11px] text-muted-foreground">24 members · Team-wide updates</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="size-9 rounded-xl border border-border bg-card flex items-center justify-center">
                <Search className="size-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3">
                <div className={`size-10 rounded-full ${m.avatar} flex items-center justify-center text-white text-[12px] font-bold shrink-0`}>
                  {m.who.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-[13px]">{m.who}</span>
                    <span className="text-[10px] text-muted-foreground">{m.role}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{m.time}</span>
                  </div>
                  <div className={`mt-1.5 text-[13px] leading-relaxed ${m.pinned ? "bg-primary/5 border border-primary/15 rounded-2xl p-3" : ""}`}>
                    {m.text}
                  </div>
                  {m.file && (
                    <div className="mt-2 inline-flex items-center gap-3 p-3 rounded-2xl border border-border bg-secondary/50">
                      <div className="size-10 rounded-xl grad-orange flex items-center justify-center text-white"><FileText className="size-5" /></div>
                      <div>
                        <div className="text-[13px] font-semibold">Nifty Market Outlook – 17 May.pdf</div>
                        <div className="text-[11px] text-muted-foreground">1.2 MB · Click to download</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 bg-secondary rounded-2xl px-3 py-2">
              <button className="size-8 rounded-lg hover:bg-card flex items-center justify-center"><Paperclip className="size-4 text-muted-foreground" /></button>
              <input placeholder="Type a message in #general-announcements..." className="flex-1 bg-transparent text-[13px] focus:outline-none placeholder:text-muted-foreground" />
              <button className="size-8 rounded-lg hover:bg-card flex items-center justify-center"><Smile className="size-4 text-muted-foreground" /></button>
              <button className="h-9 px-4 rounded-xl grad-purple text-white text-[12px] font-semibold inline-flex items-center gap-1.5">
                Send <Send className="size-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Right panel */}
        <aside className="col-span-3 space-y-4">
          <div className="card-elevated p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold tracking-wider text-muted-foreground">FILES</h3>
              <span className="text-[11px] text-primary font-semibold">See all</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "Intraday Strategy Guide.pdf", size: "2.4 MB", grad: "grad-purple" },
                { name: "Risk Management.xlsx", size: "640 KB", grad: "grad-mint" },
                { name: "Option Buying Strategy.pdf", size: "1.1 MB", grad: "grad-orange" },
              ].map((f) => (
                <div key={f.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary">
                  <div className={`size-9 rounded-lg ${f.grad} flex items-center justify-center text-white`}>
                    <FileText className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold truncate">{f.name}</div>
                    <div className="text-[10px] text-muted-foreground">{f.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elevated p-4">
            <h3 className="text-[13px] font-bold tracking-wider text-muted-foreground mb-3">QUICK ACTIONS</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-accent">
                <div className="size-9 rounded-lg grad-cyan flex items-center justify-center text-white"><BarChart3 className="size-4" /></div>
                <div className="text-left">
                  <div className="text-[13px] font-semibold">Create Poll</div>
                  <div className="text-[10px] text-muted-foreground">Ask the team a question</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-accent">
                <div className="size-9 rounded-lg grad-pink flex items-center justify-center text-white"><Mic className="size-4" /></div>
                <div className="text-left">
                  <div className="text-[13px] font-semibold">Voice Room</div>
                  <div className="text-[10px] text-muted-foreground">Start an instant huddle</div>
                </div>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </CrmLayout>
  );
}

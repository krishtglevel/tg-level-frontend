"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import {
  TrendingUp, TrendingDown, Download, MoreVertical,
  ChevronLeft, ChevronRight, RefreshCw, ArrowLeft, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilters, generateMetrics, FilterProvider } from "@/components/crm/FilterContext";
import { format } from "date-fns";

// ─── Types ────────────────────────────────────────────────────────────────────

type LogStatus = "DELIVERED" | "SENT" | "PENDING" | "FAILED";

interface CampaignRow {
  id: string;
  message: string;
  sub: string;
  status: LogStatus;
  processed: number;
  dateTime: string;
  delivered: string;
  opened: string;
  unreached: number;
  replied: number;
}

interface UserLogRow {
  id: string;
  name: string;
  status: LogStatus;
  processed: number;
  dateTime: string;
  delivered: string;
  opened: string;
  unreached: number;
}

// ─── Static campaign data (PDF 1) ─────────────────────────────────────────────

const CAMPAIGNS: CampaignRow[] = [
  { id: "#1",  message: "MMTC BROADCAST",                  sub: "Global Distribution List",     status: "DELIVERED", processed: 100, dateTime: "Oct 24, 2023 · 09:12 AM", delivered: "12,402", opened: "8,912",  unreached: 12,   replied: 10  },
  { id: "#2",  message: "Urgent: Product Update v2.4.1",   sub: "Beta Testers Segment",          status: "SENT",      processed: 85,  dateTime: "Oct 24, 2023 · 10:45 AM", delivered: "4,120",  opened: "1,200",  unreached: 0,    replied: 90  },
  { id: "#3",  message: "Exclusive Partner Discount Code", sub: "Active Leads Only",             status: "PENDING",   processed: 12,  dateTime: "Oct 24, 2023 · 11:30 AM", delivered: "890",    opened: "45",     unreached: 4,    replied: 300 },
  { id: "#4",  message: "Retargeting: Cart Abandonment",   sub: "E-commerce Segment",            status: "FAILED",    processed: 44,  dateTime: "Oct 23, 2023 · 04:20 PM", delivered: "2,140",  opened: "920",    unreached: 1204, replied: 100 },
  { id: "#5",  message: "Weekly Newsletter - Issue #42",   sub: "All Subscribed Users",          status: "DELIVERED", processed: 100, dateTime: "Oct 23, 2023 · 09:00 AM", delivered: "54,320", opened: "31,005", unreached: 452,  replied: 250 },
  { id: "#6",  message: "Feedback Survey: Customer Care",  sub: "Post-Support Engagement",       status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2,    replied: 600 },
  { id: "#7",  message: "Feedback Survey: Customer Care",  sub: "Post-Support Engagement",       status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2,    replied: 600 },
  { id: "#8",  message: "Feedback Survey: Customer Care",  sub: "Post-Support Engagement",       status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2,    replied: 600 },
  { id: "#9",  message: "Feedback Survey: Customer Care",  sub: "Post-Support Engagement",       status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2,    replied: 600 },
  { id: "#10", message: "Feedback Survey: Customer Care",  sub: "Post-Support Engagement",       status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2,    replied: 600 },
];

// ─── Static user log data (PDF 2) ─────────────────────────────────────────────

const USER_LOGS: UserLogRow[] = [
  { id: "#1",  name: "Alex Johnson", status: "DELIVERED", processed: 100, dateTime: "Oct 24, 2023 · 09:12 AM", delivered: "12,402", opened: "8,912",  unreached: 12   },
  { id: "#2",  name: "Maria Garcia", status: "SENT",      processed: 85,  dateTime: "Oct 24, 2023 · 10:45 AM", delivered: "4,120",  opened: "1,200",  unreached: 0    },
  { id: "#3",  name: "David Kim",    status: "PENDING",   processed: 12,  dateTime: "Oct 24, 2023 · 11:30 AM", delivered: "890",    opened: "45",     unreached: 4    },
  { id: "#4",  name: "Priya Patel",  status: "FAILED",    processed: 44,  dateTime: "Oct 23, 2023 · 04:20 PM", delivered: "2,140",  opened: "920",    unreached: 1204 },
  { id: "#5",  name: "Chris Evans",  status: "DELIVERED", processed: 100, dateTime: "Oct 23, 2023 · 09:00 AM", delivered: "54,320", opened: "31,005", unreached: 452  },
  { id: "#7",  name: "Sneha Rao",    status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#8",  name: "Tom Hardy",    status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#9",  name: "Aisha Malik",  status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#10", name: "Jake Turner",  status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#11", name: "Nadia Bloom",  status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#12", name: "Sam Fisher",   status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#13", name: "Lena Zhou",    status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
];

// ─── Status config ─────────────────────────────────────────────────────────────

const STATUS_CFG: Record<LogStatus, { dot: string; text: string; bg: string; bar: string; border: string }> = {
  DELIVERED: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50",  bar: "bg-emerald-500", border: "border-emerald-200" },
  SENT:      { dot: "bg-blue-500",    text: "text-blue-700",    bg: "bg-blue-50",     bar: "bg-blue-500",    border: "border-blue-200"    },
  PENDING:   { dot: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50",    bar: "bg-amber-400",   border: "border-amber-200"   },
  FAILED:    { dot: "bg-red-500",     text: "text-red-700",     bg: "bg-red-50",      bar: "bg-red-500",     border: "border-red-200"     },
};

// ─── Shared primitives ─────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-widest text-white bg-red-500 px-2 py-0.5 rounded">
      <span className="size-1.5 rounded-full bg-white animate-pulse" />
      LIVE
    </span>
  );
}

function StatusBadge({ status }: { status: LogStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border", cfg.bg, cfg.text, cfg.border)}>
      <span className={cn("size-1.5 rounded-full shrink-0", cfg.dot)} />
      {status}
    </span>
  );
}

function ProgressBar({ pct, status }: { pct: number; status: LogStatus }) {
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-500", STATUS_CFG[status].bar)} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-bold text-[11px] text-foreground w-8 shrink-0 tabular-nums text-right">{pct}%</span>
    </div>
  );
}

function PageBtn({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "size-7 flex items-center justify-center rounded-lg text-[12px] font-semibold transition-colors",
        active ? "bg-foreground text-background shadow-sm" : "border border-border text-muted-foreground hover:bg-muted/50"
      )}
    >
      {children}
    </button>
  );
}

// ─── Metric card ───────────────────────────────────────────────────────────────

interface BroadcastCardProps {
  label: string; value: number; pct?: string; trend: string;
  positive: boolean; showComparison: boolean;
  cardBg: string; dotColor: string; barColor: string; barBg: string; barWidth: string;
}

function BroadcastCard({ label, value, pct, trend, positive, showComparison, cardBg, dotColor, barColor, barBg, barWidth }: BroadcastCardProps) {
  return (
    <div className={cn("rounded-2xl p-4 flex flex-col gap-2 min-w-0 transition-all duration-500", cardBg)}>
      <div className="flex items-center justify-between min-h-[18px]">
        <span className={cn("size-2.5 rounded-full shrink-0", dotColor)} />
        {showComparison && (
          <span className={cn("text-[11px] font-bold flex items-center gap-0.5 shrink-0", positive ? "text-emerald-600" : "text-red-500")}>
            {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase leading-tight">{label}</p>
      <div className="flex items-baseline gap-1 flex-wrap">
        <span className="text-[22px] font-bold text-gray-900 leading-none tabular-nums">{value.toLocaleString()}</span>
        {pct && <span className="text-[11px] text-gray-400">({pct})</span>}
      </div>
      <div className={cn("h-1.5 rounded-full overflow-hidden mt-1", barBg)}>
        <div className={cn("h-full rounded-full transition-all duration-700", barColor)} style={{ width: barWidth }} />
      </div>
    </div>
  );
}

// ─── VIEW 1: Campaign Log Explorer (PDF 1) ─────────────────────────────────────

function CampaignLog({ onSelect }: { onSelect: (c: CampaignRow) => void }) {
  const [tab, setTab]   = React.useState<"All" | "Scheduled" | "Completed">("All");
  const [page, setPage] = React.useState(1);
  const totalPages = 10;

  const filtered =
    tab === "All"       ? CAMPAIGNS :
    tab === "Completed" ? CAMPAIGNS.filter(c => c.status === "DELIVERED") :
                          CAMPAIGNS.filter(c => c.status === "PENDING" || c.status === "SENT");

  const TH = "py-3 px-3 text-left text-[10px] font-bold text-muted-foreground whitespace-nowrap";
  const TD = "py-2.5 px-3 text-[12px]";

  return (
    <div className="card-elevated rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[16px] font-bold">Campaign Log Explorer</h2>
          <LiveBadge />
        </div>
        <div className="flex items-center gap-1.5">
          {(["All", "Scheduled", "Completed"] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setPage(1); }}
              className={cn("text-[12px] font-semibold px-3.5 py-1.5 rounded-lg transition-colors",
                tab === t ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>
              {t}
            </button>
          ))}
          <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors">
            <MoreVertical className="size-4" />
          </button>
          <button className="flex items-center gap-1.5 text-[12px] font-bold bg-foreground text-background px-3.5 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="size-3.5" /> ADD NEW
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-[12px] border-collapse">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {["NO.", "Message", "Status", "Processed %", "Date & Time", "Delivered", "Opened", "Unreached", "Replied"].map(h => (
                <th key={h} className={TH}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={row.id}
                onClick={() => onSelect(row)}
                className={cn(
                  "border-b border-border/40 cursor-pointer transition-colors hover:bg-primary/5",
                  i % 2 === 0 ? "bg-white" : "bg-muted/5"
                )}
              >
                <td className={cn(TD, "text-primary font-bold")}>{row.id}</td>
                <td className={TD}>
                  <div className="font-semibold text-foreground text-[13px]">{row.message}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{row.sub}</div>
                </td>
                <td className={TD}><StatusBadge status={row.status} /></td>
                <td className={TD}><ProgressBar pct={row.processed} status={row.status} /></td>
                <td className={cn(TD, "text-muted-foreground text-[11px] whitespace-nowrap")}>{row.dateTime}</td>
                <td className={cn(TD, "text-right font-semibold tabular-nums")}>{row.delivered}</td>
                <td className={cn(TD, "text-right font-semibold tabular-nums")}>{row.opened}</td>
                <td className={cn(TD, "text-right font-semibold tabular-nums",
                  row.unreached > 100 ? "text-red-500" : row.unreached > 0 ? "text-amber-600" : "text-muted-foreground")}>
                  {row.unreached}
                </td>
                <td className={cn(TD, "text-right font-semibold tabular-nums text-primary")}>{row.replied}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-[12px] text-muted-foreground">
          Showing <span className="font-semibold text-foreground">1–{filtered.length}</span> of 254 campaign records
        </span>
        <div className="flex items-center gap-1">
          <PageBtn onClick={() => setPage(p => Math.max(1, p - 1))}><ChevronLeft className="size-3.5" /></PageBtn>
          {[1, 2, 3, 4].map(p => <PageBtn key={p} active={page === p} onClick={() => setPage(p)}>{p}</PageBtn>)}
          <span className="text-muted-foreground px-1 text-[12px]">…</span>
          <PageBtn active={page === totalPages} onClick={() => setPage(totalPages)}>{totalPages}</PageBtn>
          <PageBtn onClick={() => setPage(p => Math.min(totalPages, p + 1))}><ChevronRight className="size-3.5" /></PageBtn>
        </div>
      </div>
    </div>
  );
}

// ─── VIEW 2: Broadcast Detail + Delivery Report + User Logs (PDF 2) ───────────

function BroadcastDetailView({ campaign, onBack }: { campaign: CampaignRow; onBack: () => void }) {
  const [tab, setTab]   = React.useState<"All" | "Scheduled" | "Completed">("All");
  const [page, setPage] = React.useState(1);
  const [sortCol, setSortCol] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const totalPages = 5;

  const filtered =
    tab === "All"       ? USER_LOGS :
    tab === "Completed" ? USER_LOGS.filter(u => u.status === "DELIVERED") :
                          USER_LOGS.filter(u => u.status === "PENDING" || u.status === "SENT");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const TH_BORDER = "border border-border px-4 py-3 text-center font-semibold text-foreground text-[12px]";
  const TD_BORDER = "border border-border px-4 py-3.5 text-center font-semibold";

  const detailRows: [string, React.ReactNode][] = [
    ["Broadcast Name",   <span className="font-semibold text-foreground">{campaign.message} 7TH OCT 2ND</span>],
    ["Broadcast Type",   "Immediate"],
    ["Broadcast Date",   "07/10/2025"],
    ["Broadcast Time",   "04:13 PM"],
    ["Broadcast Status",
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 text-emerald-700 bg-emerald-50">
        <span className="size-1.5 rounded-full bg-emerald-500" /> Completed
      </span>
    ],
    ["Download Report",
      <a href="#" onClick={e => e.preventDefault()} className="text-primary font-semibold hover:underline inline-flex items-center gap-1 text-[13px]">
        <Download className="size-3.5" /> Download
      </a>
    ],
  ];

  const USER_LOG_COLS = [
    { key: "id",        label: "User ID"     },
    { key: "name",      label: "Name"        },
    { key: "status",    label: "Status"      },
    { key: "processed", label: "Processed %" },
    { key: "dateTime",  label: "Date & Time" },
    { key: "delivered", label: "Delivered"   },
    { key: "opened",    label: "Opened"      },
    { key: "unreached", label: "Unreached"   },
  ];

  return (
    <div className="space-y-5">

      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground border border-border rounded-lg px-4 py-2 hover:bg-muted/50 transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to Campaign Log
      </button>

      {/* ── Broadcast Detail ─────────────────────────────────────── */}
      <div className="card-elevated rounded-2xl p-6">
        <h2 className="text-[16px] font-bold mb-5">Broadcast Detail</h2>
        <div className="grid grid-cols-[max-content_1fr] gap-x-12 gap-y-3.5 text-[13px]">
          {detailRows.map(([label, value]) => (
            <React.Fragment key={String(label)}>
              <span className="font-semibold text-muted-foreground whitespace-nowrap">{label}</span>
              <span className="text-foreground">{value}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Broadcast Delivery Report ────────────────────────────── */}
      <div className="card-elevated rounded-2xl p-6">
        <h2 className="text-[16px] font-bold mb-5">Broadcast Delivery Report</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="bg-muted/40">
                {["Date", "Sent Count", "Received Count", "Undelivered Count", "Read Count"].map(h => (
                  <th key={h} className={TH_BORDER}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className={cn(TD_BORDER, "text-muted-foreground font-medium whitespace-nowrap")}>07/10/2025 04:13 PM</td>
                <td className={TD_BORDER}>999</td>
                <td className={cn(TD_BORDER, "text-emerald-600")}>999</td>
                <td className={cn(TD_BORDER, "text-red-500")}>1</td>
                <td className={cn(TD_BORDER, "text-blue-600")}>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── User Logs ─────────────────────────────────────────────── */}
      <div className="card-elevated rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[16px] font-bold">User Logs</h2>
            <LiveBadge />
            <span className="text-[11px] text-muted-foreground">{filtered.length} records</span>
          </div>
          <div className="flex items-center gap-1.5">
            {(["All", "Scheduled", "Completed"] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setPage(1); }}
                className={cn("text-[12px] font-semibold px-3.5 py-1.5 rounded-lg transition-colors",
                  tab === t ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>
                {t}
              </button>
            ))}
            <button className="ml-1 p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors">
              <MoreVertical className="size-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                {USER_LOG_COLS.map(col => (
                  <th key={col.key} onClick={() => handleSort(col.key)}
                    className="text-left py-3 px-3 text-[10px] font-bold text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground select-none transition-colors group">
                    <span className="flex items-center gap-1">
                      {col.label}
                      <span className={cn("opacity-0 group-hover:opacity-60 text-[8px] transition-opacity", sortCol === col.key && "opacity-100 text-primary")}>
                        {sortCol === col.key ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
                      </span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.id}
                  className={cn("border-b border-border/40 hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-white" : "bg-muted/5")}>
                  <td className="py-2.5 px-3 text-primary font-bold">{row.id}</td>
                  <td className="py-2.5 px-3 font-semibold whitespace-nowrap text-foreground">{row.name}</td>
                  <td className="py-2.5 px-3"><StatusBadge status={row.status} /></td>
                  <td className="py-2.5 px-3"><ProgressBar pct={row.processed} status={row.status} /></td>
                  <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap text-[11px]">{row.dateTime}</td>
                  <td className="py-2.5 px-3 font-semibold text-right tabular-nums">{row.delivered}</td>
                  <td className="py-2.5 px-3 font-semibold text-right tabular-nums">{row.opened}</td>
                  <td className={cn("py-2.5 px-3 font-semibold text-right tabular-nums",
                    row.unreached > 100 ? "text-red-500" : row.unreached > 0 ? "text-amber-600" : "text-muted-foreground")}>
                    {row.unreached}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {filtered.length * totalPages} records
            </span>
            <button className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
              <RefreshCw className="size-3" /> Refresh
            </button>
          </div>
          <div className="flex items-center gap-1">
            <PageBtn onClick={() => setPage(p => Math.max(1, p - 1))}><ChevronLeft className="size-3.5" /></PageBtn>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <PageBtn key={p} active={page === p} onClick={() => setPage(p)}>{p}</PageBtn>
            ))}
            <PageBtn onClick={() => setPage(p => Math.min(totalPages, p + 1))}><ChevronRight className="size-3.5" /></PageBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page shell ────────────────────────────────────────────────────────────────

export default function BroadcastPage() {
  return (
    <FilterProvider>
      <BroadcastPageContent />
    </FilterProvider>
  );
}

function BroadcastPageContent() {
  const { filters }  = useFilters();
  const metrics      = React.useMemo(() => generateMetrics(filters), [filters]);
  const b            = metrics.broadcast;
  const showComp     = filters.comparison.enabled;

  // ── Drill-down state ─────────────────────────────────────────────
  const [selectedCampaign, setSelectedCampaign] = React.useState<CampaignRow | null>(null);

  const pct2 = (a: number, total: number) => `${((a / total) * 100).toFixed(1)}%`;

  const CARDS = [
    { label: "BROADCAST SENT",  value: b.sent.value,          pct: undefined,                                 trend: b.sent.trend,          positive: b.sent.positive,          cardBg: "bg-indigo-50",  dotColor: "bg-indigo-500",  barColor: "bg-indigo-500",  barBg: "bg-indigo-200",  barWidth: "100%"                                     },
    { label: "TOTAL AUDIENCE",  value: b.totalAudience.value, pct: pct2(b.totalAudience.value, b.sent.value), trend: b.totalAudience.trend, positive: b.totalAudience.positive, cardBg: "bg-cyan-50",    dotColor: "bg-cyan-500",    barColor: "bg-cyan-500",    barBg: "bg-cyan-200",    barWidth: pct2(b.totalAudience.value, b.sent.value)  },
    { label: "DELIVERED",       value: b.delivered.value,     pct: pct2(b.delivered.value, b.sent.value),     trend: b.delivered.trend,     positive: b.delivered.positive,     cardBg: "bg-purple-50",  dotColor: "bg-purple-500",  barColor: "bg-purple-500",  barBg: "bg-purple-200",  barWidth: pct2(b.delivered.value, b.sent.value)      },
    { label: "READ",            value: b.read.value,          pct: pct2(b.read.value, b.sent.value),          trend: b.read.trend,          positive: b.read.positive,          cardBg: "bg-orange-50",  dotColor: "bg-orange-400",  barColor: "bg-orange-400",  barBg: "bg-orange-200",  barWidth: pct2(b.read.value, b.sent.value)            },
    { label: "REPLIES",         value: b.replies.value,       pct: pct2(b.replies.value, b.sent.value),       trend: b.replies.trend,       positive: b.replies.positive,       cardBg: "bg-pink-50",    dotColor: "bg-pink-500",    barColor: "bg-pink-500",    barBg: "bg-pink-200",    barWidth: pct2(b.replies.value, b.sent.value)        },
    { label: "PAID",            value: b.paid.value,          pct: pct2(b.paid.value, b.sent.value),          trend: b.paid.trend,          positive: b.paid.positive,          cardBg: "bg-emerald-50", dotColor: "bg-emerald-500", barColor: "bg-emerald-500", barBg: "bg-emerald-200", barWidth: pct2(b.paid.value, b.sent.value)            },
  ];

  return (
    <CrmLayout showSubNav={false} showMetrics={false}>
      <div className="space-y-5">

        {/* 6 metric cards — always visible on both views */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CARDS.map(c => <BroadcastCard key={c.label} {...c} showComparison={showComp} />)}
        </div>

        {/* View toggle: Campaign Log ↔ Broadcast Detail */}
        {selectedCampaign ? (
          <BroadcastDetailView
            campaign={selectedCampaign}
            onBack={() => setSelectedCampaign(null)}
          />
        ) : (
          <CampaignLog onSelect={setSelectedCampaign} />
        )}

      </div>
    </CrmLayout>
  );
}
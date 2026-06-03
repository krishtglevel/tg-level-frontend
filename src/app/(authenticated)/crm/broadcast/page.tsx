"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { TrendingUp, TrendingDown, Download, MoreVertical, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilters, generateMetrics, FilterProvider } from "@/components/crm/FilterContext";
import { format } from "date-fns";

// ─── Types ────────────────────────────────────────────────────────────────────

type LogStatus = "DELIVERED" | "SENT" | "PENDING" | "FAILED";

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

// ─── Seeded RNG (local, for user-log generation only) ─────────────────────────

function mkRand(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(31, h) + seed.charCodeAt(i); h |= 0; }
  return () => { h ^= h << 13; h ^= h >> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
}

// ─── Generate user logs from filter seed ─────────────────────────────────────

function generateUserLogs(filters: any, count = 13): UserLogRow[] {
  const seed = `logs-${filters.timeframe.start}-${filters.timeframe.end}-${filters.assignment}-${filters.source}`;
  const rand = mkRand(seed);

  const STATUSES: LogStatus[] = ["DELIVERED", "SENT", "PENDING", "FAILED"];
  const NAMES = [
    "Alex Johnson", "Maria Garcia", "David Kim", "Priya Patel",
    "Chris Evans", "Sneha Rao", "Tom Hardy", "Aisha Malik",
    "Jake Turner", "Nadia Bloom", "Sam Fisher", "Lena Zhou", "Raj Mehta",
  ];
  // Bias statuses by source
  const bias = filters.source === "All Sources" ? 0 :
    filters.source === "Website" ? 0.1 :
    filters.source === "Referral" ? -0.2 : 0.05;

  return Array.from({ length: count }, (_, i) => {
    const statusRoll = rand() + bias;
    const status: LogStatus =
      statusRoll > 0.75 ? "DELIVERED" :
      statusRoll > 0.5  ? "SENT" :
      statusRoll > 0.25 ? "PENDING" : "FAILED";

    const proc = status === "DELIVERED" ? 100 : Math.round(rand() * 95 + 5);
    const del = Math.round(rand() * 50000 + 500);
    const opened = Math.round(del * (0.3 + rand() * 0.5));
    const unr = status === "FAILED" ? Math.round(rand() * 1500) : Math.round(rand() * 50);

    const days = Math.floor(rand() * 7);
    const baseDate = new Date(filters.timeframe.end);
    baseDate.setDate(baseDate.getDate() - days);
    const hour = Math.floor(rand() * 12 + 8);
    const min = Math.floor(rand() * 60);
    const h12 = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";

    return {
      id: `#${i + 1}`,
      name: NAMES[i % NAMES.length],
      status,
      processed: proc,
      dateTime: `${format(baseDate, "MMM dd, yyyy")} · ${String(h12).padStart(2, "0")}:${String(min).padStart(2, "0")} ${ampm}`,
      delivered: del.toLocaleString(),
      opened: opened.toLocaleString(),
      unreached: unr,
    };
  });
}

// ─── Generate broadcast-specific name/type from seed ─────────────────────────

function getBroadcastMeta(filters: any) {
  const rand = mkRand(`meta-${filters.timeframe.start}-${filters.source}`);
  const NAMES = ["SUMMER PROMO BLAST", "LEAD NURTURE 2025", "Q2 FOLLOW-UP", "WELCOME SERIES", "WIN-BACK CAMPAIGN", "FLASH SALE ALERT"];
  const TYPES = ["Immediate", "Scheduled", "Recurring"];
  const STATUSES = ["Completed", "In Progress", "Scheduled"];
  return {
    name: NAMES[Math.floor(rand() * NAMES.length)],
    type: TYPES[Math.floor(rand() * TYPES.length)],
    status: STATUSES[Math.floor(rand() * STATUSES.length)],
  };
}

// ─── Status badge config ──────────────────────────────────────────────────────

const STATUS_CFG: Record<LogStatus, { dot: string; text: string; bg: string; bar: string }> = {
  DELIVERED: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50",  bar: "bg-emerald-500" },
  SENT:      { dot: "bg-blue-500",    text: "text-blue-700",    bg: "bg-blue-50",     bar: "bg-blue-500"    },
  PENDING:   { dot: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50",    bar: "bg-amber-400"   },
  FAILED:    { dot: "bg-red-500",     text: "text-red-700",     bg: "bg-red-50",      bar: "bg-red-500"     },
};

// ─── Metric card ──────────────────────────────────────────────────────────────

interface BroadcastCardProps {
  label: string;
  value: number;
  pct?: string;
  trend: string;
  positive: boolean;
  showComparison: boolean;
  cardBg: string;
  dotColor: string;
  barColor: string;
  barBg: string;
  barWidth: string;
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

// ─── Live status indicator ────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-widest text-white bg-red-500 px-2 py-0.5 rounded">
      <span className="size-1.5 rounded-full bg-white animate-pulse" />
      LIVE
    </span>
  );
}

// ─── Active filter banner ─────────────────────────────────────────────────────

// function FilterBanner({ filters }: { filters: any }) {
//   const start = format(new Date(filters.timeframe.start), "dd MMM");
//   const end   = format(new Date(filters.timeframe.end),   "dd MMM yyyy");
//   return (
//     <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground bg-muted/30 rounded-xl px-4 py-2.5 border border-border">
//       <span className="font-semibold text-foreground">Active filters:</span>
//       <span className="bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-md">{start} – {end}</span>
//       <span className="text-border">·</span>
//       <span>{filters.dateBasis}</span>
//       <span className="text-border">·</span>
//       <span>{filters.assignment}</span>
//       <span className="text-border">·</span>
//       <span>{filters.source}</span>
//       {filters.comparison.enabled && (
//         <>
//           <span className="text-border">·</span>
//           <span className="text-primary font-semibold">vs {filters.comparison.value}</span>
//         </>
//       )}
//       <LiveBadge />
//     </div>
//   );
// }

// ─── Broadcast detail card ────────────────────────────────────────────────────

function BroadcastDetail({ filters }: { filters: any }) {
  const meta  = React.useMemo(() => getBroadcastMeta(filters), [filters.timeframe.start, filters.source]);
  const start = format(new Date(filters.timeframe.start), "dd/MM/yyyy");
  const end   = format(new Date(filters.timeframe.end),   "dd/MM/yyyy");

  const statusColor =
    meta.status === "Completed"  ? "text-emerald-600 bg-emerald-50 border-emerald-200" :
    meta.status === "In Progress"? "text-blue-600 bg-blue-50 border-blue-200" :
                                   "text-amber-600 bg-amber-50 border-amber-200";

  const rows: [string, React.ReactNode][] = [
    ["Broadcast Name",   <span className="font-semibold text-foreground">{meta.name}</span>],
    ["Broadcast Type",   meta.type],
    ["Date Range",       `${start} – ${end}`],
    ["Date Basis",       filters.dateBasis],
    ["Assignment",       filters.assignment],
    ["Source Filter",    filters.source],
    ["Status",           <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border", statusColor)}><span className="size-1.5 rounded-full bg-current" />{meta.status}</span>],
    ["Download Report",  <a href="#" className="text-primary font-semibold hover:underline inline-flex items-center gap-1 text-[13px]"><Download className="size-3.5" />Download CSV</a>],
  ];

  return (
    <div className="card-elevated rounded-2xl p-6">
      <h2 className="text-[16px] font-bold mb-5">Broadcast Detail</h2>
      <div className="grid grid-cols-[max-content_1fr] gap-x-12 gap-y-3.5 text-[13px]">
        {rows.map(([label, value]) => (
          <React.Fragment key={String(label)}>
            <span className="font-semibold text-muted-foreground whitespace-nowrap">{label}</span>
            <span className="text-foreground">{value}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Delivery report table ────────────────────────────────────────────────────

function DeliveryReport({ metrics, filters }: { metrics: any; filters: any }) {
  const b      = metrics.broadcast;
  const start  = format(new Date(filters.timeframe.start), "dd/MM/yyyy");
  const end    = format(new Date(filters.timeframe.end),   "dd/MM/yyyy");
  const undeliv = Math.max(0, b.sent.value - b.delivered.value);
  const delivRate = ((b.delivered.value / b.sent.value) * 100).toFixed(1);
  const readRate  = ((b.read.value / b.sent.value) * 100).toFixed(1);

  return (
    <div className="card-elevated rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[16px] font-bold">Broadcast Delivery Report</h2>
        <span className="text-[11px] text-muted-foreground">{start} – {end}</span>
      </div>

      {/* Summary KPIs above table */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Delivery Rate", value: `${delivRate}%`, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Read Rate",     value: `${readRate}%`,  color: "text-blue-600",    bg: "bg-blue-50"    },
          { label: "Undelivered",   value: undeliv.toLocaleString(), color: "text-red-600", bg: "bg-red-50" },
          { label: "Total Sent",    value: b.sent.value.toLocaleString(), color: "text-purple-600", bg: "bg-purple-50" },
        ].map((k) => (
          <div key={k.label} className={cn("rounded-xl p-3 text-center", k.bg)}>
            <div className={cn("text-[18px] font-black", k.color)}>{k.value}</div>
            <div className="text-[10px] font-semibold text-gray-500 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-muted/40">
              {["Date Range", "Sent", "Delivered", "Undelivered", "Read", "Replies", "Paid"].map((h) => (
                <th key={h} className="border border-border px-4 py-3 text-center font-semibold text-foreground text-[12px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-muted/20 transition-colors">
              <td className="border border-border px-4 py-3.5 text-center text-muted-foreground font-medium whitespace-nowrap">{start} – {end}</td>
              <td className="border border-border px-4 py-3.5 text-center font-semibold">{b.sent.value.toLocaleString()}</td>
              <td className="border border-border px-4 py-3.5 text-center font-semibold text-emerald-600">{b.delivered.value.toLocaleString()}</td>
              <td className="border border-border px-4 py-3.5 text-center font-semibold text-red-500">{undeliv.toLocaleString()}</td>
              <td className="border border-border px-4 py-3.5 text-center font-semibold text-blue-600">{b.read.value.toLocaleString()}</td>
              <td className="border border-border px-4 py-3.5 text-center font-semibold text-purple-600">{b.replies.value.toLocaleString()}</td>
              <td className="border border-border px-4 py-3.5 text-center font-semibold text-green-600">{b.paid.value.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── User logs table ──────────────────────────────────────────────────────────

function UserLogs({ filters }: { filters: any }) {
  const [tab, setTab]         = React.useState<"All" | "Scheduled" | "Completed">("All");
  const [page, setPage]       = React.useState(1);
  const [sortCol, setSortCol] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const totalPages = 5;

  // Reset to page 1 when filters change
  React.useEffect(() => { setPage(1); }, [filters.timeframe.start, filters.timeframe.end, filters.source, filters.assignment]);

  const allLogs = React.useMemo(() => generateUserLogs(filters), [
    filters.timeframe.start, filters.timeframe.end, filters.assignment, filters.source,
  ]);

  const filtered = tab === "All"       ? allLogs :
                   tab === "Completed" ? allLogs.filter(r => r.status === "DELIVERED") :
                                         allLogs.filter(r => r.status === "PENDING" || r.status === "SENT");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const COLS = [
    { key: "id",        label: "User ID"       },
    { key: "name",      label: "Name"          },
    { key: "status",    label: "Status"        },
    { key: "processed", label: "Processed %"   },
    { key: "dateTime",  label: "Date & Time"   },
    { key: "delivered", label: "Delivered"     },
    { key: "opened",    label: "Opened"        },
    { key: "unreached", label: "Unreached"     },
  ];

  return (
    <div className="card-elevated rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[16px] font-bold">User Logs</h2>
          <LiveBadge />
          <span className="text-[11px] text-muted-foreground">{filtered.length} records</span>
        </div>
        <div className="flex items-center gap-1.5">
          {(["All", "Scheduled", "Completed"] as const).map((t) => (
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
              {COLS.map((col) => (
                <th key={col.key}
                  onClick={() => handleSort(col.key)}
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
            {filtered.map((row, i) => {
              const sc = STATUS_CFG[row.status];
              return (
                <tr key={row.id}
                  className={cn("border-b border-border/40 hover:bg-muted/20 transition-colors",
                    i % 2 === 0 ? "bg-white" : "bg-muted/5")}>
                  <td className="py-2.5 px-3 text-primary font-bold">{row.id}</td>
                  <td className="py-2.5 px-3 font-semibold whitespace-nowrap text-foreground">{row.name}</td>
                  <td className="py-2.5 px-3">
                    <span className={cn("inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border border-current/20", sc.bg, sc.text)}>
                      <span className={cn("size-1.5 rounded-full", sc.dot)} />
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2 min-w-[110px]">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-500", sc.bar)} style={{ width: `${row.processed}%` }} />
                      </div>
                      <span className="font-bold text-[11px] text-foreground w-8 shrink-0 tabular-nums">{row.processed}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap text-[11px]">{row.dateTime}</td>
                  <td className="py-2.5 px-3 font-semibold text-right tabular-nums">{row.delivered}</td>
                  <td className="py-2.5 px-3 font-semibold text-right tabular-nums">{row.opened}</td>
                  <td className={cn("py-2.5 px-3 font-semibold text-right tabular-nums",
                    row.unreached > 100 ? "text-red-500" : row.unreached > 0 ? "text-amber-600" : "text-muted-foreground")}>
                    {row.unreached}
                  </td>
                </tr>
              );
            })}
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
          <button onClick={() => setPage(p => Math.max(1, p - 1))}
            className="size-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
            <ChevronLeft className="size-3.5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={cn("size-7 flex items-center justify-center rounded-lg text-[12px] font-semibold transition-colors",
                page === p ? "bg-primary text-white shadow-sm" : "border border-border text-muted-foreground hover:bg-muted/50")}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="size-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Engagement mini chart (derived from broadcast metrics) ───────────────────

function EngagementBreakdown({ metrics, filters }: { metrics: any; filters: any }) {
  const b    = metrics.broadcast;
  const sent = b.sent.value;

  const stages = [
    { label: "Sent",      value: b.sent.value,          pct: 100,                                             color: "bg-indigo-500", textColor: "text-indigo-600" },
    { label: "Audience",  value: b.totalAudience.value, pct: Math.round(b.totalAudience.value / sent * 100), color: "bg-cyan-500",   textColor: "text-cyan-600"   },
    { label: "Delivered", value: b.delivered.value,     pct: Math.round(b.delivered.value / sent * 100),     color: "bg-purple-500", textColor: "text-purple-600" },
    { label: "Read",      value: b.read.value,          pct: Math.round(b.read.value / sent * 100),          color: "bg-orange-400", textColor: "text-orange-600" },
    { label: "Replied",   value: b.replies.value,       pct: Math.round(b.replies.value / sent * 100),       color: "bg-pink-500",   textColor: "text-pink-600"   },
    { label: "Converted", value: b.paid.value,          pct: Math.round(b.paid.value / sent * 100),          color: "bg-emerald-500",textColor: "text-emerald-600"},
  ];

  return (
    <div className="card-elevated rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[16px] font-bold">Engagement Funnel</h2>
        <span className="text-[11px] text-muted-foreground">{filters.source} · {filters.dateBasis}</span>
      </div>
      <div className="space-y-3">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-muted-foreground w-16 shrink-0 text-right">{s.label}</span>
            <div className="flex-1 h-6 bg-muted/30 rounded-lg overflow-hidden relative">
              <div className={cn("h-full rounded-lg transition-all duration-700 flex items-center justify-end pr-2", s.color)}
                style={{ width: `${Math.max(s.pct, 2)}%` }}>
                <span className="text-[10px] font-bold text-white tabular-nums">{s.pct}%</span>
              </div>
            </div>
            <span className="text-[12px] font-bold text-foreground w-16 shrink-0 tabular-nums text-right">{s.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-[11px] text-muted-foreground">Open Rate</div>
          <div className="text-[16px] font-black text-orange-600">{(b.read.value / b.delivered.value * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[11px] text-muted-foreground">Reply Rate</div>
          <div className="text-[16px] font-black text-pink-600">{(b.replies.value / b.read.value * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[11px] text-muted-foreground">Conversion</div>
          <div className="text-[16px] font-black text-emerald-600">{(b.paid.value / b.sent.value * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────

export default function BroadcastPage() {
  return (
    <FilterProvider>
      <BroadcastPageContent />
    </FilterProvider>
  );
}

function BroadcastPageContent() {
  // Use `filters` (not `activeFilters`) so UI responds to every dropdown change instantly
  const { filters } = useFilters();
  const metrics     = React.useMemo(() => generateMetrics(filters), [filters]);
  const b           = metrics.broadcast;
  const showComp    = filters.comparison.enabled;

  const pct2 = (a: number, total: number) => `${((a / total) * 100).toFixed(1)}%`;

  const CARDS = [
    { label: "BROADCAST SENT",  value: b.sent.value,          pct: undefined,                              trend: b.sent.trend,          positive: b.sent.positive,          cardBg: "bg-indigo-50",  dotColor: "bg-indigo-500", barColor: "bg-indigo-500", barBg: "bg-indigo-200", barWidth: "100%" },
    { label: "TOTAL AUDIENCE",  value: b.totalAudience.value, pct: pct2(b.totalAudience.value, b.sent.value), trend: b.totalAudience.trend, positive: b.totalAudience.positive, cardBg: "bg-cyan-50",    dotColor: "bg-cyan-500",   barColor: "bg-cyan-500",   barBg: "bg-cyan-200",   barWidth: pct2(b.totalAudience.value, b.sent.value) },
    { label: "DELIVERED",       value: b.delivered.value,     pct: pct2(b.delivered.value, b.sent.value),  trend: b.delivered.trend,     positive: b.delivered.positive,     cardBg: "bg-purple-50",  dotColor: "bg-purple-500", barColor: "bg-purple-500", barBg: "bg-purple-200", barWidth: pct2(b.delivered.value, b.sent.value) },
    { label: "READ",            value: b.read.value,          pct: pct2(b.read.value, b.sent.value),       trend: b.read.trend,          positive: b.read.positive,          cardBg: "bg-orange-50",  dotColor: "bg-orange-400", barColor: "bg-orange-400", barBg: "bg-orange-200", barWidth: pct2(b.read.value, b.sent.value) },
    { label: "REPLIES",         value: b.replies.value,       pct: pct2(b.replies.value, b.sent.value),    trend: b.replies.trend,       positive: b.replies.positive,       cardBg: "bg-pink-50",    dotColor: "bg-pink-500",   barColor: "bg-pink-500",   barBg: "bg-pink-200",   barWidth: pct2(b.replies.value, b.sent.value) },
    { label: "PAID",            value: b.paid.value,          pct: pct2(b.paid.value, b.sent.value),       trend: b.paid.trend,          positive: b.paid.positive,          cardBg: "bg-emerald-50", dotColor: "bg-emerald-500",barColor: "bg-emerald-500",barBg: "bg-emerald-200",barWidth: pct2(b.paid.value, b.sent.value) },
  ];

  return (
    <CrmLayout showSubNav={false} showMetrics={false}>
      <div className="space-y-5">

        {/* Live filter banner */}
        {/* <FilterBanner filters={filters} /> */}

        {/* 6 metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CARDS.map((c) => (
            <BroadcastCard key={c.label} {...c} showComparison={showComp} />
          ))}
        </div>

        {/* Engagement funnel horizontal bars */}
        <EngagementBreakdown metrics={metrics} filters={filters} />

        {/* Broadcast detail + delivery report side by side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <BroadcastDetail filters={filters} />
          <DeliveryReport  metrics={metrics} filters={filters} />
        </div>

        {/* User logs */}
        <UserLogs filters={filters} />

      </div>
    </CrmLayout>
  );
}
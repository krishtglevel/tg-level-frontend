"use client";

import * as React from "react";

export interface FilterState {
  timeframe: { start: string; end: string };
  dateBasis: string;
  comparison: { enabled: boolean; value: string };
  teamLead: string;
  assignment: string;
  source: string;
}

interface FilterContextType {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  activeFilters: FilterState;
}

export const defaultFilters: FilterState = {
  timeframe: { start: "2025-05-04", end: "2025-05-10" },
  dateBasis: "Lead Created",
  comparison: { enabled: true, value: "Prev 7 Days" },
  teamLead: "All Leads",
  assignment: "All Agents",
  source: "All Sources",
};

// ─── Seeded random ────────────────────────────────────────────────────────────

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
    h |= 0;
  }
  return () => {
    h ^= h << 13;
    h ^= h >> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
}

function pct2(a: number, b: number) {
  if (!b) return "0.0%";
  return `${((a / b) * 100).toFixed(1)}%`;
}

// ─── Agents & colors ──────────────────────────────────────────────────────────

const AGENTS = [
  { name: "Jordan Smith",    title: "Enterprise Lead",       initials: "JS", avatarBg: "bg-slate-500"  },
  { name: "Sarah Chen",      title: "Senior Account Exec",   initials: "SC", avatarBg: "bg-amber-500"  },
  { name: "Marcus Voe",      title: "Mid-Market Specialist", initials: "MV", avatarBg: "bg-gray-600"   },
  { name: "Elena Rodriguez", title: "Inside Sales Manager",  initials: "ER", avatarBg: "bg-rose-400"   },
  { name: "James Wilson",    title: "Enterprise Sales",      initials: "JW", avatarBg: "bg-indigo-500" },
  { name: "Lila Thorne",     title: "Solutions Consultant",  initials: "LT", avatarBg: "bg-teal-500"   },
];

const BAR_COLORS = [
  "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600",
  "bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500",
  "bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700",
  "bg-blue-700",
  "bg-green-500",
  "bg-purple-500",
];

function generateLeaderboard(seed: string, mul: number) {
  const rand = seededRandom(seed + "lb");
  const base = 1200000 * mul;

  const shuffled = [...AGENTS]
    .map((a) => ({ ...a, score: rand() }))
    .sort((a, b) => b.score - a.score);

  return shuffled.map((agent, i) => {
    const target    = Math.round((base * (0.6 + rand() * 0.6)) / 1000) * 1000;
    const progress  = Math.round(60 + rand() * 38);
    const revenue   = Math.round((target * progress) / 100 / 1000) * 1000;
    const deals     = Math.round(5 + rand() * 12);
    const revStr    = revenue >= 1000000 ? `₹${(revenue / 1000000).toFixed(2)}M` : `₹${(revenue / 1000).toFixed(0)}k`;
    const tgtStr    = target >= 1000000 ? `₹${(target / 1000000).toFixed(1)}M` : `₹${(target / 1000).toFixed(0)}k`;
    const dealRev   = `₹${(deals * 1200 * (0.8 + rand() * 0.4)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const change    = `+${(rand() * 8 + 0.5).toFixed(1)}%`;

    return {
      rank:        i + 1,
      name:        agent.name,
      title:       agent.title,
      initials:    agent.initials,
      avatarBg:    agent.avatarBg,
      progress,
      revenue:     revStr,
      target:      tgtStr,
      deals,
      dealRevenue: dealRev,
      change,
      barColor:    BAR_COLORS[i] ?? "bg-blue-500",
      weekChange:  i === 0 ? `+${Math.round(rand() * 5 + 1)}% THIS WEEK` : "",
    };
  });
}

// ─── Main metrics generator ───────────────────────────────────────────────────

export function generateMetrics(filters: FilterState) {
  const seed = `${filters.timeframe.start}-${filters.timeframe.end}-${filters.dateBasis}-${filters.teamLead}-${filters.assignment}-${filters.source}`;
  const rand = seededRandom(seed);

  const start = new Date(filters.timeframe.start);
  const end   = new Date(filters.timeframe.end);
  const days  = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
  const mul = days / 7;

  const base = (b: number) => Math.round(b * mul * (0.7 + rand() * 0.6));
  const sign = (n: number) => (n >= 0 ? `+${n}` : `${n}`);
  const pct  = () => sign(Math.round((rand() * 30 - 10) * 10) / 10);

  // Broadcast funnel
  const broadcastSent  = base(3250);
  const totalAudience  = Math.round(broadcastSent  * (0.55 + rand() * 0.25));
  const delivered      = Math.round(totalAudience  * (0.4  + rand() * 0.3));
  const read           = Math.round(delivered      * (0.35 + rand() * 0.25));
  const replies        = Math.round(read           * (0.25 + rand() * 0.2));
  const paid           = Math.round(replies        * (0.3  + rand() * 0.2));

  // Sales funnel
  const totalLeads     = base(1240);
  const qualified      = Math.round(totalLeads     * (0.55 + rand() * 0.2));
  const contacted      = Math.round(qualified      * (0.6  + rand() * 0.2));
  const demoScheduled  = Math.round(contacted      * (0.4  + rand() * 0.2));
  const proposalsSent  = Math.round(demoScheduled  * (0.45 + rand() * 0.2));
  const dealsClosed    = Math.round(proposalsSent  * (0.35 + rand() * 0.2));

  return {
    days,
    broadcast: {
      sent:          { value: broadcastSent,  trend: pct(), positive: rand() > 0.4 },
      totalAudience: { value: totalAudience,  pct: pct2(totalAudience, broadcastSent), trend: pct(), positive: rand() > 0.4 },
      delivered:     { value: delivered,      pct: pct2(delivered,     broadcastSent), trend: pct(), positive: rand() > 0.4 },
      read:          { value: read,           pct: pct2(read,          broadcastSent), trend: pct(), positive: rand() > 0.4 },
      replies:       { value: replies,        pct: pct2(replies,       broadcastSent), trend: pct(), positive: rand() > 0.4 },
      paid:          { value: paid,           pct: pct2(paid,          broadcastSent), trend: pct(), positive: rand() > 0.4 },
    },
    funnel: {
      totalLeads:    { value: totalLeads,    trend: pct(), positive: rand() > 0.4 },
      qualified:     { value: qualified,     trend: pct(), positive: rand() > 0.4 },
      contacted:     { value: contacted,     trend: pct(), positive: rand() > 0.4 },
      demoScheduled: { value: demoScheduled, trend: pct(), positive: rand() > 0.4 },
      proposalsSent: { value: proposalsSent, trend: pct(), positive: rand() > 0.4 },
      dealsClosed:   { value: dealsClosed,   trend: pct(), positive: rand() > 0.4 },
    },
    leaderboard: generateLeaderboard(seed, mul),
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters]             = React.useState<FilterState>(defaultFilters);
  const [activeFilters, setActiveFilters] = React.useState<FilterState>(defaultFilters);

  const updateFilter = React.useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = React.useCallback(() => {
    setFilters(defaultFilters);
    setActiveFilters(defaultFilters);
  }, []);

  const applyFilters = React.useCallback(() => {
    setActiveFilters({ ...filters });
  }, [filters]);

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters, applyFilters, activeFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = React.useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider");
  return ctx;
}
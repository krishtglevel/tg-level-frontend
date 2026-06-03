"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, Phone, Video, ChevronLeft, ChevronRight,
  MoreHorizontal, Send, Bold, Italic, Underline,
  Link as LinkIcon, Smile, List, AlignLeft, Undo, Redo,
  Strikethrough, CheckCircle, Activity, RefreshCw,
  Clock, Bell, Settings, Plus, Hash, FileText,
  AlertTriangle, MessageSquare, Filter, Calendar,
  ChevronDown, ArrowUpRight, ArrowDownRight, Users,
  TrendingDown, AlertCircle, TimerReset, Mic,
  BarChart2, PlusCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface Conversation {
  id: number; name: string; preview: string; time: string;
  unread: number; online: boolean;
  tags: { label: string; color: string }[];
}
interface FunnelStat {
  label: string;
  value: string;
  percentage?: string;
  trend: string;
  positive: boolean;
  cardBg: string;
  dotColor: string;
  barColor: string;
  barBg: string;
  barWidth: string;
}
// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA — Lead Funnel / My Chats
// ─────────────────────────────────────────────────────────────────────────────
const conversations: Conversation[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: "Sarah Jenkins",
  preview: '"please wait our team member will connect with..."',
  time: "2 Min Ago",
  unread: 1,
  online: true,
  tags: [
    { label: "Hot lead", color: "green" },
    { label: "Connected", color: "blue" },
    { label: "Fail, not pick up", color: "orange" },
  ],
}));

const funnelStats: FunnelStat[] = [
  {
    label: "LEADS CREATED",
    value: "3,250",
    percentage: undefined,
    trend: "+8.7%",
    positive: true,
    cardBg: "bg-indigo-100",
    dotColor: "bg-indigo-500",
    barColor: "bg-indigo-500",
    barBg: "bg-indigo-200",
    barWidth: "100%",
  },
  {
    label: "CONTACTED",
    value: "2,210",
    percentage: "67.9%",
    trend: "+6.1%",
    positive: true,
    cardBg: "bg-cyan-100",
    dotColor: "bg-cyan-500",
    barColor: "bg-cyan-500",
    barBg: "bg-cyan-200",
    barWidth: "68%",
  },
  {
    label: "INTERESTED",
    value: "1,420",
    percentage: "43.7%",
    trend: "-4.3%",
    positive: false,
    cardBg: "bg-purple-100",
    dotColor: "bg-purple-500",
    barColor: "bg-purple-500",
    barBg: "bg-purple-200",
    barWidth: "44%",
  },
  {
    label: "TRIAL ACTIVE",
    value: "720",
    percentage: "22.2%",
    trend: "-8.9%",
    positive: false,
    cardBg: "bg-orange-100",
    dotColor: "bg-orange-400",
    barColor: "bg-orange-400",
    barBg: "bg-orange-200",
    barWidth: "22%",
  },
  {
    label: "PAYMENT INTENT",
    value: "310",
    percentage: "9.5%",
    trend: "-11.2%",
    positive: false,
    cardBg: "bg-pink-100",
    dotColor: "bg-pink-500",
    barColor: "bg-pink-500",
    barBg: "bg-pink-200",
    barWidth: "10%",
  },
  {
    label: "PAID",
    value: "132",
    percentage: "4.1%",
    trend: "-9.6%",
    positive: false,
    cardBg: "bg-green-100",
    dotColor: "bg-green-500",
    barColor: "bg-green-500",
    barBg: "bg-green-200",
    barWidth: "4%",
  },
];

const messages = [
  { id: 1, from: "lead", text: "Hi Amit, I want to learn trading but I am very afraid of losing money.", time: "10:58 AM" },
  { id: 2, from: "agent", text: "Hello Rahul, don't worry. We teach risk management and discipline first. Very safe to start.", time: "11:00 AM" },
  { id: 3, from: "lead", text: "Okay, I want to know about 3 month plan.", time: "11:02 AM" },
  { id: 4, from: "agent", type: "card", time: "11:05 AM" },
  { id: 5, from: "lead", text: "Yes, I am interested in 3 month plan. How can I join?", time: "11:15 AM" },
];

const recentCalls = [
  { time: "Today, 11:15 AM", mode: "App Chat", status: "Call Pending", statusColor: "#943700", duration: "—" },
  { time: "Today, 10:20 AM", mode: "Mediasoup", status: "Call Done", statusColor: "#10B981", duration: "05:32" },
  { time: "Today, 09:45 AM", mode: "VC Dialer", status: "Ringing", statusColor: "#2563EB", duration: "—" },
];

const trades = [
  { badge: "FREE DEMO ANALYSIS", badgeColor: "#004AC6", title: "*BUY NIFTY 16 DEC 26200 PE*", entry: "200", sl: "185", t1: "212", t2: "PAID STUDENTS ONLY", time: "9:30 AM", exp: "NF2", closeTime: "11:30 AM" },
  { badge: "EXPIRED USER TRIAL", badgeColor: "#943700", title: "*BUY BANKNIFTY 16 DEC 48500 CE*", entry: "420", sl: "390", t1: "460", t2: "PRO SUBSCRIBERS", time: "10:15 AM", exp: "EF3", closeTime: "12:05 PM" },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA — Leads Sub Page (Hot Leads / Payment Pending)
// ─────────────────────────────────────────────────────────────────────────────
const leadsData = [
  { id: "#1", name: "Rahul Sharma", sub: "Bank Nifty Trader", score: 92, stage: "Pricing Discussed", risk: "High", source: "Instagram" },
  { id: "#2", name: "Anjali Patel", sub: "New Trader - Intraday", score: 78, stage: "Need Identified", risk: "Medium", source: "Webinar" },
  { id: "#3", name: "Vikram Kumar", sub: "Swing Trader", score: 91, stage: "Payment Pending", risk: "Critical", source: "Referral" },
  { id: "#4", name: "Vikram Kumar", sub: "Swing Trader", score: 91, stage: "Payment Pending", risk: "Critical", source: "Referral" },
  { id: "#5", name: "Vikram Kumar", sub: "Swing Trader", score: 91, stage: "Payment Pending", risk: "Critical", source: "Referral" },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA — SLA Alerts
// ─────────────────────────────────────────────────────────────────────────────
const slaAlerts = [
  {
    type: "Payment Pending - 72H", typeColor: "#BA1A1A", status: "OVERDUE", statusColor: "#BA1A1A",
    icon: "clock",
    lead: "Vikram Kumar", leadSub: "Enterprise Plan", initials: "VK",
    rule: "Payment Pending > 48h",
    triggered: "12 May 2025", triggeredTime: "10:30 AM",
    priority: "HIGH", priorityColor: "#BA1A1A", priorityBg: "#FFDAD6",
  },
  {
    type: "No Response - 24H", typeColor: "#BA1A1A", status: "OVERDUE", statusColor: "#BA1A1A",
    icon: "noresponse",
    lead: "Anjali Patel", leadSub: "Last: 12 May 2025", initials: "AP",
    rule: "No Response - 24h",
    triggered: "13 May 2025", triggeredTime: "09:15 AM",
    priority: "MEDIUM", priorityColor: "#944E00", priorityBg: "#FFDDB3",
  },
  {
    type: "Trial Expiry Reminder", typeColor: "#944E00", status: "DUE SOON", statusColor: "#944E00",
    icon: "timer",
    lead: "Pooja Singh", leadSub: "Expires: 14 May", initials: "PS",
    rule: "Trial Expiry Reminder",
    triggered: "10h 30m", triggeredTime: "",
    priority: "MEDIUM", priorityColor: "#944E00", priorityBg: "#FFDDB3",
  },
  {
    type: "Follow-up Overdue", typeColor: "#1D4ED8", status: "DUE SOON", statusColor: "#1D4ED8",
    icon: "followup",
    lead: "Raj Malhotra", leadSub: "Standard Plan", initials: "RM",
    rule: "Follow-up Overdue",
    triggered: "5h 10m", triggeredTime: "",
    priority: "LOW", priorityColor: "#166534", priorityBg: "#D1FAE5",
  },
  {
    type: "Funnel Drop Risk", typeColor: "#BA1A1A", status: "RISK", statusColor: "#BA1A1A",
    icon: "funneldrop",
    lead: "Aarav Gupta", leadSub: "Proposal Sent", initials: "AG",
    rule: "Funnel Drop Risk",
    triggered: "Since 6 May 2025", triggeredTime: "(9 Days Overdue)",
    priority: "HIGH", priorityColor: "#BA1A1A", priorityBg: "#FFDAD6",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA — Follow-ups
// ─────────────────────────────────────────────────────────────────────────────
const followUpsData = [
  { id: "#US-9210", name: "Rahul Sharma", sub: "Bank Nifty Trader", score: 92, stage: "Pricing Discussed", risk: "High", source: "Instagram" },
  { id: "#US-7840", name: "Anjali Patel", sub: "New Trader Intraday", score: 78, stage: "Need Identified", risk: "Medium", source: "Webinar" },
  { id: "#US-9150", name: "Vikram Kumar", sub: "Swing Trader", score: 91, stage: "Payment Pending", risk: "Critical", source: "Referral" },
  { id: "#US-9150", name: "Vikram Kumar", sub: "Swing Trader", score: 91, stage: "Payment Pending", risk: "Critical", source: "Referral" },
  { id: "#US-9150", name: "Vikram Kumar", sub: "Swing Trader", score: 91, stage: "Payment Pending", risk: "Critical", source: "Referral" },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA — TG Connect
// ─────────────────────────────────────────────────────────────────────────────
const tgChannels = [
  { name: "General Announcements", active: true },
  { name: "Sales Team", active: false },
  { name: "Market Updates", active: false },
  { name: "Conversion Tips", active: false },
  { name: "Payment Team", active: false },
];

const tgMessages = [
  { sender: "ATL Sandeep", text: "Team, today market is highly volatile. Focus on risk management and education-led selling.", time: "9:42 AM", isLink: false },
  { sender: "Neha Kapoor", text: "Shared a document: Nifty Market Outlook - 17 May.pdf", time: "9:58 AM", isLink: true },
  { sender: "Rohit Verma", text: "Great analysis. Sharing with my leads.", time: "10:05 AM", isLink: false },
];

const tgFiles = [
  "Intraday Strategy Guide.pdf",
  "Risk Management.xlsx",
  "Option Buying Strategy.pdf",
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function riskBadge(risk: string) {
  const map: Record<string, string> = {
    High: "bg-orange-100 text-orange-700 border border-orange-200",
    Medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    Critical: "bg-red-700 text-white",
    Low: "bg-green-100 text-green-700 border border-green-200",
  };
  return map[risk] ?? "bg-gray-100 text-gray-700";
}

function scoreColor(score: number) {
  if (score >= 90) return "#10B981";
  if (score >= 75) return "#F97316";
  return "#BA1A1A";
}

function Avatar({ initials, size = 34 }: { initials: string; size?: number }) {
  const palette: Record<string, string> = {
    RS: "#3525CD", AP: "#06B6D4", VK: "#A855F7",
    RM: "#F97316", AG: "#EC4899", PS: "#10B981",
    SJ: "#8B5CF6",
  };
  const bg = palette[initials] ?? "#6366F1";
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-[11px] shrink-0"
      style={{ width: size, height: size, background: bg + "22", color: bg, border: `1.5px solid ${bg}55` }}
    >
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPBAR WITH DASHBOARD NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
function ChatTopbar() {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#EDEEF5]">
      <div className="flex items-center bg-white">
        <div className="flex shrink-0 items-center ml-4 mr-8 gap-3">
          
          {/* ✅ Logo with Image */}
          <div className="w-[40px] h-[40px] rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-[#3525CD]">
            {!logoError ? (
              <Image
                src="/logo.jpeg"
                alt="TG Levels Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                onErrorCapture={() => setLogoError(true)} // ✅ Changed from onError
              />
            ) : (
              // Fallback if image fails
              <span className="text-white font-bold text-base">TG</span>
            )}
          </div>

          <div className="flex flex-col shrink-0">
            <span className="text-black text-lg font-bold leading-tight">TG LEVELS</span>
            <span className="text-[#6D6D6D] text-[10px]">CRM</span>
          </div>
        </div>

        {/* rest of topbar stays exactly the same */}
        <div className="flex flex-1 items-center bg-white py-[7px] px-4 gap-8 border-l border-solid border-[#EDEEF5]">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex flex-1 items-center bg-white pl-3 max-w-xs rounded-3xl border border-[#C0C0C0]">
              <Search className="w-4 h-4 text-[#727272] shrink-0 mr-2" />
              <input type="text" placeholder="Search By Name, Number"
                className="flex-1 text-[#727272] bg-transparent text-sm py-2 border-0 outline-none" />
            </div>
            <div className="flex items-center bg-white rounded-[50px] border border-black overflow-hidden">
              <button className="bg-[#3525CD] text-white text-sm font-bold py-2.5 px-10 rounded-[50px] border-0"
                style={{ boxShadow: "0 0 2px #00000057" }}>
                My Chats
              </button>
              <Link href="/crm/dashboard"
                className="text-[#5F6265] text-sm font-bold px-8 hover:text-[#3525CD] transition-colors cursor-pointer">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-black text-sm font-medium leading-tight">First And Last Name</span>
                <span className="text-[#6D6D6D] text-[9px]">Designation</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden">AS</div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center bg-black rounded-full text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FUNNEL STATS BAR
// ─────────────────────────────────────────────────────────────────────────────
function FunnelStatCard({ stat }: { stat: FunnelStat }) {
  return (
    <div className={cn("rounded-2xl p-4 flex flex-col gap-2 min-w-0 transition-all duration-500 flex-1", stat.cardBg)}>
      <div className="flex items-center justify-between">
        <span className={cn("size-2.5 rounded-full shrink-0", stat.dotColor)} />
        <span className={cn("text-[11px] font-bold flex items-center gap-0.5 shrink-0", stat.positive ? "text-green-600" : "text-red-500")}>
          {stat.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {stat.trend}
        </span>
      </div>
      <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase leading-tight">
        {stat.label}
      </p>
      <div className="flex items-baseline gap-1 flex-wrap">
        <span className="text-[22px] font-bold text-gray-800 leading-none">
          {stat.value}
        </span>
        {stat.percentage && <span className="text-[11px] text-gray-500">({stat.percentage})</span>}
      </div>
      <div className={cn("h-1.5 rounded-full mt-1", stat.barBg)}>
        <div className={cn("h-full rounded-full transition-all duration-700", stat.barColor)} style={{ width: stat.barWidth }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSATION ITEM
// ─────────────────────────────────────────────────────────────────────────────
function ConversationItem({ conv, active, onClick }: { conv: Conversation; active: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`flex items-center py-2 px-2 cursor-pointer rounded-lg mx-1 transition-colors ${active ? "bg-[#F5F2FF]" : "hover:bg-gray-50"}`}>
      <div className="relative shrink-0 mr-2.5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">SJ</div>
        {conv.online && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#00D064] rounded-full border-2 border-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[#191B23] text-xs font-bold truncate">{conv.name}</span>
          {conv.unread > 0 && <span className="bg-[#008080] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0">{conv.unread}</span>}
        </div>
        <p className="text-[#838383] text-[9px] truncate mb-1">{conv.preview}</p>
        <div className="flex items-center gap-1 flex-wrap">
          {conv.tags.map((tag, i) => (
            <span key={i} className={`text-[8px] px-1.5 py-0.5 rounded-full border ${active
              ? tag.color === "green" ? "bg-green-100 text-green-700 border-green-200"
              : tag.color === "blue" ? "bg-blue-100 text-blue-700 border-blue-200"
              : "bg-orange-100 text-orange-700 border-orange-200"
              : "bg-white text-gray-600 border-[#C0C0C0]"}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
      <button className="shrink-0 ml-1"><Phone className="w-3.5 h-3.5 text-gray-400" /></button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAN CARD (chat bubble card)
// ─────────────────────────────────────────────────────────────────────────────
function PlanCard() {
  return (
    <div className="flex flex-col bg-white rounded-[13px] border border-[#C7C4D8] shadow-sm overflow-hidden self-end mr-4 max-w-[210px]">
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[#1B1B24] text-xs font-bold">3 Month Learning Plan</span>
          <span className="text-base">📋</span>
        </div>
        <div className="flex flex-col gap-1">
          {["Live Classes", "1 Lot Strategy", "Trading Psychology", "Community Support"].map(item => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-[#3525CD] shrink-0" />
              <span className="text-[#464555] text-[11px]">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#EAE6F4] py-1.5 text-center">
        <span className="text-[#3525CD] text-[10px] font-bold">View Plan Details</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRADE CARD
// ─────────────────────────────────────────────────────────────────────────────
function TradeCard({ trade }: { trade: typeof trades[0] }) {
  return (
    <div className="flex bg-white rounded-lg border border-[#C3C6D7] overflow-hidden">
      <div className="flex-1 p-3">
        <p className="text-[9px] font-bold mb-1" style={{ color: trade.badgeColor }}>{trade.badge}</p>
        <p className="text-[#191B23] text-[11px] font-bold mb-1.5">{trade.title}</p>
        <div className="flex flex-col gap-0.5 text-[10px]">
          {[["Entry Above:", trade.entry, "#191B23"], ["SL:", trade.sl, "#BA1A1A"], ["Target 1:", trade.t1, "#004AC6"]].map(([label, val, col]) => (
            <div key={label as string} className="flex gap-1.5">
              <span className="text-[#737686]">{label}</span>
              <span className="font-bold" style={{ color: col as string }}>{val}</span>
            </div>
          ))}
          <div className="flex gap-1.5 mt-0.5"><span className="text-[#737686]">Target 2:</span><span className="text-[9px] bg-[#EDEDF9] text-[#737686] px-1.5 rounded">{trade.t2}</span></div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-gray-50 p-2.5 gap-2.5 border-l border-[#C3C6D7]">
        <div className="flex flex-col items-center gap-0.5"><Clock className="w-3 h-3 text-[#737686]" /><span className="text-[#191B23] text-[10px] font-bold">{trade.time}</span></div>
        <div className="flex flex-col items-center gap-0.5"><Activity className="w-3 h-3 text-[#737686]" /><span className="text-[#191B23] text-[10px] font-bold">{trade.exp}</span></div>
        <div className="flex flex-col items-center gap-0.5"><Clock className="w-3 h-3 text-[#C3C6D7]" /><span className="text-[#737686] text-[9px]">{trade.closeTime}</span></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLAPSIBLE SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function CollapsibleSection({
  id,
  title,
  isExpanded,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#191B23] text-[11px] font-bold">{title}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#737686] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      {isExpanded && (
        <div className="bg-gray-50/50 border-t border-gray-100 max-h-64 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RIGHT PANEL CONTENT — WITH INDEPENDENT SCROLLING
// ─────────────────────────────────────────────────────────────────────────────
function RightPanelContent({ rightTab }: { rightTab: string }) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["meta", "status", "mood", "callStatus"])
  );

  const toggleSection = (id: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedSections(newSet);
  };

  if (rightTab === "Insights") {
    return (
      <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
        <div className="bg-gradient-to-br from-[#3525CD] to-[#2910B9] rounded-xl p-4 text-white flex-shrink-0">
          <p className="text-xs font-bold mb-2">Lead Engagement Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">8.5</span>
            <span className="text-xs opacity-90">/10</span>
          </div>
          <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: "85%" }} />
          </div>
          <p className="text-[10px] mt-2 opacity-80">Based on chat frequency and response time</p>
        </div>

        {/* <div className="bg-[#F3F3FE] rounded-xl p-4 border border-[#E0D9FF] flex-shrink-0">
          <p className="text-[#191B23] text-[11px] font-bold mb-3">Interaction Metrics</p>
          <div className="space-y-3">
            {[
              { label: "Messages Sent", value: "24", trend: "+12%" },
              { label: "Response Rate", value: "94%", trend: "+5%" },
              { label: "Avg Response Time", value: "2.5 min", trend: "-30%" },
              { label: "Last Interaction", value: "10 mins ago", trend: "Live" },
            ].map((metric, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-white/50 last:border-0">
                <span className="text-[#737686] text-[10px]">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#191B23] text-[11px] font-bold">{metric.value}</span>
                  <span className={`text-[9px] font-bold ${metric.trend.includes("+") ? "text-emerald-600" : "text-orange-600"}`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="bg-[#F3F3FE] rounded-xl p-4 border border-[#E0D9FF] flex-shrink-0">
          <p className="text-[#191B23] text-[11px] font-bold mb-3">Recommended Actions</p>
          <div className="space-y-2">
            {[
              "Send payment reminder (overdue 2 days)",
              "Schedule follow-up call",
              "Share case study on Bank Nifty strategies",
              "Offer limited-time discount (expires in 3 days)"
            ].map((action, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-white rounded-lg border border-[#E0D9FF] hover:border-[#3525CD33] cursor-pointer transition-colors">
                <div className="w-4 h-4 rounded-full border-2 border-[#3525CD] flex-shrink-0 mt-0.5" />
                <span className="text-[#464555] text-[10px]">{action}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Call Status Section */}
      <CollapsibleSection
        id="callStatus"
        title="Call Status"
        isExpanded={expandedSections.has("callStatus")}
        onToggle={() => toggleSection("callStatus")}
      >
        <div className="px-4 py-3">
          <div className="bg-orange-50 border border-orange-200 rounded-xl py-3 px-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <p className="text-[#943700] text-[10px] font-bold">Call Pending</p>
            </div>
            <p className="text-[#737686] text-[10px]">Next call scheduled for:</p>
            <p className="text-[#191B23] text-[11px] font-bold">Today, 12:00 PM</p>
            <button className="mt-2 bg-orange-500 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Initiate Call Now
            </button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Calls Summary Section */}
      <CollapsibleSection
        id="callSummary"
        title="Calls Summary"
        isExpanded={expandedSections.has("callSummary")}
        onToggle={() => toggleSection("callSummary")}
      >
        <div className="px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {[
              ["Call Done", "3", "emerald"],
              ["Hanged Up", "1", "red"],
              ["Missed", "0", "gray"],
              ["Call Pending", "1", "orange"],
              ["Ringing", "1", "blue"]
            ].map(([label, count, color]) => (
              <div key={label} className={`text-[9px] px-3 py-2 rounded-lg border font-bold ${
                color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                color === "red" ? "bg-red-50 text-red-700 border-red-200" :
                color === "orange" ? "bg-orange-50 text-orange-700 border-orange-200" :
                color === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" :
                "bg-gray-50 text-gray-700 border-gray-200"
              }`}>
                {label}: <span className="ml-1">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>


      {/* Notes Section */}
      <CollapsibleSection
        id="notes"
        title="Notes & Comments"
        isExpanded={expandedSections.has("notes")}
        onToggle={() => toggleSection("notes")}
      >
        <div className="px-4 py-3 space-y-3">
          {[
            {
              badge: "CONVERTED",
              badgeBg: "#D0E1FB",
              badgeText: "#54647A",
              time: "Just Now",
              text: "User converted after understanding the product benefits and confirming solution matches requirements."
            },
            {
              badge: "INTERESTED",
              badgeBg: "#E8D5FF",
              badgeText: "#5A3E8C",
              time: "2 hours ago",
              text: "User showed interest in 3-month plan after comparing with competitors."
            },
            {
              badge: "FOLLOW UP",
              badgeBg: "#FFE4D0",
              badgeText: "#7D2D00",
              time: "Yesterday",
              text: "Scheduled follow-up call to address remaining concerns about risk management."
            }
          ].map((note, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-[#3525CD33] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[8px] font-bold px-2 py-0.5 rounded-lg"
                  style={{ background: note.badgeBg, color: note.badgeText }}
                >
                  {note.badge}
                </span>
                <span className="text-[9px] text-[#737686]">{note.time}</span>
              </div>
              <p className="text-[#464555] text-[10px] leading-relaxed">{note.text}</p>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-200">
            <input
              type="text"
              placeholder="Add a note..."
              className="w-full text-[10px] px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#3525CD]"
            />
          </div>
        </div>
      </CollapsibleSection>
      
      </div>
    );
  }

  if (rightTab === "Timeline") {
    return (
      <div className="flex flex-col gap-3 p-4 h-full overflow-y-auto">
        <p className="text-[#191B23] text-[11px] font-bold mb-2 sticky top-0 bg-white py-2">Activity Timeline</p>
        <div className="space-y-3">
          {[
            { time: "Today, 11:15 AM", event: "Payment Intent Shown", type: "success", icon: "✓" },
            { time: "Today, 11:05 AM", event: "3 Month Plan Card Shared", type: "info", icon: "📋" },
            { time: "Today, 11:02 AM", event: "Requested Pricing Info", type: "info", icon: "❓" },
            { time: "Today, 11:00 AM", event: "Call Initiated", type: "warning", icon: "☎️" },
            { time: "Today, 10:58 AM", event: "Lead Engaged", type: "success", icon: "✓" },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 relative">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  item.type === "success" ? "bg-emerald-100 text-emerald-700" :
                  item.type === "warning" ? "bg-orange-100 text-orange-700" :
                  "bg-blue-100 text-blue-700"
                }`}>
                  {item.icon}
                </div>
                {i < 4 && <div className="w-0.5 h-6 bg-gray-200" />}
              </div>
              <div className="flex-1 pb-2">
                <p className="text-[#191B23] text-[10px] font-bold">{item.event}</p>
                <p className="text-[#737686] text-[9px]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: Lead Info Tab with Independent Scrolling
  return (
    <div className="flex flex-col gap-0 h-full overflow-y-auto">
      {/* Lead Meta Section */}
      <CollapsibleSection
        id="meta"
        title="Lead Information"
        isExpanded={expandedSections.has("meta")}
        onToggle={() => toggleSection("meta")}
      >
        <div className="flex items-start justify-between px-4 py-3">
          <div className="flex flex-col gap-2 text-[11px] flex-1">
            {[
              ["Source", "Instagram", "#3525CD"],
              ["Stage", "Pricing Discussed", "#943700"],
              ["Trial Status", "Active", "#3525CD"],
              ["Subscription", "3 Month Plan", "#10B981"]
            ].map(([label, val, col]) => (
              <div key={label as string} className="flex gap-2 justify-between">
                <span className="text-[#737686] font-bold">{label}</span>
                <span className="font-bold" style={{ color: col as string }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center ml-4">
            <span className="text-[#191B23] text-2xl font-bold">92</span>
            <span className="text-[8px] text-[#737686]">/100</span>
            <span className="text-[9px] font-bold text-orange-500 mt-1">🔥 Very Hot</span>
          </div>
        </div>
      </CollapsibleSection>

      {/* Status Section */}
      <CollapsibleSection
        id="status"
        title="Status & Activity"
        isExpanded={expandedSections.has("status")}
        onToggle={() => toggleSection("status")}
      >
        <div className="flex flex-col gap-2.5 px-4 py-3">
          {[
            ["App Installed", "Yes ✓", "#10B981"],
            ["Community Joined", "Joined ✓", "#10B981"],
            ["Last Activity", "Today, 10:30 AM", "#191B23"],
            ["Login Status", "Active Now", "#10B981"]
          ].map(([label, val, col]) => (
            <div key={label as string} className="flex justify-between text-[11px]">
              <span className="text-[#737686]">{label}</span>
              <span className="font-bold" style={{ color: col as string }}>
                {val}
              </span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Mood Section */}
      <CollapsibleSection
        id="mood"
        title="AI Sentiment Analysis"
        isExpanded={expandedSections.has("mood")}
        onToggle={() => toggleSection("mood")}
      >
        <div className="px-4 py-3">
          <div className="flex items-center bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-3 gap-3">
            <span className="text-3xl">😊</span>
            <div className="flex-1">
              <p className="text-emerald-600 text-xs font-bold">Very Happy & Engaged</p>
              <p className="text-[#737686] text-[9px] mt-0.5">
                Lead showing high interest and positive sentiment in conversations
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1">
              <p className="text-[9px] text-[#737686] font-bold mb-1">Sentiment Score</p>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "87%" }} />
              </div>
              <p className="text-[9px] text-[#737686] mt-1">87/100</p>
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-[#737686] font-bold mb-1">Engagement Level</p>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "75%" }} />
              </div>
              <p className="text-[9px] text-[#737686] mt-1">75/100</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Call Status Section
      <CollapsibleSection
        id="callStatus"
        title="Call Status"
        isExpanded={expandedSections.has("callStatus")}
        onToggle={() => toggleSection("callStatus")}
      >
        <div className="px-4 py-3">
          <div className="bg-orange-50 border border-orange-200 rounded-xl py-3 px-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <p className="text-[#943700] text-[10px] font-bold">Call Pending</p>
            </div>
            <p className="text-[#737686] text-[10px]">Next call scheduled for:</p>
            <p className="text-[#191B23] text-[11px] font-bold">Today, 12:00 PM</p>
            <button className="mt-2 bg-orange-500 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Initiate Call Now
            </button>
          </div>
        </div>
      </CollapsibleSection> */}

      {/* Calls Summary Section
      <CollapsibleSection
        id="callSummary"
        title="Calls Summary"
        isExpanded={expandedSections.has("callSummary")}
        onToggle={() => toggleSection("callSummary")}
      >
        <div className="px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {[
              ["Call Done", "3", "emerald"],
              ["Hanged Up", "1", "red"],
              ["Missed", "0", "gray"],
              ["Call Pending", "1", "orange"],
              ["Ringing", "1", "blue"]
            ].map(([label, count, color]) => (
              <div key={label} className={`text-[9px] px-3 py-2 rounded-lg border font-bold ${
                color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                color === "red" ? "bg-red-50 text-red-700 border-red-200" :
                color === "orange" ? "bg-orange-50 text-orange-700 border-orange-200" :
                color === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" :
                "bg-gray-50 text-gray-700 border-gray-200"
              }`}>
                {label}: <span className="ml-1">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection> */}

      {/* Recent Calls Section
      <CollapsibleSection
        id="recentCalls"
        title="Recent Call History"
        isExpanded={expandedSections.has("recentCalls")}
        onToggle={() => toggleSection("recentCalls")}
      >
        <div className="px-4 py-3">
          <div className="space-y-2">
            {recentCalls.map((call, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 hover:border-[#3525CD33] transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#191B23]">{call.mode}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: call.statusColor, background: call.statusColor + "18" }}>
                    {call.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-[#737686]">{call.time}</span>
                  <span className="text-[9px] font-bold text-[#191B23]">{call.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-[#3525CD] text-[10px] font-bold py-2 hover:bg-[#F5F2FF] rounded-lg transition-colors">
            View All Calls →
          </button>
        </div>
      </CollapsibleSection> */}

      {/* Agent Assignment Section */}
      <CollapsibleSection
        id="agent"
        title="Agent Assignment"
        isExpanded={expandedSections.has("agent")}
        onToggle={() => toggleSection("agent")}
      >
        <div className="px-4 py-3 space-y-2.5">
          {[
            ["Assigned Agent", "Amit Kumar"],
            ["Assigned By", "Team Lead Sarah"],
            ["Assigned On", "12 May 2025"],
            ["Time Spent", "2h 45m"]
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-[10px]">
              <span className="text-[#737686] font-bold">{label}</span>
              <span className="text-[#191B23] font-bold">{val}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Client Tags Section */}
      <CollapsibleSection
        id="tags"
        title="Client Tags"
        isExpanded={expandedSections.has("tags")}
        onToggle={() => toggleSection("tags")}
      >
        <div className="px-4 py-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-3">
            <div>
              <p className="text-gray-700 text-[9px] font-bold mb-2">Applied Tags:</p>
              <div className="flex flex-wrap gap-1.5">
                {["Hot Lead", "Pricing Discussed", "Interested"].map(tag => (
                  <span key={tag} className="bg-white border border-gray-200 text-gray-800 text-[9px] font-bold py-1 px-2.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-gray-700 text-[9px] font-bold mb-2">Add New Tag:</p>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Type tag name..."
                  className="flex-1 text-[10px] px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#3525CD]"
                />
                <button className="bg-[#3525CD] text-white px-3 py-1.5 rounded-lg hover:bg-[#2910B9] transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>


      {/* Last Seen Trades Section */}
      <CollapsibleSection
        id="trades"
        title="Last Seen Trades"
        isExpanded={expandedSections.has("trades")}
        onToggle={() => toggleSection("trades")}
      >
        <div className="px-4 py-3 space-y-3">
          {trades.map((trade, i) => (
            <TradeCard key={i} trade={trade} />
          ))}
          <div className="bg-gray-50 py-2.5 px-3.5 rounded-lg flex items-center justify-between text-[9px]">
            <span className="text-[#737686] font-medium">UPDATED 1 MIN AGO</span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-emerald-500" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MY CHATS FULL UI — OPTIMIZED LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
function ChatUI() {
  const [activeConv, setActiveConv] = useState(1);
  const [rightTab, setRightTab] = useState("lead info");

  return (
    <div className="flex flex-1 min-h-0" style={{ height: "calc(100vh - 230px)" }}>

      {/* ── LEFT: Conversation list ───────────────────────────── */}
      <div className="shrink-0 flex flex-col w-[290px] border-r border-gray-100 overflow-hidden">
        <div className="flex flex-col bg-white flex-1 overflow-hidden">
          <div className="flex items-center pt-5 px-4 pb-3 border-b border-gray-50 shrink-0">
            <span className="text-gray-800 text-sm font-bold flex-1">Active Conversations</span>
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>
          <div className="bg-[#F8F7FC] py-2 px-3 shrink-0">
            <div className="flex items-center bg-white rounded-lg border border-[#AEAEAE] px-2.5 py-1.5 gap-2">
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-gray-400 text-[11px]">search user id, name...</span>
            </div>
          </div>
          <div className="flex flex-col py-1 overflow-y-auto flex-1">
            {conversations.map(conv => (
              <ConversationItem key={conv.id} conv={conv} active={activeConv === conv.id} onClick={() => setActiveConv(conv.id)} />
            ))}
          </div>
        </div>
        <div className="flex items-center px-3 py-2 gap-1.5 text-xs bg-white border-t border-gray-100 shrink-0">
          <ChevronLeft className="w-3.5 h-3.5 text-[#757575]" />
          <span className="text-[#757575]">Previous</span>
          <button className="bg-[#2C2C2C] text-white text-xs py-1 px-2.5 rounded-md ml-1">1</button>
          <span className="text-[#1E1E1E] px-1">2</span>
          <span className="text-black font-bold px-0.5">...</span>
          <span className="text-[#1E1E1E] px-1">68</span>
          <span className="text-[#1E1E1E]">Next</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#1E1E1E]" />
        </div>
      </div>

      {/* ── CENTER: Chat window ───────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Chat header */}
        <div className="flex justify-between items-center bg-white py-3 px-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3525CD1A] flex items-center justify-center text-[#3525CD] text-xs font-bold">RS</div>
            <div>
              <p className="text-[#1B1B24] text-sm font-bold">Raj Sharma</p>
              <div className="flex items-center gap-1.5 text-[10px] text-[#464555]">
                <Phone className="w-2.5 h-2.5" /><span>+91 98765 43210</span><span className="mx-0.5">•</span><span>📍 Delhi, India</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1 border border-[#C7C4D8] rounded-full py-1 px-2.5 text-[11px] font-bold text-[#3525CD] hover:bg-[#F5F2FF] transition-colors"><Phone className="w-2.5 h-2.5" /> Call</button>
            <button className="flex items-center gap-1 border border-[#C7C4D8] rounded-full py-1 px-2.5 text-[11px] font-bold text-[#565E74] hover:bg-gray-50 transition-colors"><Video className="w-2.5 h-2.5" /> VC Dialer</button>
            <button className="bg-[#1B1B24] text-white text-[11px] font-bold py-1 px-2.5 rounded-full hover:bg-[#333] transition-colors">Mediasoup</button>
            <button className="border border-[#C7C4D8] text-[#1B1B24] text-[11px] font-bold py-1 px-2.5 rounded-full hover:bg-gray-50 transition-colors">App Chat</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-[#F5F2FF] pt-4 px-4 flex flex-col gap-4 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id}>
              {msg.from === "lead" && msg.text && (
                <div className="flex flex-col items-start gap-1 max-w-sm">
                  <div className="bg-white text-[#1B1B24] text-xs py-3 px-4 rounded-tr-[13px] rounded-br-[13px] rounded-bl-[13px] border border-[#C7C4D84D]" style={{ boxShadow: "0 1px 4px #00000010" }}>{msg.text}</div>
                  <span className="text-[#464555] text-[8px] font-bold ml-1">{msg.time}</span>
                </div>
              )}
              {msg.from === "agent" && msg.text && (
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-[#3525CD] text-white text-xs py-3 px-4 rounded-tl-[13px] rounded-br-[13px] rounded-bl-[13px] max-w-sm" style={{ boxShadow: "0 3px 10px #3525CD33" }}>{msg.text}</div>
                  <span className="text-[#464555] text-[8px] font-bold">{msg.time}</span>
                </div>
              )}
              {msg.from === "agent" && (msg as any).type === "card" && (
                <div className="flex flex-col items-end gap-1">
                  <PlanCard />
                  <span className="text-[#464555] text-[8px] font-bold mr-4">{msg.time}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white p-3 border-t border-gray-100 shrink-0">
          <div className="flex flex-col bg-[#F0ECF9] rounded-[13px] border border-[#C7C4D8B0]" style={{ boxShadow: "0 2px 4px #0000000F" }}>
            <div className="flex justify-between items-center bg-white py-1.5 px-3 mx-px rounded-t-[13px] border-b border-[#F0ECF9]">
              <div className="flex items-center gap-1 text-gray-400">
                {[Bold, Italic, Underline, Strikethrough].map((Icon, i) => <button key={i} className="hover:text-gray-600 p-0.5 transition-colors"><Icon className="w-3 h-3" /></button>)}
                <div className="w-px h-3.5 bg-gray-200 mx-0.5" />
                {[LinkIcon, Image, Smile, List, AlignLeft].map((Icon, i) => <button key={i} className="hover:text-gray-600 p-0.5 transition-colors"><Icon className="w-3 h-3" /></button>)}
                <div className="w-px h-3.5 bg-gray-200 mx-0.5" />
                {[Undo, Redo].map((Icon, i) => <button key={i} className="hover:text-gray-600 p-0.5 transition-colors"><Icon className="w-3 h-3" /></button>)}
              </div>
              <button className="flex items-center gap-1.5 bg-[#25D366] text-white text-[11px] font-bold py-1.5 px-4 rounded-lg" style={{ boxShadow: "0 2px 8px #25D36644" }}>
                Send <Send className="w-2.5 h-2" />
              </button>
            </div>
            <input type="text" placeholder="Reply to Rahul Sharma..." className="text-[#C7C4D8] text-xs py-2.5 px-3 bg-transparent border-0 outline-none" />
          </div>
        </div>
      </div>

      {/* ── RIGHT: Lead info panel — INDEPENDENT SCROLLING ────────────────────────────── */}
      <div className="shrink-0 flex flex-col bg-white w-[340px] border-l border-gray-100 overflow-hidden">
        {/* Tab Navigation — STICKY */}
        <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm shrink-0">
          {["lead info", "Insights", "Timeline"].map(t => (
            <button
              key={t}
              onClick={() => setRightTab(t)}
              className={`flex-1 py-3 text-[10px] font-bold capitalize transition-all relative ${
                rightTab === t
                  ? "text-[#3525CD]"
                  : "text-[#737686] hover:text-[#3525CD]"
              }`}
            >
              {t}
              {rightTab === t && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3525CD] to-[#2910B9] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area — INDEPENDENT SCROLLING */}
        <div className="flex-1 overflow-hidden">
          <RightPanelContent rightTab={rightTab} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEADS SUB PAGE (Hot Leads / Payment Pending)
// ─────────────────────────────────────────────────────────────────────────────
function LeadsSubPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex-1 p-5 bg-[#F8F8FC] overflow-y-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-5" style={{ boxShadow: "0 2px 12px #0000000A" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#3525CD] rounded-lg flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-[#191B23] text-base font-bold">Hot Leads</h2>
          </div>
          <div className="flex items-center bg-white border border-[#C7C4D8] rounded-xl px-3 py-1.5 gap-2 w-60">
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search sample leads"
              className="flex-1 text-[11px] text-gray-500 bg-transparent border-0 outline-none" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-end gap-5 mb-5 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wide">Date</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 border border-[#C7C4D8] rounded-xl px-3 py-1.5 text-[11px] text-[#191B23] cursor-pointer hover:border-[#3525CD55] transition-colors">
                <Calendar className="w-3 h-3 text-[#737686]" /><span>Range</span><span className="ml-1 text-[#191B23] font-medium">05/08/2026</span>
              </div>
              <span className="text-[#737686] text-xs">To</span>
              <div className="flex items-center gap-1.5 border border-[#C7C4D8] rounded-xl px-3 py-1.5 text-[11px] text-[#191B23] font-medium cursor-pointer hover:border-[#3525CD55] transition-colors">
                <Calendar className="w-3 h-3 text-[#737686]" /><span>05/14/2026</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wide">Tags</span>
            <div className="flex items-center gap-1.5 border border-[#C7C4D8] rounded-xl px-3 py-1.5 text-[11px] text-[#191B23] cursor-pointer w-28 hover:border-[#3525CD55] transition-colors">
              <span className="flex-1">All</span><ChevronDown className="w-3 h-3 text-[#737686]" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wide">Lead Score</span>
            <div className="flex items-center gap-1.5 border border-[#C7C4D8] rounded-xl px-3 py-1.5 text-[11px] text-[#191B23] cursor-pointer w-28 hover:border-[#3525CD55] transition-colors">
              <span className="flex-1">All</span><ChevronDown className="w-3 h-3 text-[#737686]" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F7FC] border-b border-gray-100">
                {["USER ID", "LEAD", "SCORE", "FUNNEL STAGE", "DROP RISK", "SOURCE", "ACCESS"].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-[#737686] py-3.5 px-4 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leadsData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-[#FAFAF8] transition-colors">
                  <td className="py-4 px-4 text-[11px] text-[#737686] font-semibold">{row.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={row.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)} size={32} />
                      <div>
                        <p className="text-[#191B23] text-[11px] font-bold">{row.name}</p>
                        <p className="text-[#737686] text-[9px]">{row.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[12px] font-bold" style={{ color: scoreColor(row.score) }}>{row.score}/100</span>
                  </td>
                  <td className="py-4 px-4 text-[11px] text-[#464555]">{row.stage}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${riskBadge(row.risk)}`}>{row.risk}</span>
                  </td>
                  <td className="py-4 px-4 text-[11px] text-[#464555]">{row.source}</td>
                  <td className="py-4 px-4">
                    <button className="bg-[#3525CD] text-white text-[10px] font-bold px-4 py-1.5 rounded-lg hover:bg-[#2910B9] transition-colors">
                      Give Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <button className="text-[11px] text-[#737686] font-medium border border-gray-200 px-3.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Prev</button>
          <span className="text-[11px] text-[#191B23] font-bold px-1">Page 1 of 2</span>
          <button className="text-[11px] text-[#3525CD] font-bold border border-[#3525CD33] bg-[#3525CD0A] px-3.5 py-1.5 rounded-lg hover:bg-[#3525CD15] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLA ALERTS
// ─────────────────────────────────────────────────────────────────────────────
function SlaIcon({ type }: { type: string }) {
  const cls = "w-4 h-4";
  if (type === "clock") return <Clock className={cls} style={{ color: "#BA1A1A" }} />;
  if (type === "noresponse") return <AlertCircle className={cls} style={{ color: "#BA1A1A" }} />;
  if (type === "timer") return <TimerReset className={cls} style={{ color: "#F97316" }} />;
  if (type === "followup") return <RefreshCw className={cls} style={{ color: "#1D4ED8" }} />;
  return <TrendingDown className={cls} style={{ color: "#BA1A1A" }} />;
}

function SlaAlertsPage() {
  return (
    <div className="flex-1 p-5 bg-[#F8F8FC] overflow-y-auto">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: "0 2px 12px #0000000A" }}>
        {/* Table Header */}
        <div className="grid border-b border-gray-100 bg-[#F8F7FC]"
          style={{ gridTemplateColumns: "220px 200px 220px 220px 120px 120px" }}>
          {["TYPE", "LEAD", "SLA RULE", "TRIGGERED / DUE", "PRIORITY", "ACTIONS"].map(h => (
            <div key={h} className="px-5 py-4 text-[10px] font-bold text-[#737686] uppercase tracking-wide">{h}</div>
          ))}
        </div>

        {/* Rows */}
        {slaAlerts.map((alert, i) => (
          <div key={i}
            className="grid border-b border-gray-50 hover:bg-[#FAFAF8] transition-colors items-center py-4"
            style={{ gridTemplateColumns: "220px 200px 220px 220px 120px 120px" }}>

            {/* TYPE */}
            <div className="px-5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: alert.typeColor + "15" }}>
                <SlaIcon type={alert.icon} />
              </div>
              <div>
                <p className="text-[#191B23] text-[11px] font-bold leading-tight">{alert.type}</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md inline-block mt-0.5"
                  style={{ color: alert.statusColor, background: alert.statusColor + "18" }}>
                  {alert.status}
                </span>
              </div>
            </div>

            {/* LEAD */}
            <div className="px-5 flex items-center gap-2">
              <Avatar initials={alert.initials} size={32} />
              <div>
                <p className="text-[#191B23] text-[11px] font-bold">{alert.lead}</p>
                <p className="text-[#737686] text-[9px]">{alert.leadSub}</p>
              </div>
            </div>

            {/* RULE */}
            <div className="px-5 text-[#464555] text-[11px]">{alert.rule}</div>

            {/* TRIGGERED / DUE */}
            <div className="px-5">
              <p className="text-[#191B23] text-[11px] font-bold">{alert.triggered}</p>
              {alert.triggeredTime && (
                <p className="text-[10px] mt-0.5" style={{
                  color: alert.triggeredTime.includes("Days") ? "#BA1A1A"
                    : alert.triggeredTime.includes("AM") || alert.triggeredTime.includes("PM") ? "#737686"
                    : "#944E00"
                }}>{alert.triggeredTime}</p>
              )}
            </div>

            {/* PRIORITY */}
            <div className="px-5">
              <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg"
                style={{ color: alert.priorityColor, background: alert.priorityBg }}>
                {alert.priority}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="px-5 flex items-center gap-2">
              <button className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#F5F2FF] hover:border-[#3525CD44] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#3525CD]" />
              </button>
              <button className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#F5F2FF] hover:border-[#3525CD44] transition-colors">
                <MessageSquare className="w-3.5 h-3.5 text-[#3525CD]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOLLOW-UPS
// ─────────────────────────────────────────────────────────────────────────────
function FollowUpsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex-1 p-5 bg-[#F8F8FC] overflow-y-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-5" style={{ boxShadow: "0 2px 12px #0000000A" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#3525CD] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">4.1</div>
            <h2 className="text-[#191B23] text-base font-bold">Follow up</h2>
          </div>
          <div className="flex items-center bg-white border border-[#C7C4D8] rounded-xl px-3 py-1.5 gap-2 w-60">
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search sample leads"
              className="flex-1 text-[11px] text-gray-500 bg-transparent border-0 outline-none" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-end gap-5 mb-5 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wide">Date</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 border border-[#C7C4D8] rounded-xl px-3 py-1.5 text-[11px] text-[#191B23] cursor-pointer hover:border-[#3525CD55] transition-colors">
                <Calendar className="w-3 h-3 text-[#737686]" /><span>Range</span><span className="ml-1 font-medium">05/08/2026</span>
              </div>
              <span className="text-[#737686] text-xs">To</span>
              <div className="flex items-center gap-1.5 border border-[#C7C4D8] rounded-xl px-3 py-1.5 text-[11px] text-[#191B23] font-medium cursor-pointer hover:border-[#3525CD55] transition-colors">
                <Calendar className="w-3 h-3 text-[#737686]" /><span>05/14/2026</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wide">Tags</span>
            <div className="flex items-center gap-1.5 border border-[#C7C4D8] rounded-xl px-3 py-1.5 text-[11px] text-[#191B23] cursor-pointer w-28 hover:border-[#3525CD55] transition-colors">
              <span className="flex-1">All</span><ChevronDown className="w-3 h-3 text-[#737686]" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wide">Lead Score</span>
            <div className="flex items-center gap-1.5 border border-[#C7C4D8] rounded-xl px-3 py-1.5 text-[11px] text-[#191B23] cursor-pointer w-28 hover:border-[#3525CD55] transition-colors">
              <span className="flex-1">All</span><ChevronDown className="w-3 h-3 text-[#737686]" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F7FC] border-b border-gray-100">
                {["USER ID", "LEAD", "SCORE", "STAGE", "DROP RISK", "SOURCE", "ACTIONS"].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-[#737686] py-3.5 px-4 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {followUpsData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-[#FAFAF8] transition-colors">
                  <td className="py-4 px-4 text-[11px] text-[#737686] font-semibold">{row.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={row.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)} size={32} />
                      <div>
                        <p className="text-[#191B23] text-[11px] font-bold">{row.name}</p>
                        <p className="text-[#737686] text-[9px]">{row.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[12px] font-bold" style={{ color: scoreColor(row.score) }}>{row.score}/100</span>
                  </td>
                  <td className="py-4 px-4 text-[11px] text-[#464555]">{row.stage}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${riskBadge(row.risk)}`}>{row.risk}</span>
                  </td>
                  <td className="py-4 px-4 text-[11px] text-[#464555]">{row.source}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#F5F2FF] hover:border-[#3525CD44] transition-colors">
                        <Phone className="w-3 h-3 text-[#3525CD]" />
                      </button>
                      <button className="w-7 h-7 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#F5F2FF] hover:border-[#3525CD44] transition-colors">
                        <MessageSquare className="w-3 h-3 text-[#3525CD]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-2 mt-4">
          <button className="text-[11px] text-[#737686] font-medium border border-gray-200 px-3.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Prev</button>
          <span className="text-[11px] text-[#191B23] font-bold px-1">Page 1 of 2</span>
          <button className="text-[11px] text-[#3525CD] font-bold border border-[#3525CD33] bg-[#3525CD0A] px-3.5 py-1.5 rounded-lg hover:bg-[#3525CD15] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TG CONNECT
// ─────────────────────────────────────────────────────────────────────────────
function TgConnectPage() {
  const [activeChannel, setActiveChannel] = useState("General Announcements");
  const [msgInput, setMsgInput] = useState("");

  return (
    <div className="flex-1 p-5 bg-[#F8F8FC] overflow-y-auto">
      <div className="flex gap-4" style={{ minHeight: "500px" }}>

        {/* LEFT — Channels */}
        <div className="w-52 shrink-0 bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 h-fit" style={{ boxShadow: "0 2px 8px #0000000A" }}>
          <div>
            <p className="text-[#3525CD] text-[9px] font-bold uppercase tracking-widest mb-1">CHANNELS</p>
            <p className="text-[#191B23] text-sm font-bold">Channels</p>
          </div>
          <div className="flex flex-col gap-0.5">
            {tgChannels.map(ch => (
              <button key={ch.name}
                onClick={() => setActiveChannel(ch.name)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors ${activeChannel === ch.name ? "bg-[#EAE6F4] text-[#3525CD]" : "text-[#464555] hover:bg-gray-50"}`}>
                <Hash className={`w-3 h-3 shrink-0 ${activeChannel === ch.name ? "text-[#3525CD]" : "text-[#737686]"}`} />
                <span className={`text-[11px] ${activeChannel === ch.name ? "font-bold" : "font-medium"}`}>{ch.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER — Chat */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden" style={{ boxShadow: "0 2px 8px #0000000A" }}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[#3525CD] font-bold text-sm">#</span>
              <p className="text-[#3525CD] text-[10px] font-bold uppercase tracking-wider">GENERAL ANNOUNCEMENTS</p>
            </div>
            <span className="text-[#737686] text-[11px] font-medium">24 Members</span>
          </div>
          <div className="px-5 py-3 border-b border-gray-50 shrink-0">
            <h2 className="text-[#191B23] text-lg font-bold flex items-center gap-2">
              <Hash className="w-5 h-5 text-[#191B23]" /> General Announcements
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 px-5 py-4 flex flex-col gap-3 overflow-y-auto">
            {tgMessages.map((msg, i) => (
              <div key={i} className="bg-[#F8F7FC] rounded-xl p-4 border border-gray-100 hover:border-[#C7C4D8] transition-colors">
                <p className="text-[#191B23] text-xs font-bold mb-1">{msg.sender}</p>
                {msg.isLink ? (
                  <p className="text-[#464555] text-[11px]">
                    Shared a document:{" "}
                    <span className="text-[#3525CD] underline cursor-pointer hover:text-[#2910B9]">Nifty Market Outlook - 17 May.pdf</span>
                  </p>
                ) : (
                  <p className="text-[#464555] text-[11px]">{msg.text}</p>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-3.5 border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-3 bg-[#F8F7FC] border border-[#C7C4D8] rounded-xl px-4 py-2.5">
              <input
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 text-[11px] text-[#464555] bg-transparent border-0 outline-none"
              />
              <button className="bg-[#3525CD] text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-[#2910B9] transition-colors flex items-center gap-1.5">
                Send <Send className="w-2.5 h-2" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — Files */}
        <div className="w-52 shrink-0 bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-4 h-fit" style={{ boxShadow: "0 2px 8px #0000000A" }}>
          <div>
            <p className="text-[#3525CD] text-[9px] font-bold uppercase tracking-widest mb-1">FILES</p>
            <p className="text-[#191B23] text-sm font-bold">Files</p>
          </div>
          <div className="flex flex-col">
            {tgFiles.map((file, i) => (
              <div key={i} className="flex items-center gap-2 py-2.5 border-b border-gray-50 cursor-pointer hover:bg-gray-50 rounded-lg px-1.5 transition-colors group">
                <FileText className="w-3.5 h-3.5 text-[#3525CD] shrink-0 group-hover:text-[#2910B9]" />
                <span className="text-[11px] text-[#464555] leading-snug">{file}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[#191B23] text-xs font-bold mb-3">Quick Actions</p>
            <div className="flex flex-col gap-2.5">
              <button className="w-full border border-gray-200 text-[#191B23] text-[11px] font-medium py-2.5 rounded-xl hover:bg-gray-50 hover:border-[#3525CD44] transition-colors">
                Create Poll
              </button>
              <button className="w-full border border-gray-200 text-[#191B23] text-[11px] font-medium py-2.5 rounded-xl hover:bg-gray-50 hover:border-[#3525CD44] transition-colors flex items-center justify-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-[#737686]" /> Voice Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CALL LOGS (placeholder)
// ─────────────────────────────────────────────────────────────────────────────
function CallLogsPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#F8F8FC] p-10">
      <div className="text-center">
        <div className="w-16 h-16 bg-[#3525CD1A] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-[#3525CD]" />
        </div>
        <p className="text-[#191B23] text-base font-bold mb-1">Call Logs</p>
        <p className="text-[#737686] text-sm">All your call records will appear here.</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ChatsPage() {
  const [activeTab, setActiveTab] = useState("My Chats");

  const tabs = [
    { label: "My Chats", key: "My Chats", badge: null },
    { label: "Leads", key: "Leads", badge: null },
    { label: "Follow - ups", key: "Follow-up", badge: null },
    { label: "SLA Alerts", key: "SLA Alerts", badge: "3" },
    { label: "Payment Pending", key: "Payment Pending", badge: null },
    { label: "TG Connect", key: "TG Connect", badge: null },
    { label: "Call Logs", key: "Call Logs", badge: null },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* TOP BAR */}
      <ChatTopbar />

      {/* FUNNEL STATS */}
      <div className="flex items-center bg-[#F5F2FF44] py-3 px-3 my-3 mx-4 rounded-2xl gap-2.5 overflow-x-auto">
        {funnelStats.map(stat => <FunnelStatCard key={stat.label} stat={stat} />)}
      </div>

      {/* TAB BAR */}
      <div className="flex items-center bg-[#F3F3FE] mx-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 py-3.5 px-4 text-[11px] font-bold whitespace-nowrap transition-colors relative shrink-0 ${activeTab === tab.key ? "text-[#2910B9]" : "text-[#434655] hover:text-[#2910B9]"}`}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="bg-[#BA1A1A] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-xl leading-none">{tab.badge}</span>
            )}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2910B9] rounded-full" />
            )}
          </button>
        ))}
        <button className="ml-1 shrink-0 p-2 text-gray-400 hover:text-[#3525CD] transition-colors">
          {/* <PlusCircle className="w-4 h-4" /> */}
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {activeTab === "My Chats" && <ChatUI />}
        {activeTab === "Leads" && <LeadsSubPage />}
        {activeTab === "Follow-up" && <FollowUpsPage />}
        {activeTab === "SLA Alerts" && <SlaAlertsPage />}
        {activeTab === "Payment Pending" && <LeadsSubPage />}
        {activeTab === "TG Connect" && <TgConnectPage />}
        {activeTab === "Call Logs" && <CallLogsPage />}
      </div>
    </div>
  );
}
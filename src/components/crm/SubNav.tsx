import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

const tabs = [
  { to: "/crm/chats", label: "My Chats" },
  { to: "/crm/leads", label: "Leads" },
  { to: "/crm/follow-ups", label: "Follow-ups" },
  { to: "/crm/sla-alerts", label: "SLA Alerts", badge: 3 },
  { to: "/crm/payment-pending", label: "Payment Pending" },
  { to: "/crm/tg-connect", label: "TG Connect" },
  { to: "/crm/call-logs", label: "Call Logs" },
];

export function SubNav() {
  const path = usePathname();
  return (
    <div className="flex items-center gap-1.5 border-b border-border px-8 pt-4 overflow-x-auto scrollbar-thin">
      {tabs.map((t) => {
        const active = path === t.to;
        return (
          <Link
            key={t.to}
            href={t.to}
            className={`relative inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold rounded-t-xl transition-colors whitespace-nowrap ${
              active
                ? "text-primary bg-card"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {t.badge && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-white text-[10px] font-bold">
                {t.badge}
              </span>
            )}
            {active && (
              <span className="absolute left-3 right-3 -bottom-px h-[2px] bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
      <button className="ml-auto size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";

export default function BroadcastPage() {
  return (
    <CrmLayout showSubNav={false}>
      <div className="card-elevated p-12 text-center">
        <div className="mx-auto size-16 rounded-2xl grad-purple flex items-center justify-center text-white text-2xl font-bold mb-4">
          B
        </div>
        <h1 className="text-[22px] font-bold">Broadcast Center</h1>
        <p className="text-[13px] text-muted-foreground mt-2 max-w-md mx-auto">
          Schedule, target and measure outbound campaigns across WhatsApp, SMS and Telegram.
        </p>
      </div>
    </CrmLayout>
  );
}

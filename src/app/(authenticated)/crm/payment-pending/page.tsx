"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { Clock } from "lucide-react";

export default function PaymentPendingPage() {
  return (
    <CrmLayout>
      <div className="card-elevated p-12 text-center">
        <div className="mx-auto size-16 rounded-2xl grad-orange flex items-center justify-center text-white text-2xl font-bold mb-4">
          <Clock className="size-8" />
        </div>
        <h1 className="text-[22px] font-bold">Payment Pending</h1>
        <p className="text-[13px] text-muted-foreground mt-2 max-w-md mx-auto">
          View all customers whose invoice or subscription payment is pending.
        </p>
      </div>
    </CrmLayout>
  );
}

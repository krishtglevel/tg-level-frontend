"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { MessageSquare } from "lucide-react";

export default function ChatsPage() {
  return (
    <CrmLayout>
      <div className="card-elevated p-12 text-center">
        <div className="mx-auto size-16 rounded-2xl grad-purple flex items-center justify-center text-white text-2xl font-bold mb-4">
          <MessageSquare className="size-8" />
        </div>
        <h1 className="text-[22px] font-bold">My Chats</h1>
        <p className="text-[13px] text-muted-foreground mt-2 max-w-md mx-auto">
          Manage your conversations and chats in real time.
        </p>
      </div>
    </CrmLayout>
  );
}

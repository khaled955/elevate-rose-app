"use client";

import * as React from "react";
import { useOnlineStatus } from "@/hooks/shared/use-online-status"; // ✅ عدّل المسار/الاسم حسب مشروعك
import OfflineIndicator from "@/components/shared/offline-indicator";

type NetworkGateProviderProps = {
  children: React.ReactNode;
  OfflineComponent?: React.ReactNode;
};

export function NetworkGateProvider({
  children,
  OfflineComponent,
}: NetworkGateProviderProps) {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <>{OfflineComponent ?? <OfflineIndicator />}</>;
  }

  return <>{children}</>;
}

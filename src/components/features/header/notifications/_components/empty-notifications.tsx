
"use client";
import { BellOff } from "lucide-react";

export default function EmptyNotifications() {
  // Translation

  return (
    <section
      role="status"
      aria-live="polite"
      aria-label="Empty notifications"
      className="flex flex-col items-center gap-5 text-zinc-500 dark:text-zinc-400 py-10 border-t border-t-zinc-300 dark:border-t-zinc-600"
    >
      <BellOff size={50} aria-hidden="true" focusable="false" />

      <p className="text-sm">No notifications to display.</p>
    </section>
  );
}

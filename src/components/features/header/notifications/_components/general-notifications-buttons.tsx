"use client";
import { BrushCleaning, CheckCheck, Loader } from "lucide-react";
import React from "react";
import { useAllNotificationsAsRead } from "../_hooks/use-all-notifications-as-read";
import { useDeleteAllNotifications } from "../_hooks/use-delete-all-notifications";
import { cn } from "@/lib/utils/cn";

type GeneralNotificationsButtonsProps = {
  isEmpty?: boolean;
};

export default function GeneralNotificationsButtons({
  isEmpty,
}: GeneralNotificationsButtonsProps) {
  // mark all notifications as read
  const { onMarkAllAsRead, isPending: markReadIsPending } =
    useAllNotificationsAsRead();
  // clear all notifications button
  const { onDeleteAll, isPending: deleteAllIsPending } =
    useDeleteAllNotifications();

  return (
    <div className="drop-down-action flex justify-between items-center gap-6 p-2">
      {/* clear-all-notifications */}
      <button
        onClick={() => onDeleteAll()}
        disabled={markReadIsPending || deleteAllIsPending || isEmpty}
        className={cn(
          isEmpty
            ? "text-zinc-400 dark:text-zinc-500"
            : "text-zinc-800 dark:text-zinc-50",
          "text-sm font-semibold  flex gap-2 items-center"
        )}
      >
        {deleteAllIsPending ? (
          <div className="w-36 flex justify-center">
            <Loader size={18} className="animate-spin" />
          </div>
        ) : (
          <>
            <BrushCleaning size={18} />
            Clear all notifications
          </>
        )}
      </button>
      {/* mark-all-as-read */}
      <button
        disabled={markReadIsPending || deleteAllIsPending || isEmpty}
        onClick={() => onMarkAllAsRead()}
        className={cn(
          isEmpty
            ? "text-zinc-400 dark:text-zinc-500"
            : "text-zinc-800 dark:text-zinc-50",
          "text-sm font-semibold  flex gap-2 items-center"
        )}
      >
        {markReadIsPending ? (
          <div className="w-36 flex justify-center">
            <Loader size={18} className="animate-spin" />
          </div>
        ) : (
          <>
            <CheckCheck size={15} /> Mark all as read
          </>
        )}
      </button>
    </div>
  );
}

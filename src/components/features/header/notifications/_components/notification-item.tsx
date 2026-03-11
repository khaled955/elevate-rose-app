"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification } from "@/lib/types/notifications";
import { cn } from "@/lib/utils/cn";
import { Check, MoreHorizontalIcon } from "lucide-react";
import { useSingleNotificationAsRead } from "../_hooks/use-single-notification-as-read";
import { useDeleteSingleNotification } from "../_hooks/use-delete-single-notification";
import { useTranslations } from "next-intl";

type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  // Translation
  const t = useTranslations();
  // Hooks
  const { onMarkAsRead, isPending } = useSingleNotificationAsRead();
  const { onSingleDelete, isPending: isDeletePending } =
    useDeleteSingleNotification();

  void onSingleDelete;
  // Variables
  const isActionsDisabled = isPending || isDeletePending;
  const isMarkAsReadDisabled = notification.isRead || isActionsDisabled;

  // Functions
  const handleTriggerPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
  };

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleMarkAsReadSelect = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    onMarkAsRead(notification._id);
  };

  // const handleDeleteSelect = (e: Event) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   onSingleDelete(notification._id);
  // };

  return (
    // ✅ Semantic wrapper for a notification item
    <article
      aria-label="Notification item"
      className={cn(
        notification.isRead
          ? "bg-zinc-200 dark:bg-zinc-800"
          : "dark:bg-zinc-900",
        "flex items-start max-w-[21rem] justify-between py-2 px-2 rounded-none border-t border-b border-zinc-300 dark:border-zinc-600",
      )}
    >
      {/* title */}
      <header className="notification-content max-w-[80%]">
        <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-50">
          {notification.title}
        </h3>
        {/* body */}
        <p className="text-sm text-zinc-500 line-clamp-3 dark:text-zinc-400">
          {notification.body}
        </p>
      </header>

      {/*Actions*/}
      <nav className="notification-action" aria-label="Notification actions">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Open notification actions menu"
              className="outline-none border-0 focus:outline-none"
              onPointerDown={handleTriggerPointerDown}
              onClick={handleTriggerClick}
            >
              <MoreHorizontalIcon aria-hidden="true" focusable="false" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-44" align="end">
            <DropdownMenuItem
              disabled={isMarkAsReadDisabled}
              onSelect={handleMarkAsReadSelect}
              className={cn(
                notification.isRead ? "opacity-60" : "",
                "flex items-center gap-2 cursor-pointer",
              )}
              aria-disabled={isMarkAsReadDisabled}
            >
              <Check className="size-4" aria-hidden="true" focusable="false" />
              <span>{t("mark-as-read")}</span>
            </DropdownMenuItem>

            {/* Cancelled during deployment because backend give error  and not work */}
            {/* <DropdownMenuItem
              disabled={isActionsDisabled}
              onSelect={handleDeleteSelect}
              className="flex items-center gap-2 cursor-pointer"
              aria-disabled={isActionsDisabled}
            >
              <Trash2
                size={16}
                className="dark:text-maroon-600"
                aria-hidden="true"
                focusable="false"
              />
              <span>{t("delete-notification")}</span>
            </DropdownMenuItem>
             */}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </article>
  );
}

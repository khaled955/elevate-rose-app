"use client";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BellRing, Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNotifications } from "../_hooks/use-notifications";

import EmptyNotifications from "./empty-notifications";
import GeneralNotificationsActions from "./general-notifications-buttons";
import NotificationItem from "./notification-item";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

export default function NotificationsList() {
  // Translation
  const t = useTranslations();
  // Hooks
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNotifications();

  const { status } = useSession();

  // Variables
  const pages = data?.pages ?? [];
  const notifications = pages.flatMap((page) => page.notifications);
  const isAuthed = status === "authenticated";
  const isSessionLoading = status === "loading";
  const isEmpty = useMemo(() => notifications.length === 0, [notifications]);
  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((noti) => !noti.isRead).length;
  }, [notifications]);
  // Handlers
  const handleFetchNextPage = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn(!isAuthed && "opacity-50 cursor-not-allowed", "relative")}
      >
        {/* ✅ semantic + a11y: make trigger a real button */}
        <button
          type="button"
          aria-label={`Open notifications (${notifications.length})`}
          disabled={!isAuthed}
        >
          <BellRing aria-hidden="true" focusable="false" />
          {/* { Notification badge } */}

          {isAuthed && isSessionLoading && (
            <span
              aria-hidden="true"
              className=" absolute -top-1 -right-1 min-w-[1.125rem] h-[1.125rem] rounded-full bg-red-600 text-white text-[.625rem] font-bold flex items-center justify-center leading-none"
            >
              <Loader size={12} className="animate-spin" />
            </span>
          )}

          {isAuthed && !isSessionLoading && (
            <span
              aria-hidden="true"
              className=" absolute -top-1 -right-1 min-w-[1.125rem] h-[1.125rem] rounded-full bg-red-600 text-white text-[.625rem] font-bold flex items-center justify-center leading-none"
            >
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      {isAuthed && (
        <DropdownMenuContent className="p-0" aria-label="Notifications menu">
          <DropdownMenuLabel className="bg-maroon-700 dark:bg-soft-pink-200 text-white dark:text-black font-bold text-xl">
            {/* ✅ semantic heading inside label */}
            <h2 className="text-inherit">
              {t("notifications")}{" "}
              <span>
                ({t("notif-number", { count: notifications.length })})
              </span>
            </h2>
          </DropdownMenuLabel>

          {/* header button */}
          <GeneralNotificationsActions isEmpty={isEmpty} />

          {/* the scroll container */}
          {notifications.length > 0 ? (
            <section
              id="notifications-scroll"
              className="max-h-[400px] overflow-y-auto"
              aria-label="Notifications list"
            >
              <InfiniteScroll
                dataLength={notifications.length}
                scrollableTarget="notifications-scroll"
                next={handleFetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                  <div className="flex justify-center py-4" aria-live="polite">
                    <Loader
                      size={18}
                      className="animate-spin"
                      aria-hidden="true"
                      focusable="false"
                    />
                    <span className="sr-only">Loading more notifications</span>
                  </div>
                }
                endMessage={
                  !isLoading && (
                    <p
                      className="py-6 text-center font-semibold capitalize"
                      role="status"
                      aria-live="polite"
                    >
                      You have seen all notifications
                    </p>
                  )
                }
              >
                {isLoading ? (
                  <div className="flex justify-center py-4" aria-live="polite">
                    <Loader
                      size={18}
                      className="animate-spin"
                      aria-hidden="true"
                      focusable="false"
                    />
                    <span className="sr-only">Loading notifications</span>
                  </div>
                ) : (
                  <ul aria-label="Notifications">
                    {notifications.map((noti) => (
                      <li key={noti._id}>
                        <NotificationItem notification={noti} />
                      </li>
                    ))}
                  </ul>
                )}
              </InfiniteScroll>
            </section>
          ) : (
            <EmptyNotifications />
          )}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

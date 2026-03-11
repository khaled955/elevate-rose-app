"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Lock, LogOut, UserRoundPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

type SidebarButtonsProps = {
  activeTab: "profile" | "change-password";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"profile" | "change-password">
  >;
};

export default function SidebarButtons({
  activeTab,
  setActiveTab,
}: SidebarButtonsProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Handlers
  const onLogOut = async () => {
    signOut();
  };

  return (
    <div
      className={cn(
        // Mobile: full width, no fixed height
        "col-span-1 rounded-md border border-zinc-100 bg-zinc-50 p-3 shadow-sm",
        "dark:border-zinc-800 dark:bg-zinc-900",
        // Layout in parent grid
        "lg:col-span-3 lg:p-4",
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch lg:justify-start">
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-col">
          <li>
            {/* profile-button */}
            <button
              onClick={() => setActiveTab("profile")}
              className={cn(
                activeTab === "profile" ? "bg-zinc-800 dark:bg-zinc-200" : "",
                "flex w-full items-center gap-2 rounded-md p-2",
                "sm:w-auto sm:px-3 lg:w-full",
              )}
            >
              <UserRoundPen size={24} />
              <span
                className={cn(
                  activeTab === "profile"
                    ? "text-zinc-50 dark:text-zinc-600"
                    : "text-zinc-800 dark:text-zinc-400",
                )}
              >
                {t("my-account")}
              </span>
            </button>
          </li>

          <li>
            {/* change-password-button */}
            <button
              onClick={() => setActiveTab("change-password")}
              className={cn(
                activeTab === "change-password"
                  ? "bg-zinc-800 dark:bg-zinc-200 text-zinc-50 dark:text-zinc-600"
                  : "",
                "flex w-full items-center gap-2 rounded-md p-2",
                "sm:w-auto sm:px-3 lg:w-full",
              )}
            >
              <Lock size={24} />
              <span
                className={cn(
                  activeTab === "change-password"
                    ? "text-zinc-50 dark:text-zinc-600"
                    : "text-zinc-800 dark:text-zinc-400",
                )}
              >
                {t("change-password")}
              </span>
            </button>
          </li>
        </ul>

        {/* logout-button */}
        <div className="w-full sm:w-auto lg:w-full">
          <Button onClick={onLogOut} variant="secondary" className="w-full">
            <LogOut className={cn(locale === "ar" ? "" : "rotate-180")} />{" "}
            <span>{t("log-out")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

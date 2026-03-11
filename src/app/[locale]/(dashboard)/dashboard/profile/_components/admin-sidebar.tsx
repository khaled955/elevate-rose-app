"use client";
import { Lock, LogOut, Shield, UserRoundPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { ActiveTab } from "@/lib/types/profile";

// Types
type AdminSidebarProps = {
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
};

export default function AdminSidebar({
  activeTab,
  setActiveTab,
}: AdminSidebarProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Handlers
  const onLogOut = async () => {
    signOut();
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "profile",
      label: t("my-account"),
      icon: <UserRoundPen size={18} />,
    },
    {
      id: "change-password",
      label: t("change-password"),
      icon: <Lock size={18} />,
    },
  ];

  return (
    <aside
      className={cn(
        "lg:col-span-3",
        "rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/[0.06] dark:bg-white/[0.03] dark:backdrop-blur-sm p-5",
      )}
    >
      {/* Admin badge */}
      <div className="mb-6 flex items-center gap-2 px-1">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-500/20">
          <Shield size={14} className="text-indigo-500 dark:text-indigo-400" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
          {t("admin")}
        </span>
      </div>

      {/* Nav items */}
      <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap lg:flex-col">
        {navItems.map((item) => (
          <li key={item.id} className="sm:flex-1 lg:flex-none">
            <button
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                activeTab === item.id
                  ? "bg-indigo-50 text-indigo-700 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.25)] dark:bg-indigo-500/15 dark:text-indigo-300 dark:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.3)]"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200",
              )}
            >
              {/* Icon wrapper */}
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                  activeTab === item.id
                    ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                    : "bg-zinc-100 text-zinc-500 group-hover:text-zinc-700 dark:bg-white/[0.04] dark:text-zinc-500 dark:group-hover:text-zinc-300",
                )}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="my-4 h-px bg-zinc-100 dark:bg-white/[0.05]" />

      {/* Logout button */}
      <button
        onClick={onLogOut}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition-all hover:bg-red-50 hover:text-red-600 dark:text-zinc-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/[0.04]">
          <LogOut
            size={16}
            className={cn(locale === "ar" ? "" : "rotate-180")}
          />
        </span>
        {t("log-out")}
      </button>
    </aside>
  );
}

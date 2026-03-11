"use client";

import Image from "next/image";
import logo from "../../../../../../public/assets/Images/app-logo.webp";
import { Link, usePathname } from "@/i18n/navigation";
import {
  CalendarHeart,
  ClipboardList,
  Flower,
  LayoutDashboard,
  Package,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import UserMenu from "./user-menu";
import { useMemo } from "react";
import { LocalSwitch } from "@/components/shared/local-switch";
import ThemeSwitch from "@/components/shared/theme-switch";

type NavLinksProps = {
  href: string;
  lable: string;
  icon: React.ReactNode;
};

type SideBarProps = {
  className?: string;
  variant?: "desktop" | "mobile";
  isOpen?: boolean;
  onClose?: () => void;
  topOffsetClass?: string;
};

export default function SideBar({
  className,
  variant = "desktop",
  isOpen = false,
  onClose,
  topOffsetClass = "",
}: SideBarProps) {
  // Translations
  const t = useTranslations();

  // Navigation
  const locale = useLocale();
  const pathName = usePathname();

  // Variables
  const navLinks: NavLinksProps[] = useMemo(() => {
    return [
      { href: "/dashboard", lable: t("overview"), icon: <LayoutDashboard /> },
      {
        href: "/dashboard/categories",
        lable: t("categories"),
        icon: <ClipboardList />,
      },
      {
        href: "/dashboard/occassions",
        lable: t("occasion"),
        icon: <CalendarHeart />,
      },
      { href: "/dashboard/products", lable: t("products"), icon: <Package /> },
    ];
  }, [t]);

  const SidebarContent = (
    <div className="flex h-full flex-col w-full min-w-0 overflow-hidden">
      {/* Top — controls always visible */}
      <div className="shrink-0 flex items-center justify-center gap-2 p-3 border-b border-black/10 dark:border-white/10">
        <LocalSwitch />
        <ThemeSwitch />
      </div>

      {/* Middle — scrollable */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-3 min-h-0">
        <div className="flex items-center justify-center">
          <Image src={logo} alt="rose-app" width={90} height={0} />
          <UserMenu />
        </div>

        <Link
          className="flex rounded-md text-white items-center gap-2 bg-maroon-500 hover:bg-maroon-600 transition-colors duration-300 w-full px-3 py-2"
          href="/"
          locale={locale}
          onClick={onClose}
        >
          <Flower size={20} />{" "}
          <span className="truncate">{t("preview-website")}</span>
        </Link>

        <ul className="flex flex-col gap-1 w-full">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={cn(
                  pathName === link.href
                    ? "bg-maroon-50 dark:bg-maroon-300 text-maroon-600 dark:text-maroon-800"
                    : "text-zinc-800 dark:text-zinc-50",
                  "flex items-center gap-2 py-2 rounded-md font-semibold px-3",
                )}
                href={link.href}
                locale={locale}
                onClick={onClose}
              >
                {link.icon} <span className="truncate">{link.lable}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Desktop fixed sidebar — always visible
  if (variant === "desktop") {
    return (
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-50 w-72",
          topOffsetClass,
          "bg-white dark:bg-zinc-800",
          "border-e border-black/10 dark:border-white/10",
          className,
        )}
      >
        {SidebarContent}
      </aside>
    );
  }

  // Mobile drawer — unmount from layout entirely when closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close sidebar overlay"
      />

      {/* Drawer */}
      <aside
        className={cn(
          "absolute inset-y-0 start-0 w-72 max-w-[80vw]",
          topOffsetClass,
          "bg-white dark:bg-zinc-800",
          "border-e border-black/10 dark:border-white/10",
          "overflow-hidden",
          className,
        )}
      >
        {/* Close button */}
        <div className="shrink-0 p-3 flex items-center justify-end border-b border-black/10 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl",
              "border border-black/10 bg-white text-zinc-800 shadow-sm",
              "transition hover:bg-zinc-50",
              "dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700",
            )}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {SidebarContent}
      </aside>
    </div>
  );
}

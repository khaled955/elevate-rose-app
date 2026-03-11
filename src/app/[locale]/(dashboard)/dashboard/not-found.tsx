"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function DashboardNotFound() {
  // Translation
  const t = useTranslations("NotFound");

  // Locale
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <main
      className={[
        "min-h-[100dvh] w-full",
        "flex items-center justify-center",
        "bg-white text-zinc-900",
        "dark:bg-zinc-950 dark:text-zinc-50",
        "px-6 py-12",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        {/* 404 number */}
        <div
          className={[
            "text-[120px] font-bold leading-none",
            "bg-gradient-to-r from-rose-500 to-pink-600",
            "bg-clip-text text-transparent",
            "animate-pulse",
          ].join(" ")}
        >
          404
        </div>

        {/* Title */}
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-md text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
          {t("description")}
        </p>

        {/* Button */}
        <Link
          href={`/${locale}/dashboard`}
          className={[
            "mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3",
            "bg-rose-600 text-white",
            "hover:bg-rose-700",
            "transition-all duration-200",
            "shadow-sm hover:shadow-md",
            "focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2",
            "dark:focus:ring-offset-zinc-950",
          ].join(" ")}
        >
          {isArabic ? (
            <ArrowLeft className="h-4 w-4" />
          ) : (
            <Home className="h-4 w-4" />
          )}

          {t("back-dashboard")}
        </Link>
      </div>
    </main>
  );
}

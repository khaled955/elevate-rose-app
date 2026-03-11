"use client";

import Image from "next/image";
import { CalendarDays, ShieldCheck, Tag } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { CurrentCategory } from "@/lib/types/category";
import { useFormatter, useTranslations } from "next-intl";

type CategoryDetailCardProps = {
  category: CurrentCategory;
  className?: string;
};

export default function CategoryDetailCard({
  category,
  className,
}: CategoryDetailCardProps) {
  // Translations
  const t = useTranslations();
  const formatter = useFormatter();

  return (
    <article
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm",
        "dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      {/* Image section */}
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/7]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* name overlay */}
        <h2 className="absolute bottom-3 start-3 text-lg font-semibold capitalize text-white sm:bottom-4 sm:start-4 sm:text-2xl">
          {category.name}
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-4 p-4 sm:p-6">
        {/* slug */}
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Tag className="h-4 w-4" />
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            {t("slug")}
          </span>
          <span className="capitalize">{category.slug}</span>
        </div>

        {/* created date */}
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <CalendarDays className="h-4 w-4" />
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            {t("created")}
          </span>
          <span>
            {formatter.dateTime(new Date(category.createdAt), "date-only")}
          </span>
        </div>

        {/* admin badge */}
        {category.isSuperAdmin && (
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-medium",
              "border-green-200 bg-green-50 text-green-700",
              "dark:border-green-900 dark:bg-green-950 dark:text-green-400",
            )}
          >
            <ShieldCheck className="h-4 w-4" />
            {t("super-admin-category")}
          </div>
        )}
      </div>
    </article>
  );
}

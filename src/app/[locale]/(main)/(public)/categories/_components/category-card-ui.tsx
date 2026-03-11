"use client";

import Image from "next/image";
import { ArrowUpRight, Boxes, Package } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Category } from "@/lib/types/category";
import { useTranslations } from "next-intl";

type CategoryCardUIProps = {
  category: Category;
  className?: string;
  onOpenDetails: () => void;
  onOpenProducts: () => void;
};

export default function CategoryCardUI({
  category,
  className,

  onOpenDetails,
  onOpenProducts,
}: CategoryCardUIProps) {
  // Translations
  const t = useTranslations();
  // Variables
  const { name, image, productsCount, slug } = category;

  return (
    <div
      className={cn(
        "group w-full",
        "rounded-2xl border border-zinc-200 bg-white shadow-sm",
        "transition hover:-translate-y-0.5 hover:shadow-md",
        "dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        {/* badge */}
        <div className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-zinc-800 backdrop-blur dark:bg-zinc-950/70 dark:text-zinc-100">
          <Boxes className="h-3.5 w-3.5" />
          {t("count", { count: productsCount })}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-base font-semibold capitalize text-zinc-900 dark:text-zinc-50">
              {name}
            </h3>

            <p className="mt-1 line-clamp-1 text-sm text-zinc-500 dark:text-zinc-400">
              {slug}
            </p>
          </div>

          {/* open details */}
          <button
            type="button"
            onClick={onOpenDetails}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-xl",
              "border border-zinc-200 bg-white text-zinc-700",
              "hover:bg-zinc-50",
              "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200",
            )}
            aria-label={t("category-details")}
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Products Button */}
        {productsCount > 0 && (
          <button
            type="button"
            onClick={onOpenProducts}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl",
              "bg-maroon-600 px-3 py-2 text-sm font-medium text-white",
              "hover:bg-maroon-700 transition",
            )}
          >
            <Package className="h-4 w-4" />
            {t("view-products", { count: productsCount })}
          </button>
        )}
      </div>
    </div>
  );
}

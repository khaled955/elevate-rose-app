"use client";

import Image from "next/image";
import emptyPhoto from "../../../../../../../public/assets/Images/empty-whishlist.webp";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type EmptyWishlistProps = {
  className?: string;
};

export default function EmptyWishlist({ className }: EmptyWishlistProps) {
  // Translations
  const t = useTranslations("wishlist-empty-state");

  const locale = useLocale();

  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "border border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-950",
        "rounded-xl px-6 py-10",
        "shadow-sm dark:shadow-zinc-900/30",
        "transition-colors duration-300",
        className,
      )}
      aria-live="polite"
      role="status"
    >
      {/* Image */}
      <div className="relative mb-6">
        <Image
          src={emptyPhoto}
          alt={t("imageAlt")}
          width={260}
          height={260}
          className="opacity-90 dark:opacity-80 select-none pointer-events-none"
          priority={false}
        />

        {/* floating icon */}
        <div
          className={cn(
            "absolute -top-2 -end-2",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-200 dark:border-zinc-700",
            "rounded-full p-2 shadow-sm",
          )}
        >
          <Heart className="w-5 h-5 text-maroon-600 dark:text-soft-pink-300" />
        </div>
      </div>

      {/* Title */}
      <h2
        className={cn(
          "text-xl font-semibold mb-2",
          "text-maroon-700 dark:text-soft-pink-200",
        )}
      >
        {t("title")}
      </h2>

      {/* Description */}
      <p
        className={cn(
          "text-sm mb-6 max-w-md",
          "text-zinc-500 dark:text-zinc-400",
        )}
      >
        {t("description")}
      </p>

      {/* CTA button */}
      <Link
        locale={locale}
        href="/products"
        className={cn(
          "inline-flex items-center gap-2",
          "bg-maroon-600 hover:bg-maroon-700",
          "dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400",
          "text-white dark:text-maroon-900",
          "font-medium",
          "px-5 py-2.5 rounded-lg",
          "transition-colors duration-200",
          "shadow-sm hover:shadow-md",
        )}
      >
        <ShoppingBag className="w-4 h-4" />
        {t("cta")}
      </Link>
    </section>
  );
}

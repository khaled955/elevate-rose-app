import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import photo from "../../../public/assets/occasion-1.png";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils/cn";
import { RatingStars } from "../ui/ring-stars";
import React from "react";

type SearchCardProps = {
  src?: StaticImageData | string;
  title?: React.ReactNode;
  rate?: number;
  rateCount?: number;
  priceBeforeSale: number;
  priceAfterSale?: number;
  salesCount?: number;
  productId: string;
  className?: string;
};

export default function SearchCard({
  src = photo,
  productId,
  rate = 0,
  title = "Flower App",
  salesCount = 0,
  priceAfterSale = 0,
  priceBeforeSale = 0,
  rateCount = 0,
  className,
}: SearchCardProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  return (
    <article
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm",
        "dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="flex w-full gap-3 p-3 sm:gap-4 sm:p-4">
        {/* image */}
        <Link
          locale={locale}
          href={`/products/${productId}`}
          className={cn(
            "relative shrink-0 overflow-hidden rounded-xl border border-zinc-200",
            "dark:border-zinc-800",
            "h-20 w-20 sm:h-24 sm:w-24",
          )}
        >
          <Image className="object-cover" src={src} alt="name" fill />
        </Link>

        {/* content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <Link locale={locale} href={`/products/${productId}`} className="min-w-0">
              <h2 className="line-clamp-1 text-base font-semibold text-maroon-700 dark:text-soft-pink-200 sm:text-lg">
                {title}
              </h2>
            </Link>

          
          </div>

          {/* rating */}
          <div className="mt-1">
            <RatingStars rateAvg={rate} rateCount={rateCount} />
          </div>

          {/* price + action */}
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-medium text-maroon-700 dark:text-soft-pink-200">
                {t("price-number-currancy-base-0", { price: priceAfterSale })}
              </span>
              <span className="text-zinc-400 line-through dark:text-zinc-500">
                {t("price-number-currancy-base-1", { price: priceBeforeSale })}
              </span>
            </div>

            
          </div>
        </div>
      </div>

      {/* badge */}
      {salesCount > 5 && (
        <div className="absolute top-3 end-3">
          <Badge variant="secondary">{t("hot")}</Badge>
        </div>
      )}
    </article>
  );
}

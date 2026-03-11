"use client";

import Image from "next/image";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import { OrderItem } from "@/lib/types/orders";

// Types
type OrderItemProps = {
  orderItem: OrderItem;
  className?: string;
};

export default function OrderItemCard({
  orderItem,
  className,
}: OrderItemProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const product = orderItem.product;
  const rateAvg = product?.rateAvg ?? 0;
  const rateCount = product?.rateCount ?? 0;

  // ✅ for plural key like: ratings {count}
  const ratingCountForPlural = rateCount;

  return (
    <li
      className={cn(
        "w-full rounded-xl border p-3 shadow-sm transition",
        "border-zinc-200 bg-zinc-50 hover:shadow-md",
        "dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Image + Info */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Image */}
          <div className="imge overflow-hidden rounded-md w-full sm:w-auto">
            <Image
              className="h-auto w-full object-cover sm:h-[80px] sm:w-[80px]"
              src={product?.imgCover}
              alt={product?.title || "product"}
              width={80}
              height={80}
            />
          </div>

          {/* Details */}
          <div className="details flex flex-col justify-between">
            <div className="text-info">
              {/* title */}
              <h3 className="line-clamp-1 font-semibold text-base sm:text-lg capitalize text-zinc-900 dark:text-zinc-50">
                {product?.title}
              </h3>

              {/* rating-info (same spirit like CartItem) */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Star fill="orange" stroke="orange" className="h-4 w-4" />

                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {t("rating-0")}:{t("rateavg", { rateAvg })}/
                  {t("ratecount", { rateCount })}
                </span>

                <span className="font-medium text-blue-600 dark:text-blue-400 text-nowrap text-sm">
                  ({t("ratings", { count: ratingCountForPlural })})
                </span>
              </div>
            </div>

            {/* Qty + Price */}
            <div className="product-price-count mt-3">
              <p className="inline-flex items-baseline gap-1 whitespace-nowrap">
                {/* quantity */}
                <span className="text-maroon-600 dark:text-maroon-50 font-bold flex items-center">
                  (<X size={16} className="inline" />
                  {t("quantity-0", { quantity: orderItem.quantity })})
                </span>

                {/* total price (price * quantity) */}
                <span className="text-zinc-800 dark:text-zinc-200 font-bold text-xl sm:text-2xl">
                  {t("price-quantity", {
                    productPrice: orderItem.price * orderItem.quantity,
                  })}
                </span>

                <span className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                  {t("egp")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

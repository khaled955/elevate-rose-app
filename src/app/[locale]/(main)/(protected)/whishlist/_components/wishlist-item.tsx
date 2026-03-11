"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

import type {
  LocalWishlistProduct,
  WishlistProduct,
} from "@/lib/types/whishlist";
import WishlistAction from "./wishlist-action";
import { Link } from "@/i18n/navigation";
import { Product } from "@/lib/types/product";

type WishlistItemProps = {
  product: WishlistProduct | Product | LocalWishlistProduct;
  className?: string;
};

export default function WishlistItem({
  product,
  className,
}: WishlistItemProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Variables
  const safeRateAvg = product.rateAvg ?? 0;
  const productId = "_id" in product ? product._id : product.id;

  return (
    <div
      className={cn(
        // layout
        "flex flex-col gap-4 py-5",
        "md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div className="cart-info flex flex-col gap-3 md:flex-row md:items-center">
        <Link
          href={`/products/${productId}`}
          locale={locale}
          title="Show Product Details"
          className={cn(
            "imge inline-block w-full overflow-hidden rounded-xl",
            "bg-zinc-100 dark:bg-zinc-900",
            "md:w-auto",
            "ring-1 ring-transparent hover:ring-zinc-200 dark:hover:ring-zinc-800",
            "transition",
          )}
        >
          <Image
            className="h-auto w-full object-cover md:w-[150px]"
            src={product.imgCover}
            alt={product.title}
            width={150}
            height={0}
          />
        </Link>

        <div className="details flex flex-col justify-between gap-3 md:gap-2">
          <div className="text-info">
            {/* title */}
            <h1 className="text-lg font-semibold capitalize text-zinc-900 dark:text-zinc-50">
              {product.title}
            </h1>

            {/* rating-info */}
            <div className="rating-info my-2 flex items-center gap-2">
              <Star className="h-4 w-4" fill="orange" stroke="orange" />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                {t("rating-0")}:{t("rateavg", { rateAvg: safeRateAvg })}
              </span>
            </div>
          </div>

          <div className="product-price-count mt-2 md:mt-0">
            <p className="inline-flex items-baseline gap-1 whitespace-nowrap">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {t("price-quantity", {
                  productPrice: product.priceAfterDiscount ?? product.price,
                })}
              </span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                {t("egp")}
              </span>

              {typeof product.priceAfterDiscount === "number" &&
                product.priceAfterDiscount < product.price && (
                  <span className="ms-2 text-sm text-zinc-400 line-through dark:text-zinc-500">
                    {product.price}
                  </span>
                )}
            </p>
          </div>
        </div>
      </div>

      {/* actions */}
      <WishlistAction product={product} />
    </div>
  );
}

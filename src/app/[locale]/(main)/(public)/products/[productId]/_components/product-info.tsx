import { Link } from "@/i18n/navigation";
import { Product } from "@/lib/types/product";
import { Package, Star } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import CardDetailActionButton from "./card-detail-action-button";

type ProductInfoProps = {
  product: Product;
};
export default function ProductInfo({
  product: {
    title,
    description,
    price,
    priceAfterDiscount,
    rateAvg,
    quantity,
    rateCount,
    _id,
  },
}: ProductInfoProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const productRating = rateAvg && rateCount > 0 ? rateAvg / rateCount : "0";
  return (
    <section className="w-full md:w-[50%]">
      <header>
        <h1 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100 text-center md:text-start mb-4">
          {title}
        </h1>
        <div className="price-details flex gap-2 my-3 items-center">
          <p>
            {t.rich("price-info", {
              oldValue: price,
              newValue: priceAfterDiscount!,

              old: (chunks) => (
                <span className="text-zinc-300 line-through text-3xl font-bold">
                  {chunks}
                </span>
              ),
              new: (chunks) => (
                <span className="font-bold text-zinc-800 text-3xl dark:text-zinc-50">
                  {chunks}
                </span>
              ),
              unit: (chunks) => (
                <span className="text-xl font-medium">{chunks}</span>
              ),
            })}
          </p>
          <div className="stock-case">
            {quantity > 0 ? (
              <p className="flex items-center h-10 w-44 gap-1 rounded-2xl bg-zinc-100 p-2 dark:text-zinc-800">
                <Package size={20} />
                {t("quantity", { count: quantity })} {t("left-in-stock")}
              </p>
            ) : (
              <p className="flex items-center h-10 w-44 gap-1 rounded-2xl bg-zinc-100 p-2 text-red-600">
                <Package size={20} className="me-1" />
                <span className="text-sm">{t("out-of-stock")}</span>
              </p>
            )}
          </div>
        </div>
      </header>
      <div className="flex h-14 gap-2 border-y border-zinc-200 py-4 dark:border-zinc-600">
        <Star fill="orange" stroke="orange" />
        <span>
          {t("rating-0")}: {rateAvg} / {rateCount}
        </span>
        <Link
          href="#preview"
          className="font-medium text-blue-600 hover:underline"
        >
          ( {t("ratings", { count: productRating })})
        </Link>
      </div>
      <div className="description my-5">
        <p className="max-h-72 min-h-12 overflow-y-auto text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>

      {/* action-button */}
      <div className="card-detail-action-btn">
        <CardDetailActionButton showAddBtn={quantity > 0} productId={_id} />
      </div>
    </section>
  );
}

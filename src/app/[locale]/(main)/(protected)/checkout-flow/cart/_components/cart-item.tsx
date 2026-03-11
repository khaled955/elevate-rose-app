"use client";
import Image from "next/image";
import defaultPhoto from "../../../../../../../../public/assets/Images/Cover.png";
import { useTranslations } from "next-intl";
import { Star, X } from "lucide-react";
import CartAction from "./cart-action";
import { CartItemResponse, CartItemUI } from "@/lib/types/cart";
import { cn } from "@/lib/utils/cn";
//Types
type cartItemProp = {
  cartInfo: CartItemResponse | CartItemUI;
  className?: string;
};
export default function CartItem({
  cartInfo: {
    product: {
      rateAvg,
      rateCount,
      imgCover,
      _id,
      title,
      quantity: productQuantity,
    },
    quantity,
    price,
  },
  className,
}: cartItemProp) {
  // Translations
  const t = useTranslations();

  // Variables
  const safeRateAvg = rateAvg ?? 0;
  const safeRateCount = rateCount ?? 0;

  const productRating =
    safeRateCount > 0 ? String(safeRateAvg / safeRateCount) : "0";
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:justify-between py-3",
        className,
      )}
    >
      <div className="cart-info flex flex-col md:flex-row gap-3">
        <div className="imge rounded-md overflow-hidden w-full md:w-auto">
          <Image
            className="w-full h-auto object-cover md:w-[150px]"
            src={imgCover || defaultPhoto}
            alt="title"
            width={150}
            height={0}
          />
        </div>
        <div className="details flex flex-col justify-between">
          <div className="text-info">
            {/* title */}
            <h1 className="font-semibold text-lg capitalize">{title}</h1>
            {/* rating-info */}
            <div className="flex h-14 gap-2 rating-info my-3">
              <Star fill="orange" stroke="orange" />
              <span>
                {t("rating-0")}:{t("rateavg", { rateAvg: safeRateAvg })}/
                {t("ratecount", { rateCount: safeRateCount })}
              </span>
              <span className="font-medium text-blue-600 text-nowrap">
                ( {t("ratings", { count: productRating })})
              </span>
            </div>
          </div>
          <div className="product-price-count mt-2 md:mt-0">
            <p className="inline-flex items-baseline gap-1 whitespace-nowrap">
              <span className="text-maroon-600 dark:text-maroon-50 font-bold flex items-center">
                {/* quantity in cart */}
                (<X size={16} className="inline" />
                 {t('quantity-number-number-base', { quantity })} )
              </span>
              {/* total price of item in cart */}
              <span className="text-zinc-800 dark:text-zinc-200 font-bold text-2xl">
                {t("price-quantity", { productPrice: price * quantity })}
              </span>
              <span className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                {t("egp")}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* update-remove-buttons */}
      <CartAction
        productId={_id}
        productQuantity={productQuantity}
        quantityInCart={quantity}
      />
    </div>
  );
}

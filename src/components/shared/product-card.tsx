import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import photo from "../../../public/assets/occasion-1.png";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils/cn";
import { RatingStars } from "../ui/ring-stars";
import ProductCardWhishlistButtons from "./product-card-whishlist-buttons";
import ProductAddButton from "./product-add-button";
import { Product } from "@/lib/types/product";

type ProductCardProps = {
  src?: StaticImageData | string;
  title?: string;
  rate?: number;
  rateCount?: number;
  priceBeforeSale: number;
  priceAfterSale?: number;
  salesCount?: number;
  productId: string;
  className?: string;
  showWishListBtn?: boolean;
  productQuantity?: number;
  productInfo?: Product;
};

export default function ProductCard({
  src = photo,
  productId,
  rate = 0,
  title = "Flower App",
  salesCount = 0,
  priceAfterSale = 0,
  priceBeforeSale = 0,
  showWishListBtn = false,
  rateCount = 0,
  productInfo,
  className,
}: ProductCardProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div
      className={cn(
        "shadow dark:shadow-zinc-200 rounded-t-xl overflow-hidden relative",
        className,
      )}
    >
      <Link
        locale={locale}
        href={`/products/${productId}`}
        className="relative card-link inline-block w-full aspect-[4/3]"
      >
        <Image className="object-cover" src={src} alt={title} fill />
      </Link>
      <div className="card-content px-3 pb-2">
        <div className="product-title">
          <h2 className="font-semibold text-maroon-700 dark:text-soft-pink-200 text-xl line-clamp-1">
            {title}
          </h2>
        </div>
        {/* stars-component */}
        <RatingStars rateAvg={rate} rateCount={rateCount} />
        <div className="product-details flex justify-between items-center">
          <div className="price flex gap-3 items-center">
            <span className=" text-maroon-700 dark:text-soft-pink-200 font-medium">
              {t("price-number-currancy-base-0", { price: priceAfterSale })}
            </span>
            <span className="line-through text-zinc-400 dark:text-zinc-500">
              {t("price-number-currancy-base-1", { price: priceBeforeSale })}
            </span>
          </div>
          {/*Add To Cart Button */}
          <ProductAddButton productInfo={productInfo!} />
        </div>
      </div>

      {/* Badge */}
      {salesCount > 5 && (
        <div className="badge absolute top-3 end-4">
          <Badge variant={"secondary"}>{t("hot")}</Badge>
        </div>
      )}

      {/*add & remove whishlist-buttons */}
      {showWishListBtn && <ProductCardWhishlistButtons productId={productId} productInfo={productInfo!} />}
    </div>
  );
}

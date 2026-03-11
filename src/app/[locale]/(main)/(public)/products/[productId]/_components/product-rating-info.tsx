import { RatingStars } from "@/components/ui/ring-stars";
import { useTranslations } from "next-intl";

type ProductRatingProps = {
  ratingAvg: number;
  ratingCount: number;
};

export default function ProductRatingInfo({
  ratingAvg,
  ratingCount,
}: ProductRatingProps) {
  // Translations
  const t = useTranslations();
  // Variables
  const productRating =
    ratingAvg && ratingCount > 0 ? ratingAvg / ratingCount : "0";
  return (
    <div className="product-rating mb-4">
      <span className="text-xl font-semibold text-zinc-800 dark:text-white">
        {t("general-rating")}
      </span>
      <p className="flex items-center gap-1 mb-3">
        <span className="text-2xl font-semibold text-zinc-800 dark:text-white">
          ({t("productrating", { rating: productRating })})
        </span>
        <span className="text-base font-medium text-zinc-500">
          ( {t("ratings", { count: ratingCount })})
        </span>
      </p>
      <RatingStars rateAvg={ratingAvg} rateCount={ratingCount} size={26} />
    </div>
  );
}

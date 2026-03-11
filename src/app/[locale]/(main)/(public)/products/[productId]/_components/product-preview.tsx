import HomeSubtitle from "@/components/shared/home-subtitle";
import ProductRatingInfo from "./product-rating-info";
import { useTranslations } from "next-intl";

type ProductPreviewProps = {
  ratingAvg: number;
  ratingCount: number;
};
export default function ProductPreview({
  ratingAvg,
  ratingCount,
}: ProductPreviewProps) {
  // Translations
  const t = useTranslations();

  return (
    <div id="preview" className="my-8">
      <HomeSubtitle className="w-fit mb-3">{t('product-reviews')}</HomeSubtitle>
      {/* rating-info */}
      <ProductRatingInfo ratingAvg={ratingAvg} ratingCount={ratingCount} />
    </div>
  );
}

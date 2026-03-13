import HomeSubtitle from "@/components/shared/home-subtitle";
import catchError from "@/lib/utils/catch-error";
import { getTranslations } from "next-intl/server";
import SimilarProductsCarousel from "./similar-products-carousel";
import { SimilarProductsResponse } from "@/lib/types/similar-products";
import { fetchSimilarProductsService } from "../_actions/fetch-similar-products.service";

type SimilarProductsProps = {
  productId: string;
};
export default async function SimilarProducts({
  productId,
}: SimilarProductsProps) {
  // Translations
  const t = await getTranslations();
  // Functions
  const [payload, error] = await catchError<
    APIResponse<SimilarProductsResponse>
  >(() => fetchSimilarProductsService(productId));

  //   catch error
  if (error || !payload || "error" in payload) {
    throw new Error(payload?.message || "Error During Fetch Related Products");
  }

  //related-products
  const { similarProducts } = payload;

  return (
    <div>
      <HomeSubtitle className="text-soft-pink-500 w-fit dark:text-maroon-400 my-5">
        {t("related-products")}
      </HomeSubtitle>
      <SimilarProductsCarousel similarProducts={similarProducts} />
    </div>
  );
}

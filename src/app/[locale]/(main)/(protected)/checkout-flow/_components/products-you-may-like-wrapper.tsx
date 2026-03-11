import HomeSubtitle from "@/components/shared/home-subtitle";
import catchError from "@/lib/utils/catch-error";
import { getTranslations } from "next-intl/server";
import { fetchProductsYouMayLikeAction } from "../_actions/fetch-products-you-may-like.action";
import { YouMayLikeProductsResponse } from "@/lib/types/products-you-may-like.api";
import SimilarProductsCarousel from "../../../(public)/products/[productId]/_components/similar-products-carousel";
import FeedbackError from "@/components/shared/feedback-error";

export default async function ProductsYouMayLikeWrapper() {
  // Translations
  const t = await getTranslations();
  // Functions
  const [payload, error] = await catchError<
    APIResponse<YouMayLikeProductsResponse>
  >(() => fetchProductsYouMayLikeAction());

  if (!payload) return null;

  //   catch error
  if ("error" in payload) {
    throw new Error(
      payload?.message || "Error During Fetch Products You May Like!",
    );
  }

  //related-products
  const { recommendations } = payload;

  if (error) {
    return <FeedbackError errorMsg={error} />;
  }
  return (
    <div>
      <HomeSubtitle className="text-soft-pink-500 w-fit dark:text-maroon-400 my-5">
        {t("products-you-may-like")}
      </HomeSubtitle>
      <SimilarProductsCarousel similarProducts={recommendations} />
    </div>
  );
}

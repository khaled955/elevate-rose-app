import BestSellerGift from "@/components/features/best-sellers/best-seller-gift";
import BestSellersCarousel from "./best-sellers-carousel";
import { Products } from "@/lib/types/product";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";
import { fetchBestProductsAction } from "../_actions/fetch-best-products.action";

export default async function BestSellers() {
  const payload: APIResponse<PaginatedResponse<Products>> =
    await fetchBestProductsAction(10);

  //check if it's an error
  if ("error" in payload || payload.message !== "success") {
    const errorMessage =
      payload.error || payload.message || "Failed to fetch products";
    throw new Error(errorMessage);
  }

  const { products } = payload;

  return (
    <div className="flex flex-col lg:flex-row px-4 justify-center items-center gap-3 lg:gap-6 md:justify-between text-center lg:text-start">
      <BestSellerGift />

      <Suspense fallback={<Spinner />}>
        <BestSellersCarousel products={products} />
      </Suspense>
    </div>
  );
}

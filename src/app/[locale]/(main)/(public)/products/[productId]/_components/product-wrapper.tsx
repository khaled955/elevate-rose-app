import catchError from "@/lib/utils/catch-error";
import { notFound } from "next/navigation";
import { Product } from "@/lib/types/product";
import ProductGallery from "./product-gallery";
import ProductInfo from "./product-info";
import { ThumbnailCarousel } from "@/components/shared/thumbnail-carousel";
import ProductPreview from "./product-preview";
import { fetchSpecificProductService } from "../_actions/fetch-specific-product.service";

type ProductWraperProps = {
  productId: string;
};
export default async function ProductWrapper({
  productId,
}: ProductWraperProps) {
  // Guard Class
  if (!productId || productId.length !== 24) notFound();

  //   fetch
  const [payload, error] = await catchError<APIResponse<{ product: Product }>>(
    () => fetchSpecificProductService(productId),
  );

  //   catch error
  if (error || !payload || "error" in payload) {
    throw new Error(payload?.message || "Error During Fetch Specific Product");
  }

  // product
  const { product } = payload;
  return (
    <div>
      {/* gallery-section */}
      <div className="flex flex-col md:flex-row gap-5">
        <ProductGallery>
          <ThumbnailCarousel title={product.title} images={product.images} />
        </ProductGallery>
        {/* product-details-section */}
        <ProductInfo product={product} />
      </div>
      {/* preview-section */}
      <ProductPreview
        ratingAvg={product.rateAvg}
        ratingCount={product.rateCount}
      />
    </div>
  );
}

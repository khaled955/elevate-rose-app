import { RouteProps } from "@/lib/types/common";
import ProductWrapper from "./_components/product-wrapper";
import PreviewList from "./_components/preview-list";
import RatingForm from "./_components/rating-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import SimilarProducts from "./_components/similar-products";
import { notFound } from "next/navigation";
import Spinner from "@/components/shared/spinner";
import { Metadata } from "next";
import catchError from "@/lib/utils/catch-error";
import { Product } from "@/lib/types/product";
import { fetchSpecificProductService } from "./_actions/fetch-specific-product.service";

// meta data
export async function generateMetadata({
  params: { locale, productId },
}: RouteProps): Promise<Metadata> {
  const isAr = locale === "ar";

  const [payload, error] = await catchError<APIResponse<{ product: Product }>>(
    () => fetchSpecificProductService(productId),
  );

  if (error || !payload || "error" in payload) {
    return {
      title: isAr
        ? "إيليفيت | روز — تفاصيل المنتج"
        : "Elevate | Rose — Product Details",
    };
  }

  const { product } = payload;

  return {
    title: isAr
      ? `إيليفيت | روز — ${product.title}`
      : `Elevate | Rose — ${product.title}`,
    description: isAr
      ? `اطلع على تفاصيل ${product.title} وتقييمات العملاء — اختر الوردة المثالية لمناسبتك`
      : `View details and customer reviews for ${product.title} — find the perfect rose for your occasion`,
  };
}
export default async function ProductDetailsPage({
  params: { productId },
}: RouteProps) {
  // guard-class
  if (!productId || productId.length !== 24) return notFound();
  // get session for related products need token
  const session = await getServerSession(authOptions);
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ProductWrapper productId={productId} />
      </Suspense>

      <div className="rating-preview-form flex flex-col md:flex-row gap-4">
        {/*preview-list */}
        <PreviewList />

        {/* rating-form */}
        <RatingForm logedIn={!!session} productId={productId} />
      </div>

      {/* related-products-section */}
      <Suspense fallback={<Loader className="animate-spin" />}>
        {session && <SimilarProducts productId={productId} />}
      </Suspense>
    </>
  );
}

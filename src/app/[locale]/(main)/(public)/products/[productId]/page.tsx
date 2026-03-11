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

export default async function ProductDetailsPage({
  params: { productId },
}: RouteProps) {
  // guard-class
  if (!productId || productId.length !== 24) return notFound();
  // get session for related products need token
  const session = await getServerSession(authOptions);
  return (
    <>
      <Suspense
        fallback={
         <Spinner/>
        }
      >
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

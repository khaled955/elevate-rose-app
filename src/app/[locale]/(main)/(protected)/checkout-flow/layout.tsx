import { LayoutProps } from "@/lib/types/common";
import ProductsYouMayLikeWrapper from "./_components/products-you-may-like-wrapper";
import { Suspense } from "react";
import { Loader } from "lucide-react";

export type CheckoutFlowLayoutProps = LayoutProps & {
  summary: React.ReactNode;
};

export default function Layout({ children, summary }: CheckoutFlowLayoutProps) {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <main className="order-1 lg:order-none lg:col-span-8">
            {children}
          </main>

          <aside className="order-2 lg:order-none lg:col-span-4">
            {/* Sticky summary only on large screens */}
            <div className="lg:sticky lg:top-24">{summary}</div>
          </aside>
        </div>
      </div>

      {/* products-you-may-like */}
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4">
        <Suspense fallback={<Loader className="animate-spin" />}>
          <ProductsYouMayLikeWrapper />
        </Suspense>
      </div>
    </>
  );
}

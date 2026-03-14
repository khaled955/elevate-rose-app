import { Suspense } from "react";
import FilterList from "./_components/filter-list";
import ProductsList from "./_components/products-list";
import FilterByCategory from "./_components/filter-by-category";
import FilterByOccasions from "./_components/filter-by-occasions";
import FilterByRate from "./_components/filter-by-rate";
import FilterByPrice from "./_components/filter-by-price";
import ResetAllQueryiesButton from "./_components/reset-all-queryies-button";
import { RouteProps } from "@/lib/types/common";
import MobileFiltersSheet from "./_components/mobile-filters-sheet";
import ProductCardSkeleton from "@/components/skeletons/product/product-card-skeletone";
import { PageProps } from "../../../../../../.next/types/app/layout";
import { Metadata } from "next";

// meta data
export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "إيليفيت | روز — المنتجات" : "Elevate | Rose — Products",
    description: isAr
      ? "تصفح مجموعتنا الكاملة من الورود الفاخرة — فلتر حسب المناسبة، التقييم، والسعر"
      : "Browse our full collection of luxury roses — filter by occasion, rating, and price",
  };
}

export default function Productspage({ searchParams }: RouteProps) {
  const pathName = `/products`;

  const filters = (
    <FilterList>
      <FilterByCategory />
      <FilterByOccasions />
      <FilterByRate />
      <FilterByPrice />
      <ResetAllQueryiesButton />
    </FilterList>
  );

  return (
    <div className="flex flex-col md:flex-row gap-5 my-4">
      {/* Desktop sidebar*/}
      <aside className="hidden md:block md:w-[260px] lg:w-[300px] flex-shrink-0">
        {filters}
      </aside>

      {/* Mobile sheet */}
      <MobileFiltersSheet title="Filters">{filters}</MobileFiltersSheet>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ProductsList pathName={pathName} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

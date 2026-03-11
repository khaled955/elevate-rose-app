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

export default function Productspage({ searchParams }: RouteProps) {
  const pathName = `/products`;

  return (
    <div className="flex flex-col md:flex-row gap-5 my-4">
      <MobileFiltersSheet title="Filters">
        <FilterList>
          <FilterByCategory />
          <FilterByOccasions />
          <FilterByRate />
          <FilterByPrice />
          <ResetAllQueryiesButton />
        </FilterList>
      </MobileFiltersSheet>

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

"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { useScrollCategories } from "../_hooks/use-scroll-categories";
import { Loader } from "lucide-react";
import CategoryCard from "./category-card";
import FilterHeader from "./filter-header";
import { useQueryParams } from "@/hooks/shared/use-query-params";
import { useTranslations } from "next-intl";
import CategoryCardSkeleton from "@/components/skeletons/category/category-card-skeletone";

export default function CategoryList() {
  // Translation
  const t = useTranslations();
  // Hooks
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useScrollCategories();

  // Variables
  const pages = data?.pages ?? [];
  const categories = pages.flatMap((page) => page.categories);

  // Handlers
  const handleFetchNextPage = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  // Hooks
  const { hasQueryValue } = useQueryParams();

  return (
    <section>
      <FilterHeader
        queryName="category"
        isDisabled={hasQueryValue("category")}
        title={t("category")}
      />
      <main
        id="categories-scroll"
        className="max-h-[200px] overflow-y-auto"
        aria-label="categories list"
      >
        <InfiniteScroll
          dataLength={categories.length}
          scrollableTarget="categories-scroll"
          next={handleFetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="flex justify-center py-4" aria-live="polite">
              <Loader
                size={18}
                className="animate-spin"
                aria-hidden="true"
                focusable="false"
              />
              <span className="sr-only">{t("loading-more-categories")}</span>
            </div>
          }
          endMessage={
            !isLoading && (
              <p
                className="py-2 text-center capitalize text-sm"
                role="status"
                aria-live="polite"
              >
                {t("you-have-seen-all-categories")}{" "}
              </p>
            )
          }
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          ) : (
            <ul aria-label="categories" className="space-y-1">
              {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </ul>
          )}
        </InfiniteScroll>
      </main>
    </section>
  );
}

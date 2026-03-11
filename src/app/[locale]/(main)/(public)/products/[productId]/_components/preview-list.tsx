"use client";

import PreviewCard from "./preview-card";

import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "lucide-react";
import { useReviews } from "../_hooks/use-reviews";
import { useTranslations } from "next-intl";
import PreviewCardSkeleton from "@/components/skeletons/product/preview-card-skeletone";

export default function PreviewList() {
  // Translations
  const t = useTranslations();
  // Hooks
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useReviews();

  // Variables
  const pages = data?.pages ?? [];
  const reviews = pages.flatMap((page) => page.reviews);

  // Handlers
  const handleFetchNextPage = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  return (
    <section className="w-full md:w-[50%]">
      {!isLoading && reviews.length === 0 && (
        <p className="text-maroon-500 font-semibold p-2 text-center dark:text-soft-pink-200">
          No Reviews Available Now!
        </p>
      )}
      <main
        id="reviews-scroll"
        className="max-h-[25rem] overflow-y-auto"
        aria-label="reviews list"
      >
        <InfiniteScroll
          dataLength={reviews.length}
          scrollableTarget="reviews-scroll"
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
              <span className="sr-only">{t("loading-more-reviews")}</span>
            </div>
          }
          endMessage={
            !isLoading &&
            reviews.length > 0 && (
              <p
                className="py-2 text-center capitalize text-sm"
                role="status"
                aria-live="polite"
              >
                {t("you-have-seen-all-reviews")}
              </p>
            )
          }
        >
          {isLoading || isFetching ? (
            <div className="flex justify-center py-4" aria-live="polite">
              {Array.from({ length: 3 }).map((_, i) => (
                <PreviewCardSkeleton key={i} />
              ))}
              <span className="sr-only">{t("loading-reviews")}</span>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <PreviewCard key={review._id} reviewInfo={review} />
              ))}
            </div>
          )}
        </InfiniteScroll>
      </main>
    </section>
  );
}

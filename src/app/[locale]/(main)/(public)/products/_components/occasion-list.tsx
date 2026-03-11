"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "lucide-react";
import FilterHeader from "./filter-header";
import OccasionCard from "./occasion-card";
import { useScrollOccasions } from "../_hooks/use-scroll-occasions";
import { Occasion } from "@/lib/types/occasion";
import { useQueryParams } from "@/hooks/shared/use-query-params";
import { useTranslations } from "next-intl";
import OccasionCardSkeleton from "@/components/skeletons/occassion/occassion-card-skeletone";

export default function OccasionList() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useScrollOccasions();

  const { hasQueryValue } = useQueryParams();

  // Variables
  const pages = data?.pages ?? [];
  const occasions = pages.flatMap((page) => page.occasions);

  // Handlers
  const handleFetchNextPage = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  return (
    <section className="my-5 border-t border-b border-zinc-100 dark:border-zinc-700 py-4">
      <FilterHeader
        isDisabled={hasQueryValue("occasion")}
        queryName="occasion"
        title={t("occasion")}
      />
      <main
        id="occasions-scroll"
        className="max-h-[200px] overflow-y-auto"
        aria-label="occasions list"
      >
        <InfiniteScroll
          dataLength={occasions.length}
          scrollableTarget="occasions-scroll"
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
              <span className="sr-only">{t("loading-more-occasions")}</span>
            </div>
          }
          endMessage={
            !isLoading && (
              <p
                className="py-2 text-center capitalize text-sm"
                role="status"
                aria-live="polite"
              >
                {t("you-have-seen-all-occasions")}
              </p>
            )
          }
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <OccasionCardSkeleton key={i} />
            ))
          ) : (
            <ul aria-label="occasions" className=" grid grid-cols-2 gap-2">
              {occasions.map((occasion: Occasion) => (
                <OccasionCard key={occasion._id} occasion={occasion} />
              ))}
            </ul>
          )}
        </InfiniteScroll>
      </main>
    </section>
  );
}

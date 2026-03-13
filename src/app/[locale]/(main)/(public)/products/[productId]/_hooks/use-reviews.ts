import { useInfiniteQuery } from "@tanstack/react-query";
import { Reviews } from "@/lib/types/preview";
import { fetchAllReviewsService } from "../_actions/fetch-all-reviews.service";

export function useReviews() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["reviews"],

    queryFn: async ({ pageParam }) => {
      const payload: APIResponse<PaginatedResponse<Reviews>> =
        await fetchAllReviewsService({ page: String(pageParam) });

      if ("error" in payload) {
        const errorMessage = payload.error || "error during fetch reviews";
        throw new Error(errorMessage);
      }

      return payload;
    },

    // { Initial page index }
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;

      // { Load next page if more pages exist }
      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      // { No more pages available }
      return undefined;
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  };
}

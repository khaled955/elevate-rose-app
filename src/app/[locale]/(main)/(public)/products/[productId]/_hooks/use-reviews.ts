import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllReviewsAction } from "../_actions/fetch-all-reviews.action";
import { Reviews } from "@/lib/types/preview";

export function useReviews() {
  // { Infinite reviews query }
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    // { Cache key for reviews }
    queryKey: ["reviews"],

    // { Fetch notifications page by page }
    queryFn: async ({ pageParam }) => {
      // { Call reviews API with pagination }
      const payload: APIResponse<PaginatedResponse<Reviews>> =
        await fetchAllReviewsAction({ page: String(pageParam) });

      // { Handle API error responses }
      if ("error" in payload || payload.message !== "success") {
        const errorMessage =
          payload.error || payload.message || "error during fetch reviews";
        throw new Error(errorMessage);
      }

      // { Return successful page response }
      return payload;
    },

    // { Initial page index }
    initialPageParam: 1,

    // { Determine next page number }
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;

      // { Load next page if more pages exist }
      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      // { No more pages available }
      return undefined;
    },

    // { Disable automatic retries to avoid repeated 401 errors }
    retry: false,

    // { Prevent refetching when window gains focus }
    refetchOnWindowFocus: false,
  });

  // { Expose query state and helpers }
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  };
}

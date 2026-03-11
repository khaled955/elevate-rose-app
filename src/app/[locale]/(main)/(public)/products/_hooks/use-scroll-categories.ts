import { useInfiniteQuery } from "@tanstack/react-query";
import { Categories } from "@/lib/types/category";
import { fetchCategoriesService } from "@/lib/actions/categories/fetch-all-categories.service";

export function useScrollCategories() {
  // { Infinite notifications query }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      // { Cache key for notifications }
      queryKey: ["categories"],

      // { Fetch notifications page by page }
      queryFn: async ({ pageParam }) => {
        // { Call notifications API with pagination }
        const payload: APIResponse<PaginatedResponse<Categories>> =
          await fetchCategoriesService({ page: String(pageParam), limit: "6" });

        // { Handle API error responses }
        if ("error" in payload || payload.message !== "success") {
          const errorMessage =
            payload.error ||
            payload.message ||
            "error during fetch notifications";
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
  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
}

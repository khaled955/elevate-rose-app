"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesService } from "@/lib/actions/categories/fetch-all-categories.service";
import { Categories } from "@/lib/types/category";
import { SearchParams } from "@/lib/types/common";

export function useCategories(searchparams: SearchParams) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["categories", searchparams],
    queryFn: async () => {
      const payload: APIResponse<PaginatedResponse<Categories>> =
        await fetchCategoriesService(searchparams);
      // check-error
      if ("error" in payload) {
        throw new Error(
          payload.error || "error during fetch Categories From Dashboard!",
        );
      }
      return payload;
    },
  });

  return { data, isLoading, isFetching };
}

"use client";

import { useQuery } from "@tanstack/react-query";
import type { CurrentCategoryResponse } from "@/lib/types/category";
import { fetchCurrentCategoryService } from "../_actions/fetch-current-category.service";

type UseCurrentCategoryArgs = {
  categoryId: string;
  enabled?: boolean;
};

export function useCurrentCategory({
  categoryId,
  enabled,
}: UseCurrentCategoryArgs) {
  const { data, error, isPending, refetch, isError,isFetching } = useQuery({
    queryKey: ["category-details", categoryId],
    enabled: Boolean(enabled && categoryId),
    queryFn: async () => {
      const payload: APIResponse<CurrentCategoryResponse> =
        await fetchCurrentCategoryService(categoryId);
      // Catch-error
      if ("error" in payload) {
        throw new Error(
          payload.error || "Error During Fetch Current Category!",
        );
      }

      return payload;
    },
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  });

  return { data, error, isPending, refetch, isError,isFetching };
}

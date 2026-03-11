"use client";
import { useQuery } from "@tanstack/react-query";
import { SearchParams } from "@/lib/types/common";
import { fetchOccasionsService } from "@/lib/actions/occasions/fetch-all-occasions.service";
import { Occasions } from "@/lib/types/occasion";

export function useOccassions(searchparams: SearchParams) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["occassions", searchparams],
    queryFn: async () => {
      const payload: APIResponse<PaginatedResponse<Occasions>> =
        await fetchOccasionsService(searchparams);
      // check-error
      if ("error" in payload) {
        throw new Error(
          payload.error || "error during fetch Occassions From Dashboard!",
        );
      }
      return payload;
    },

    staleTime: 1000 * 60 * 6, // 6 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching };
}

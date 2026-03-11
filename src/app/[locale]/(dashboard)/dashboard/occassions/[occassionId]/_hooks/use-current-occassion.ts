"use client";

import { CurrentOccasionResponse } from "@/lib/types/occasion";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentOccassionService } from "../_actions/fetch-current-occassion.service";

type UseCurrentOccassionArgs = {
  occassionId: string;
  enabled?: boolean;
};

export function useCurrentOccassion({
  occassionId,
  enabled,
}: UseCurrentOccassionArgs) {
  const { data, isPending, isFetching ,error} = useQuery({
    queryKey: ["occassion-details", occassionId],
    enabled: Boolean(enabled && occassionId),
    queryFn: async () => {
      const payload: APIResponse<CurrentOccasionResponse> =
        await fetchCurrentOccassionService(occassionId);
      // Catch-error
      if ("error" in payload) {
        throw new Error(
          payload.error || "Error During Fetch Current Occassion!",
        );
      }

      return payload;
    },
   
  });

  return { data,  isPending, isFetching ,error};
}

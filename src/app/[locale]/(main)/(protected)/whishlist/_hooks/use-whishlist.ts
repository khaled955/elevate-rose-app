"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWhishlistService } from "../_actions/fetch-whishlist.service";
import { WishlistResponseData } from "@/lib/types/whishlist";

type UseWishlistOptions = {
  enabled?: boolean;
};

export function useWhishlist(options?: UseWishlistOptions) {
  const enabled = options?.enabled ?? true;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["whishlist"],
    queryFn: async () => {
      const payload: APIResponse<WishlistResponseData> =
        await fetchWhishlistService();
      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during fetch whishlist");
      }
      return payload;
    },
    enabled,

    staleTime: 30_000, //30Second
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching };
}

"use client";

import { fetchWishlistStatusAction } from "@/lib/actions/whishlist/fetch-whishlist-product-status.action";
import { WhishlistCheck } from "@/lib/types/whishlist";
import { useQuery } from "@tanstack/react-query";

export function useWishlistStatus(productId: string) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["wishlist-check", productId],
    queryFn: async () => {
      const payload: APIResponse<WhishlistCheck> =
        await fetchWishlistStatusAction(productId);
      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during check whishlist status");
      }
      return payload;
    },

    staleTime: 30_000, //30Second
  });

  return { data, isLoading, isFetching };
}

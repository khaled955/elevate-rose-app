"use client";

import { fetchCartAction } from "@/lib/actions/cart/fetch-cart.action";
import { CartResponse } from "@/lib/types/cart";
import { useQuery } from "@tanstack/react-query";

export function useCart() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const payload: APIResponse<CartResponse> = await fetchCartAction();
      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during fetch cart");
      }
      return payload;
    },

    staleTime: 30_000, //30Second
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching };
}

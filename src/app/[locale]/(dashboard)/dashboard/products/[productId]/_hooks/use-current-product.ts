"use client";

import { CurrentProductResponse } from "@/lib/types/product";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentProductService } from "../_actions/fetch-current-product.service";

type UseCurrentProductArgs = {
  productId: string;
  enabled?: boolean;
};

export function useCurrentProduct({
  productId,
  enabled,
}: UseCurrentProductArgs) {
  const { data, isPending, isFetching,error } = useQuery({
    queryKey: ["product-details", productId],
    enabled: Boolean(enabled && productId),
    queryFn: async () => {
      const payload: APIResponse<CurrentProductResponse> =
        await fetchCurrentProductService(productId);

      // catch-error
      if ("error" in payload) {
        throw new Error(payload.error || "Error During Fetch Current Product!");
      }

      return payload;
    },
   
  });

  return { data, isPending, isFetching ,error};
}

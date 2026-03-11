"use client";
import { Products } from "@/lib/types/product";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProductsService } from "@/lib/actions/products/fetch-all-products.service";
import { SearchParams } from "@/lib/types/common";

export function useProducts(searchparams: SearchParams) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products", searchparams],
    queryFn: async () => {
      const payload: APIResponse<PaginatedResponse<Products>> =
        await fetchAllProductsService(searchparams);
      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during fetch Products");
      }
      return payload;
    },

    staleTime: 30_000, //30Second
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching };
}

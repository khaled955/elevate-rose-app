"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategoryProductsService } from "../_actions/fetch-category-product.service";
import { Products } from "@/lib/types/product";

type ProductsQuery = Record<
  string,
  string | number | boolean | undefined | null
>;

type UseCategoryProductsArgs = {
  categoryId: string;
  enabled?: boolean;
  query?: ProductsQuery;
};

export function useCategoryProducts({
  categoryId,
  enabled,
}: UseCategoryProductsArgs) {
  const {
    data: productsPayload,
    isPending: isProductsPending,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["category-products", categoryId],
    enabled: Boolean(enabled && categoryId),
    queryFn: async () => {
      const payload: APIResponse<PaginatedResponse<Products>> =
        await fetchCategoryProductsService(categoryId);
      //  catech-error
      if ("error" in payload) {
        throw new Error(
          payload.error || "Error During Fetch Products Of Category!",
        );
      }

      return payload;
    },
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    isProductsError,
    isProductsPending,
    productsError,
    productsPayload,
    refetchProducts,
  };
}

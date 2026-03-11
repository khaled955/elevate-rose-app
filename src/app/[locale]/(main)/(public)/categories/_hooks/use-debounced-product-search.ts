"use client";

import { useMemo } from "react";
import { useDebounce } from "use-debounce";
import type { Product } from "@/lib/types/product";

type UseDebouncedProductSearchArgs = {
  products: Product[];
  search: string;
  debounceMs?: number;
};

export function useDebouncedProductSearch({
  products,
  search,
  debounceMs = 250,
}: UseDebouncedProductSearchArgs) {
  const showSearch = (products?.length ?? 0) > 4;

  const [debouncedSearch] = useDebounce(search, debounceMs);
  const normalizedQuery = debouncedSearch.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return products;

    return products.filter((p) =>
      (p.title ?? "").toLowerCase().includes(normalizedQuery),
    );
  }, [products, normalizedQuery]);

  const isEmpty = (products?.length ?? 0) === 0;
  const isNoResults = !isEmpty && (filteredProducts?.length ?? 0) === 0;

  return {
    showSearch,
    filteredProducts,
    isEmpty,
    isNoResults,
  };
}

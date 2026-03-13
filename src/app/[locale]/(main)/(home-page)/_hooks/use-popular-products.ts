import { useQuery } from "@tanstack/react-query";
import { Products } from "@/lib/types/product";
import { useState } from "react";
import { fetchPopularProductsService } from "../_actions/fetch-most-popular-products.service";
const ERROR_MSG = `Failed to fetch products`;
const DEFAULT_OCCASION = "673b34c21159920171827ae0";

export function usePopularProducts() {
  const [currentOccasion, setCurrentOccasion] = useState(DEFAULT_OCCASION);

  const {
    data: productResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularProducts", currentOccasion],
    queryFn: async () => {
      const payload: APIResponse<PaginatedResponse<Products>> =
        await fetchPopularProductsService(currentOccasion);

      //check if it's an error
      if ("error" in payload || payload.message !== "success") {
        const errorMessage = payload.error || payload.message || ERROR_MSG;
        throw new Error(errorMessage);
      }

      return payload;
    },

    enabled: Boolean(currentOccasion),
  });

  const handleSetOccasion = (currentId: string) => {
    setCurrentOccasion(currentId);
  };

  return {
    productResponse,
    isLoading,
    error,
    handleSetOccasion,
    currentOccasion,
  };
}

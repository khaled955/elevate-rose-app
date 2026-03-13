import { fetchAddressService } from "@/lib/actions/address/fetch-address.service";
import { AddressesResponse } from "@/lib/types/addresses";
import { useQuery } from "@tanstack/react-query";

export function useAddress() {
  const { data, isFetching, isLoading,error } = useQuery({
    queryKey: ["address"],
    queryFn: async () => {
      const payload: APIResponse<AddressesResponse> =
        await fetchAddressService();

      if ("error" in payload) {
        throw new Error(payload.message || "error during fetch address!");
      }

      return payload;
    },
  });

  return { data, isFetching, isLoading,error };
}

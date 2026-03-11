"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserDataService } from "../_actions/fetch-profile-data.service";
import { ProfileResponse } from "@/lib/types/profile";

export function useUserData() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const payload: APIResponse<ProfileResponse> =
        await fetchUserDataService();
      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during fetch user data");
      }
      return payload;
    },

    staleTime: 30_000, //30Second
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching };
}

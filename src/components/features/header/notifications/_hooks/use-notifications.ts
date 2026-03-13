import { useInfiniteQuery } from "@tanstack/react-query";
import { Notifications } from "@/lib/types/notifications";
import { useSession } from "next-auth/react";
import { fetchNotificationsService } from "../_actions/fetch-notifications.service";

export function useNotifications() {
  // Hooks
  const { status, data: session } = useSession();
  // Variables
  const isAuthed = status === "authenticated";
  const isAdmine = session?.user?.role === "admin";
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["notifications"],

      queryFn: async ({ pageParam }) => {
        const payload: APIResponse<PaginatedResponse<Notifications>> =
          await fetchNotificationsService(pageParam, 6);

        if ("error" in payload) {
          const errorMessage =
            payload.error ||
            payload.message ||
            "error during fetch notifications";
          throw new Error(errorMessage);
        }

        return payload;
      },

      // { Initial page index }
      initialPageParam: 1,

      // { Determine next page number }
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPages } = lastPage.metadata;

        // { Load next page if more pages exist }
        if (currentPage < totalPages) {
          return currentPage + 1;
        }

        // { No more pages available }
        return undefined;
      },

      // { Stop fetching when user is not authenticated }
      enabled: isAuthed && isAdmine,

      retry: false,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
}

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNotificationsAction } from "../_actions/fetch-notifications.action";
import { Notifications } from "@/lib/types/notifications";
import { useSession } from "next-auth/react";

export function useNotifications() {
  // { Session state from NextAuth }
  const { status, data: session } = useSession();

  // { Query should run only when user is authenticated }
  // { This prevents 401 Unauthorized requests }
  const isAuthed = status === "authenticated";
  const isAdmine = session?.user?.role === "admin";
  // { Infinite notifications query }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      // { Cache key for notifications }
      queryKey: ["notifications"],

      // { Fetch notifications page by page }
      queryFn: async ({ pageParam }) => {
        // { Call notifications API with pagination }
        const payload: APIResponse<PaginatedResponse<Notifications>> =
          await fetchNotificationsAction(pageParam, 6);

        // { Handle API error responses }
        if ("error" in payload) {
          const errorMessage =
            payload.error ||
            payload.message ||
            "error during fetch notifications";
          throw new Error(errorMessage);
        }

        // { Return successful page response }
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

      // { Disable automatic retries to avoid repeated 401 errors }
      retry: false,

      // { Prevent refetching when window gains focus }
      refetchOnWindowFocus: false,
    });

  // { Expose query state and helpers }
  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
}

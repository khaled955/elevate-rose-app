import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markSingleNotificationsAsReadAction } from "../_actions/mark-single-notification-as-read.action";
import { toast } from "sonner";
import { MarkNotificationAsReadResponse } from "@/lib/types/notifications";

export function useSingleNotificationAsRead() {
  const queryClient = useQueryClient();

  const {
    mutate: onMarkAsRead,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (notificationId: string) => {
      const payload: APIResponse<MarkNotificationAsReadResponse> =
        await markSingleNotificationsAsReadAction(notificationId);

      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "Failed to mark notification as read");
      }
      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notification marked as read");
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.log(error);

      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onMarkAsRead, error, isPending };
}

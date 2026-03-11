import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteSingleNotificationAction } from "../_actions/delete-single-notification.action";
import { DeleteNotificationResponse } from "@/lib/types/notifications";

export function useDeleteSingleNotification() {
  const queryClient = useQueryClient();

  const {
    mutate: onSingleDelete,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (notificationId: string) => {
      const payload: APIResponse<DeleteNotificationResponse> =
        await deleteSingleNotificationAction(notificationId);

      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "Failed to delete notification");
      }
      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notification deleted");
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onSingleDelete, error, isPending };
}

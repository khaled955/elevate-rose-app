import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MarkNotificationAsReadResponse } from "@/lib/types/notifications";
import { markAllNotificationsAsReadAction } from "../_actions/mark-all-notification-as-read.action";
import { useTranslations } from "next-intl";

export function useAllNotificationsAsRead() {
  // Translations
  const t = useTranslations();
  const queryClient = useQueryClient();

  const {
    mutate: onMarkAllAsRead,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const payload: APIResponse<MarkNotificationAsReadResponse> =
        await markAllNotificationsAsReadAction();

      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "Failed to mark notification as read");
      }
      return payload;
    },
    onSuccess: () => {
      toast.success(t("notification-marked-as-read"));
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onMarkAllAsRead, error, isPending };
}

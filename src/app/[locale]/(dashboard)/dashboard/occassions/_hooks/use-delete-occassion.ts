import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteOccassionAction } from "../_actions/delete-occassions.actions";

export function useDeleteOccassion() {
  // Translations
  const t = useTranslations();
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onDeleteOccassion, isPending: deleteOccassionIsPending } =
    useMutation({
      mutationFn: async (occassionId: string) => {
        const payload = await deleteOccassionAction(occassionId);

        // catch-error
        if ("error" in payload) {
          throw new Error(payload.error || "error during deleting occassion!");
        }
        return payload;
      },
      onSuccess: async () => {
        toast.success(t("occassion-deleted-successfully"));
        await queryClient.invalidateQueries({
          queryKey: ["occassions"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { onDeleteOccassion, deleteOccassionIsPending };
}

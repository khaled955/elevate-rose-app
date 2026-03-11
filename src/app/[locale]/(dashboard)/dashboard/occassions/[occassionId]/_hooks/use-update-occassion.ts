import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { updateOccassionAction } from "../_actions/update-occassion.action";

export function useUpdateOccassion(occassionId: string) {
  // Translations
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  const {
    mutate: onUpdateOccassion,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = await updateOccassionAction({ occassionId, formData });

      // catch-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during update occassion!");
      }

      return payload;
    },
    onSuccess: async () => {
      toast.success(t("occassion-updated-successfully"));
      await queryClient.invalidateQueries({
        queryKey: ["occassion-details", occassionId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["occassions"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onUpdateOccassion, isPending, error };
}

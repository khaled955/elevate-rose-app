import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { createOccassionAction } from "../_actions/create-occassion.action";

export function useCreateOccassion() {
  // Translations
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  const {
    mutate: onCreateOccassion,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = await createOccassionAction(formData);

      // catch-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during create category!");
      }

      return payload;
    },
    onSuccess: async () => {
      toast.success(t("occassion-created-successfully"));
      await queryClient.invalidateQueries({ queryKey: ["occassions"] });
    },
  });

  return { onCreateOccassion, isPending, error };
}

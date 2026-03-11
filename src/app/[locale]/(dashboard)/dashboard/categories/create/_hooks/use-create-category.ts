import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { createCategoryAction } from "../_actions/create-category.action";

export function useCreateCategory() {
  // Translations
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  const {
    mutate: onCreateCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = await createCategoryAction(formData);

      // catch-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during create category!");
      }

      return payload;
    },
    onSuccess: async () => {
      toast.success(t("category-created-successfully"));
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return { onCreateCategory, isPending, error };
}

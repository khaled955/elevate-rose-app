import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { updateCategoryAction } from "../_actions/update-category.action";

export function useUpdateCategory(categoryId: string) {
  // Translations
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  const {
    mutate: onUpdateCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = await updateCategoryAction({ categoryId, formData });

      // catch-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during update category!");
      }

      return payload;
    },
    onSuccess: async () => {
      toast.success(t("category-updated-successfully"));
      await queryClient.invalidateQueries({
        queryKey: ["category-details", categoryId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onUpdateCategory, isPending, error };
}

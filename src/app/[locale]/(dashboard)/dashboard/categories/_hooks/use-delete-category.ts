import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteCategoryAction } from "../_actions/delete-categories.actions";

export function useDeleteCategory() {
  // Translations
  const t = useTranslations();
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onDeleteCategory, isPending: deleteCategoryIsPending } =
    useMutation({
      mutationFn: async (categoryId: string) => {
        const payload = await deleteCategoryAction(categoryId);

        // catch-error
        if ("error" in payload) {
          throw new Error(payload.error || "error during deleting category!");
        }
        return payload;
      },
      onSuccess: async () => {
        toast.success(t("category-deleted-successfully"));
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { onDeleteCategory, deleteCategoryIsPending };
}

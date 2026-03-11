import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteProductAction } from "../_actions/delete-products.actions";

export function useDeleteProduct() {
  // Translations
  const t = useTranslations();
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onDeleteProduct, isPending: deleteProductIsPending } =
    useMutation({
      mutationFn: async (productId: string) => {
        const payload = await deleteProductAction(productId);

        // catch-error
        if ("error" in payload) {
          throw new Error(payload.error || "error during deleting product!");
        }
        return payload;
      },
      onSuccess: async () => {
        toast.success(t('product-deleted-successfully-0'));
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { onDeleteProduct, deleteProductIsPending };
}

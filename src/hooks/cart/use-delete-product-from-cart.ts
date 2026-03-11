import { deleteProductFromCartAction } from "@/lib/actions/cart/delete-product-from-cart.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useDeleteProductFromCart() {
  // Translations
  const t = useTranslations();
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onDeleteProductFromCart, isPending: deleteProductIsPending } =
    useMutation({
      mutationFn: async (productId: string) => {
        const payload = await deleteProductFromCartAction(productId);

        // catch-error

        if ("error" in payload) {
          throw new Error(
            payload.error || "error during update product in cart!",
          );
        }
        return payload;
      },
      onSuccess: async () => {
        toast.success(t('product-deleted-successfully'));
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { onDeleteProductFromCart, deleteProductIsPending };
}

import { updateCartAction } from "@/lib/actions/cart/update-cart.action";
import { AddToCartProps } from "@/lib/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useUpdateCart() {

  // Translations
  const t = useTranslations()
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onUpdateCart, isPending } = useMutation({
    mutationFn: async ({ productId, quantity }: AddToCartProps) => {
      const payload = await updateCartAction({ productId, quantity });

      // catch-error

      if ("error" in payload) {
        throw new Error(payload.error || "error during update product in cart!");
      }
      return payload;
    },
    onSuccess: async () => {
      toast.success(t('product-updated-in-cart-successfully'));
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onUpdateCart, isPending };
}

import { clearCartAction } from "@/lib/actions/cart/clear-cart.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useClearCart() {
  // Translations
  const t = useTranslations();
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onClearCart, isPending: clearCartIsPending } = useMutation({
    mutationFn: async () => {
      const payload = await clearCartAction();

      // catch-error

      if ("error" in payload) {
        throw new Error(
          payload.error || "error during update product in cart!",
        );
      }
      return payload;
    },
    onSuccess: async () => {
      toast.success(t('cart-cleared-successfully'));
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onClearCart, clearCartIsPending };
}

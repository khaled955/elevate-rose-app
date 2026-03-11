import { CashPaymentResponse, CheckOutAddress } from "@/lib/types/checkout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCashOrderAction } from "../_actions/create-cash-order.action";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export function useCashOrder() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  // Navigations
  const router = useRouter();
  // Hooks
  const queryClient = useQueryClient();

  // RHF
  const { mutate: onCreateCashOrder, isPending: cashIsPending } = useMutation({
    mutationFn: async (fieldValues: CheckOutAddress) => {
      const payload: APIResponse<CashPaymentResponse> =
        await createCashOrderAction(fieldValues);

      // catch-error

      if ("error" in payload) {
        throw new Error(payload.error || "error during create cash order!");
      }
      return payload;
    },
    onSuccess: async () => {
      toast.success(t("order-created-successfully"), {
        duration: 1000,
        onAutoClose: () => {
          // navigate to all orders page
          router.push("/allOrders", { locale });
        },
      });

      // Revalidate cart
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onCreateCashOrder, cashIsPending };
}

import {
  CrediteOrderFields,
  CreditPaymentResponse,
} from "@/lib/types/checkout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { createCrediteOrderAction } from "../_actions/create-credit-order.action";

export function useCreditOrder() {
  // Translations
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  // RHF
  const { mutate: onCreateCreditOrder, isPending: creditIsPending } =
    useMutation({
      mutationFn: async ({ fieldValues, url }: CrediteOrderFields) => {
        const payload: APIResponse<CreditPaymentResponse> =
          await createCrediteOrderAction({ fieldValues, url });

        // catch-error

        if ("error" in payload) {
          throw new Error(payload.error || "error during create credit order!");
        }
        return payload;
      },
      onSuccess: async (data) => {
        toast.success(t("redirect-to-payment-page"), {
          duration: 2000,
          onAutoClose: () => {
            // navigate to stripe page
            window.location.href = data.session.url;
          },
        });

        // Revalidate cart
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { onCreateCreditOrder, creditIsPending };
}

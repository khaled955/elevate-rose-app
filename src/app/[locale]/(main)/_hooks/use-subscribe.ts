import { useMutation } from "@tanstack/react-query";
import { subscribeAction } from "../_actions/subscribe.action";
import { SubscriptionField } from "@/lib/schemas/auth-schema/subscription.schema";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useSubscribe() {
  const t = useTranslations();
  const {
    mutate: onSubscribe,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (values: SubscriptionField) =>
       await subscribeAction(values),
    onSuccess: () => {
      toast.success(t("subscription-done-successfully"));
    },
    onError: (error) => {
      toast.error(error.message || t("try-again-later"));
    },
  });

  return { onSubscribe, isPending, error };
}

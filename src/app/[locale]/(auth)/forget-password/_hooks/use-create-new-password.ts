import { useMutation } from "@tanstack/react-query";
import {
  LoginAndRegisterResponse,
  NewPasswordFieldValuesSendToServer,
} from "@/lib/types/auth";
import { createNewPasswordAction } from "../_actions/create-new-password.action";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { TOAST_DURATION } from "@/lib/constants/duration.constant";
import { useRouter } from "@/i18n/navigation";

export function useCreateNewPassword() {
  // translations
  const t = useTranslations();

  const locale = useLocale();

  // navigation
  const router = useRouter();

  // mutation function to create new password
  const {
    mutate: onCreateNewPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (fields: NewPasswordFieldValuesSendToServer) => {
      const payload: APIResponse<LoginAndRegisterResponse> =
        await createNewPasswordAction(fields);

      //check if it's an error
      if ("error" in payload || payload.message !== "success") {
        const errorMessage =
          payload.error || payload.message || "Failed to fetch products";
        throw new Error(errorMessage);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t("password-has-been-reset-successfully"), {
        duration: TOAST_DURATION,
        onAutoClose: () => {
          router.push(`/login`, { locale });
        },
      });
    },
  });

  return { onCreateNewPassword, isPending, error };
}

import { useTranslations } from "next-intl";
import { useRegisterSchema } from "./register.schema";
import z from "zod";

// ***********************************************************************************
// Email Schema
export function useEmailSchema() {
  return useRegisterSchema().pick({ email: true });
}
export type EmailField = z.infer<ReturnType<typeof useEmailSchema>>;
// ***********************************************************************************
// Send OTP Schema
export function useSendOtpSchema() {
  const t = useTranslations();
  return z.object({
    resetCode: z.string().min(6, t("otp-must-be-count-digits", { count: 6 })),
  });
}

export type SendOtpFields = z.infer<ReturnType<typeof useSendOtpSchema>>;
// ***********************************************************************************
// New Password Schema

export function useNewPasswordSchema() {
  const t = useTranslations();
  return useRegisterSchema()
    .pick({ password: true, rePassword: true })
    .refine((values) => values.password === values.rePassword, {
      message: t("password-and-confirm-password-not-identical"),
      path: ["rePassword"],
    });
}

export type NewPasswordFields = z.infer<
  ReturnType<typeof useNewPasswordSchema>
>;
// ***********************************************************************************

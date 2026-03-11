import z from "zod";
import { useRegisterSchema } from "./register.schema";
import { PASSWORD_PATTERN } from "@/lib/constants/authentication-pattern.constant";
import { useTranslations } from "next-intl";

export function useChangePasswordSchema() {
  // Translations
  const t = useTranslations();

  return useRegisterSchema()
    .pick({
      password: true,
      rePassword: true,
    })
    .extend({
      newPassword: z
        .string()
        .nonempty(t("new-password-is-required"))
        .regex(PASSWORD_PATTERN, t("password-pattern", { count: 8 })),
    })
    .refine((data) => data.password !== data.newPassword, {
      message: t("new-password-must-be-different-from-the-old-password"),
      path: ["newPassword"],
    })
    .refine((data) => data.newPassword === data.rePassword, {
      message: t("new-password-and-confirm-password-not-identical"),
      path: ["rePassword"],
    });
}

// types for change password fields, including the rePassword field which is used for validation
export type ChangePasswordFields = z.infer<
  ReturnType<typeof useChangePasswordSchema>
>;
// types for change password data, excluding the rePassword field which is only used for validation and not needed in the actual data sent to the server
export type ChangePasswordData = Omit<ChangePasswordFields, "rePassword">;

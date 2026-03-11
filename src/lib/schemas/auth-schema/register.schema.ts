import { useTranslations } from "next-intl";
import z from "zod";

const PASSWORD_PATTERN =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const EGYPTIAN_PHONE_PATTERN = /^(?:\+20|0)?1[0125][0-9]{8}$/;

export function useRegisterSchema() {
  const t = useTranslations();

  const registerShema = z
    .object({
      email: z.email({
        error: (iss) =>
          Boolean(iss.input) ? t("email-is-invalid") : t("email-is-required"),
      }),
      firstName: z
        .string()
        .nonempty(t("first-name-is-required"))
        .min(
          3,
          t("first-name-at-least-count-number-number-base-characters", {
            count: 3,
          })
        ),
      lastName: z
        .string()
        .nonempty(t("last-name-is-required"))
        .min(
          3,
          t("first-name-at-least-count-number-number-base-characters-0", {
            count: 3,
          })
        ),
      gender: z.string().nonempty(t("gender-is-required")),
      password: z
        .string()
        .nonempty(t("password-is-required"))
        .regex(PASSWORD_PATTERN, t("password-pattern", { count: 8 })),
      rePassword: z.string().nonempty(t("confirm-password-is-required")),
      phone: z
        .string()
        .nonempty(t("phone-is-required"))
        .regex(EGYPTIAN_PHONE_PATTERN, t("valide-phone")),
    })
    .refine((values) => values.password === values.rePassword, {
      message: t("password-and-confirm-password-not-identical"),
      path: ["rePassword"],
    });

  return registerShema;
}

export type RegisterFields = z.infer<ReturnType<typeof useRegisterSchema>>;

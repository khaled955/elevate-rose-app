import { useTranslations } from "next-intl";
import z from "zod";
import { useRegisterSchema } from "./register.schema";

export function useLoginSchema() {
  const t = useTranslations();

  return useRegisterSchema()
    .pick({
      email: true,
    })
    .extend({
      password: z.string().nonempty(t("password-is-required-0")),
    });
}

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;

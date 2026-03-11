import { useTranslations } from "next-intl";
import { z } from "zod";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function useCreateSchema() {
  const t = useTranslations();

  return z.object({
    name: z.string().nonempty(t("name-is-required")),
    image: z
      .instanceof(File, { message: t("image-is-required") })
      .refine(
        (file) => IMAGE_TYPES.includes(file.type),
        t("image-must-be-valid-type"),
      )
      .or(z.undefined())
      .refine((file) => file !== undefined, t("image-is-required")),
  });
}

export type CreateFormField = z.infer<ReturnType<typeof useCreateSchema>>;

export function useUpdateSchema() {
  const t = useTranslations();
  return z.object({
    name: z.string().nonempty(t("name-is-required")),
  });
}

export type UpdateFormField = z.infer<ReturnType<typeof useUpdateSchema>>;
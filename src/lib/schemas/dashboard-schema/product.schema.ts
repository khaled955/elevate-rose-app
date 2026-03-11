import { useTranslations } from "next-intl";
import z from "zod";

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function useProductSchema() {
  const t = useTranslations();

  const productSchema = z.object({
    title: z.string().nonempty(t("title-is-required")),

    description: z
      .string()
      .nonempty(t("description-is-required"))
      .min(10, t("description-at-least-count-characters", { count: 10 })),

    quantity: z
      .string()
      .nonempty(t("quantity-is-required"))
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: t("quantity-must-be-a-positive-number"),
      }),

    price: z
      .string()
      .nonempty(t("price-is-required"))
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: t("price-must-be-a-positive-number"),
      }),

    discount: z
      .string()
      .nonempty(t("discount-is-required"))
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
        message: t("discount-must-be-a-positive-number"),
      }),

    priceAfterDiscount: z
      .string()
      .optional()
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
        message: t("price-after-discount-must-be-a-positive-number"),
      }),

    category: z.string().nonempty(t("category-is-required")),

    occasion: z.string().nonempty(t("occasion-is-required")),

    imgCover: z
      .instanceof(File, { message: t("img-cover-is-required") })
      .refine(
        (file) => IMAGE_TYPES.includes(file.type),
        t("only-image-files-are-allowed"),
      ),

    images: z
      .array(
        z
          .instanceof(File, { message: t("images-are-required") })
          .refine(
            (file) => IMAGE_TYPES.includes(file.type),
            t("only-image-files-are-allowed"),
          ),
      )
      .min(1, t("at-least-one-image-is-required")),
  });

  return productSchema;
}

export type ProductFields = z.infer<ReturnType<typeof useProductSchema>>;

// Update schema — every field optional
export function useUpdateProductSchema() {
  const t = useTranslations();

  const updateProductSchema = z.object({
    title: z.string().nonempty(t("title-is-required")).optional(),

    description: z
      .string()
      .min(10, t("description-at-least-count-characters", { count: 10 }))
      .optional(),

    quantity: z
      .string()
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
        message: t("quantity-must-be-a-positive-number"),
      })
      .optional(),

    price: z
      .string()
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
        message: t("price-must-be-a-positive-number"),
      })
      .optional(),

    discount: z
      .string()
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
        message: t("discount-must-be-a-positive-number"),
      })
      .optional(),

    priceAfterDiscount: z
      .string()
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
        message: t("price-after-discount-must-be-a-positive-number"),
      })
      .optional(),

    category: z.string().nonempty(t("category-is-required")).optional(),

    occasion: z.string().optional(),

    // imgCover
    imgCover: z
      .union([
        z
          .instanceof(File)
          .refine(
            (file) => IMAGE_TYPES.includes(file.type),
            t("only-image-files-are-allowed"),
          ),
        z.string(),
      ])
      .optional(),

    // images — array of File
    images: z
      .array(
        z.union([
          z
            .instanceof(File)
            .refine(
              (file) => IMAGE_TYPES.includes(file.type),
              t("only-image-files-are-allowed"),
            ),
          z.string(),
        ]),
      )
      .optional(),
  });

  return updateProductSchema;
}

export type UpdateProductFields = z.infer<
  ReturnType<typeof useUpdateProductSchema>
>;

import { useTranslations } from "next-intl";
import { z } from "zod";

export function useReviewProductSchema() {
  // Translations
  const t = useTranslations();

  return z.object({
    rating: z.string().nonempty(t("rating-is-required")),
    title: z.string().nonempty(t("title-is-required")),
    comment: z.string().nonempty(t("review-comment-is-required")),
  });
}

export type ReviewFields = z.infer<ReturnType<typeof useReviewProductSchema>>;

export type ReviewFieldsRequired = ReviewFields & {
  product: string;
};

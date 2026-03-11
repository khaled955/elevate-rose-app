import { ReviewFieldsRequired } from "@/lib/schemas/review-product.schema";
import { useMutation } from "@tanstack/react-query";
import { createProductReviewAction } from "../_actions/create-product-review.action";

export function useCreateProductReview() {
  const {
    mutate: onCreateReview,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (fieldValues: ReviewFieldsRequired) => {
      const payload = await createProductReviewAction(fieldValues);

      //catch-error
      if ("error" in payload) {
        throw new Error(payload?.error);
      }

      return payload;
    },
  });

  return { onCreateReview, isPending, error };
}

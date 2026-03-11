"use client";

import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ReviewFields,
  useReviewProductSchema,
} from "@/lib/schemas/review-product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateProductReview } from "../_hooks/use-create-product-review";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { RatingGroupProduct } from "@/components/ui/rating-group-product";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { useQueryClient } from "@tanstack/react-query";

// Types
type RatingFormProps = {
  productId: string;
  logedIn: boolean;
};

// Variables
const defaultValues = {
  comment: "",
  rating: "",
  title: "",
};

export default function RatingForm({ productId, logedIn }: RatingFormProps) {
  // Translation
  const locale = useLocale();
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<ReviewFields>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(useReviewProductSchema()),
  });

  // Mutation
  const { onCreateReview, isPending, error } = useCreateProductReview();
  // Handlers
  const handleCreateReview: SubmitHandler<ReviewFields> = (values) => {
    onCreateReview(
      {
        comment: values.comment,
        product: productId,
        rating: values.rating,
        title: values.title,
      },
      {
        onSuccess: async () => {
          toast.success(t("review-created-successfully"));

          // ✅ refetch reviews infinite query
          await queryClient.invalidateQueries({
            queryKey: ["reviews"],
          });

          // reset all values to default
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="w-full md:w-[50%] relative">
      <form
        className={cn(logedIn ? "" : "blur-sm", "space-y-4")}
        onSubmit={handleSubmit(handleCreateReview)}
      >
        <div className="rating-value">
          <span className="flex items-center gap-2 text-lg font-medium text-zinc-800 dark:text-zinc-50">
            {t("your-rating")}
            <Controller
              control={control}
              name="rating"
              render={({ field }) => {
                return (
                  <RatingGroupProduct
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                );
              }}
            />
          </span>
          {errors.rating && <FeedbackError errorMsg={errors.rating.message} />}
        </div>
        <div className="rating-title">
          <Label htmlFor="title">{t("title")}</Label>
          <Input
            {...register("title")}
            id="title"
            type="text"
            placeholder={t("enter-review-title")}
          />
          {errors.title && <FeedbackError errorMsg={errors.title.message} />}
        </div>
        <div className="rating-comment">
          <Label htmlFor="comment">{t("review")}</Label>
          <Textarea
            {...register("comment")}
            id="comment"
            placeholder={t("what-do-you-think-of-this-product")}
          />
          {errors.comment && (
            <FeedbackError errorMsg={errors.comment.message} />
          )}
        </div>
        <div className="submit-btn my-6">
          <Button
            disabled={isPending || (isSubmitted && !isValid)}
            className="w-full"
            type="submit"
          >
            {isPending ? <Loader className="animate-spin" /> : t("add-review")}
          </Button>
        </div>
      </form>
      {/* Submit-error */}
      {error && (
        <FeedbackError
          className="font-bold text-center my-2"
          errorMsg={error.message}
        />
      )}

      {!logedIn && (
        <div className="over-lay absolute inset-0 flex justify-center items-center">
          <Link className="font-bold underline" locale={locale} href="/login">
            {t("please-login-to-be-able-to-add-a-review-to-the-product")}{" "}
          </Link>
        </div>
      )}
    </div>
  );
}

"use client";
import { useSubscribe } from "@/app/[locale]/(main)/_hooks/use-subscribe";
import { Button } from "@/components/ui/button";
import {
  SubscriptionField,
  useSubscriptionSchema,
} from "@/lib/schemas/auth-schema/subscription.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues = {
  email: "",
};

export default function SubscriptionForm() {
  const t = useTranslations();
  const locale = useLocale();

  const { onSubscribe, isPending, error } = useSubscribe();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SubscriptionField>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(useSubscriptionSchema()),
  });

  const handleSubscription: SubmitHandler<SubscriptionField> = (data) => {
    onSubscribe(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubscription)}>
      <div className=" flex flex-col gap-3 sm:flex-row ">
        <div>
          <input
            {...register("email")}
            className=" outline-none border-zinc-300 py-3 px-4 rounded-full bg-zinc-600 dark:bg-zinc-800 text-zinc-300 shadow-xl placeholder:text-sm placeholder:text-zinc-400  "
            type="email"
            placeholder={t("enter-your-email")}
          />
        </div>
        <Button
          className="py-6 rounded-full sm:-translate-x-10 rtl:sm:translate-x-10"
          variant={"secondary"}
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              {locale === "en" ? (
                <>
                  {t("subscription")}
                  <ArrowRight />
                </>
              ) : (
                <>
                  {t("subscription")}
                  <ArrowLeft />
                </>
              )}
            </>
          )}
        </Button>
      </div>

      {/* Feedback Validation */}
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      {/* Feedback From Server */}

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </form>
  );
}

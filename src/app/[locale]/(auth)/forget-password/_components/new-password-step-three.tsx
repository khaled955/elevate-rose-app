"use client";

import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NewPasswordFields,
  useNewPasswordSchema,
} from "@/lib/schemas/auth-schema/forget-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateNewPassword } from "../_hooks/use-create-new-password";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

type NewPasswordProps = {
  currentEmail: string;
};

const defaultValues = {
  password: "",
  rePassword: "",
};

export default function NewPasswordStepThree({
  currentEmail,
}: NewPasswordProps) {
  // translations
  const t = useTranslations();
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<NewPasswordFields>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(useNewPasswordSchema()),
  });

  // mutation function to submit new password
  const { onCreateNewPassword, isPending, error } = useCreateNewPassword();

  const handleNewPassword: SubmitHandler<NewPasswordFields> = (data) => {
    onCreateNewPassword({
      email: currentEmail,
      newPassword: data.password,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleNewPassword)}>
        {/* new-password */}
        <div className="new-password">
          <Label>{t("password")}</Label>
          <Input
            type="password"
            {...register("password")}
            autoComplete="new-password"
          />
          {/*validation-error */}
          {errors.password && (
            <FeedbackError errorMsg={errors.password.message} />
          )}
        </div>
        {/* confirm-password */}
        <div className="confirm-password mt-4">
          <Label>{t("confirm-password-0")}</Label>
          <Input
            type="password"
            {...register("rePassword")}
            autoComplete="new-password"
          />
          {/*validation-error */}
          {errors.rePassword && (
            <FeedbackError errorMsg={errors.rePassword.message} />
          )}
        </div>
        <Button
          disabled={isPending || (isSubmitted && !isValid)}
          type="submit"
          className="w-full mt-6"
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            t("reset-password")
          )}
        </Button>
      </form>
      {/* server-error */}
      {error && (
        <FeedbackError className="my-5 text-center" errorMsg={error.message} />
      )}
    </div>
  );
}

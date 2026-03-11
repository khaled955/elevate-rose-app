"use client";

import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChangePasswordFields,
  useChangePasswordSchema,
} from "@/lib/schemas/auth-schema/change-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useChangePassword } from "../_hooks/use-change-password";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { signOut } from "next-auth/react";

const ERROR_MSG = "Error During Change Password From Server Action";

const defaultValues = {
  newPassword: "",
  rePassword: "",
  password: "",
};

export default function ChangePasswordForm() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Navigations
  const router = useRouter();

  // Mutations
  const { error, isPending, onChange } = useChangePassword();

  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
    reset,
  } = useForm<ChangePasswordFields>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(useChangePasswordSchema()),
  });

  // Handlers
  const handleChangePassword: SubmitHandler<ChangePasswordFields> = (data) => {
    onChange(
      { newPassword: data.newPassword, password: data.password },
      {
        onSuccess: () => {
          toast.success(t("password-changed-successfully"), {
            duration: 2000,
            onAutoClose: async () => {
              // reset form
              reset(defaultValues);
              // sign-out user and redirect to login page
              await signOut({ redirect: false });
              // router push to login page
              router.replace(`/login`, { locale });
            },
          });
        },
        onError: (error) => {
          toast.error(error.message || ERROR_MSG);
        },
      },
    );
  };

  return (
    <div className="col-span-1 my-4 flex w-full flex-col items-center lg:col-span-9 lg:items-start">
      <form
        className="flex w-full max-w-3xl flex-col gap-4"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <div className="old-password">
          <Label htmlFor="old-password">{t("old-password")}</Label>
          <Input id="old-password" type="password" {...register("password")} />
          {/* Validation-error */}
          {errors.password && (
            <FeedbackError errorMsg={errors.password.message} />
          )}
        </div>

        <div className="new-password">
          <Label htmlFor="new-password">{t("new-password")}</Label>
          <Input
            id="new-password"
            type="password"
            {...register("newPassword")}
          />
          {/* Validation-error */}
          {errors.newPassword && (
            <FeedbackError errorMsg={errors.newPassword.message} />
          )}
        </div>

        <div className="confirm-password">
          <Label htmlFor="confirm-password">{t("confirm-new-password")}</Label>
          <Input
            id="confirm-password"
            type="password"
            {...register("rePassword")}
          />
          {/* Validation-error */}
          {errors.rePassword && (
            <FeedbackError errorMsg={errors.rePassword.message} />
          )}
        </div>

        <Button
          disabled={(isSubmitted && !isValid) || isPending}
          type="submit"
          className="w-full sm:self-end sm:w-auto"
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            t("change-password")
          )}
        </Button>
      </form>

      {/* Server-error */}
      {error && (
        <FeedbackError
          className="text-center font-bold"
          errorMsg={error.message}
        />
      )}
    </div>
  );
}

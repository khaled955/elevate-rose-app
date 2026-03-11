"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Loader, Lock, Shield } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FeedbackError from "@/components/shared/feedback-error";

import {
  ChangePasswordFields,
  useChangePasswordSchema,
} from "@/lib/schemas/auth-schema/change-password.schema";
import { useChangePassword } from "@/app/[locale]/(main)/(protected)/profile/_hooks/use-change-password";
import { useRouter } from "@/i18n/navigation";

//Constants
const ERROR_MSG = "Error During Change Password From Server Action";

const defaultValues: ChangePasswordFields = {
  newPassword: "",
  rePassword: "",
  password: "",
};

export default function AdminChangePasswordForm() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Navigation
  const router = useRouter();

  // Mutations
  const { error, isPending, onChange } = useChangePassword();

  // RHF
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
              // Reset form
              reset(defaultValues);
              // Sign out and redirect to login
              await signOut({ redirect: false });
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
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/[0.06] dark:bg-white/[0.03] dark:backdrop-blur-sm p-6 md:p-8">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/15">
          <Lock size={18} className="text-indigo-600 dark:text-indigo-400" />
        </span>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            {t("change-password")}
          </h2>
          <p className="text-xs text-zinc-500">{t("update-your-password")}</p>
        </div>
      </div>

      {/* Security tip banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-500/20 dark:bg-amber-500/5">
        <Shield
          size={15}
          className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
        />
        <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-400/80">
          {t("password-security-tip")}
        </p>
      </div>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        {/* Old password */}
        <div className="old-password space-y-1.5">
          <Label
            htmlFor="old-password"
            className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            {t("old-password")}
          </Label>
          <Input
            id="old-password"
            type="password"
            {...register("password")}
            className="border-zinc-200 bg-zinc-50 text-zinc-900 focus:border-indigo-400 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white dark:focus:border-indigo-500/50"
          />
          {/* Validation error */}
          {errors.password && (
            <FeedbackError errorMsg={errors.password.message} />
          )}
        </div>

        {/* New password */}
        <div className="new-password space-y-1.5">
          <Label
            htmlFor="new-password"
            className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            {t("new-password")}
          </Label>
          <Input
            id="new-password"
            type="password"
            {...register("newPassword")}
            className="border-zinc-200 bg-zinc-50 text-zinc-900 focus:border-indigo-400 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white dark:focus:border-indigo-500/50"
          />
          {/* Validation error */}
          {errors.newPassword && (
            <FeedbackError errorMsg={errors.newPassword.message} />
          )}
        </div>

        {/* Confirm password */}
        <div className="confirm-password space-y-1.5">
          <Label
            htmlFor="confirm-password"
            className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            {t("confirm-new-password")}
          </Label>
          <Input
            id="confirm-password"
            type="password"
            {...register("rePassword")}
            className="border-zinc-200 bg-zinc-50 text-zinc-900 focus:border-indigo-400 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white dark:focus:border-indigo-500/50"
          />
          {/* Validation error */}
          {errors.rePassword && (
            <FeedbackError errorMsg={errors.rePassword.message} />
          )}
        </div>

        {/* Submit */}
        <Button
          disabled={(isSubmitted && !isValid) || isPending}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white sm:w-auto sm:self-end"
        >
          {isPending ? (
            <Loader className="animate-spin" size={16} />
          ) : (
            t("change-password")
          )}
        </Button>
      </form>

      {/* Server error */}
      {error && (
        <FeedbackError
          className="mt-4 text-center font-bold"
          errorMsg={error.message}
        />
      )}
    </div>
  );
}

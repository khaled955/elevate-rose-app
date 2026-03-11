"use client";

import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EmailField,
  useEmailSchema,
} from "@/lib/schemas/auth-schema/forget-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEmail } from "../_hooks/use-email";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { ForgetPasswordSteps } from "@/lib/types/auth";
import {
  COOL_DOWN_TIME,
  FORGET_PASSWORD_STEPS,
  OTP_COOL_DOWN_KEY,
} from "@/lib/constants/auth.constants";
import { TOAST_DURATION } from "@/lib/constants/duration.constant";
import { useLocalStorage } from "@/hooks/shared/use-local-storage";

type EmailFormProps = {
  onSetStep: React.Dispatch<React.SetStateAction<ForgetPasswordSteps>>;
  onSetCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  currentEmail: string;
};

export default function EmailStepOne({
  onSetStep,
  onSetCurrentEmail,
  currentEmail,
}: EmailFormProps) {
  const t = useTranslations();

  const { onSubmitEmail, isPending, error } = useEmail();

  // Local Storage Hook
  const { setValue, storedValue: otpCooldown } = useLocalStorage(
    OTP_COOL_DOWN_KEY,
    null
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors, isValid },
  } = useForm<EmailField>({
    defaultValues: { email: currentEmail || "" },
    mode: "onChange",
    resolver: zodResolver(useEmailSchema()),
  });

  const handleSubmitEmail: SubmitHandler<EmailField> = (data) => {
    // if go to verify otp  step and back to first step check if timer still
    if (otpCooldown) {
      onSetCurrentEmail(data.email);
      onSetStep(FORGET_PASSWORD_STEPS.OTP);
      return;
    }

    // first time to go to step 2 or timer finish
    onSubmitEmail(data, {
      onSuccess: () => {
        toast.success(t("email-sent-successfully"), {
          duration: TOAST_DURATION,

          onAutoClose: () => {
            // set timer to prevent repeat send otp
            const expireTime = new Date(Date.now() + COOL_DOWN_TIME);
            setValue(expireTime.toISOString());
            // go to next step
            onSetStep(FORGET_PASSWORD_STEPS.OTP);
            // set email
            onSetCurrentEmail(data.email);
          },
        });
      },
    });
  };

  return (
    <section className="mt-3 w-full md:w-[70%] mx-auto">
      <form
        onSubmit={handleSubmit(handleSubmitEmail)}
        className="border-y-2 py-4 space-y-4 border-zinc-200 dark:border-zinc-600"
      >
        {/* Email */}
        <div className="email">
          <Label htmlFor="email">{t("email")}</Label>
          <Input {...register("email")} id="email" />
          {errors.email && <FeedbackError errorMsg={errors.email.message} />}
        </div>

        <div className="submit-btn">
          <Button
            disabled={isPending || (!isValid && isSubmitted)}
            type="submit"
            className="w-full py-6"
          >
            {isPending ? <Loader className="animate-spin" /> : t("continue")}
          </Button>
          {error && (
            <FeedbackError
              className="text-center font-bold mt-3"
              errorMsg={error.message}
            />
          )}
        </div>
      </form>
    </section>
  );
}

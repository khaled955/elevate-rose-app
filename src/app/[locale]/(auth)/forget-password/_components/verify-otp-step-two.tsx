"use client";

import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { InputOTPPattern } from "@/components/ui/input-otp-pattern";
import {
  SendOtpFields,
  useSendOtpSchema,
} from "@/lib/schemas/auth-schema/forget-password.schema";
import { ForgetPasswordSteps } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useVerifyOtp } from "../_hooks/use-verify-otp";
import {
  COOL_DOWN_TIME,
  FORGET_PASSWORD_STEPS,
  OTP_COOL_DOWN_KEY,
} from "@/lib/constants/auth.constants";
import { Loader } from "lucide-react";
import { useEmail } from "../_hooks/use-email";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/shared/use-local-storage";
import { useEffect, useState } from "react";

type VerifyOtpProps = {
  onSetStep: React.Dispatch<React.SetStateAction<ForgetPasswordSteps>>;
  currentEmail: string;
};

const defaultValues = {
  resetCode: "",
};

export default function VerifyOtpStepTwo({
  onSetStep,
  currentEmail,
}: VerifyOtpProps) {
  const t = useTranslations();
  const {
    handleSubmit,
    control,
    formState: { isSubmitted, isValid, errors },
  } = useForm<SendOtpFields>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(useSendOtpSchema()),
  });

  // Mutation

  const { onSubmitOtp, optIsPending, otpError } = useVerifyOtp();
  const { isPending: emailIsPending, error: emailError } = useEmail();

  const handeleSendOtp: SubmitHandler<SendOtpFields> = (values) => {
    onSubmitOtp(values, {
      onSuccess: () => {
        onSetStep(FORGET_PASSWORD_STEPS.NEW_PASSWORD);
      },
    });
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(handeleSendOtp)}>
        <Controller
          name="resetCode"
          control={control}
          render={({ field }) => (
            <InputOTPPattern
              length={6}
              value={field.value ?? ""}
              onChange={(val) => field.onChange(val)}
              onBlur={() => field.onBlur()}
              name={field.name}
            />
          )}
        />
        {/* error-validation */}
        {errors && (
          <FeedbackError
            className="mt-4 text-center font-bold"
            errorMsg={errors.resetCode?.message}
          />
        )}
        <div className="action-btn text-end">
          {/* resend-otp-button*/}
          <ResendOtp email={currentEmail} />

          {/* submit-button */}
          <Button
            className=" w-full flex justify-center"
            disabled={
              (isSubmitted && !isValid) || optIsPending || emailIsPending
            }
            type="submit"
          >
            {optIsPending ? (
              <Loader className="animate-spin" />
            ) : (
              t("verify-otp")
            )}
          </Button>
        </div>
      </form>

      {/* otp-error-feedback */}
      {otpError && (
        <FeedbackError
          className="mt-4 text-center font-bold"
          errorMsg={otpError.message}
        />
      )}

      {/* resend-email-server-error */}
      {emailError && (
        <FeedbackError
          className="mt-4 text-center font-bold"
          errorMsg={emailError.message}
        />
      )}
    </div>
  );
}

function ResendOtp({ email }: { email: string }) {
  // Translations
  const t = useTranslations();

  // Mutations
  const { onSubmitEmail } = useEmail();

  // Local Storage Hook
  const {
    setValue,
    storedValue: otpCooldown,
    removeValue,
  } = useLocalStorage(
    OTP_COOL_DOWN_KEY,
    new Date(Date.now() + COOL_DOWN_TIME).toISOString()
  );

  // state
  const [countDown, setCountDown] = useState(() => {
    if (!otpCooldown) return 0;
    const cooldown = new Date(otpCooldown);
    const remainingTime = Math.floor(
      (cooldown.getTime() - new Date().getTime()) / 1000
    );
    return remainingTime;
  });

  // function

  const setCooldown = (cooldown: Date) => {
    const expireTime = new Date(cooldown.getTime() + COOL_DOWN_TIME);
    setValue(expireTime.toISOString());
    setCountDown(COOL_DOWN_TIME / 1000);
  };

  const handleResendOtp = () => {
    onSubmitEmail(
      { email },
      {
        onSuccess: () => {
          // set cool down timer
          setCooldown(new Date());

          toast.success(t("a-new-otp-has-been-sent-to-your-email"));
        },
        onError: (error) => {
          toast.error(
            error?.message || "Failed to resend OTP. Please try again."
          );
        },
      }
    );
  };

  // Effects

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (otpCooldown) {
      interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            removeValue();
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpCooldown, removeValue]);

  if (countDown > 0) {
    return (
      <p className="my-6 text-sm text-zinc-600 text-center dark:text-zinc-400">
        {t("resend-otp-paragraph", {
          seconds: countDown,
        })}
      </p>
    );
  }

  return (
    <p className="my-6 text-sm text-zinc-600 text-center dark:text-zinc-400">
      {t.rich("resen-otp", {
        button: (chunks) => (
          <button
            disabled={
              Boolean(otpCooldown) && new Date(otpCooldown!) > new Date()
            }
            type="button"
            onClick={handleResendOtp}
            className="text-blue-600 underline hover:text-blue-800 disabled:text-gray-500"
          >
            {chunks}
          </button>
        ),
      })}
    </p>
  );
}

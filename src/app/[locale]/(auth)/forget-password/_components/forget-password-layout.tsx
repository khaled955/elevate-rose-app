"use client";

import { useState } from "react";
import EmailStepOne from "./email-step-one";
import { FORGET_PASSWORD_STEPS } from "@/lib/constants/auth.constants";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ForgetPasswordSteps, ForgetPasswordStepsMap } from "@/lib/types/auth";
import VerifyOtpStepTwo from "./verify-otp-step-two";
import NewPasswordStepThree from "./new-password-step-three";

export default function ForgetPasswordLayout() {
  const [step, setStep] = useState<ForgetPasswordSteps>(
    FORGET_PASSWORD_STEPS.EMAIL
  );
  const [currentEmail, setCurrentEmail] = useState("");
  const locale = useLocale();
  const t = useTranslations();

  const sharedFooterText = t.rich("need-help-less-than-button", {
    Link: (value) => (
      <Link
        locale={locale}
        href="/contact"
        className="text-maroon-700 font-bold dark:text-soft-pink-300"
      >
        {value}
      </Link>
    ),
  });

  const steps: ForgetPasswordStepsMap = {
    // Email Step
    [FORGET_PASSWORD_STEPS.EMAIL]: {
      title: t("forgot-password"),
      subtitle: t("dont-worry"),
      component: (
        <EmailStepOne
          onSetStep={setStep}
          onSetCurrentEmail={setCurrentEmail}
          currentEmail={currentEmail}
        />
      ),
      footerText: t.rich("login-navigate", {
        Link: (value) => (
          <Link
            className="text-maroon-700 font-semibold underline dark:text-soft-pink-300"
            locale={locale}
            href="/register"
          >
            {value}
          </Link>
        ),
      }),
    },
    // OTP Step
    [FORGET_PASSWORD_STEPS.OTP]: {
      title: t("enter-the-otp-code"),
      subtitle: t.rich("we-have-sent", {
        email: currentEmail || "user@example.com",
        button: (value) => (
          <button
            type="button"
            onClick={handleGoToEmailStep}
            className="text-blue-700 underline dark:text-blue-400"
          >
            {value}
          </button>
        ),
      }),
      component: <VerifyOtpStepTwo onSetStep={setStep} currentEmail={currentEmail} />,
      footerText: sharedFooterText,
    },
    // New Password Step
    [FORGET_PASSWORD_STEPS.NEW_PASSWORD]: {
      title: t("create-a-new-password"),
      subtitle: t("set-a-strong-password-to-secure-your-account"),
      component: <NewPasswordStepThree currentEmail={currentEmail} />,
      footerText: sharedFooterText,
    },
  };

  // Hanlders

  function handleGoToEmailStep() {
    setStep(FORGET_PASSWORD_STEPS.EMAIL);
  }
  return (
    <>
      <section>
        <header className="md:max-w-[85%] ms-auto">
          <h2 className="font-semibold text-zinc-800 text-2xl dark:text-zinc-50">
            {steps[step].title}
          </h2>
          <p>{steps[step].subtitle}</p>
        </header>

        <main>{steps[step].component}</main>
        <footer>
          <div className="navigation-btn flex justify-center mt-3">
            <p className="text-sm">{steps[step].footerText}</p>
          </div>
        </footer>
      </section>
    </>
  );
}

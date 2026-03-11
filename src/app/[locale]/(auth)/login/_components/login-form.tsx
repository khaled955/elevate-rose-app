"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../_hooks/use-login";
import { Loader } from "lucide-react";
import {
  LoginFields,
  useLoginSchema,
} from "@/lib/schemas/auth-schema/login.schema";
import { useLocale, useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import FeedbackError from "@/components/shared/feedback-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  //Mutation
  const { onLogin, error, isPending } = useLogin();



  // RHF
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors, isValid },
  } = useForm<LoginFields>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(useLoginSchema()),
  });

  // Handlers
  const handleLogIn: SubmitHandler<LoginFields> = (data) => {
    onLogin(data);
  };

  return (
    <section className="mt-5 w-full md:w-[70%] mx-auto">
      <form
        onSubmit={handleSubmit(handleLogIn)}
        className="border-y-2 py-8 space-y-4 border-zinc-200 dark:border-zinc-600"
      >
        {/* Email */}
        <div className="email">
          <Label htmlFor="email">{t("email")}</Label>
          <Input {...register("email")} id="email" />
          {errors.email && <FeedbackError errorMsg={errors.email.message} />}
        </div>

        {/* Password */}
        <div className="password grow w-full">
          <Label htmlFor="password">{t("password")}</Label>
          <Input {...register("password")} id="password" type="password" />
          {errors.password && (
            <FeedbackError errorMsg={errors.password.message} />
          )}
        </div>
        {/*forget password button */}
        <div className="forget-password flex justify-end mb-4">
          <Link
            className="text-maroon-700 dark:text-soft-pink-300 font-semibold text-sm"
            locale={locale}
            href="forget-password"
          >
            {t("forgot-your-password")}
          </Link>
        </div>
        <div className="submit-btn">
          <Button
            disabled={isPending || (!isValid && isSubmitted)}
            type="submit"
            className="w-full py-6"
          >
            {isPending ? <Loader className="animate-spin" /> : t("login")}
          </Button>
          {error && (
            <FeedbackError
              className="text-center font-bold mt-3"
              errorMsg={error.message}
            />
          )}
        </div>
      </form>
      <div className="navigation-btn flex justify-center mt-3">
        <span>
          {t.rich("login-navigate", {
            Link: (value) => (
              <Link
                className="text-maroon-700 font-semibold underline dark:text-soft-pink-300"
                locale={locale}
                href="/register"
              >
                {value}
              </Link>
            ),
          })}
        </span>
      </div>
    </section>
  );
}

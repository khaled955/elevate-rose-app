"use client";

import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useRouter } from "@/i18n/navigation";
import {
  RegisterFields,
  useRegisterSchema,
} from "@/lib/schemas/auth-schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRegister } from "../_hooks/use-register";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  password: "",
  rePassword: "",
  phone: "",
};

export default function RegisterForm() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const { onRegister, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
    getValues,
    setError,
    control,
  } = useForm<RegisterFields>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(useRegisterSchema()),
  });

  const handleRegister: SubmitHandler<RegisterFields> = (data) => {
    onRegister(data, {
      onSuccess: () => {
        toast.success(t("account-created-successfully"), {
          duration: 1500,
          onAutoClose: () => {
            // Redirect to login page after toast auto close
            router.push("/login", { locale });
          },
        });
      },
      onError: (error) => {
        // Array of keys for form
        const formField = Object.keys(getValues());
        // current Error
        const currentFieldError = formField.find((field) =>
          error.message.startsWith(field)
        );
        if (currentFieldError) {
          setError(
            currentFieldError as keyof RegisterFields,
            {
              type: "custom",
              message: error.message,
            },
            { shouldFocus: true }
          );

          error.message = "";
        }
      },
    });
  };

  return (
    <section className="mt-5">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="border-y-2 py-8 space-y-4 border-zinc-200 dark:border-zinc-600"
      >
        {/* first-last-name */}
        <div className="first-last-name flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="first-name grow w-full">
            <Label htmlFor="firstName">{t("first-name")}</Label>
            <Input
              {...register("firstName")}
              id="firstName"
              placeholder="khaled"
            />
            {errors.firstName && (
              <FeedbackError errorMsg={errors.firstName.message} />
            )}
          </div>
          <div className="last-name grow w-full">
            <Label htmlFor="lastName">{t("last-name")}</Label>
            <Input
              {...register("lastName")}
              id="lastName"
              placeholder="mansour"
            />
            {errors.lastName && (
              <FeedbackError errorMsg={errors.lastName.message} />
            )}
          </div>
        </div>
        {/* Email */}
        <div className="email">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            {...register("email")}
            id="email"
            placeholder="1@gmail.com"
            autoComplete="email"
          />
          {errors.email && <FeedbackError errorMsg={errors.email.message} />}
        </div>
        {/* Phone */}
        <div className="phone">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                placeholder={t("enter-your-phone")}
                value={field.value}
                onChange={(val) => field.onChange(val)}
                id="phone"
                defaultCountry="EG"
              />
            )}
          />

          {errors.phone && <FeedbackError errorMsg={errors.phone.message} />}
        </div>

        <div className="gender">
          <Label>{t("gender")}</Label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("select-gender")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">{t("male")}</SelectItem>
                    <SelectItem value="female">{t("female")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.gender && <FeedbackError errorMsg={errors.gender.message} />}
        </div>
        <div className="password grow w-full">
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Password@1234"
            autoComplete="new-password"
          />
          {errors.password && (
            <FeedbackError errorMsg={errors.password.message} />
          )}
        </div>
        <div className="confirm-password grow w-full">
          <Label htmlFor="rePassword">{t("confirm-password")}</Label>
          <Input
            {...register("rePassword")}
            id="rePassword"
            type="password"
            placeholder="Password@1234"
          />
          {errors.rePassword && (
            <FeedbackError errorMsg={errors.rePassword.message} />
          )}
        </div>

        <div className="submit-btn">
          <Button
            disabled={isPending || (!isValid && isSubmitted)}
            type="submit"
            className="w-full py-6"
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              t("create-account")
            )}
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
          {t.rich("navigate-login", {
            Link: (value) => (
              <Link
                className="text-maroon-700 font-semibold underline dark:text-soft-pink-300"
                locale={locale}
                href="/login"
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

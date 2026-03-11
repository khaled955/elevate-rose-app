import { useTranslations } from "next-intl";
import AuthHeader from "../_components/auth-header";
import LoginForm from "./_components/login-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// Generate metadata for the login page based on locale
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale });
  return {
    title: t("login-form"),
    description: t("login-form-description"),
  };
}

export default function LoginPage() {
  const t = useTranslations();
  return (
    <>
      <AuthHeader className="ltr:font-edwardian rtl:font-diwany">
        {t("welcome-back")}
      </AuthHeader>
      <LoginForm />
    </>
  );
}

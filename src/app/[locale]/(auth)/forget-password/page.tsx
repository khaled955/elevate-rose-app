import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ForgetPasswordLayout from "./_components/forget-password-layout";

// foget password page metadata
// ToDo
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

export default function ForgetPasswordPage() {
  return <ForgetPasswordLayout />;
}

import { useTranslations } from "next-intl";
import AuthHeader from "../_components/auth-header";
import RegisterForm from "./_components/register-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// Generate metadata for the register page based on locale
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale });
  return {
    title: t("register-form"),
    description: t("register-form-description"),
  };
}

export default function RegisterPage() {
  const t = useTranslations();
  return (
    <div>
      <AuthHeader className="font-pinyon">
        {t("become-part-of-our-family")}
      </AuthHeader>
      <RegisterForm />
    </div>
  );
}

import { Link } from "@/i18n/navigation";
import { authOptions } from "@/next-auth";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NavLoginBtn() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations()
  const locale = await getLocale()
  return (
    <>
      {session ? (
        <div>
          <span> {t('welcome')}</span>,<span>{session?.user?.firstName}</span>
        </div>
      ) : (
        <div className="login-btn flex gap-2  ">
          <span>
            <User />
          </span>
          <Link locale={locale} href="/login">{t('login')}</Link>
        
        </div>
      )}
    </>
  );
}

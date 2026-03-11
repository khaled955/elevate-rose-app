"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { hasPermission } from "@/lib/utils/rbac";
import { Clipboard, Gift, Headset, Home, Info, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

type NavLinkProps = {
  path: string;
  name: string;
  icon: ReactNode;
};

type NavLinkPageProps = {
  onClose?: () => void;
};

export default function NavLinks({ onClose }: NavLinkPageProps) {
  // Translations
  const locale = useLocale();
  const t = useTranslations();

  // Navigations
  const pathName = usePathname();
  const router = useRouter();

  // Variables
  const { data: session } = useSession();

  const navLinks: NavLinkProps[] = useMemo(() => {
    const links = [
      {
        path: "/",
        name: t("home"),
        icon: <Home />,
      },
      { path: "/products", name: t("products"), icon: <Gift /> },
      { path: "/categories", name: t("categories"), icon: <Clipboard /> },
      { path: "/contact", name: t("contact"), icon: <Headset /> },
      { path: "/about", name: t("about"), icon: <Info /> },
    ];

    if (hasPermission("view:dashboard", session?.user.role)) {
      links.splice(1,0,{
        path: "/dashboard",
        name: t("dashboard"),
        icon: <Settings size={20} />,
      });
    }

    return links;
  }, [t, session?.user.role]);

  function handleNavigate(path: string) {
    router.push(`${path}`, { locale });
    onClose?.();
  }

  return (
    <div>
      <ul className="flex flex-col md:flex-row justify-center gap-4">
        {navLinks.map((l) => (
          <li
            key={l.name}
            className={cn(
              "py-4",
              pathName === l.path
                ? "border-b-2 border-pin-300 dark:border-yellow-600"
                : "",
            )}
          >
            <button
              onClick={() => handleNavigate(l.path)}
              className="flex gap-3 text-inherit"
            >
              {l.icon}
              {l.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

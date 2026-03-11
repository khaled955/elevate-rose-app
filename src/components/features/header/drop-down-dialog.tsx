"use client";

import {
  ChevronDown,
  LogOut,
  MapPinHouseIcon,
  ScrollText,
  Settings,
  User2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import type {User } from "next-auth";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { hasPermission } from "@/lib/utils/rbac";

type NavLinkProps = {
  path: string;
  name: string;
  icon: ReactNode;
};


type DropDownDialogProps = {
   session:{user:User["user"]};
};



export function DropdownMenuDialog({ session }: DropDownDialogProps) {
  // Translations
  const locale = useLocale();
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Variables
  const searchParams = useSearchParams();

  const navLinks: NavLinkProps[] = useMemo(() => {
    const links: NavLinkProps[] = [
      {
        path: "/profile",
        name: t("myprofile"),
        icon: <User2 size={20} />,
      },
      {
        path: "/address",
        name: t("my-address"),
        icon: <MapPinHouseIcon size={20} />,
      },
      {
        path: "/allOrders",
        name: t("my-orders"),
        icon: <ScrollText size={20} />,
      },
    ];


    if (hasPermission("view:dashboard",session.user.role)) {
      links.push({
        path: "/dashboard",
        name: t("dashboard"),
        icon: <Settings size={20} />,
      });
    }

    return links;
  }, [t,session.user.role]);

  function handleNavigate(path: string) {
    router.push(`${path}?${searchParams.toString()}`, { locale });
  }

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button aria-label="Open menu">
            <ChevronDown />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-[60] w-40" align="end">
          <DropdownMenuLabel className="text-center">
            {session.user.firstName} {session.user.lastName}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {navLinks.map((link) => (
              <DropdownMenuItem
                key={link.path}
                className={cn(
                  locale === "ar" ? "flex-row-reverse" : "flex-row",
                  "flex",
                )}
                onClick={() => handleNavigate(link.path)}
              >
                {link.icon} <span>{link.name}</span>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className={cn(
                locale === "ar" ? "flex-row-reverse" : "flex-row",
                "hidden md:flex",
              )}
              onClick={() => signOut()}
            >
              <LogOut size={20} /> <span>{t("log-out")}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

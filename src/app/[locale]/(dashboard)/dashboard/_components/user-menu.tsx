"use client";

import * as React from "react";
import { LogOut, User, MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUserData } from "../_hooks/use-user-data";
import { useRouter } from "@/i18n/navigation";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

import UserAvatar from "./user-avatar";
import Skeleton from "./skeleton";

// ===== Types =====
type UserMenuProps = {
  className?: string;
};

type UserIdentityData = {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
};

export default function UserMenu({ className }: UserMenuProps) {
  // Translations
  const t = useTranslations();

  // Navigations
  const router = useRouter();

  // Queries
  const { data, isFetching, isLoading } = useUserData();

  // Variables
  const isBusy = isLoading || isFetching;

  const identity: UserIdentityData = {
    userId: data?.user?._id,
    firstName: data?.user?.firstName,
    lastName: data?.user?.lastName,
    email: data?.user?.email,
    photo: data?.user?.photo,
  };

  const fullName = `${identity.firstName ?? ""} ${identity.lastName ?? ""}`;

  // Handlers
  function navigateToAccount() {
    router.push("/dashboard/profile");
  }

  function handleLogout() {
    signOut();
  }

  return (
    <UserMenuShell className={className}>
      <UserMenuIdentity
        isBusy={isBusy}
        fullName={fullName}
        email={identity.email}
        identity={identity}
      />
      <UserMenuDropdown
        isBusy={isBusy}
        fullName={fullName}
        onAccount={navigateToAccount}
        onLogout={handleLogout}
        labels={{ account: t("my-account"), logout: t("log-out") }}
      />
    </UserMenuShell>
  );
}

function UserMenuShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-4 start-0 flex w-full items-center justify-between gap-3 border-t border-zinc-200 bg-white px-3 py-2 shadow-sm",
        "dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      {children}
    </div>
  );
}

// Identity (Avatar + Name + Email)
function UserMenuIdentity({
  isBusy,
  identity,
  fullName,
  email,
}: {
  isBusy: boolean;
  identity: UserIdentityData;
  fullName: string;
  email?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <UserMenuAvatar isBusy={isBusy} identity={identity} />

      <UserMenuText isBusy={isBusy} fullName={fullName} email={email} />
    </div>
  );
}

function UserMenuAvatar({
  isBusy,
  identity,
}: {
  isBusy: boolean;
  identity: UserIdentityData;
}) {
  if (isBusy) {
    return (
      <Skeleton
        rounded="full"
        className="h-11 w-11 shrink-0 ring-2 ring-zinc-200 dark:ring-zinc-800"
        aria-hidden="true"
      />
    );
  }

  return (
    <UserAvatar
      userId={identity.userId}
      email={identity.email}
      firstName={identity.firstName!}
      lastName={identity.lastName}
      photo={identity.photo}
      size={44}
      className="ring-2 ring-zinc-200 dark:ring-zinc-800"
    />
  );
}

function UserMenuText({
  isBusy,
  fullName,
  email,
}: {
  isBusy: boolean;
  fullName: string;
  email?: string;
}) {
  return (
    <div className="min-w-0">
      {isBusy ? (
        <div className="space-y-1.5" aria-hidden="true">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-44" />
        </div>
      ) : (
        <>
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {fullName}
          </p>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
            {email}
          </p>
        </>
      )}
    </div>
  );
}

//Dropdown
function UserMenuDropdown({
  isBusy,
  fullName,
  labels,
  onAccount,
  onLogout,
}: {
  isBusy: boolean;
  fullName: string;
  labels: { account: string; logout: string };
  onAccount: () => void;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="link"
          size="icon"
          disabled={isBusy}
          className={cn(
            "h-9 w-9",
            "disabled:pointer-events-none disabled:opacity-60",
            "dark:text-zinc-200 dark:hover:text-zinc-50",
          )}
          aria-label="Open user menu"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className={cn(
          "w-[17.5rem] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl",
          "dark:border-zinc-800 dark:bg-zinc-950",
        )}
      >
        <UserMenuDropdownHeader isBusy={isBusy} fullName={fullName} />

        <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

        <DropdownMenuItem
          disabled={isBusy}
          onClick={onAccount}
          className={cn(
            "gap-2 rounded-xl px-3 py-3 text-zinc-800 focus:bg-zinc-100",
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-60",
            "dark:text-zinc-100 dark:focus:bg-zinc-900",
          )}
        >
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">{labels.account}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

        <DropdownMenuItem
          disabled={isBusy}
          onClick={onLogout}
          className={cn(
            "gap-2 rounded-xl px-3 py-3 text-zinc-800 focus:bg-zinc-100",
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-60",
            "dark:text-zinc-100 dark:focus:bg-zinc-900",
          )}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">{labels.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenuDropdownHeader({
  isBusy,
  fullName,
}: {
  isBusy: boolean;
  fullName: string;
}) {
  return (
    <div className="px-2 py-2">
      {isBusy ? (
        <Skeleton className="h-5 w-40" aria-hidden="true" />
      ) : (
        <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {fullName}
        </p>
      )}
    </div>
  );
}

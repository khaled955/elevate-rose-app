"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/cart/use-cart";
import { useGuestCartContext } from "@/hooks/cart/use-guest-cart-context";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Loader, MoveLeft, MoveRight, TicketPercent } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

// Variables
const CHECKOUT_PATH = "/checkout-flow/cart";

export default function SummaryCatchAll() {
  // Navigation
  const router = useRouter();

  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Hooks
  const pathname = usePathname();

  // Querys
  const { data, isFetching, isLoading } = useCart();

  // Hooks
  const { totalPrice } = useGuestCartContext();

  // Variables
  const { data: session } = useSession();
  const cartTotal = session ? data?.cart.totalPrice || 0 : totalPrice || 0;

  const isCheckOutDisplay =
    pathname === CHECKOUT_PATH && cartTotal > 0 && !isLoading && !isFetching;

  // Functions
  function handleNavigateToCheckout() {
    const path = session ? "/checkout-flow/checkout" : "/login";
    router.push(path, { locale });
  }

  return (
    <section className="w-full">
      <header className="mb-3 sm:mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white">
          {t("summary")}
        </h1>
      </header>

      <main className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 sm:p-4 dark:border-zinc-800 dark:bg-zinc-900">
        {/* coupon */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder={t("coupon-code")}
            className="w-full dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />

          <Button className="w-full sm:w-auto py-6 dark:bg-maroon-700 dark:hover:bg-maroon-800">
            <TicketPercent size={20} />
            <span className="text-sm dark:text-zinc-200">
              {t("apply-coupon")}
            </span>
          </Button>
        </div>

        {/* no-coupon */}
        <div className="mt-4 flex h-32 sm:h-40 w-full items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800">
          <p className="text-zinc-400 dark:text-zinc-400 italic">
            {t("no-coupons-applied")}
          </p>
        </div>

        {/* total */}
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-zinc-600 dark:text-zinc-300">{t("total")}</span>

          {isLoading || isFetching ? (
            <Loader className="animate-spin text-zinc-800 dark:text-white" />
          ) : (
            <span className="text-zinc-800 dark:text-white font-bold text-xl sm:text-2xl">
              {t("carttotal", { total: cartTotal })}
            </span>
          )}
        </div>
      </main>

      {/* checkout button */}
      {isCheckOutDisplay && (
        <Button
          onClick={handleNavigateToCheckout}
          className="mt-4 w-full py-6 dark:bg-maroon-700 dark:hover:bg-maroon-800"
        >
          <span>{t("checkout")}</span>
          {locale === "ar" ? <MoveLeft /> : <MoveRight />}
        </Button>
      )}
    </section>
  );
}

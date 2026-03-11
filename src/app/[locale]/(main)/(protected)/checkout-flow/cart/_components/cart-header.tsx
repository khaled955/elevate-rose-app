"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/cart/use-cart";
import { useClearCart } from "@/hooks/cart/use-clear-cart";
import { useGuestCartContext } from "@/hooks/cart/use-guest-cart-context";
import { cn } from "@/lib/utils/cn";
import { BrushCleaning, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

export default function CartHeader() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();

  // Query
  const { data, isFetching, isLoading } = useCart();

  // Mutation
  const { onClearCart, clearCartIsPending } = useClearCart();
  // Hooks
  const { totalItems, clear } = useGuestCartContext();

  // Variables
  const { data: session } = useSession();
  const isBtnDisabled = session
    ? (data?.cart?.cartItems.length ?? 0) === 0
    : totalItems === 0;
  const count = session ? (data?.numOfCartItems ?? 0) : totalItems;
  const n = format.number(count, "number-base");

  // functions
  function handleClearCart() {
    if (!session) {
      clear();
      toast.success(t("cart-cleared-successfully"));
    } else {
      onClearCart();
    }
  }

  return (
    <header
      className={cn(
        locale === "ar" ? "gap-6 md:gap-3" : "gap-3",
        "relative mb-9 py-2 flex flex-col items-center md:flex-row md:justify-between md:items-center",
      )}
    >
      <div className="relative">
        {/* title */}
        <h1 className="capitalize mb-3 text-zinc-800 dark:text-zinc-200 font-bold text-3xl md:text-5xl">
          {t("cart")}
        </h1>

        <span
          className={cn(
            locale === "ar"
              ? "start-32 -bottom-5 md:start-60 md:-bottom-8"
              : "start-16 md:start-28 bottom-0",
            "product-length absolute text-zinc-400 dark:text-zinc-50 inline-flex items-baseline gap-1 whitespace-nowrap",
          )}
        >
          {isFetching || isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            t("data-numofcartitems-products", {
              count,
              n,
            })
          )}
        </span>
      </div>

      {/* clear-cart-button */}
      <Button
        onClick={handleClearCart}
        disabled={isBtnDisabled}
        variant={"secondary"}
        className="clear-cart text-maroon-600 font-semibold text-sm"
      >
        {clearCartIsPending ? (
          <Loader className="animate-spin" />
        ) : (
          <>
            <BrushCleaning size={20} /> <span>{t("clear-cart")}</span>
          </>
        )}
      </Button>
    </header>
  );
}

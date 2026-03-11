"use client";
import { useCart } from "@/hooks/cart/use-cart";
import CartItem from "./cart-item";
import { MoveLeft, MoveRight } from "lucide-react";
import EmptyCart from "./empty-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import CartItemSkeleton from "@/components/skeletons/cart/cart-item-skeleton";
import { useSession } from "next-auth/react";
import { useGuestCartContext } from "@/hooks/cart/use-guest-cart-context";

export default function CartList() {
  // Translations
  const locale = useLocale();
  const t = useTranslations();

  // Navigations
  const router = useRouter();
  // Hooks
  const { cartItems: localeStorageList } = useGuestCartContext();

  // Query
  const { data, isFetching, isLoading } = useCart();

  // Variables
  const { data: session } = useSession();
  const isBusy = isLoading || isFetching;
  const cartItems = data?.cart?.cartItems ?? [];

  const displayedCartItems = session ? cartItems : localeStorageList;

  const isEmpty = !isBusy && displayedCartItems.length === 0;
  // busy state with skeleton
  if (isBusy) {
    return (
      <div className="my-6 rounded-md border border-zinc-200 pb-5 px-5">
        {Array.from({ length: displayedCartItems.length || 3 }).map((_, i) => (
          <CartItemSkeleton
            key={i}
            className="border-b border-zinc-200 last:border-b-0"
          />
        ))}
      </div>
    );
  }

  // if the cart is empty, show the empty cart component
  if (isEmpty) return <EmptyCart />;

  return (
    <>
      {/* cart items */}
      {!isBusy && displayedCartItems.length > 0 && (
        <div className="my-6 border border-zinc-200 rounded-md pb-5 px-5">
          {displayedCartItems.map((cart) => (
            <CartItem
              cartInfo={cart}
              key={cart._id}
              className="border-b border-zinc-200 last:border-b-0"
            />
          ))}
        </div>
      )}

      {/* continue-shopping-btn */}
      <Button
        className="flex items-center my-4"
        onClick={() => {
          router.push("/products", { locale });
        }}
      >
        {locale === "ar" ? <MoveRight /> : <MoveLeft />}
        <span>{t("continue-shopping")}</span>
      </Button>
    </>
  );
}

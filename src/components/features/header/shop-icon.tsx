"use client";

import { useEffect, useState } from "react";
import { useWhishlist } from "@/app/[locale]/(main)/(protected)/whishlist/_hooks/use-whishlist";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/cart/use-cart";
import { useGuestCartContext } from "@/hooks/cart/use-guest-cart-context";
import { useLocalWishlist } from "@/hooks/shared/use-local-storage-whishlist";
import { Link } from "@/i18n/navigation";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";

export default function ShopIcon() {
  // Translations
  const locale = useLocale();

  // States
  const [isMounted, setIsMounted] = useState(false);

  // Queries
  const { data, isLoading, isFetching } = useCart();
  const {
    data: whishlistProducts,
    isFetching: whishlistIsFetching,
    isLoading: whishlistIsLoading,
  } = useWhishlist();

  // Hooks
  const { totalItems } = useGuestCartContext();
  const { list } = useLocalWishlist();

  // Session
  const { data: session } = useSession();

  // Variables
  const numOfCartItems = session
    ? data?.numOfCartItems
    : isMounted
      ? totalItems
      : 0;

  const numOfWhishlistItems = session
    ? whishlistProducts?.count
    : isMounted
      ? list.length
      : 0;

  // Effects
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="shop-icons border-s-2 border-e-2 px-3 flex gap-6 dark:border-gray-500">
      {/* whishlist */}
      <span className="relative">
        <Link locale={locale} href="/whishlist">
          <Heart />
        </Link>
        <Badge className="absolute -top-4 size-6">
          {whishlistIsFetching || whishlistIsLoading ? (
            <Loader size={12} className="animate-spin" />
          ) : (
            numOfWhishlistItems || "0"
          )}
        </Badge>
      </span>

      {/* cart */}
      <span className="relative">
        <Link locale={locale} href="/checkout-flow/cart">
          <ShoppingCart />
        </Link>
        <Badge className="absolute -top-3 left-3 size-6">
          {isLoading || isFetching ? (
            <Loader size={12} className="animate-spin" />
          ) : (
            numOfCartItems || "0"
          )}
        </Badge>
      </span>
    </div>
  );
}

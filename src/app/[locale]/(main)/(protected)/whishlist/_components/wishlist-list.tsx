"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";

import { useWhishlist } from "../_hooks/use-whishlist";
import { useLocalWishlist } from "@/hooks/shared/use-local-storage-whishlist";

import EmptyWishlist from "./empty-wishlist";
import WishlistItem from "./wishlist-item";
import ContinueShoppingButton from "./continue-shopping-button";
import { LocalWishlistProduct, WishlistProduct } from "@/lib/types/whishlist";
import { Product } from "@/lib/types/product";

export default function WishlistList() {
  // State (session)
  const { status } = useSession();
  const isAuth = status === "authenticated";

  // Hooks
  const { list: localeStorageList } = useLocalWishlist();

  // Queries (only for authenticated user)
  const { data, isFetching, isLoading } = useWhishlist({
    enabled: isAuth,
  });

  // Variables
  const isBusy = isAuth ? isLoading || isFetching : false;
  const isSessionReady = status !== "loading";

  const whishlistItems = useMemo(() => {
    if (!isAuth) return [];
    return data?.wishlist?.products ?? [];
  }, [isAuth, data]);

  const displayedWhishlistItems: Array<
    WishlistProduct | Product | LocalWishlistProduct
  > = isAuth ? whishlistItems : localeStorageList;

  const isEmpty =
    isSessionReady &&
    !isLoading &&
    !isFetching &&
    displayedWhishlistItems.length === 0;

  // loading
  if (isBusy) {
    return (
      <div
        className="my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white px-5 pb-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        aria-live="polite"
        aria-busy="true"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse border-b border-zinc-200 py-6 last:border-b-0 dark:border-zinc-800"
          >
            <div className="h-5 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-3 h-4 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    );
  }

  // empty
  if (isEmpty) return <EmptyWishlist />;

  return (
    <>
      {/* wishlist items */}
      {displayedWhishlistItems.length > 0 && (
        <div className="my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white px-4 pb-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:px-5 sm:pb-5">
          {displayedWhishlistItems.map((product) => (
            <WishlistItem
              key={"id" in product ? product.id : product._id}
              product={product}
              className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
            />
          ))}
        </div>
      )}

      <ContinueShoppingButton />
    </>
  );
}

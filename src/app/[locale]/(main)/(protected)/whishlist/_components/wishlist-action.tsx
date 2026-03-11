"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ShoppingCart, Loader } from "lucide-react";

import { useRemoveFromWhishlist } from "@/hooks/whishlist/use-remove-from-whishlist";
import { useAddToCart } from "@/hooks/cart/use-add-to-cart";

import type {
  LocalWishlistProduct,
  WishlistProduct,
} from "@/lib/types/whishlist";
import { useLocalWishlist } from "@/hooks/shared/use-local-storage-whishlist";
import { useGuestCartContext } from "@/hooks/cart/use-guest-cart-context";
import { Product } from "@/lib/types/product";

type WishlistActionProps = {
  product: WishlistProduct | Product | LocalWishlistProduct;
};

export default function WishlistAction({ product }: WishlistActionProps) {
  // Translations
  const t = useTranslations();

  // State (session)
  const { data: session } = useSession();

  // Variables
  const productId = "_id" in product ? product._id : product.id;

  // Mutations
  const { onRemoveFromWhishlist, removeWhishlistPending } =
    useRemoveFromWhishlist(productId);
  const { isPending: addIsPending, onAddToCard } = useAddToCart();

  // Hooks
  const { remove } = useLocalWishlist();
  const { addItem: addItemToCart } = useGuestCartContext();

  // Functions
  function handleAddToCart() {
    if (!session) {
      addItemToCart({
        _id: productId,
        quantity: 1,
        title: product.title,
        imgCover: product.imgCover,
        rateAvg: product.rateAvg,
      });
      toast.success(t("product-add-to-cart-successfully"));
      remove(productId);
      return;
    }

    if (session) {
      onAddToCard(
        { productId, quantity: 1 },
        {
          onSuccess: () => {
            toast.success(t("product-add-to-cart-successfully"));
            onRemoveFromWhishlist();
          },
        },
      );
    }
  }

  function handleDeleteProduct() {
    if (!session) {
      remove(productId);
      toast.success(t("product-removed-from-whishlist-successfully"));
      return;
    }

    if (session)
      onRemoveFromWhishlist(undefined, {
        onSuccess: () => {
          toast.success(t("product-removed-from-whishlist-successfully"));
        },
      });
  }

  return (
    <div className="cart-actions flex w-full flex-col gap-3 md:w-[40%] md:items-end">
      {/* add-to-cart (TOP) */}
      <Button
        disabled={addIsPending}
        onClick={handleAddToCart}
        variant="secondary"
        className="w-full justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold
                 text-maroon-700 transition hover:text-maroon-800
                 disabled:pointer-events-none disabled:opacity-60
                 dark:text-soft-pink-200 dark:hover:text-soft-pink-100"
      >
        {addIsPending ? (
          <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="capitalize">{t("add-to-cart")}</span>
      </Button>

      {/* remove (BOTTOM) */}
      <Button
        disabled={removeWhishlistPending}
        onClick={handleDeleteProduct}
        className="w-full justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold
                 text-white transition hover:bg-red-700
                 disabled:pointer-events-none disabled:opacity-60"
      >
        {removeWhishlistPending ? (
          <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : null}
        <span className="capitalize">{t("remove")}</span>
      </Button>
    </div>
  );
}

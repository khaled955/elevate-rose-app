"use client";

import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/cart/use-add-to-cart";
import { useAddToWhishlist } from "@/hooks/whishlist/use-add-to-whishlist";
import { useRemoveFromWhishlist } from "@/hooks/whishlist/use-remove-from-whishlist";
import { useWishlistStatus } from "@/hooks/whishlist/use-whishlist-status";
import { cn } from "@/lib/utils/cn";
import { HeartMinus, HeartPlus, Loader, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

type CardDetailActionButton = {
  showAddBtn: boolean;
  productId: string;
};

export default function CardDetailActionButton({
  showAddBtn,
  productId,
}: CardDetailActionButton) {
  // Translations
  const t = useTranslations();

  //Query  to check if product is in whishlist
  const { data } = useWishlistStatus(productId);

  // derive-state
  const inWishlist = data?.isInWishlist ?? false;
  // Mutation

  // add-to-cart
  const { onAddToCard, isPending } = useAddToCart();
  // add-to-whishlist
  const { onAddToWhishlist, addWhishlistPending } =
    useAddToWhishlist(productId);
  // remove-from-whishlist
  const { onRemoveFromWhishlist, removeWhishlistPending } =
    useRemoveFromWhishlist(productId);

  return (
    <div className="flex items-center gap-3">
      <div className={cn(showAddBtn ? "" : "grow")}>
        {/* add-whishlist-button */}
        {!inWishlist && (
          <Button
            onClick={() => {
              onAddToWhishlist();
            }}
            disabled={
              isPending || removeWhishlistPending || addWhishlistPending
            }
            className="w-full"
            variant={"ghost"}
          >
            {addWhishlistPending ? (
              <Loader className="animate-spine" />
            ) : (
              <HeartPlus size={25} />
            )}
          </Button>
        )}

        {/* remove-from-whishlist-button */}
        {inWishlist && (
          <Button
            onClick={() => {
              onRemoveFromWhishlist();
            }}
            disabled={
              isPending || removeWhishlistPending || addWhishlistPending
            }
            variant={"whish"}
            className="w-full"
          >
            {removeWhishlistPending ? (
              <Loader className="animate-spin" />
            ) : (
              <HeartMinus size={25} />
            )}
          </Button>
        )}
      </div>

      {/* add-to-cart-button */}
      {showAddBtn && (
        <Button
          disabled={isPending || addWhishlistPending}
          onClick={() => {
            onAddToCard({ productId, quantity: 1 });
          }}
          className="grow"
        >
          <ShoppingCart />
          <span>
            {isPending ? <Loader className="animate-spin" /> : t("add-to-cart")}
          </span>
        </Button>
      )}
    </div>
  );
}

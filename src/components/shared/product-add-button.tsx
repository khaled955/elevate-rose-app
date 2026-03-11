"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/hooks/cart/use-add-to-cart";
import { useSession } from "next-auth/react";
import { useGuestCartContext } from "@/hooks/cart/use-guest-cart-context";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Product } from "@/lib/types/product";

type ProductAddButtonProps = {
  productInfo: Product;
};
export default function ProductAddButton({
  productInfo,
}: ProductAddButtonProps) {
  // Translations
  const t = useTranslations();
  // Variables
  const { data: session } = useSession();
  // Hooks
  const { addItem } = useGuestCartContext();

  // Mutations
  const { isPending, onAddToCard } = useAddToCart();
  //   function

  function handleAddToCart() {
    // if the user is not authenticated, add the item to the guest cart
    if (!session) {
      addItem(
        {
          _id: productInfo._id,
          title: productInfo.title,
          imgCover: productInfo.imgCover,
          rateAvg: productInfo.rateAvg,
          rateCount: productInfo.rateCount,
          quantity: productInfo.quantity, // stock
        },
        1, // quantity in cart
        productInfo.price, // unit price
      );
      toast.success(t("product-added-to-cart"));
      return;
    }
    // if the user is authenticated, add the item to the user's cart
    if (session)
      onAddToCard(
        { productId: productInfo._id, quantity: 1 },
        {
          onSuccess: () => {
            toast.success(t("product-add-to-cart-successfully"));
          },
        },
      );
  }

  return (
    <div>
      {productInfo?.quantity > 0 ? (
        // if the product is in stock, show the add to cart button
        <Button
          className="w-fit rounded-full"
          onClick={handleAddToCart}
          disabled={isPending}
        >
          <ShoppingCart size={35} />
        </Button>
      ) : (
        // if the product is out of stock, show the out of stock badge
        <Badge variant={"secondary"}>Out of Stock</Badge>
      )}
    </div>
  );
}

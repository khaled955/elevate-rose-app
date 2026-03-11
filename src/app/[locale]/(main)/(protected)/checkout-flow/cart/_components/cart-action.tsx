"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteProductFromCart } from "@/hooks/cart/use-delete-product-from-cart";
import { useGuestCartContext } from "@/hooks/cart/use-guest-cart-context";
import { useUpdateCart } from "@/hooks/cart/use-update-cart";
import { useValidateCartInput } from "@/hooks/cart/use-validate-cart-input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

type CartActionProps = {
  productId: string;
  productQuantity: number;
  quantityInCart: number;
};

export default function CartAction({
  productId,
  productQuantity,
  quantityInCart,
}: CartActionProps) {
  // Translations
  const t = useTranslations();

  // States
  const [count, setCount] = useState<string>(() => String(quantityInCart));
  const [error, setError] = useState<string | null>(null);

  // Session
  const { data: session } = useSession();

  // Mutation (session case)
  const { onUpdateCart, isPending } = useUpdateCart();
  const { onDeleteProductFromCart, deleteProductIsPending } =
    useDeleteProductFromCart();

  // Guest cart (no session case)
  const { removeItem, setQuantity } = useGuestCartContext();

  // Refs
  const updateCartRef = useRef(onUpdateCart);

  // keep latest onUpdateCart in ref (avoid stale closure)
  useEffect(() => {
    updateCartRef.current = onUpdateCart;
  }, [onUpdateCart]);

  // Hooks
  const validateInput = useValidateCartInput();

  // Variables
  const value = Number(count);
  const isDecButtonDisabled = count.trim() === "" || value === 1 || isPending;
  const isIncButtonDisabled =
    count.trim() === "" || value >= productQuantity || isPending;

  // ONE debounced function for both cases
  const debouncedUpdateCart = useDebouncedCallback((nextValue: number) => {
    if (!session) {
      // guest: update local storage via context
      setQuantity(productId, nextValue);
      return;
    }

    // session: call API to update cart
    updateCartRef.current({ productId, quantity: nextValue });
  }, 500);

  // Functions
  function applyValidation(next: string) {
    const nextError = validateInput(next, productQuantity);
    setError(nextError);
    return nextError;
  }

  function handleIncreaseQuantity() {
    const next = String(Number(count) + 1);
    setCount(next);

    const nextError = applyValidation(next);
    if (!nextError) {
      const nextValue = parseInt(next, 10);
      if (!Number.isNaN(nextValue)) debouncedUpdateCart(nextValue);
    }
  }

  function handleDecreaseQuantity() {
    const next = String(Number(count) - 1);
    setCount(next);

    const nextError = applyValidation(next);
    if (!nextError) {
      const nextValue = parseInt(next, 10);
      if (!Number.isNaN(nextValue)) debouncedUpdateCart(nextValue);
    }
  }

  function handleChangeCount(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setCount(next);

    const nextError = applyValidation(next);

    if (nextError || next.trim() === "") {
      debouncedUpdateCart.cancel();
      return;
    }

    const nextValue = parseInt(next, 10);
    if (Number.isNaN(nextValue)) return;

    // prevent call if value is the same as before (as your logic)
    if (nextValue === quantityInCart) return;

    debouncedUpdateCart(nextValue);
  }

  function handleDeleteProduct() {
    if (!session) {
      removeItem(productId);
      toast.success(t("product-removed-from-cart-successfully"));
      return;
    }

    onDeleteProductFromCart(productId);
  }

  return (
    <div className="cart-actions flex flex-col gap-3 w-full md:w-[40%] md:justify-between">
      {/* remove-product-from-cart */}
      <Button
        disabled={deleteProductIsPending}
        onClick={handleDeleteProduct}
        className="self-center md:self-end bg-red-600 hover:bg-red-700 md:w-fit md:px-2 md:py-4"
      >
        <Trash2 /> <span className="capitalize">{t("remove")}</span>
      </Button>

      <div className="update-btn flex gap-2 items-center justify-between md:justify-start">
        <Button
          className="w-fit p-6"
          variant={"secondary"}
          disabled={isDecButtonDisabled}
          onClick={handleDecreaseQuantity}
        >
          <Minus />
        </Button>

        <Input
          className="w-16 text-center md:grow"
          placeholder="1"
          type="number"
          value={count}
          onChange={handleChangeCount}
          disabled={isPending}
        />

        <Button
          className="w-fit p-6"
          variant={"secondary"}
          disabled={isIncButtonDisabled}
          onClick={handleIncreaseQuantity}
        >
          <Plus />
        </Button>
      </div>

      {error && (
        <p className="capitalize text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}

"use client";

import { addToCartAction } from "@/lib/actions/cart/add-to-cart.action";
import { useGuestCartContext } from "@/hooks/cart/use-guest-cart-context";
import { useQueryClient } from "@tanstack/react-query";

export function useSyncGuestCartToServer() {
  const queryClient = useQueryClient();
  const { cartItems, removeItem, isReady } = useGuestCartContext();

  async function sendCartItemsFromStorageToServer() {
    if (!isReady) return;
    if (cartItems.length === 0) return;

    const itemsSnapshot = [...cartItems];

    for (const item of itemsSnapshot) {
      const payload = await addToCartAction({
        productId: item.product._id,
        quantity: item.quantity,
      });

      // ✅ only remove if server success
      if (!("error" in payload) && payload?.message === "success") {
        removeItem(item.product._id);
      }
    }

    // ✅ refresh server cart after merge
    await queryClient.invalidateQueries({ queryKey: ["cart"] });
  }

  return { sendCartItemsFromStorageToServer };
}

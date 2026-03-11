"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { addToWhishlistAction } from "@/lib/actions/whishlist/add-to-whishlist.action";
import { useLocalWishlist } from "@/hooks/shared/use-local-storage-whishlist";

export function useSyncLocalWishlistToServer() {
  const queryClient = useQueryClient();
  const { list, remove } = useLocalWishlist();

  /**
   * Sync all local wishlist products to server after successful login.
   * - Adds each product id to server wishlist
   * - Removes successfully synced items from localStorage
   * - Invalidates wishlist caches once at the end
   */
  const sendWhishlistProductsFromStorageToServer = useCallback(async () => {
    if (!list.length) return;

    // ✅ snapshot ids (list is objects now)
    const idsSnapshot = list.map((item) => item.id).filter(Boolean);

    if (idsSnapshot.length === 0) return;

    for (const productId of idsSnapshot) {
      const payload = await addToWhishlistAction(productId);

      // ✅ remove only if server success
      if (payload && typeof payload === "object" && !("error" in payload)) {
        remove(productId);
      }
    }

    // ✅ Refresh server wishlist queries once
    await queryClient.invalidateQueries({ queryKey: ["wishlist-items"] });
    await queryClient.invalidateQueries({ queryKey: ["whishlist"] });

    // ✅ Refresh wishlist-check per product (optional but safe)
    await Promise.all(
      idsSnapshot.map((id) =>
        queryClient.invalidateQueries({ queryKey: ["wishlist-check", id] }),
      ),
    );
  }, [list, remove, queryClient]);

  return { sendWhishlistProductsFromStorageToServer };
}

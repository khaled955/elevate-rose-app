"use client";

import { addToWhishlistAction } from "@/lib/actions/whishlist/add-to-whishlist.action";
import { WhishlistCheck } from "@/lib/types/whishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type WishlistCheckCache = Pick<WhishlistCheck, "message" | "isInWishlist">;

export function useAddToWhishlist(productId: string) {
  // Query
  const queryClient = useQueryClient();

  // Mutation
  const { mutate: onAddToWhishlist, isPending: addWhishlistPending } =
    useMutation({
      mutationFn: async () => {
        const payload = await addToWhishlistAction(productId);

        if ("error" in payload) {
          throw new Error(
            payload.error || "error during add product to whishlist!",
          );
        }

        return payload;
      },

      onMutate: async () => {
        // 1️⃣ Stop any active refetch for this query.
        // We are about to change the cache manually (optimistic update),
        // so we must prevent background refetches from overwriting it.
        await queryClient.cancelQueries({
          queryKey: ["wishlist-check", productId],
        });

        // 2️⃣ Save the current cache state BEFORE changing it.
        // This snapshot is critical for rollback if the server request fails.
        const previous = queryClient.getQueryData<WishlistCheckCache>([
          "wishlist-check",
          productId,
        ]);

        // 3️⃣ OPTIMISTIC UPDATE:
        // Immediately update the cache to the expected final state.
        // The UI reacts instantly (heart icon switches without waiting).
        queryClient.setQueryData<WishlistCheckCache>(
          ["wishlist-check", productId],
          {
            message: "success",
            isInWishlist: true,
          },
        );
        // 4️⃣ Return the previous cache value.
        // React Query will pass this to onError for rollback if needed.
        return { previous };
      },

      onError: (error, _vars, context) => {
        // 5️⃣ ROLLBACK:
        // If the mutation fails, restore the cache to its previous state.
        // This reverts the UI back to the original value.
        if (context?.previous) {
          queryClient.setQueryData(
            ["wishlist-check", productId],
            context.previous,
          );
        }
        toast.error(error.message);
      },

      onSuccess: async () => {
        // revalidate whishlist products
        await queryClient.invalidateQueries({ queryKey: ["whishlist"] });
      },

      onSettled: async () => {
        // 7️⃣ Final synchronization step (runs on success OR error).
        // Ensure the cache is fully aligned with the server state.
        // Revalidate the wishlist status for this product
        await queryClient.invalidateQueries({
          queryKey: ["wishlist-check", productId],
        });

        // Revalidate the wishlist items list
        await queryClient.invalidateQueries({
          queryKey: ["wishlist-items"],
        });
      },
    });

  return { onAddToWhishlist, addWhishlistPending };
}

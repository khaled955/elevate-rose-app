import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { clearWhishlistAction } from "../_actions/clear-whishlist.action";

export function useClearWhishlist() {
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onClearWhishlist, isPending: clearWhishlistIsPending } =
    useMutation({
      mutationFn: async () => {
        const payload = await clearWhishlistAction();

        // catch-error

        if ("error" in payload) {
          throw new Error(
            payload.error || "error during clear products from whishlist!",
          );
        }
        return payload;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["whishlist"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { onClearWhishlist, clearWhishlistIsPending };
}

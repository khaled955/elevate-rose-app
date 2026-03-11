import { deleteAddressAction } from "@/lib/actions/address/delete-address.action";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAddress() {
  // Hooks
  const { mutate: onDeleteAddress, isPending: deleteAddressisPending } =
    useMutation({
      mutationFn: async (addressId: string) => {
        const payload = await deleteAddressAction(addressId);

        // catch-error

        if ("error" in payload) {
          throw new Error(payload.error || "error during delete address!");
        }
        return payload;
      },
    });

  return { onDeleteAddress, deleteAddressisPending };
}

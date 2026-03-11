import { updateCurrentAddressAction } from "@/lib/actions/address/update-current-address.action";
import { AddressFields } from "@/lib/types/addresses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type UpdateAddressArgs = {
  addressId: string;
  values: AddressFields;
};

export function useUpdateAddress() {
  // Translations
  const t= useTranslations()
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onUpdateAddress, isPending: updateAddressisPending } =
    useMutation({
      mutationFn: async ({ values, addressId }: UpdateAddressArgs) => {
        const payload = await updateCurrentAddressAction({ addressId, values });

        // catch-error

        if ("error" in payload) {
          throw new Error(payload.error || "error during update address!");
        }
        return payload;
      },
      onSuccess: async () => {
        toast.success(t('updated-address-successfully'));
        //   revalidate address fetch
        await queryClient.invalidateQueries({ queryKey: ["address"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { onUpdateAddress, updateAddressisPending };
}

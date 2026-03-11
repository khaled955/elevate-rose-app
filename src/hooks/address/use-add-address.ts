import { addNewAddressAction } from "@/lib/actions/address/add-new-address.action";
import { AddressFields } from "@/lib/types/addresses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useAddAddress() {
  // Translations
  const t = useTranslations();
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onAddAddress, isPending: addAddressisPending } = useMutation({
    mutationFn: async (values: AddressFields) => {
      const payload = await addNewAddressAction(values);

      // catch-error

      if ("error" in payload) {
        throw new Error(payload.error || "error during add new address!");
      }
      return payload;
    },
    onSuccess: async () => {
      toast.success(t("add-new-address-successfully"));
      //   revalidate address fetch
      await queryClient.invalidateQueries({ queryKey: ["address"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onAddAddress, addAddressisPending };
}

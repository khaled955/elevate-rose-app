"use client";

import EmptyAddresses from "@/components/shared/empty-address";
import { AddressItemModal } from "./address-item-modal";
import { useAddress } from "@/hooks/address/use-address";
import { Loader } from "lucide-react";
import { Address } from "@/lib/types/addresses";
import { useLocale } from "next-intl";

type AddressListModalProps = {
  handleUpdate: (address: Address) => void;
  onDelete:(id:string)=>void;
};

export default function AddressListModal({
  handleUpdate,
  onDelete,
}: AddressListModalProps) {

  // Translations
  const locale = useLocale()
  // Queryies
  const { data, isLoading, isFetching } = useAddress();

  // Variables
  const addresses = data?.addresses || [];

 

  return (
    <>
      {(isLoading || isFetching) && <Loader className="animate-spin" />}
      {/* empty-address */}
      {addresses.length === 0 && !isLoading && !isFetching && (
        <EmptyAddresses  locale={locale}/>
      )}

      <ul className="space-y-6 max-h-[18.75rem] overflow-y-auto px-3 dark:bg-gray-800">
        {(!isLoading && !isFetching) &&
          addresses.length > 0 &&
          addresses.map((address) => (
            <AddressItemModal
              key={address._id}
              address={address.street}
              city={address.city}
              phone={address.phone}
              label={address.city}
              handleUpdate={handleUpdate}
              allAdress={address}
              onDelete={onDelete}
            />
          ))}
      </ul>
    </>
  );
}

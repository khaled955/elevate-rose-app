"use client";

import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { AddressRadioItem } from "./address-radio-item";
import { CheckOutAddress } from "@/lib/types/checkout";
import { Address } from "@/lib/types/addresses";

type AddressRadioListProps = {
  addresses: Address[];
  value?: string;
  onValueChange?: (value: string) => void;
  onSetCurrentAddress: (address: CheckOutAddress | null) => void;
};

export function AddressRadioList({
  addresses,
  value,
  onValueChange,
  onSetCurrentAddress,
}: AddressRadioListProps) {
  // Functions
  function handleChange(selectedId: string) {
    // keep your existing onValueChange behavior
    onValueChange?.(selectedId);

    // find full address object
    const fullAddress = addresses.find((a) => a._id === selectedId) ?? null;

    // Guard-class
    if (!fullAddress) {
      onSetCurrentAddress(null);
      return;
    }

    // Set address Info that required for server
    onSetCurrentAddress({
      city: fullAddress?.city,
      lat: fullAddress?.lat,
      long: fullAddress?.long,
      phone: fullAddress?.long,
      street: fullAddress?.street,
    });
  }

  return (
    <RadioGroup.Root
      value={value}
      onValueChange={handleChange}
      className="space-y-3 max-h-[17rem] overflow-y-auto"
    >
      {addresses.map((address) => (
        <AddressRadioItem
          key={address._id}
          value={address._id}
          city={address.city}
          phone={address.phone}
          address={address.street}
        />
      ))}
    </RadioGroup.Root>
  );
}

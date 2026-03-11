"use client";

import { GuestCartContext } from "@/components/context/cart/guest-cart.provider";
import { useContext } from "react";

export function useGuestCartContext() {
  const context = useContext(GuestCartContext);
  if (!context) {
    throw new Error(
      "useGuestCartContext must be used within GuestCartProvider",
    );
  }
  return context;
}

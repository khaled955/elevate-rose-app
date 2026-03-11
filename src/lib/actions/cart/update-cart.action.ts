"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { CART } from "@/lib/services/apis/protected-apis/cart-apis.api";
import { AddToCartProps } from "@/lib/types/cart";
import { getToken } from "@/lib/utils/manage-token";

export async function updateCartAction({
  productId,
  quantity,
}: AddToCartProps) {
  // get-token
  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(`${process.env.BASE_URL}${CART.UPDATE(productId)}`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const payload = await resp.json();
  return payload;
}

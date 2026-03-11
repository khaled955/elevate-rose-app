"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { CART } from "@/lib/services/apis/protected-apis/cart-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function deleteProductFromCartAction(productId: string) {
  // get-token
  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${CART.DELETE_PRODUCT(productId)}`,
    {
      method: "DELETE",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
    },
  );

  const payload = await resp.json();
  return payload;
}

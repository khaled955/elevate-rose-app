"use server";

import { PRODUCTS_YOU_MAY_LIKE } from "@/lib/services/apis/protected-apis/products-you-may-like.api";
import { getToken } from "@/lib/utils/manage-token";

export async function fetchProductsYouMayLikeAction() {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error("You Must Login First!");
  }

  const response = await fetch(
    `${process.env.BASE_URL}${PRODUCTS_YOU_MAY_LIKE.GET(token.user._id)}`,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken} `,
      },
    },
  );

  const payload = await response.json();
  return payload;
}

"use server";

import { SIMILAR_PRODUCTS } from "@/lib/services/apis/protected-apis/similar-products.api";
import { getToken } from "@/lib/utils/manage-token";

export async function fetchSimilarProductsAction(productId: string) {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error("You Must Login First!");
  }

  const response = await fetch(
    `${process.env.BASE_URL}${SIMILAR_PRODUCTS.GET_ALL(productId)}`,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken} `,
      },
    },
  );

  const payload = await response.json();
  return payload;
}

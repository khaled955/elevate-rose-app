"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { WISHLIST } from "@/lib/services/apis/protected-apis/wishlist-apis.api";
import { getToken } from "@/lib/utils/manage-token";
import { revalidateTag } from "next/cache";

export async function removeFromWhishlistAction(productId: string) {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${WISHLIST.REMOVE_ONE(productId)}`,
    {
      method: "DELETE",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
    },
  );

  const payload = await resp.json();

  //To refetch Check Product Function Again
  revalidateTag("check-whishlist");
  return payload;
}

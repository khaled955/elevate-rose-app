"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { WISHLIST } from "@/lib/services/apis/protected-apis/wishlist-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function clearWhishlistAction() {
  // get-token
  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(`${process.env.BASE_URL}${WISHLIST.CLEAR_ALL}`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const payload = await resp.json();
  return payload;
}

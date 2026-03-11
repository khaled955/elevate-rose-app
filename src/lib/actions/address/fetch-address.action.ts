"use server";

import { ADDRESS } from "@/lib/services/apis/protected-apis/address-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function fetchAddressAction() {
  const token = await getToken();

  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(`${process.env.BASE_URL}${ADDRESS.GET}`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const payload = await resp.json();

  return payload;
}

"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { ADDRESS } from "@/lib/services/apis/protected-apis/address-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function deleteAddressAction(addressId: string) {
  // get-token

  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${ADDRESS.DELETE(addressId)}`,
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

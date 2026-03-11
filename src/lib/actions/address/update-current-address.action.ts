"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { ADDRESS } from "@/lib/services/apis/protected-apis/address-apis.api";
import { AddressFields } from "@/lib/types/addresses";
import { getToken } from "@/lib/utils/manage-token";

type UpdateAddressArgs = {
  values: AddressFields;
  addressId: string;
};

export async function updateCurrentAddressAction({
  values,
  addressId,
}: UpdateAddressArgs) {
  // get-token

  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${ADDRESS.UPDATE(addressId)}`,
    {
      method: "PATCH",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(values),
    },
  );

  const payload = await resp.json();
  return payload;
}

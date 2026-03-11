"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { PAYMENT } from "@/lib/services/apis/protected-apis/payment.api";
import { CrediteOrderFields } from "@/lib/types/checkout";
import { getToken } from "@/lib/utils/manage-token";

export async function createCrediteOrderAction({
  fieldValues,
  url,
}: CrediteOrderFields) {
  // get token
  const token = await getToken();

  // Guard-class
  if (!token) {
    throw new Error("you must login first!");
  }

  const resp = await fetch(`${process.env.BASE_URL}${PAYMENT.CREDIT(url)}`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },

    body: JSON.stringify({ shippingAddress: fieldValues }),
  });

  const payload = await resp.json();
  return payload;
}

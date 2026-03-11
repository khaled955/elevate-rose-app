"use server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { SubscriptionField } from "@/lib/schemas/auth-schema/subscription.schema";
import { SUBSCRIBE } from "@/lib/services/apis/public-apis/subscribe-apis.api";

export async function subscribeAction(values: SubscriptionField) {
  const resp = await fetch(`${process.env.BASE_URL}${SUBSCRIBE.GET_SUB}`, {
    method: "POST",
    headers: JSON_HEADER,
    body: JSON.stringify(values),
  });

  const payload = await resp.json();

  return payload;
}

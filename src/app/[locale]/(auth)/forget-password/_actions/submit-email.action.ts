"use server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { EmailField } from "@/lib/schemas/auth-schema/forget-password.schema";
import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";

export async function submitEmailAction(email: EmailField) {
  const resp = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.FORGET_PASSWORD}`,
    {
      method: "POST",
      headers: { ...JSON_HEADER },
      body: JSON.stringify(email),
    }
  );

  const payload = await resp.json();
  return payload;
}

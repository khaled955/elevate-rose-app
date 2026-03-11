"use server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { RegisterFields } from "@/lib/schemas/auth-schema/register.schema";
import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";

export async function registerAction(registerValues: RegisterFields) {
  const resp = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.REGISTER}`,
    {
      method: "POST",
      headers: { ...JSON_HEADER },
      body: JSON.stringify(registerValues),
    }
  );

  const payload = await resp.json();
  return payload;
}

"use server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { LoginFields } from "@/lib/schemas/auth-schema/login.schema";
import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";

export async function loginAction(loginValues: LoginFields) {
  const res = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.LOGIN}`,
    {
      method: "POST",
      headers: {
        ...JSON_HEADER,
      },
      body: JSON.stringify(loginValues),
    }
  );
  const payload = await res.json();

  return payload;
}

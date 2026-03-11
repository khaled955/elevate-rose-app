"use server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";
import { NewPasswordFieldValuesSendToServer } from "@/lib/types/auth";

export async function createNewPasswordAction(
  fields: NewPasswordFieldValuesSendToServer
) {
  const resp = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.RESET_PASSWORD}`,
    {
      method: "PUT",
      headers: { ...JSON_HEADER },
      body: JSON.stringify(fields),
    }
  );

  const payload = await resp.json();
  return payload;
}

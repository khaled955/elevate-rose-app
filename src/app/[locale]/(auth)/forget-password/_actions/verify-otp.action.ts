"use server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { SendOtpFields } from "@/lib/schemas/auth-schema/forget-password.schema";
import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";

export async function verifyOtpAction(fields: SendOtpFields) {
  const resp = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.VERIFY_OTP}`,
    {
      method: "POST",
      headers: { ...JSON_HEADER },
      body: JSON.stringify(fields),
    }
  );

  const payload = await resp.json();
  return payload;
}

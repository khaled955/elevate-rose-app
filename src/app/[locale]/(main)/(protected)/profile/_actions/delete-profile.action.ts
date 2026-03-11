"use server";

import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function deleteProfileAction() {
  // Get Token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  // !!==> Guard Clause

  if (!token) {
    throw new Error("Please Login First");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.DELETE_PROFILE}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const payload = await resp.json();
  return payload;
}

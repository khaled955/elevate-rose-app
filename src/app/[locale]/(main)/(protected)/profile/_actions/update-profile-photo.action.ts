"use server";

import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function updateProfilePhotoAction(formData: FormData) {
  const jwt = await getToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error("Please Login First");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.UPLOAD_PHOTO}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const payload = await resp.json();
  console.log("payload from server action=>",payload)
  return payload;
}

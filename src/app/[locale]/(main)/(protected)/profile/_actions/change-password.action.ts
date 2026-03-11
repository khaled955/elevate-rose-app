"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { ChangePasswordData } from "@/lib/schemas/auth-schema/change-password.schema";
import {
  ChangePasswordResponse,
} from "@/lib/types/auth";
import { getToken} from "@/lib/utils/manage-token";

export async function changePasswordAction(values: ChangePasswordData) {

// get-token
  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error("you must login first");
  }


  const resp = await fetch(`${process.env.BASE_URL}/auth/change-password`, {
    method: "PATCH",
    headers: {
      ...JSON_HEADER,
            Authorization: `Bearer ${token.accessToken}`,


    },
    body: JSON.stringify(values),
  });

  const payload: ChangePasswordResponse = await resp.json();
  if ("error" in payload || payload.message !== "success") {
    throw new Error(
      typeof payload.error === "string"
        ? payload.error
        : payload.message || "Error During Change Password From Server Action",
    );
  }


  return payload;
}

"use server";
import { OCCASIONS } from "@/lib/services/apis/public-apis/occasions-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function deleteOccassionAction(occassionId: string) {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${OCCASIONS.DELETE(occassionId)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    },
  );

  const payload = await resp.json();
  return payload;
}

"use server";
import { OCCASIONS } from "@/lib/services/apis/public-apis/occasions-apis.api";
import { getToken } from "@/lib/utils/manage-token";

type UpdateOccassionsProps = {
  occassionId: string;
  formData: FormData;
};

export async function updateOccassionAction({
  occassionId,
  formData,
}: UpdateOccassionsProps) {
  // get-token
  const token = await getToken();
  // guard-clause
  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${OCCASIONS.UPDATE(occassionId)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: formData,
    },
  );

  const payload = await resp.json();

  return payload;
}

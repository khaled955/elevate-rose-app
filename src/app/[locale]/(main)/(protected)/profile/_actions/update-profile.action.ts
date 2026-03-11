"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { ProfileFields } from "@/lib/schemas/auth-schema/profile.schema";
import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function updateProfileAction(updateformValues: ProfileFields) {
  // Get Token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  // !!==> Guard Clause

  if (!token) {
    throw new Error("Please Login First");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { gender, ...valuesWithoutGender } = updateformValues;

  const resp = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.EDITE_PROFILE}`,
    {
      method: "PUT",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(valuesWithoutGender),
    },
  );

  const payload = await resp.json();
  return payload;
}

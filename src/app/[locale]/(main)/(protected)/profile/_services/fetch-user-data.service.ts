"use server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { AUTHENTICATION_APIS } from "@/lib/services/apis/auth-apis/auth-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function fetchUserDataService() {
  const jwt = await getToken();
  const token = jwt?.accessToken;
  if (!token) throw new Error("Please Login First");

  const resp = await fetch(
    `${process.env.BASE_URL}${AUTHENTICATION_APIS.GET_USER}`,
    {
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const payload = await resp.json();
  return payload;
}

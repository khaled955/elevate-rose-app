"use server";
import { ORDERS } from "@/lib/services/apis/protected-apis/orders.api";
import { SearchParams } from "@/lib/types/common";
import { convertSearchParams } from "@/lib/utils/convert-search-params";
import { getToken } from "@/lib/utils/manage-token";

export async function fetchAllOrders(searchParams:SearchParams) {
  // get-token
  const token = await getToken();

  if (!token) {
    throw new Error("you must login first!");
  }

  const resp = await fetch(`${process.env.BASE_URL}${ORDERS.GET}?${convertSearchParams(searchParams).toString()}`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  const payload = await resp.json();
  return payload;
}

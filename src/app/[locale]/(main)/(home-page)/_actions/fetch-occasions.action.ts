"use server";

import { OCCASIONS } from "@/lib/services/apis/public-apis/occasions-apis.api";

export async function fetchOccasionsAction(limit: number) {
  const resp = await fetch(
    `${process.env.BASE_URL}${OCCASIONS.GET_LIMITED_OCCASIONS(limit)}`,
    {
      cache: "no-store",
    }
  );

  const payload = await resp.json();

  return payload;
}

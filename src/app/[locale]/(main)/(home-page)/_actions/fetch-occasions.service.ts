import { OCCASIONS } from "@/lib/services/apis/public-apis/occasions-apis.api";

export async function fetchOccasionsService(limit: number) {
  const resp = await fetch(
    `${process.env.BASE_URL}${OCCASIONS.GET_LIMITED_OCCASIONS(limit)}`,
    
  );

  const payload = await resp.json();

  return payload;
}

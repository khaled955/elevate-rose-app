import { convertSearchParams } from "@/lib/utils/convert-search-params";
import { SearchParams } from "@/lib/types/common";

export async function fetchOccasionsService(params: SearchParams) {
  const searchParams = convertSearchParams(params);
  const resp = await fetch(`/api/occasions?${searchParams.toString()}`, {
    cache: "no-store",
  });

  const payload = await resp.json();
  return payload;
}

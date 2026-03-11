import { SearchParams } from "@/lib/types/common";
import { convertSearchParams } from "@/lib/utils/convert-search-params";

export async function fetchAllReviewsAction(searchQuery: SearchParams) {
  const resp = await fetch(
    `/api/reviews?${convertSearchParams(searchQuery).toString()}`,
  );

  const payload = await resp.json();
  return payload;
}

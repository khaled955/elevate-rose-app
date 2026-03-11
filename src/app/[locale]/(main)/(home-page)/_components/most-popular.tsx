import { Occasions } from "@/lib/types/occasion";
import MostPopularClient from "@/components/features/most-popular/most-popular-client";
import { fetchOccasionsAction } from "../_actions/fetch-occasions.action";

export default async function MostPopular() {
  const payload: APIResponse<PaginatedResponse<Occasions>> =
    await fetchOccasionsAction(4);

  if ("error" in payload || payload.message !== "success") {
    throw new Error(
      payload.error || payload.message || "Failed to fetch occasions"
    );
  }

  const { occasions } = payload;

  return <MostPopularClient occasions={occasions} />;
}

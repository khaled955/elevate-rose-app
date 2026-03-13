import { CATEGORIES } from "@/lib/services/apis/public-apis/category-apis.api";
import { SearchParams } from "@/lib/types/common";
import { convertSearchParams } from "@/lib/utils/convert-search-params";

export async function fetchAllCategoriesService(searchQuery: SearchParams) {
  const resp = await fetch(
    `${process.env.BASE_URL}${CATEGORIES.GET_ALL_CATEGORIES}?${convertSearchParams(searchQuery).toString()}`,
    {
      next: {
        tags: ["all-categories"],
      },
    },
  );

  return resp.json();
}

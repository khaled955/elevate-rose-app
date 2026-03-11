import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";
import { SearchParams } from "@/lib/types/common";
import { convertSearchParams } from "@/lib/utils/convert-search-params";
export async function fetchAllProductService(searchParams:SearchParams) {
  const resp = await fetch(`${process.env.BASE_URL}${PRODUCTS.GET_ALL}?${convertSearchParams(searchParams).toString()}`);
  const payload = await resp.json();
  return payload;
}

import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";

export async function fetchBestProductsAction(limit:number) {
  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.BEST_SELLER(limit)}`,
    {
      cache: "no-store",
    }
  );

  const payload = await resp.json();

  return payload;
}

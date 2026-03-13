import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";

export async function fetchBestProductsService(limit:number) {
  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.BEST_SELLER(limit)}`,
    
  );

  const payload = await resp.json();

  return payload;
}

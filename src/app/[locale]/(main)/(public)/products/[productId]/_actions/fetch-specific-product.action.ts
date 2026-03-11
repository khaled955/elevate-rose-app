"use server";

import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";
export async function fetchSpecificProductAction(productId: string) {
  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.GET_SPECIFIC_PRODUCT(productId)}`,
  );
  const payload = await resp.json();
  return payload;
}

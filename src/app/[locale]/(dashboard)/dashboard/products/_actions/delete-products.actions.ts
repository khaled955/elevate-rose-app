"use server";
import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function deleteProductAction(productId: string) {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.DELETE(productId)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    },
  );

  const payload = await resp.json();
  return payload;
}

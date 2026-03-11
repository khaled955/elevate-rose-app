"use server";
import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";
import { getToken } from "@/lib/utils/manage-token";

type UpdateProductProps = {
  productId: string;
  formData: FormData;
};

export async function updateProductAction({ productId, formData }: UpdateProductProps) {
  // get-token
  const token = await getToken();

  // guard-clause
  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.UPDATE(productId)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: formData,
    },
  );

  const payload = await resp.json();

  return payload;
}
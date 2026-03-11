"use server";
import { CATEGORIES } from "@/lib/services/apis/public-apis/category-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function deleteCategoryAction(categoryId: string) {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${CATEGORIES.DELETE(categoryId)}`,
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

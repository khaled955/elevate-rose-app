"use server";
import { CATEGORIES } from "@/lib/services/apis/public-apis/category-apis.api";
import { getToken } from "@/lib/utils/manage-token";

type UpdateCategoryProps = {
  categoryId: string;
  formData: FormData;
};

export async function updateCategoryAction({
  categoryId,
  formData,
}: UpdateCategoryProps) {
  // get-token
  const token = await getToken();
  // guard-clause
  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${CATEGORIES.UPDATE(categoryId)}`,
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

"use server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { ReviewFieldsRequired } from "@/lib/schemas/review-product.schema";
import { REVIEWS } from "@/lib/services/apis/public-apis/reviews.api";
import { getToken } from "@/lib/utils/manage-token";
import { revalidateTag } from "next/cache";

export async function createProductReviewAction(
  fieldValues: ReviewFieldsRequired,
) {
  // get-token
  const token = await getToken();

  // Guard-class
  if (!token) {
    throw new Error("you must login first");
  }

  const response = await fetch(
    `${process.env.BASE_URL}${REVIEWS.CREATE_REVIEW}`,
    {
      method: "POST",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken} `,
      },
      body: JSON.stringify(fieldValues),
    },
  );

  const payload = await response.json();
  // Revalidate Reviews after add new review
  revalidateTag("reviews");
  return payload;
}

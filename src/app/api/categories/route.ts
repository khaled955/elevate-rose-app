import { type NextRequest } from "next/server";
import { CATEGORIES } from "@/lib/services/apis/public-apis/category-apis.api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Convert all incoming search params to a plain object
  const params = Object.fromEntries(searchParams.entries());

  const resp = await fetch(
    `${process.env.BASE_URL}${CATEGORIES.GET_ALL_CATEGORIES}?${new URLSearchParams(params)}`,
    {
      next: { tags: ["categories"] },
      cache: "no-store",
    },
  );

  const payload = await resp.json();

  if ("error" in payload || payload?.message !== "success") {
    throw new Error(payload.error || payload.message);
  }

  return Response.json(payload);
}

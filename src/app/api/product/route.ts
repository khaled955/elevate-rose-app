import { type NextRequest } from "next/server";
import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Convert all incoming search params to a plain object
  const params = Object.fromEntries(searchParams.entries());

  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.GET_ALL}?${new URLSearchParams(params)}`,
    {
      next: { tags: ["products"] },
    },
  );

  const payload = await resp.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return Response.json(payload);
}

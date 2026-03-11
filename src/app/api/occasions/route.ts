import { type NextRequest } from "next/server";
import { OCCASIONS } from "@/lib/services/apis/public-apis/occasions-apis.api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Convert all incoming search params to a plain object
  const params = Object.fromEntries(searchParams.entries());

  const resp = await fetch(
    `${process.env.BASE_URL}${OCCASIONS.GET_ALL_OCCASIONS}?${new URLSearchParams(params)}`,
    {
      next: { tags: ["occasions"] },
      cache: "no-store",
    },
  );

  const payload = await resp.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return Response.json(payload);
}

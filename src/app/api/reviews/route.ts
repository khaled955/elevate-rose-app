import { REVIEWS } from "@/lib/services/apis/public-apis/reviews.api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // get-search-querys
  const searchQuery = req.nextUrl.searchParams;
  const resp = await fetch(
    `${process.env.BASE_URL}${REVIEWS.GET_ALL}?${searchQuery.toString()}`,
    {
      cache: "no-store",
    },
  );

  const payload = await resp.json();

  return Response.json(payload);
}

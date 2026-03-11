import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";
import { NextRequest } from "next/server";

const DEFAULT_OCCASION = "673b34c21159920171827ae0";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const occasion = searchParams.get("occasion") || DEFAULT_OCCASION ;
  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.MOST_POPULAR(occasion)}`,
    {
      cache:"no-store"
    }
  );

  const payload = await resp.json();
  return Response.json(payload);
}

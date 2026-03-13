import { type NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";
import { convertSearchParams } from "@/lib/utils/convert-search-params";

type RouteProps = {
  params: { categoryId: string };
};

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { categoryId } = params;

  //   Guard-class
  if (!categoryId) {
    throw new Error("Category id is required");
  }

  const searchParams = request.nextUrl.searchParams;

  const searchQuery = new URLSearchParams(searchParams);

  if (!searchQuery.has("category")) {
    searchQuery.set("category", categoryId);
  }

  const searchParamsObj: Record<string, string> = Object.fromEntries(
    searchQuery.entries(),
  );

  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.GET_ALL}?${convertSearchParams(searchParamsObj).toString()}`,
  );

  const payload = await resp.json();

  return NextResponse.json(payload);
}

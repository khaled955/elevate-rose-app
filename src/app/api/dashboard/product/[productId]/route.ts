import { PRODUCTS } from "@/lib/services/apis/public-apis/products-apis.api";
import { NextResponse, type NextRequest } from "next/server";

type RouteProps = {
  params: { productId: string };
};

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { productId } = params;

  // Guard-clause
  if (!productId) {
    throw new Error("product id is required");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${PRODUCTS.GET_SPECIFIC_PRODUCT(productId)}`,
    {
      cache: "no-store",
    },
  );

  const payload = await resp.json();

  return NextResponse.json(payload);
}

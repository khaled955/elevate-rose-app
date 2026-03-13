import { NextResponse, type NextRequest } from "next/server";
import { CATEGORIES } from "@/lib/services/apis/public-apis/category-apis.api";

type RouteProps = {
  params: { categoryId: string };
};

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { categoryId } = params;

  // Guard-class
  if (!categoryId) {
    throw new Error("Category id is required");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${CATEGORIES.GET_CURRENT(categoryId)}`,
    
  );

  const payload = await resp.json();

  // return all data
  return NextResponse.json(payload);
}

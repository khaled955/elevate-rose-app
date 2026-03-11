import { NextRequest, NextResponse } from "next/server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { WISHLIST } from "@/lib/services/apis/protected-apis/wishlist-apis.api";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  // query params
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ message: "productId is required" });
  }

  // get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const accessToken = token?.accessToken;

  // Guard
  if (!accessToken) {
    return Response.json(
      { message: "No Access Token Available ,Login First", code: 401 },
      { status: 401 },
    );
  }

  // fetch
  const resp = await fetch(
    `${process.env.BASE_URL}${WISHLIST.CHECK_AVAIABLE(productId)}`,
    {
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
      cache: "no-store",
    },
  );

  const payload = await resp.json();

  if (!resp.ok) {
    return NextResponse.json({
      message: payload?.message || "Failed to check wishlist",
    });
  }

  return NextResponse.json(payload);
}

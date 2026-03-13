import { NextRequest, NextResponse } from "next/server";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { getToken } from "next-auth/jwt";
import { CART } from "@/lib/services/apis/protected-apis/cart-apis.api";

export async function GET(request: NextRequest) {
  // get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const accessToken = token?.accessToken;

  // Guard
  if (!accessToken) {
    return Response.json({ message: "No Access Token Available ,Login First" });
  }

  // fetch
  const resp = await fetch(`${process.env.BASE_URL}${CART.GET}`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const payload = await resp.json();

  if (!resp.ok) {
    return NextResponse.json({
      message: payload?.message || "Failed to get cart info",
    });
  }

  return NextResponse.json(payload);
}

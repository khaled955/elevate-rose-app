import { NOTIFICATIONS } from "@/lib/services/apis/protected-apis/notifications-apis.api";
import { type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { JSON_HEADER } from "@/lib/constants/json-header.constant";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const limit = parseInt(searchParams.get("limit") || "3");
  const page = parseInt(searchParams.get("page") || "1");

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
      { status: 401 }
    );
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${NOTIFICATIONS.GET_LIMITED_BY_ADMIN(page, limit)}`,
    {
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ["user-notifications"],
      },
    }
  );

  const payload = await resp.json();

  // check-error
  if ("error" in payload || payload?.message !== "success") {
    throw new Error(payload.error || payload.message);
  }

  // return all data
  return Response.json(payload);
}

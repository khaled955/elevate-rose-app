import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const handleI18nRouting = createMiddleware(routing);

const PROTECTED_PATHS = [
  "/profile",
  "/address",
  "/allOrders",
  "/checkout-flow/checkout",
];

const AUTH_PATHS = ["/login", "/register", "/forgot-password"];

const DASHBOARD_PREFIX = "/dashboard";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  const localePrefix = new RegExp(`^/(${routing.locales.join("|")})(/|$)`, "i");
  const localeMatch = pathname.match(localePrefix);
  const localePath = localeMatch ? `/${localeMatch[1]}` : "";
  const cleanPath = pathname.replace(localePrefix, "/");

  const homeUrl = new URL(`${localePath}/`, req.nextUrl.origin);
  const loginUrl = new URL(`${localePath}/login`, req.nextUrl.origin);

  // Dashboard — must have token + admin role
  if (cleanPath.startsWith(DASHBOARD_PREFIX)) {
    if (!token) return NextResponse.redirect(homeUrl);
    if (token.user?.role !== "admin") return NextResponse.redirect(homeUrl);
    return handleI18nRouting(req);
  }

  //Protected routes — must have token
  const isProtected = PROTECTED_PATHS.some(
    (p) => cleanPath === p || cleanPath.startsWith(`${p}/`),
  );

  if (isProtected && !token) {
    loginUrl.searchParams.set(
      "callbackUrl",
      pathname + (req.nextUrl.search || ""),
    );
    return NextResponse.redirect(loginUrl);
  }

  // Auth pages — redirect home if already signed in
  const isAuthPage = AUTH_PATHS.some(
    (p) => cleanPath === p || cleanPath.startsWith(`${p}/`),
  );

  if (isAuthPage && token) {
    return NextResponse.redirect(homeUrl);
  }

  //Everything else
  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

import { NextResponse, type NextRequest } from "next/server";
import {
  verifyAdminSessionToken,
  ADMIN_COOKIE_NAME,
  SECURITY_HEADERS,
} from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // 1. If user is at /admin/login
  if (pathname === "/admin/login") {
    // If already authenticated with a valid session, redirect directly to /admin
    if (token) {
      const validSession = await verifyAdminSessionToken(token);
      if (validSession) {
        const from = req.nextUrl.searchParams.get("from");
        const targetUrl = from && from.startsWith("/admin") ? from : "/admin";
        return NextResponse.redirect(new URL(targetUrl, req.url));
      }
    }

    // Otherwise allow them to access the login page
    const res = NextResponse.next();
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      res.headers.set(key, value);
    }
    return res;
  }

  // 2. Public API exemptions:
  // - /api/admin/auth/login handles its own authentication & brute-force rate limit
  // - POST /api/admin/leads is public to allow website consultation requests
  if (
    pathname === "/api/admin/auth/login" ||
    (pathname === "/api/admin/leads" && req.method === "POST")
  ) {
    const res = NextResponse.next();
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      res.headers.set(key, value);
    }
    return res;
  }

  // 3. Check session token for all protected /admin/* pages and /api/admin/* endpoints
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const activeToken = token || bearerToken;

  const session = await verifyAdminSessionToken(activeToken);

  if (!session) {
    // If an API route, return 401 Unauthorized JSON immediately
    if (pathname.startsWith("/api/admin")) {
      const res = NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Valid admin authentication credentials required.",
        },
        { status: 401 }
      );
      for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
        res.headers.set(key, value);
      }
      return res;
    }

    // If an admin UI page, redirect to /admin/login with 'from' parameter
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);

    const redirectRes = NextResponse.redirect(loginUrl);
    // Clear any stale or tampered cookie
    redirectRes.cookies.delete(ADMIN_COOKIE_NAME);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      redirectRes.headers.set(key, value);
    }
    return redirectRes;
  }

  // 4. Session is valid: forward request with security headers & admin identity
  const res = NextResponse.next();
  res.headers.set("x-admin-email", session.email);
  res.headers.set("x-admin-role", session.role);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(key, value);
  }
  return res;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};


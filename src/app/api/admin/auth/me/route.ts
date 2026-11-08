import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyAdminSessionToken,
  ADMIN_COOKIE_NAME,
  SECURITY_HEADERS,
} from "@/lib/admin-auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401, headers: SECURITY_HEADERS }
      );
    }

    const session = await verifyAdminSessionToken(sessionCookie.value);

    if (!session) {
      return NextResponse.json(
        { authenticated: false, message: "Invalid or expired session" },
        { status: 401, headers: SECURITY_HEADERS }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          email: session.email,
          name: session.name,
          role: session.role,
        },
      },
      { headers: SECURITY_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401, headers: SECURITY_HEADERS }
    );
  }
}

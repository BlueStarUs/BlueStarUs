import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, SECURITY_HEADERS } from "@/lib/admin-auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    cookieStore.delete(ADMIN_COOKIE_NAME);

    return NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { headers: SECURITY_HEADERS }
    );
  } catch {
    return NextResponse.json({ success: true }, { headers: SECURITY_HEADERS });
  }
}

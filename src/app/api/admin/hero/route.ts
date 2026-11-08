import { NextRequest, NextResponse } from "next/server";
import { getHeroConfig, saveHeroConfig } from "@/lib/admin-store";
import { requireAdminAuth, SECURITY_HEADERS } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const hero = await getHeroConfig();
    return NextResponse.json(
      { success: true, hero },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const body = await req.json();
    const heroData = body.hero || body;
    const updatedHero = await saveHeroConfig(heroData);

    return NextResponse.json(
      {
        success: true,
        message: "Home Hero section updated and published live successfully",
        hero: updatedHero,
      },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import {
  getSettings,
  updateSettings,
  getHeroConfig,
  saveHeroConfig,
} from "@/lib/admin-store";
import { requireAdminAuth, SECURITY_HEADERS } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const settings = await getSettings();
    const hero = await getHeroConfig();
    return NextResponse.json(
      { success: true, settings, hero },
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

    let updatedSettings = null;
    let updatedHero = null;

    if (body.settings) {
      updatedSettings = await updateSettings(body.settings);
    }
    if (body.hero) {
      updatedHero = await saveHeroConfig(body.hero);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Settings updated successfully",
        settings: updatedSettings,
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


import { NextResponse } from "next/server";
import { getActiveAnnouncements, getTickerSpeed } from "@/lib/admin-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [announcements, tickerSpeed] = await Promise.all([
      getActiveAnnouncements(),
      getTickerSpeed(),
    ]);

    return NextResponse.json(
      {
        success: true,
        announcements,
        tickerSpeed,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
        announcements: [],
        tickerSpeed: 28,
      },
      { status: 500 }
    );
  }
}


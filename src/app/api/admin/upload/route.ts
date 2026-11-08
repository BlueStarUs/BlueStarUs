import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth, SECURITY_HEADERS } from "@/lib/admin-auth";
import { imagekit } from "@/lib/imagekit";

export async function POST(req: NextRequest) {
  // Enforce admin authentication
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const fileName =
      (formData.get("fileName") as string) || file?.name || `upload_${Date.now()}`;
    const folder = (formData.get("folder") as string) || "/bluestars";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Security check: Limit allowed file types to images/documents
    const allowedMimePrefixes = ["image/", "application/pdf"];
    if (file.type && !allowedMimePrefixes.some((p) => file.type.startsWith(p))) {
      return NextResponse.json(
        { success: false, message: "File type not permitted for upload." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Security check: Limit file size to 10MB
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File size exceeds 10MB limit." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString("base64");

    // Use installed official ImageKit Node SDK when private key is present
    if (privateKey) {
      try {
        const ikResponse = await imagekit.upload({
          file: base64File,
          fileName,
          folder,
          useUniqueFileName: true,
        });

        if (ikResponse?.url) {
          return NextResponse.json(
            {
              success: true,
              url: ikResponse.url,
              fileId: ikResponse.fileId,
              name: ikResponse.name,
              thumbnailUrl: ikResponse.thumbnailUrl || ikResponse.url,
            },
            { headers: SECURITY_HEADERS }
          );
        }
      } catch (ikErr) {
        // Log error and fallback to data URL if ImageKit upload network fails in sandbox
        console.warn("ImageKit SDK upload notice, using secure data URI fallback:", ikErr);
      }
    }

    // Fallback if private key is not configured or ImageKit is unreachable
    const mimeType = file.type || "image/png";
    const dataUrl = `data:${mimeType};base64,${base64File}`;

    return NextResponse.json(
      {
        success: true,
        url: dataUrl,
        fileId: `local_${Date.now()}`,
        name: fileName,
        isLocalFallback: true,
      },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

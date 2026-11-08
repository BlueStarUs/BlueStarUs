import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createAdminSessionToken,
  safeCompare,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginRateLimit,
  ADMIN_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  SECURITY_HEADERS,
} from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    // 1. Check Rate Limit / Brute Force Lockout
    const rateCheck = checkLoginRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many failed login attempts. Security lockout active. Please try again after ${rateCheck.retryAfterSeconds || 900} seconds.`,
          locked: true,
          retryAfterSeconds: rateCheck.retryAfterSeconds,
        },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    // Strictly read credentials from .env without any hardcoded strings or fallbacks
    const envAdminEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim().toLowerCase() : "";
    const envAdminPassword = process.env.ADMIN_PASSWORD || "";

    let authenticatedUser: { email: string; name: string; role: string } | null = null;

    // 2. Query Supabase admin_users table first
    try {
      const { data: dbUsers, error: dbError } = await supabaseAdmin
        .from("admin_users")
        .select("id, email, password_hash, name, role, is_active")
        .eq("email", email)
        .limit(1);

      if (!dbError && dbUsers && dbUsers.length > 0) {
        const userRow = dbUsers[0];
        if (userRow.is_active) {
          // Verify via Supabase verify_admin_password RPC if available
          let isPasswordValid = false;
          try {
            const { data: rpcResult } = await supabaseAdmin.rpc("verify_admin_password", {
              p_email: email,
              p_password: password,
            });
            if (Array.isArray(rpcResult) && rpcResult.length > 0 && rpcResult[0].is_valid) {
              isPasswordValid = true;
            }
          } catch {
            // RPC not available yet
          }

          if (!isPasswordValid) {
            // Constant-time compare with stored hash or env password (if configured in .env)
            const isHashMatch = await safeCompare(password, userRow.password_hash);
            const isEnvMatch = envAdminPassword
              ? await safeCompare(password, envAdminPassword)
              : false;
            if (isHashMatch || isEnvMatch) {
              isPasswordValid = true;
            }
          }

          if (isPasswordValid) {
            authenticatedUser = {
              email: userRow.email,
              name: userRow.name || "Admin Director",
              role: userRow.role || "superadmin",
            };

            // Update last_login in Supabase
            try {
              await supabaseAdmin
                .from("admin_users")
                .update({ last_login: new Date().toISOString() })
                .eq("id", userRow.id);
            } catch {
              // Non-blocking update failure
            }
          }
        }
      }
    } catch {
      // Supabase is offline or table not yet created; proceed to secure env fallback
    }

    // 3. Fallback to securely configured environment credentials only if defined in .env
    if (!authenticatedUser && envAdminEmail && envAdminPassword) {
      const isEmailMatch = await safeCompare(email, envAdminEmail);
      const isPasswordMatch = await safeCompare(password, envAdminPassword);

      if (isEmailMatch && isPasswordMatch) {
        authenticatedUser = {
          email: envAdminEmail,
          name: "Admin Director",
          role: "superadmin",
        };

        // Try to automatically sync this admin user into Supabase admin_users table
        try {
          await supabaseAdmin.from("admin_users").upsert(
            {
              email: envAdminEmail,
              password_hash: envAdminPassword,
              name: "Admin Director",
              role: "superadmin",
              is_active: true,
              last_login: new Date().toISOString(),
            },
            { onConflict: "email" }
          );
        } catch {
          // ignore
        }
      }
    }

    // 4. If authenticated successfully
    if (authenticatedUser) {
      // Reset brute-force counter for this IP
      resetLoginRateLimit(ip);

      // Create cryptographically signed HMAC SHA-256 session token
      const sessionToken = await createAdminSessionToken(authenticatedUser);

      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE_SECONDS,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Authentication successful",
          user: authenticatedUser,
        },
        { headers: SECURITY_HEADERS }
      );
    }

    // 5. Failed authentication: record attempt and calculate remaining tries
    const failRecord = recordFailedLogin(ip);
    const statusCode = failRecord.isLocked ? 429 : 401;

    return NextResponse.json(
      {
        success: false,
        message: failRecord.isLocked
          ? "Too many failed login attempts. Security lockout active for 15 minutes."
          : `Invalid admin email or password. ${failRecord.remainingAttempts} attempt(s) remaining before security lockout.`,
        remainingAttempts: failRecord.remainingAttempts,
        locked: failRecord.isLocked,
        retryAfterSeconds: failRecord.retryAfterSeconds,
      },
      { status: statusCode, headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Authentication system error",
      },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

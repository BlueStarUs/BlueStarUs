/**
 * Blue Stars Admin Security & Cryptographic Authentication Module
 * Provides Edge-compatible HMAC SHA-256 session signing, verification,
 * timing-attack resistant comparisons, and brute-force rate limiting.
 */

export interface AdminSessionPayload {
  email: string;
  name: string;
  role: string;
  issuedAt: number;
  expiresAt: number;
}

export const ADMIN_COOKIE_NAME = "bluestars_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Base64URL Helpers (Pure Web API, runs in Edge Middleware & Node.js)
function stringToBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function base64UrlToString(str: string): string {
  const bytes = base64UrlToBytes(str);
  return new TextDecoder().decode(bytes);
}

// Retrieve or derive the HMAC secret key
async function getHmacCryptoKey(): Promise<CryptoKey> {
  const secret =
    process.env.ADMIN_JWT_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "bluestars_secure_admin_jwt_salt_2026_x89";

  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Creates a cryptographically signed HMAC SHA-256 session token.
 */
export async function createAdminSessionToken(user: {
  email: string;
  name: string;
  role?: string;
}): Promise<string> {
  const now = Date.now();
  const payload: AdminSessionPayload = {
    email: user.email.toLowerCase().trim(),
    name: user.name,
    role: user.role || "superadmin",
    issuedAt: now,
    expiresAt: now + SESSION_MAX_AGE_SECONDS * 1000,
  };

  const payloadB64 = stringToBase64Url(JSON.stringify(payload));
  const key = await getHmacCryptoKey();
  const enc = new TextEncoder();
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64));
  const sigB64 = bytesToBase64Url(new Uint8Array(sigBuffer));

  return `${payloadB64}.${sigB64}`;
}

/**
 * Verifies the HMAC SHA-256 signature and expiration of an admin session token.
 * Returns decoded payload on success, or null if tampered, expired, or malformed.
 */
export async function verifyAdminSessionToken(
  token: string | undefined | null
): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return null;

  try {
    const key = await getHmacCryptoKey();
    const enc = new TextEncoder();
    const sigBytes = base64UrlToBytes(sigB64);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as unknown as BufferSource,
      enc.encode(payloadB64)
    );

    if (!isValid) return null;

    const payloadJson = base64UrlToString(payloadB64);
    const payload = JSON.parse(payloadJson) as AdminSessionPayload;

    if (!payload.expiresAt || payload.expiresAt < Date.now()) {
      return null; // Expired session
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Constant-time string comparison to prevent timing attacks.
 * Uses SHA-256 hashing to equalize length and constant-time bitwise XOR.
 */
export async function safeCompare(a: string, b: string): Promise<boolean> {
  if (typeof a !== "string" || typeof b !== "string") return false;

  const enc = new TextEncoder();
  const aHash = await crypto.subtle.digest("SHA-256", enc.encode(a));
  const bHash = await crypto.subtle.digest("SHA-256", enc.encode(b));

  const aBytes = new Uint8Array(aHash);
  const bBytes = new Uint8Array(bHash);

  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i] ^ bBytes[i];
  }

  return diff === 0;
}

// ============================================================================
// Brute Force & Rate Limiting Protection (In-Memory IP Bucket)
// ============================================================================

interface RateLimitRecord {
  attempts: number;
  firstAttemptAt: number;
  lockedUntil?: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const MAX_LOGIN_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function checkLoginRateLimit(ip: string): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS };
  }

  // Check if IP is currently locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // Check if window has expired; reset if window has passed
  if (now - record.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.delete(ip);
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_LOGIN_ATTEMPTS - record.attempts);
  return { allowed: remaining > 0, remainingAttempts: remaining };
}

export function recordFailedLogin(ip: string): {
  isLocked: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  let record = rateLimitMap.get(ip);

  if (!record || now - record.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
    record = { attempts: 1, firstAttemptAt: now };
  } else {
    record.attempts += 1;
  }

  if (record.attempts >= MAX_LOGIN_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    rateLimitMap.set(ip, record);
    return {
      isLocked: true,
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
    };
  }

  rateLimitMap.set(ip, record);
  return {
    isLocked: false,
    remainingAttempts: MAX_LOGIN_ATTEMPTS - record.attempts,
  };
}

export function resetLoginRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}

/**
 * Standard Security Headers for Next.js responses
 */
export const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

/**
 * Server-Side Route Guard for API Handlers (Defense-in-Depth)
 */
export async function requireAdminAuth(req: {
  cookies: { get(name: string): { value?: string } | undefined };
  headers: { get(name: string): string | null };
}): Promise<{
  authorized: boolean;
  session: AdminSessionPayload | null;
  errorResponse?: Response;
}> {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const activeToken = token || bearerToken;

  const session = await verifyAdminSessionToken(activeToken);

  if (!session) {
    return {
      authorized: false,
      session: null,
      errorResponse: new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized: Valid admin authentication credentials required.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            ...SECURITY_HEADERS,
          },
        }
      ),
    };
  }

  return { authorized: true, session };
}


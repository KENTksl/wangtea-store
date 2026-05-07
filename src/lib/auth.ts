import { NextRequest } from "next/server";

type SessionPayload = {
  sub: string;
  exp: number;
};

const COOKIE_NAME = "maocha_session";

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");
  return secret;
}

function base64UrlEncode(data: Uint8Array): string {
  return Buffer.from(data)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replaceAll("-", "+").replaceAll("_", "/");
  const pad = padded.length % 4 === 0 ? 0 : 4 - (padded.length % 4);
  const normalized = padded + "=".repeat(pad);
  return new Uint8Array(Buffer.from(normalized, "base64"));
}

async function hmacSha256(message: string): Promise<Uint8Array> {
  const secret = getAuthSecret();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  return new Uint8Array(signature);
}

export async function signSession(sub: string, expiresInDays = 7): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + expiresInDays * 24 * 60 * 60;
  const payload: SessionPayload = { sub, exp };
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(payloadJson));
  const sig = await hmacSha256(payloadB64);
  const sigB64 = base64UrlEncode(sig);
  return `${payloadB64}.${sigB64}`;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return null;

  const expectedSig = await hmacSha256(payloadB64);
  const expectedB64 = base64UrlEncode(expectedSig);
  if (expectedB64 !== sigB64) return null;

  const payloadBytes = base64UrlDecode(payloadB64);
  const payloadJson = new TextDecoder().decode(payloadBytes);
  const payload = JSON.parse(payloadJson) as SessionPayload;

  if (!payload?.sub || typeof payload.exp !== "number") return null;
  if (payload.exp <= Math.floor(Date.now() / 1000)) return null;

  return payload;
}

export async function getSessionFromRequest(
  req: NextRequest,
): Promise<SessionPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function getSessionFromCookieValue(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  return verifySession(token);
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}

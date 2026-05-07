import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookieName, signSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword || !process.env.AUTH_SECRET) {
    return NextResponse.json(
      { message: "Server auth is not configured" },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email?.trim() || "";
  const password = body?.password || "";

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email và mật khẩu là bắt buộc" },
      { status: 400 },
    );
  }

  const ok = email === adminEmail && password === adminPassword;
  if (!ok) {
    return NextResponse.json(
      { message: "Sai email hoặc mật khẩu" },
      { status: 401 },
    );
  }

  const token = await signSession("admin");
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}


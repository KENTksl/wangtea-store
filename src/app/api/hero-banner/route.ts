import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getHeroBannerConfig, saveHeroBannerConfig, resetHeroBannerToDefault } from "@/lib/hero-banner-repo";
import { getSessionFromRequest } from "@/lib/auth";
import type { HeroBannerInput } from "@/types/hero-banner";

export const runtime = "nodejs";

export async function GET() {
  const banner = await getHeroBannerConfig();
  const res = NextResponse.json({ banner });
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function PUT(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as (HeroBannerInput & { action?: string }) | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  let updated;
  if (body.action === "reset") {
    updated = await resetHeroBannerToDefault(session.sub || "Quản trị viên");
  } else {
    updated = await saveHeroBannerConfig(body, session.sub || "Quản trị viên");
  }

  try {
    revalidatePath("/");
  } catch {}

  return NextResponse.json({ banner: updated, message: "Cập nhật thành công" }, { status: 200 });
}

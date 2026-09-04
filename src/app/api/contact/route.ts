import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getSessionCookieName, getSessionFromCookieValue } from "@/lib/auth";
import {
  getContactConfig,
  saveContactConfig,
  resetContactConfigToDefault,
} from "@/lib/contact-repo";
import type { ContactInput } from "@/types/contact";

export const runtime = "nodejs";

export async function GET() {
  const config = await getContactConfig();
  return NextResponse.json({ contact: config }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = await getSessionFromCookieValue(token);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | (ContactInput & { action?: string })
    | null;

  if (!body) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  let updated;
  if (body.action === "reset") {
    updated = await resetContactConfigToDefault(session.sub || "Quản trị viên");
  } else {
    updated = await saveContactConfig(body, session.sub || "Quản trị viên");
  }

  try {
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/products");
    revalidatePath("/contact");
  } catch {}

  return NextResponse.json(
    { contact: updated, message: "Cập nhật thông tin liên hệ thành công" },
    { status: 200 }
  );
}

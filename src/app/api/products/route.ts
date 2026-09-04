import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createProduct, listProducts } from "@/lib/products-repo";
import { getSessionFromRequest } from "@/lib/auth";
import type { ProductInput } from "@/types/product";

export const runtime = "nodejs";

export async function GET() {
  const products = await listProducts();
  const res = NextResponse.json({ items: products });
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as ProductInput | null;
  if (!body?.name) {
    return NextResponse.json(
      { message: "Invalid payload" },
      { status: 400 },
    );
  }

  const created = await createProduct({
    name: String(body.name || "").trim(),
    description: String(body.description || "").trim(),
    ingredients: String(body.ingredients || "").trim(),
    dosage: String(body.dosage || "").trim(),
    disclosureNumber: String(body.disclosureNumber || "").trim(),
    applications: String(body.applications || "").trim(),
    images: Array.isArray(body.images)
      ? body.images.map((v) => String(v).trim()).filter(Boolean)
      : [],
  });

  try {
    revalidatePath("/products");
  } catch {}

  return NextResponse.json({ item: created }, { status: 201 });
}

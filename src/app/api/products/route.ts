import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createProduct, listProducts } from "@/lib/products-repo";
import { getSessionFromRequest } from "@/lib/auth";
import type { ProductInput } from "@/types/product";

export const runtime = "nodejs";

export async function GET() {
  const products = await listProducts();
  return NextResponse.json({ items: products });
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as ProductInput | null;
  if (!body?.name || !body?.category || !body?.sku) {
    return NextResponse.json(
      { message: "Invalid payload" },
      { status: 400 },
    );
  }

  const created = await createProduct(body);
  return NextResponse.json({ item: created }, { status: 201 });
}


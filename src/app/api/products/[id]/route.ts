import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deleteProduct, updateProduct } from "@/lib/products-repo";
import { getSessionFromRequest } from "@/lib/auth";
import type { ProductInput } from "@/types/product";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => null)) as Partial<ProductInput> | null;
  if (!body) {
    return NextResponse.json(
      { message: "Invalid payload" },
      { status: 400 },
    );
  }

  const updated = await updateProduct(id, body);
  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ item: updated });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ok = await deleteProduct(id);
  if (!ok) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}


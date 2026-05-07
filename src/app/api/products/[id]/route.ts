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

  const patch: Partial<ProductInput> = {};
  if (body.name !== undefined) patch.name = String(body.name).trim();
  if (body.description !== undefined) patch.description = String(body.description).trim();
  if (body.ingredients !== undefined) patch.ingredients = String(body.ingredients).trim();
  if (body.dosage !== undefined) patch.dosage = String(body.dosage).trim();
  if (body.disclosureNumber !== undefined)
    patch.disclosureNumber = String(body.disclosureNumber).trim();
  if (body.applications !== undefined)
    patch.applications = String(body.applications).trim();
  if (body.images !== undefined) {
    patch.images = Array.isArray(body.images)
      ? body.images.map((v) => String(v).trim()).filter(Boolean)
      : [];
  }

  const updated = await updateProduct(id, patch);
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

import type { Metadata } from "next";
import Image from "next/image";
import { listProducts } from "@/lib/products-repo";
import ProductsClient from "@/components/products/ProductsClient";

export const metadata: Metadata = {
  title: "Sản phẩm | MAOCHA",
  description: "Danh mục sản phẩm của MAOCHA Trà Nguyên Bản.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await listProducts();
  const total = products.length;

  return (
    <div className="grid gap-10">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-56 sm:h-72">
          <Image
            src="/banner.jpg"
            alt="MAOCHA Trà Nguyên Bản banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
        </div>

        <div className="grid gap-4 p-8 sm:p-10">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
            Products
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
            MAOCHA Trà Nguyên Bản
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Bộ sưu tập sản phẩm của MAOCHA
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              {total} sản phẩm
            </p>
          </div>
        </div>

        <ProductsClient products={products} />
      </section>
    </div>
  );
}

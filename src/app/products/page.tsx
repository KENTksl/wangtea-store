import type { Metadata } from "next";
import Image from "next/image";
import { listProducts } from "@/lib/products-repo";

export const metadata: Metadata = {
  title: "Sản phẩm | Maocha",
  description: "Danh sách sản phẩm mẫu của Maocha Trà Nguyên Bản.",
};

export default async function ProductsPage() {
  const products = await listProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="grid gap-10">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-56 sm:h-72">
          <Image
            src="/banner.jpg"
            alt="Maocha Trà Nguyên Bản banner"
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
            Sản phẩm
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
            Maocha Trà Nguyên Bản
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Danh sách sản phẩm mẫu
          </h1>
          <p className="max-w-3xl text-base leading-7 text-zinc-600">
            Đây là trang trưng bày sản phẩm theo phong cách catalog. Nội dung
            hiện là mẫu để bạn thay đổi sau.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Bộ sưu tập
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Phân loại: {categories.join(" • ")}
            </p>
          </div>
          <div className="text-xs text-zinc-600">
            Nguồn: Bảo Lộc, Lâm Đồng • Mã hàng: mẫu
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p._id}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-lg font-semibold tracking-tight">{p.name}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {p.category} • {p.sku}
                  </p>
                </div>
                {p.badge ? (
                  <span className="shrink-0 rounded-full bg-[rgba(238,217,185,0.55)] px-3 py-1 text-xs font-medium text-[var(--color-brand-900)]">
                    {p.badge}
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-600">{p.note}</p>

              <dl className="mt-5 grid gap-3 rounded-2xl border border-zinc-200 bg-[rgba(238,217,185,0.18)] px-4 py-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-zinc-600">Đóng gói</dt>
                  <dd className="font-medium text-zinc-950">{p.packaging}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-zinc-600">Nguồn</dt>
                  <dd className="font-medium text-zinc-950">{p.origin}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

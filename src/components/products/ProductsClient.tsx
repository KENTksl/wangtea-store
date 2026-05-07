"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";

export default function ProductsClient({ products }: { products: Product[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const selected = useMemo(
    () => products.find((p) => p._id === selectedId) || null,
    [products, selectedId],
  );
  const images = selected?.images || [];
  const heroImage = activeImage || images[0] || null;

  useEffect(() => {
    if (images.length) {
      setActiveImage(images[0]);
    } else {
      setActiveImage(null);
    }
  }, [selectedId, images]);

  return (
    <>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <button
            key={p._id}
            type="button"
            onClick={() => setSelectedId(p._id)}
            className="text-left rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300"
          >
            <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-200 bg-[rgba(238,217,185,0.18)]">
              {p.images[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-44 w-full bg-[linear-gradient(135deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent),var(--color-cream))]" />
              )}
            </div>

            <p className="text-lg font-semibold tracking-tight">{p.name}</p>
            {p.description ? (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">
                {p.description}
              </p>
            ) : (
              <p className="mt-2 text-sm text-zinc-600">Xem chi tiết</p>
            )}

            <div className="mt-4 rounded-2xl border border-zinc-200 bg-[rgba(238,217,185,0.16)] px-4 py-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    Thành phần
                  </div>
                  <div className="mt-1 font-medium text-zinc-950 line-clamp-1">
                    {p.ingredients || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    Định lượng
                  </div>
                  <div className="mt-1 font-medium text-zinc-950 line-clamp-1">
                    {p.dosage || "—"}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-label="Chi tiết sản phẩm"
        >
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="absolute inset-0 bg-black/55"
            aria-label="Đóng"
          />

          <div className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl max-h-[85vh] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[min(56rem,calc(100vw-2.5rem))] sm:rounded-3xl sm:max-h-[calc(100vh-5rem)]">
            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(213,62,15,0.14),transparent_55%),radial-gradient(900px_circle_at_90%_-20%,rgba(94,0,6,0.10),transparent_55%)]" />
              <div className="relative flex items-center justify-between gap-3 px-5 py-4 sm:px-8">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-950">
                    Chi tiết sản phẩm
                  </div>
                  <div className="mt-1 truncate text-xs text-zinc-600">
                    {selected.name}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 backdrop-blur transition hover:bg-white"
                  aria-label="Đóng"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="grid flex-1 items-start gap-6 overflow-auto px-5 pb-6 pt-4 sm:grid-cols-[1.2fr_1fr] sm:px-8 sm:pb-8">
              <div className="grid gap-3">
                <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                  {heroImage ? (
                    <img
                      src={heroImage}
                      alt={selected.name}
                      className="h-64 w-full object-cover sm:h-80"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-64 w-full bg-[linear-gradient(135deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent),var(--color-cream))] sm:h-80" />
                  )}
                </div>
                {images.length > 1 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {images.slice(0, 8).map((src, idx) => (
                      <button
                        key={`${selected._id}-m-${idx}`}
                        type="button"
                        onClick={() => setActiveImage(src)}
                        className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:border-zinc-300 ${
                          src === heroImage ? "border-zinc-950/20 ring-2 ring-[rgba(213,62,15,0.22)]" : "border-zinc-200"
                        }`}
                      >
                        <img
                          src={src}
                          alt={`${selected.name} ${idx + 2}`}
                          className={`aspect-[4/3] w-full object-cover ${
                            src === heroImage ? "opacity-80" : ""
                          }`}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-4">
                <div className="self-start rounded-3xl border border-zinc-200 bg-white shadow-sm">
                  <div className="px-6 py-5">
                    <div className="text-center text-xl font-semibold tracking-tight text-zinc-950">
                      {selected.name}
                    </div>
                    {selected.description ? (
                      <div className="mt-2 text-center text-sm text-zinc-600">
                        {selected.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="border-t border-zinc-200" />
                  <div className="grid gap-4 px-6 py-5 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Thành phần
                        </div>
                        <div className="mt-1 font-medium text-zinc-950">
                          {selected.ingredients || "—"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Định lượng
                        </div>
                        <div className="mt-1 font-medium text-zinc-950">
                          {selected.dosage || "—"}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Số tự công bố
                      </div>
                      <div className="font-medium text-zinc-950">
                        {selected.disclosureNumber || "—"}
                      </div>
                    </div>

                    <div className="grid gap-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Ứng dụng
                      </div>
                      <div className="font-medium text-zinc-950">
                        {selected.applications || "—"}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Product } from "@/types/product";

export default function ProductsClient({ products }: { products: Product[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

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

  // Modal animation
  useEffect(() => {
    if (selectedId && modalRef.current && modalBackdropRef.current && modalContentRef.current) {
      // Animate in
      gsap.set(modalBackdropRef.current, { opacity: 0 });
      gsap.set(modalContentRef.current, { 
        y: 30, 
        scale: 0.95, 
        opacity: 0 
      });
      
      const tl = gsap.timeline();
      tl.to(modalBackdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(modalContentRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out"
      }, "-=0.2");

      return () => {
        tl.kill();
      };
    }
  }, [selectedId]);

  const closeModal = () => {
    if (modalBackdropRef.current && modalContentRef.current) {
      const tl = gsap.timeline();
      tl.to(modalContentRef.current, {
        y: 30,
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
      .to(modalBackdropRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setSelectedId(null)
      }, "-=0.15");
    }
  };

  return (
    <>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, index) => (
          <button
            key={p._id}
            data-index={index}
            type="button"
            onClick={() => setSelectedId(p._id)}
            className="text-left rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 product-card"
          >
            <div className="mb-4 relative overflow-hidden rounded-2xl border border-zinc-200 bg-[rgba(238,217,185,0.18)]">
              {p.images[0] ? (
                <div className="relative h-44 w-full">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
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
          ref={modalRef}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Chi tiết sản phẩm"
        >
          <button
            ref={modalBackdropRef}
            type="button"
            onClick={closeModal}
            className="absolute inset-0 bg-black/55"
            aria-label="Đóng"
          />

          <div
            ref={modalContentRef}
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh] w-[min(56rem,calc(100vw-2.5rem))]"
          >
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
                  onClick={closeModal}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 backdrop-blur transition hover:bg-white"
                  aria-label="Đóng"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="grid flex-1 items-start gap-6 overflow-auto px-5 pb-6 pt-4 sm:grid-cols-[1.2fr_1fr] sm:px-8 sm:pb-8">
              <div className="grid gap-3">
                <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                  {heroImage ? (
                    <div className="relative h-64 w-full sm:h-80">
                      <Image
                        src={heroImage}
                        alt={selected.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                      />
                    </div>
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
                        className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:border-zinc-300 ${
                          src === heroImage ? "border-zinc-950/20 ring-2 ring-[rgba(213,62,15,0.22)]" : "border-zinc-200"
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={src}
                            alt={`${selected.name} ${idx + 2}`}
                            fill
                            sizes="100px"
                            className={`object-cover ${
                              src === heroImage ? "opacity-80" : ""
                            }`}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-4">
                <div className="self-start rounded-3xl border border-zinc-200 bg-white shadow-sm">
                  <div className="px-6 py-5">
                    <div className="text-xl font-semibold tracking-tight text-zinc-950">
                      {selected.name}
                    </div>
                    {selected.description ? (
                      <div className="mt-3 text-sm leading-7 text-zinc-600">
                        {selected.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="border-t border-zinc-200" />
                  <div className="grid gap-4 px-6 py-5 text-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

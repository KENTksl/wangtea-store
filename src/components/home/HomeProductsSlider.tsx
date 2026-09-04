"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import type { Product } from "@/types/product";

const PHONE = "0944601732";
const ZALO_URL = `https://zalo.me/${PHONE}`;
const FACEBOOK_URL = "https://www.facebook.com/share/18NsBG5wvy/?mibextid=wwXIfr";

function getProductBadge(name: string, desc = ""): { text: string; color: string } {
  const combined = `${name} ${desc}`.toLowerCase();
  if (combined.includes("hồng trà") || combined.includes("black tea")) {
    return { text: "Hồng trà đậm vị", color: "bg-amber-100/90 text-amber-950 border-amber-200/80" };
  }
  if (combined.includes("lục trà") || combined.includes("trà xanh") || combined.includes("green tea")) {
    return { text: "Lục trà thanh hương", color: "bg-emerald-100/90 text-emerald-950 border-emerald-200/80" };
  }
  if (combined.includes("ô long") || combined.includes("oolong")) {
    return { text: "Ô long thơm sữa", color: "bg-orange-100/90 text-orange-950 border-orange-200/80" };
  }
  if (combined.includes("gia công") || combined.includes("mã hàng") || combined.includes("giải pháp")) {
    return { text: "Gia công theo mẫu", color: "bg-rose-100/90 text-rose-950 border-rose-200/80" };
  }
  return { text: "Trà nguyên bản", color: "bg-zinc-100/90 text-zinc-900 border-zinc-200/80" };
}

export default function HomeProductsSlider({ products }: { products: Product[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedImageOverride, setSelectedImageOverride] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => products.find((p) => p._id === selectedId) || null,
    [products, selectedId]
  );
  const images = selected?.images ?? [];
  const heroImage = selectedImageOverride ?? images[0] ?? null;

  const handleSelectProduct = (id: string) => {
    setSelectedImageOverride(null);
    setSelectedId(id);
  };

  // Check scroll position to toggle Left/Right arrow states
  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atLeft = el.scrollLeft <= 10;
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setCanScrollLeft(!atLeft);
    setCanScrollRight(!atRight);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = 290;
    const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Modal Animation
  useEffect(() => {
    if (selectedId && modalRef.current && modalBackdropRef.current && modalContentRef.current) {
      gsap.set(modalBackdropRef.current, { opacity: 0 });
      gsap.set(modalContentRef.current, { y: 35, scale: 0.92, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(modalBackdropRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" })
        .to(modalContentRef.current, { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.1)" }, "-=0.15");

      return () => {
        tl.kill();
      };
    }
  }, [selectedId]);

  const closeModal = () => {
    if (modalBackdropRef.current && modalContentRef.current) {
      const tl = gsap.timeline();
      tl.to(modalContentRef.current, { y: 25, scale: 0.94, opacity: 0, duration: 0.2, ease: "power2.in" })
        .to(modalBackdropRef.current, { opacity: 0, duration: 0.2, ease: "power2.in", onComplete: () => setSelectedId(null) }, "-=0.1");
    }
  };

  return (
    <>
      {/* GLASSMORPHIC SHOWCASE CONTAINER (KHUNG KÍNH TRONG SUỐT NỔI BẬT) */}
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/80 bg-white/40 p-5 sm:p-7 shadow-2xl shadow-[rgba(94,0,6,0.06)] backdrop-blur-2xl ring-1 ring-zinc-900/5">
        {/* Subtle Ambient Refraction Glare */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(213,62,15,0.12),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-[rgba(238,217,185,0.2)]" />

        {/* Header of the Glass Container */}
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/60 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[var(--color-brand-700)]">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-brand-900)]">
              Bộ Sưu Tập Nền Trà Bảo Lộc
            </span>
            <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-bold text-zinc-700 shadow-2xs backdrop-blur-xs">
              {products.length} sản phẩm
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <Link
              href="/products"
              className="text-xs font-bold text-[var(--color-brand-700)] hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả danh mục</span>
              <span>↗</span>
            </Link>

            {/* Glass Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/90 backdrop-blur-md transition-all ${
                  canScrollLeft
                    ? "bg-white/80 text-zinc-900 shadow-sm hover:bg-white hover:scale-105 active:scale-95 hover:shadow-md"
                    : "bg-white/30 text-zinc-300 cursor-not-allowed border-white/40 opacity-50"
                }`}
                aria-label="Lướt sang trái"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/90 backdrop-blur-md transition-all ${
                  canScrollRight
                    ? "bg-white/80 text-zinc-900 shadow-sm hover:bg-white hover:scale-105 active:scale-95 hover:shadow-md"
                    : "bg-white/30 text-zinc-300 cursor-not-allowed border-white/40 opacity-50"
                }`}
                aria-label="Lướt sang phải"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Product Cards Inside Glass Frame */}
        <div
          ref={scrollContainerRef}
          className="relative -mx-3 sm:-mx-4 mt-6 flex gap-4 sm:gap-5 overflow-x-auto px-3 sm:px-4 pb-4 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((p, index) => {
            const badge = getProductBadge(p.name, p.description);
            // Floating wave staggered animation
            const floatDelayClass = [
              "animate-[float_4s_ease-in-out_infinite]",
              "animate-[float_4.5s_ease-in-out_0.5s_infinite]",
              "animate-[float_4.2s_ease-in-out_1s_infinite]",
              "animate-[float_4.8s_ease-in-out_1.5s_infinite]",
            ][index % 4];

            return (
              <div
                key={p._id}
                onClick={() => handleSelectProduct(p._id)}
                className={`group relative flex w-[260px] sm:w-[285px] flex-none snap-start flex-col justify-between overflow-hidden rounded-2xl border border-white/90 bg-white/85 p-4 shadow-md backdrop-blur-md transition-all duration-500 hover:!translate-y-[-12px] hover:bg-white hover:border-[var(--color-brand-700)] hover:shadow-2xl hover:shadow-[rgba(213,62,15,0.2)] cursor-pointer ${floatDelayClass}`}
              >
                <div>
                  {/* Product Image */}
                  <div className="relative mb-3.5 h-40 w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 to-[rgba(238,217,185,0.3)] shadow-inner">
                    {p.images[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="285px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-112"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]">
                        <span className="text-xs font-bold text-white/90">MAOCHA TEA</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold shadow-2xs backdrop-blur-xs ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>

                    {/* Quick View Button on Image */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-zinc-900 opacity-0 shadow-md backdrop-blur-xs transition-all duration-300 group-hover:opacity-100">
                      <span>Xem nhanh</span>
                      <span>↗</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-[var(--color-brand-700)] line-clamp-1">
                    {p.name}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 line-clamp-2 min-h-[2.5rem]">
                    {p.description || "Nền trà chuẩn vị Bảo Lộc, tối ưu công thức và phù hợp cho mô hình kinh doanh dài hạn."}
                  </p>

                  {/* Spec Row */}
                  <div className="mt-3 rounded-xl border border-zinc-100 bg-[rgba(238,217,185,0.22)] p-2.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                          Định lượng
                        </span>
                        <p className="font-semibold text-zinc-900 line-clamp-1">
                          {p.dosage || "Tuỳ theo menu"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                          Nguồn trà
                        </span>
                        <p className="font-semibold text-zinc-900">
                          Bảo Lộc
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-3.5 flex items-center justify-between border-t border-zinc-100/80 pt-2.5 text-[11px] font-bold text-[var(--color-brand-700)]">
                  <span>Chi tiết & Ứng dụng</span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(213,62,15,0.1)] text-[var(--color-brand-700)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Guidance */}
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium text-zinc-500 sm:hidden">
          <span>👈 Lướt ngang để xem thêm dòng trà 👉</span>
        </div>
      </div>

      {/* Quick View Product Modal */}
      {selected ? (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Chi tiết sản phẩm"
        >
          <button
            ref={modalBackdropRef}
            type="button"
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            aria-label="Đóng"
          />

          <div
            ref={modalContentRef}
            className="relative flex w-full max-w-4xl max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-zinc-900/10"
          >
            {/* Modal Header */}
            <div className="relative border-b border-zinc-100 bg-gradient-to-r from-zinc-50 via-white to-amber-50/40 px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-brand-700)]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-700)]">
                      Thông tin sản phẩm
                    </span>
                  </div>
                  <h2 className="mt-0.5 truncate text-lg font-bold text-zinc-950 sm:text-xl">
                    {selected.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900"
                  aria-label="Đóng modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="grid flex-1 items-start gap-6 overflow-y-auto p-6 sm:grid-cols-[1.1fr_1fr] sm:p-8">
              {/* Images */}
              <div className="grid gap-3">
                <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-inner">
                  {heroImage ? (
                    <div className="relative h-64 w-full sm:h-80">
                      <Image
                        src={heroImage}
                        alt={selected.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))] sm:h-80">
                      <span className="text-lg font-bold text-white">MAOCHA Trà Nguyên Bản</span>
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {images.map((src, idx) => (
                      <button
                        key={`${selected._id}-thumb-${idx}`}
                        type="button"
                        onClick={() => setSelectedImageOverride(src)}
                        className={`relative h-16 w-16 overflow-hidden rounded-xl border transition-all ${
                          src === heroImage
                            ? "border-[var(--color-brand-700)] ring-2 ring-[var(--color-brand-700)]/30 scale-105"
                            : "border-zinc-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${selected.name} thumb ${idx + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details & CTA */}
              <div className="flex flex-col justify-between gap-6">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
                      {selected.name}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-600">
                      {selected.description || "Nền trà chuẩn vị, được tối ưu công thức và sản xuất theo quy trình kiểm soát nghiêm ngặt."}
                    </p>
                  </div>

                  <div className="grid gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 text-xs">
                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-zinc-200/60">
                      <div>
                        <span className="font-bold uppercase tracking-wider text-zinc-500">
                          Thành phần
                        </span>
                        <p className="mt-1 font-semibold text-zinc-900 text-sm">
                          {selected.ingredients || "Lá trà chọn lọc"}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-zinc-500">
                          Định lượng
                        </span>
                        <p className="mt-1 font-semibold text-zinc-900 text-sm">
                          {selected.dosage || "Tuỳ chỉnh theo menu"}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-1 pb-3 border-b border-zinc-200/60">
                      <span className="font-bold uppercase tracking-wider text-zinc-500">
                        Ứng dụng đề xuất
                      </span>
                      <p className="mt-0.5 font-medium text-zinc-900 text-sm leading-6">
                        {selected.applications || "Trà sữa, trà trái cây, macchiato, cold brew, kinh doanh chuỗi."}
                      </p>
                    </div>

                    <div className="grid gap-1">
                      <span className="font-bold uppercase tracking-wider text-zinc-500">
                        Số tự công bố
                      </span>
                      <p className="mt-0.5 font-semibold text-zinc-900 text-xs">
                        {selected.disclosureNumber || "Đầy đủ hồ sơ kiểm định an toàn thực phẩm"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid gap-2.5 pt-2">
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-brand-700)] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[rgba(213,62,15,0.2)] transition hover:bg-[var(--color-brand-900)] hover:shadow-lg"
                  >
                    <span>💬 Nhận mẫu thử & Tư vấn qua Zalo</span>
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-xs font-bold text-zinc-800 shadow-xs transition hover:bg-zinc-50"
                  >
                    <span>Nhắn tin Fanpage Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

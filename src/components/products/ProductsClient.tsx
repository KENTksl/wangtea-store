"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Product } from "@/types/product";

const PHONE = "0944601732";
const ZALO_URL = `https://zalo.me/${PHONE}`;
const FACEBOOK_URL = "https://www.facebook.com/share/18NsBG5wvy/?mibextid=wwXIfr";

function getProductBadge(name: string, desc = ""): { text: string; color: string } {
  const combined = `${name} ${desc}`.toLowerCase();
  if (combined.includes("hồng trà") || combined.includes("trà đen") || combined.includes("black tea")) {
    return { text: "Hồng trà đậm vị", color: "bg-amber-100 text-amber-900 border-amber-200" };
  }
  if (combined.includes("olong") || combined.includes("ô long") || combined.includes("oolong")) {
    return { text: "Ô Long Bảo Lộc", color: "bg-orange-100 text-orange-900 border-orange-200" };
  }
  if (combined.includes("lục trà") || combined.includes("trà xanh") || combined.includes("green tea") || combined.includes("lài")) {
    return { text: "Lục trà thanh hương", color: "bg-emerald-100 text-emerald-900 border-emerald-200" };
  }
  if (combined.includes("sâm dứa") || combined.includes("gạo rang") || combined.includes("sencha")) {
    return { text: "Trà mộc hương thảo", color: "bg-teal-100 text-teal-900 border-teal-200" };
  }
  return { text: "Trà nguyên bản", color: "bg-zinc-100 text-zinc-900 border-zinc-200" };
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedImageOverride, setSelectedImageOverride] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => products.find((p) => p._id === selectedId) || null,
    [products, selectedId],
  );
  const images = selected?.images ?? [];
  const heroImage = selectedImageOverride ?? images[0] ?? null;

  const handleSelectProduct = (id: string) => {
    setSelectedImageOverride(null);
    setSelectedId(id);
  };

  // Stagger animation when products change
  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".product-card-item");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        }
      );
    }
  }, [products]);

  // Modal animation
  useEffect(() => {
    if (selectedId && modalRef.current && modalBackdropRef.current && modalContentRef.current) {
      gsap.set(modalBackdropRef.current, { opacity: 0 });
      gsap.set(modalContentRef.current, { 
        y: 40, 
        scale: 0.92, 
        opacity: 0 
      });
      
      const tl = gsap.timeline();
      tl.to(modalBackdropRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      })
      .to(modalContentRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "back.out(1.1)",
      }, "-=0.15");

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
        scale: 0.94,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      })
      .to(modalBackdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setSelectedId(null),
      }, "-=0.1");
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((p, index) => {
          const badge = getProductBadge(p.name, p.description);
          return (
            <div
              key={p._id}
              data-index={index}
              onClick={() => handleSelectProduct(p._id)}
              className="product-card-item group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EAE3D6] bg-white p-4 sm:p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E1E]/40 hover:shadow-lg hover:shadow-black/5 cursor-pointer"
            >
              <div>
                {/* Image Section */}
                <div className="relative mb-4 h-44 sm:h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 to-[#F4ECE1]">
                  {p.images[0] ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#8B1E1E]">
                      <span className="text-sm font-bold text-white/90">MAOCHA Tea</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[11px] font-bold shadow-2xs backdrop-blur-sm ${badge.color}`}>
                      {badge.text}
                    </span>
                  </div>

                  {/* Quick Action Overlay Icon */}
                  <div className="absolute bottom-2.5 right-2.5 flex h-7 w-7 translate-y-2 items-center justify-center rounded-full bg-white text-zinc-900 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Info Section */}
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 transition-colors duration-200 group-hover:text-[#8B1E1E] line-clamp-1">
                  {p.name}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 line-clamp-2 min-h-[2.5rem]">
                  {p.description || "Nền trà tuyển chọn chất lượng cao, phục vụ pha chế và nhượng quyền chuyên nghiệp."}
                </p>

                {/* Specs Box */}
                <div className="mt-3.5 rounded-xl border border-[#EAE3D6] bg-[#FAF7F2] p-3 text-xs text-zinc-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Thành phần
                      </span>
                      <p className="mt-0.5 font-semibold text-zinc-900 line-clamp-1 text-xs">
                        {p.ingredients || "Lá trà chọn lọc"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Định lượng
                      </span>
                      <p className="mt-0.5 font-semibold text-zinc-900 line-clamp-1 text-xs">
                        {p.dosage || "Theo menu"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs font-bold text-[#8B1E1E]">
                <span className="inline-flex items-center gap-1.5">
                  Xem chi tiết & công thức
                </span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {selected ? (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Chi tiết sản phẩm"
        >
          {/* Backdrop with Blur */}
          <button
            ref={modalBackdropRef}
            type="button"
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            aria-label="Đóng"
          />

          {/* Modal Content Box */}
          <div
            ref={modalContentRef}
            className="relative flex w-full max-w-4xl max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-zinc-900/10"
          >
            {/* Modal Header */}
            <div className="relative border-b border-[#EAE3D6] bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#8B1E1E]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
                      Chi tiết sản phẩm MAOCHA
                    </span>
                  </div>
                  <h2 className="mt-0.5 truncate text-xl font-bold text-zinc-950 sm:text-2xl">
                    {selected.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#FAF7F2] border border-[#EAE3D6] text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Đóng modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="grid flex-1 items-start gap-6 overflow-y-auto p-6 sm:grid-cols-[1.1fr_1fr] sm:p-8">
              {/* Left Column: Images */}
              <div className="grid gap-3">
                <div className="relative overflow-hidden rounded-2xl border border-[#EAE3D6] bg-[#FAF7F2] shadow-inner">
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
                    <div className="flex h-64 w-full items-center justify-center bg-[#8B1E1E] sm:h-80">
                      <span className="text-lg font-bold text-white">MAOCHA Trà Nguyên Bản</span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {images.map((src, idx) => {
                      const isActive = src === heroImage;
                      return (
                        <button
                          key={`${selected._id}-thumb-${idx}`}
                          type="button"
                          onClick={() => setSelectedImageOverride(src)}
                          className={`relative h-16 w-16 overflow-hidden rounded-xl border transition-all ${
                            isActive
                              ? "border-[#8B1E1E] ring-2 ring-[#8B1E1E]/30 scale-105"
                              : "border-[#EAE3D6] opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={src}
                            alt={`${selected.name} thumbnail ${idx + 1}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Details & CTA */}
              <div className="flex flex-col justify-between gap-6">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
                      {selected.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600">
                      {selected.description || "Nền trà chuẩn vị, được tối ưu công thức và sản xuất theo quy trình kiểm soát nghiêm ngặt."}
                    </p>
                  </div>

                  <div className="grid gap-3 rounded-2xl border border-[#EAE3D6] bg-[#FAF7F2] p-4 text-xs">
                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#EAE3D6]">
                      <div>
                        <span className="font-bold uppercase tracking-wider text-zinc-400">
                          Thành phần
                        </span>
                        <p className="mt-1 font-semibold text-zinc-900 text-sm">
                          {selected.ingredients || "Lá trà chọn lọc"}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-zinc-400">
                          Định lượng
                        </span>
                        <p className="mt-1 font-semibold text-zinc-900 text-sm">
                          {selected.dosage || "Tuỳ chỉnh theo menu"}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-1 pb-3 border-b border-[#EAE3D6]">
                      <span className="font-bold uppercase tracking-wider text-zinc-400">
                        Ứng dụng đề xuất
                      </span>
                      <p className="mt-0.5 font-semibold text-[#8B1E1E] text-sm leading-6">
                        {selected.applications || "Trà sữa, trà trái cây, macchiato, cold brew, kinh doanh chuỗi."}
                      </p>
                    </div>

                    <div className="grid gap-1">
                      <span className="font-bold uppercase tracking-wider text-zinc-400">
                        Hồ sơ kiểm nghiệm & công bố
                      </span>
                      <p className="mt-0.5 font-semibold text-zinc-800 text-xs">
                        {selected.disclosureNumber || "Đầy đủ hồ sơ kiểm định an toàn thực phẩm"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action CTAs */}
                <div className="grid gap-2.5 pt-2">
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B1E1E] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#8B1E1E]/20 transition hover:bg-[#5E0006] hover:shadow-lg"
                  >
                    <span>💬 Nhận mẫu thử & Tư vấn qua Zalo</span>
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#EAE3D6] bg-white px-5 py-3 text-xs font-bold text-zinc-800 shadow-2xs transition hover:bg-[#FAF7F2]"
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

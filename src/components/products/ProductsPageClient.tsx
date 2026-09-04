"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types/product";

const PHONE = "0944601732";
const ZALO_URL = `https://zalo.me/${PHONE}`;

const CATEGORIES = [
  { id: "all", label: "Tất cả sản phẩm" },
  { id: "hong-tra", label: "Hồng trà & Trà đen", match: ["hồng trà", "trà đen", "black tea"] },
  { id: "o-long", label: "Trà Ô Long", match: ["olong", "ô long", "oolong"] },
  { id: "luc-tra", label: "Lục trà & Trà lài", match: ["lục trà", "trà xanh", "green tea", "hoa lài", "trà lài", "lài"] },
  { id: "tra-moc", label: "Trà mộc & Thảo mộc", match: ["gạo rang", "sâm dứa", "sencha"] },
];

export default function ProductsPageClient({ products }: { products: Product[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let list = products;

    // Filter by category
    if (selectedCategory !== "all") {
      const cat = CATEGORIES.find((c) => c.id === selectedCategory);
      if (cat?.match) {
        list = list.filter((p) => {
          const text = `${p.name} ${p.description || ""} ${p.applications || ""}`.toLowerCase();
          return cat.match.some((m) => text.includes(m.toLowerCase()));
        });
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.ingredients?.toLowerCase().includes(query) ||
          p.applications?.toLowerCase().includes(query)
      );
    }

    return list;
  }, [products, selectedCategory, searchQuery]);

  useEffect(() => {
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll(".hero-anim");
      gsap.fromTo(
        heroElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <div className="w-full bg-[#FAF7F2] text-[#1F2421]">
      {/* 1. COMPACT HERO & CATALOG HEADER */}
      <section
        ref={heroRef}
        className="relative w-full bg-white border-b border-[#EAE3D6] pt-6 pb-6 sm:pt-8 sm:pb-7"
      >
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-2">
                <Link href="/" className="hover:text-[#8B1E1E] transition">
                  Trang chủ
                </Link>
                <span>/</span>
                <span className="text-[#8B1E1E]">Sản phẩm</span>
              </div>

              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                  Bộ Sưu Tập Nền Trà <span className="text-[#8B1E1E]">Bảo Lộc</span>
                </h1>
                <span className="hidden sm:inline-flex items-center rounded-full bg-[#8B1E1E]/10 px-2.5 py-0.5 text-xs font-bold text-[#8B1E1E]">
                  {products.length} sản phẩm
                </span>
              </div>

              <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
                Nền trà mộc tuyển chọn và công thức ủ hương chuyên sâu, tối ưu cost và độ ổn định cho pha chế & chuỗi thương hiệu.
              </p>
            </div>

            {/* Quick action button for sample request */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#8B1E1E] bg-[#8B1E1E]/5 px-4 py-2 text-xs font-bold text-[#8B1E1E] transition hover:bg-[#8B1E1E] hover:text-white"
              >
                <span>🍵 Nhận mẫu thử miễn phí</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN FILTER & LISTING SECTION */}
      <section
        ref={productsSectionRef}
        className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        {/* Compact Unified Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 rounded-2xl border border-[#EAE3D6] bg-white p-2.5 sm:p-3 shadow-2xs">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              // Calculate item count per category
              const count = cat.id === "all"
                ? products.length
                : products.filter((p) => {
                    const text = `${p.name} ${p.description || ""} ${p.applications || ""}`.toLowerCase();
                    return cat.match?.some((m) => text.includes(m.toLowerCase()));
                  }).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#8B1E1E] text-white shadow-xs"
                      : "bg-[#FAF7F2] text-zinc-700 hover:bg-[#EAE3D6]/60"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                      isActive ? "bg-white/20 text-white" : "bg-zinc-200/70 text-zinc-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <circle cx="11" cy="11" r="6" />
                <line x1="16" y1="16" x2="21" y2="21" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên, vị trà, ứng dụng..."
              className="w-full rounded-xl border border-[#EAE3D6] bg-[#FAF7F2] py-2 pl-9 pr-8 text-xs text-zinc-900 placeholder:text-zinc-400 transition focus:border-[#8B1E1E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-zinc-400 hover:text-zinc-700 font-bold"
                aria-label="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Indicators & Count */}
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-medium px-1">
          <span>
            Đang hiển thị <strong className="text-zinc-900 font-bold">{filteredProducts.length}</strong> sản phẩm
            {selectedCategory !== "all" && (
              <span> trong nhóm <strong className="text-[#8B1E1E]">{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</strong></span>
            )}
            {searchQuery && (
              <span> cho từ khóa &quot;<strong className="text-zinc-900">{searchQuery}</strong>&quot;</span>
            )}
          </span>
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-[#8B1E1E] hover:underline font-bold"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6">
            <ProductsClient products={filteredProducts} />
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#EAE3D6] bg-white py-16 text-center px-4 shadow-2xs">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF7F2] text-2xl mb-4 border border-[#EAE3D6]">
              🍵
            </div>
            <h3 className="text-lg font-bold text-zinc-950">
              Không tìm thấy dòng trà phù hợp
            </h3>
            <p className="mt-1 text-xs text-zinc-600 max-w-sm">
              Hãy thử tìm với từ khóa khác hoặc bấm đặt lại bộ lọc để xem toàn bộ danh mục trà MAOCHA.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#8B1E1E] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5E0006] transition"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}
      </section>

      {/* 3. BOTTOM CTA BANNER */}
      <section className="py-10 pb-20 mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#8B1E1E] p-8 sm:p-12 text-white shadow-xl shadow-[#8B1E1E]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Gia công độc quyền
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Cần một nền trà riêng biệt cho chuỗi của bạn?
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Gửi mẫu đối chuẩn, MAOCHA sẽ tiến hành phân tích hương vị và tạo ra công thức nền trà độc quyền giúp chuỗi của bạn khác biệt và vận hành ổn định.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-bold text-[#8B1E1E] shadow-sm hover:bg-[#FAF7F2] transition"
            >
              <span>Nhắn tin Zalo ngay</span>
              <span>→</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-7 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition"
            >
              <span>Gửi thông tin liên hệ</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

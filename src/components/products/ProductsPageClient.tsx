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
  { id: "hong-tra", label: "Hồng trà nền", match: ["hồng trà", "black tea", "hậu vị đậm"] },
  { id: "luc-tra", label: "Lục trà thanh hương", match: ["lục trà", "trà xanh", "green tea", "thanh vị"] },
  { id: "o-long", label: "Trà Ô Long", match: ["ô long", "oolong", "thơm sữa"] },
  { id: "gia-cong", label: "Gia công độc quyền", match: ["gia công", "giải pháp", "mã hàng", "chuỗi"] },
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
      {/* 1. HERO HEADER BANNER (FULL WIDTH) */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden bg-white border-b border-[#EAE3D6] pt-10 pb-16 sm:pt-14 sm:pb-24"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8B1E1E_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6">
            <Link href="/" className="hover:text-[#8B1E1E] transition">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-[#8B1E1E]">Danh mục sản phẩm</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Texts */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2 hero-anim">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-[#FAF7F2] px-3.5 py-1 text-xs font-bold text-[#8B1E1E] shadow-2xs">
                  <span>🌿</span>
                  <span>MAOCHA Catalog</span>
                </span>
                <span className="inline-flex items-center rounded-full bg-[#8B1E1E]/10 px-3 py-1 text-xs font-bold text-[#8B1E1E]">
                  {products.length} dòng trà & giải pháp
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.15] hero-anim">
                Bộ sưu tập nền trà <br />
                chuẩn vị từ <span className="text-[#8B1E1E]">Bảo Lộc</span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-zinc-600 leading-relaxed font-normal hero-anim">
                Tuyển chọn những búp trà sạch chất lượng cao, ứng dụng công thức ủ hương và sao sấy chuyên sâu phục vụ pha chế đồ uống & chuỗi nhượng quyền.
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-semibold text-zinc-600 hero-anim pt-1">
                {["✓ 100% Trà Bảo Lộc", "✓ Nền trà ổn định", "✓ Gia công theo mẫu", "✓ Hồ sơ tự công bố đầy đủ"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#EAE3D6] bg-white px-3.5 py-1.5 shadow-2xs"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right Quick Promo Card */}
            <div className="lg:col-span-4 hero-anim">
              <div className="rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-white to-[#FAF7F2] p-6 shadow-lg shadow-black/5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#8B1E1E] text-white text-lg">
                    🍵
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-zinc-950">
                      Gửi mẫu thử miễn phí
                    </h3>
                    <p className="text-[11px] text-zinc-500">
                      Toàn quốc trong 24 – 48 giờ
                    </p>
                  </div>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Nhận ngay trọn bộ mẫu các dòng trà chủ lực để pha thử và thẩm định chất lượng trước khi đặt hàng.
                </p>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8B1E1E] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5E0006] transition"
                >
                  <span>Nhận mẫu thử qua Zalo</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN FILTER & LISTING SECTION */}
      <section
        ref={productsSectionRef}
        className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        {/* Controls Bar: Filter Pills & Search */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between rounded-3xl border border-[#EAE3D6] bg-white p-5 sm:p-6 shadow-sm">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#8B1E1E] text-white shadow-sm shadow-[#8B1E1E]/25"
                      : "border border-[#EAE3D6] bg-[#FAF7F2] text-zinc-700 hover:border-[#8B1E1E]/30 hover:bg-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
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
              placeholder="Tìm theo tên, vị trà, ứng dụng..."
              className="w-full rounded-full border border-[#EAE3D6] bg-[#FAF7F2] py-2.5 pl-10 pr-10 text-xs text-zinc-900 placeholder:text-zinc-400 transition focus:border-[#8B1E1E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-zinc-400 hover:text-zinc-700 font-bold"
                aria-label="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter & Reset Filter */}
        <div className="mt-6 flex items-center justify-between text-xs text-zinc-500 font-medium px-2">
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
            <h3 className="font-serif text-lg font-bold text-zinc-950">
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
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
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

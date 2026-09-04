"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBanner from "@/app/components/hero/HeroBanner";
import type { HeroBannerConfig } from "@/types/hero-banner";
import { DEFAULT_HERO_BANNER } from "@/types/hero-banner";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "0944601732";
const ZALO_URL = `https://zalo.me/${PHONE}`;

// 4 Dòng sản phẩm chủ lực chuẩn theo thiết kế tham chiếu
const FEATURED_PRODUCTS = [
  {
    id: "hong-tra",
    name: "Hồng trà nền (đậm hương)",
    badge: "Hương vị đậm đà",
    badgeColor: "bg-[#2D4723] text-white border-[#243B1C]",
    desc: "Hậu vị đậm, thơm sâu, phù hợp làm nền trà sữa/latte trà.",
    image: "/tea-hong-tra.jpg",
    ingredients: "Lá trà đen Bảo Lộc lên men sâu",
    dosage: "15g - 20g / 500ml",
    applications: "Trà sữa truyền thống, Latte trà, Milkfoam",
  },
  {
    id: "luc-tra",
    name: "Lục trà nền (thanh vị)",
    badge: "Lục trà thanh hương",
    badgeColor: "bg-[#4B8246] text-white border-[#3F6F3A]",
    desc: "Vị thanh, dễ phối trái cây, phù hợp take away.",
    image: "/tea-luc-tra.jpg",
    ingredients: "Lá trà xanh búp non Bảo Lộc",
    dosage: "12g - 15g / 500ml",
    applications: "Trà đào, Trà vải, Trà nhiệt đới",
  },
  {
    id: "o-long",
    name: "Ô long nền (thơm sữa)",
    badge: "Thơm sữa tự nhiên",
    badgeColor: "bg-[#D19E3A] text-white border-[#BA8929]",
    desc: "Mùi thơm đặc trưng, hợp với sữa và các topping.",
    image: "/tea-olong.jpg",
    ingredients: "Búp trà ô long sao rang thủ công",
    dosage: "15g - 18g / 500ml",
    applications: "Trà sữa ô long, Ô long nướng, Macchiato",
  },
  {
    id: "gia-cong",
    name: "Nền trà (gia công)",
    badge: "Gia công theo công thức",
    badgeColor: "bg-[#8B1E1E] text-white border-[#721419]",
    desc: "Gia công theo mục tiêu & ý tưởng, mã hàng riêng cho thương hiệu.",
    image: "/tea-custom.jpg",
    ingredients: "Công thức phối trộn độc quyền",
    dosage: "Tối ưu theo chi phí giá vốn của quán",
    applications: "Chuỗi nhượng quyền F&B, Phân phối độc quyền",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tiếp nhận mẫu & yêu cầu",
    desc: "Bạn gửi mẫu trà mong muốn hoặc chia sẻ định vị, phân khúc.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Phân tích & gửi mẫu thử (Free Sample)",
    desc: "Đội ngũ chuyên gia MAOCHA phân tích hương vị, phối mẫu phù hợp.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2a7 7 0 0 0-7 7c0 4.2 3 7.3 6.1 11.3l.9 1.2.9-1.2C16 16.3 19 13.2 19 9a7 7 0 0 0-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Tối ưu công thức & chi phí",
    desc: "Cùng khách hàng nếm thử, chỉnh độ đậm – hương – hậu vị và tối ưu chi phí.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Sản xuất & chuyển giao pha chế",
    desc: "Đóng gói theo mã hàng riêng, bàn giao công thức & hướng dẫn pha chế chi tiết.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HomeClient({ banner }: { banner?: HeroBannerConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<typeof FEATURED_PRODUCTS[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Products Stagger
      if (productsRef.current) {
        gsap.fromTo(
          productsRef.current.querySelectorAll(".prod-card"),
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: productsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Why Choose Us Animation
      if (whyRef.current) {
        gsap.fromTo(
          whyRef.current.querySelectorAll(".why-item"),
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: whyRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Process Timeline Animation
      if (processRef.current) {
        gsap.fromTo(
          processRef.current.querySelectorAll(".process-card"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: processRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // CTA Banner Animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden bg-[#FAF7F2]">
      {/* 1. HERO BANNER SECTION (DRIVEN BY CONFIG) */}
      <HeroBanner config={banner || DEFAULT_HERO_BANNER} />

      {/* INNER PAGE SECTIONS CONTAINER */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 space-y-16 sm:space-y-24 py-6 sm:py-10">
        {/* 2. PHẦN SẢN PHẨM: ĐA DẠNG GIẢI PHÁP TRÀ CHO MỌI NHU CẦU */}
        <section ref={productsRef} className="grid gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2421]">
                Đa dạng giải pháp trà cho mọi nhu cầu 🍃
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-[#8B1E1E] hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả sản phẩm</span>
              <span>→</span>
            </Link>
          </div>

          {/* 4 Cards on One Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="prod-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EBE3D5] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[rgba(94,0,6,0.06)] hover:border-[#8B1E1E]/30 cursor-pointer"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative mb-3.5 h-44 w-full overflow-hidden rounded-xl bg-zinc-100">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold shadow-xs ${prod.badgeColor}`}>
                        {prod.badge}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <h3 className="text-sm font-bold text-zinc-950 transition-colors group-hover:text-[#8B1E1E] line-clamp-1">
                    {prod.name}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 line-clamp-2 min-h-[2.5rem]">
                    {prod.desc}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-[#8B1E1E]">
                  <span>Chi tiết & ứng dụng</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PHẦN LÝ DO LỰA CHỌN: VÌ SAO CHỌN MAOCHA? */}
        <section
          ref={whyRef}
          className="relative overflow-hidden rounded-3xl border border-[#DCE8DC] bg-gradient-to-r from-[#F0F6F0] via-[#F4F9F4] to-[#FAF7F0] p-8 sm:p-10 shadow-xs"
        >
          {/* Decorative subtle leaves */}
          <div className="pointer-events-none absolute -top-8 -left-8 text-6xl opacity-10 select-none">🌿</div>
          <div className="pointer-events-none absolute -bottom-8 -right-8 text-6xl opacity-10 select-none">🍃</div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_3fr] gap-8 items-center">
            {/* Left Title & Link */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1F2421] leading-tight">
                Vì sao chọn<br />MAOCHA?
              </h2>
              <Link
                href="/about"
                className="mt-3.5 inline-flex items-center gap-1 text-xs font-bold text-[#8B1E1E] hover:underline"
              >
                <span>Tìm hiểu thêm</span>
                <span>→</span>
              </Link>
            </div>

            {/* Right 4 Metric Columns with Circular Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="why-item flex flex-col items-center text-center p-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-base shadow-xs ring-1 ring-[#DCE8DC]">
                  🍃
                </span>
                <span className="mt-2.5 font-serif text-xl sm:text-2xl font-black text-[#8B1E1E]">
                  100%
                </span>
                <span className="text-xs font-bold text-zinc-900 mt-0.5">
                  Trà từ Bảo Lộc
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5 leading-4">
                  Nguồn trà chọn lọc chất lượng cao
                </span>
              </div>

              <div className="why-item flex flex-col items-center text-center p-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-base shadow-xs ring-1 ring-[#DCE8DC]">
                  🔒
                </span>
                <span className="mt-2.5 font-serif text-xl sm:text-2xl font-black text-[#8B1E1E]">
                  0
                </span>
                <span className="text-xs font-bold text-zinc-900 mt-0.5">
                  Mã hàng độc quyền
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5 leading-4">
                  Tùy biến theo gu thương hiệu
                </span>
              </div>

              <div className="why-item flex flex-col items-center text-center p-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-base shadow-xs ring-1 ring-[#DCE8DC]">
                  🧪
                </span>
                <span className="mt-2.5 font-serif text-xl sm:text-2xl font-black text-[#8B1E1E]">
                  1-1
                </span>
                <span className="text-xs font-bold text-zinc-900 mt-0.5">
                  R&D mẫu miễn phí
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5 leading-4">
                  Gửi sample test tận nơi
                </span>
              </div>

              <div className="why-item flex flex-col items-center text-center p-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-base shadow-xs ring-1 ring-[#DCE8DC]">
                  🎧
                </span>
                <span className="mt-2.5 font-serif text-xl sm:text-2xl font-black text-[#8B1E1E]">
                  24/7
                </span>
                <span className="text-xs font-bold text-zinc-900 mt-0.5">
                  Đồng hành kỹ thuật
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5 leading-4">
                  Tư vấn công thức & pha chế
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PHẦN QUY TRÌNH: 4 BƯỚC R&D GIA CÔNG NỀN TRÀ RIÊNG */}
        <section ref={processRef} className="grid gap-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1F2421]">
              🍃 4 bước R&D gia công nền trà riêng 🍃
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600">
              Quy trình chuyên nghiệp, đồng hành cùng thương hiệu từ ý tưởng đến vận hành thực tế.
            </p>
          </div>

          {/* 4 Timeline Horizontal Cards with Connecting Arrows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="process-card group relative flex flex-col justify-between rounded-2xl border border-[#EAE3D6] bg-white p-5 shadow-xs transition-all duration-300 hover:border-[#8B1E1E]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8B1E1E] text-white text-[11px] font-bold">
                      {step.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF6EE] text-[#8B1E1E] transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-zinc-950">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-zinc-600">
                    {step.desc}
                  </p>
                </div>

                {/* Connecting Indicator Arrow */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#EAE3D6] text-zinc-400 text-xs shadow-2xs">
                      ›
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. PHẦN CTA CUỐI TRANG: SẴN SÀNG TẠO NÊN NỀN TRÀ ĐỘC QUYỀN */}
        <section
          ref={ctaRef}
          className="relative overflow-hidden rounded-3xl border border-[#7A1318] bg-[#58060B] shadow-2xl text-white"
        >
          {/* Background image with tea packaging & tea cup on the right */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/cta-clean-final.jpg"
              alt="MAOCHA Nền Trà Độc Quyền"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-[center_right]"
            />
            {/* Soft left gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#58060B] via-[#58060B]/85 to-transparent sm:via-[#58060B]/70" />
          </div>

          {/* CTA Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-14 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold text-white/90">
              ★ ĐỒNG HÀNH CÙNG THƯƠNG HIỆU
            </span>

            <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-extrabold leading-tight">
              Sẵn sàng tạo nên<br />
              nền trà độc quyền 🍃<br />
              của bạn?
            </h2>

            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/85 max-w-md">
              Gửi yêu cầu hoặc mẫu vị bạn mong muốn, đội ngũ MAOCHA sẽ tiến hành phân tích và gửi lại mẫu thử phối trộn hoàn toàn miễn phí.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-[#8B1E1E] shadow-md transition hover:bg-[#FAF6EE] hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>💬 Nhắn Zalo gửi mẫu thử</span>
              </a>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-transparent px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-white/10"
              >
                <span>Khám phá sản phẩm</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Bottom Value Badges Strip inside CTA */}
          <div className="relative z-10 border-t border-white/15 bg-black/25 backdrop-blur-xs px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-semibold text-white/90">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[#E0C068]">✔</span>
                <span>Trà sạch – An toàn</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[#E0C068]">✔</span>
                <span>Hương vị ổn định</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[#E0C068]">✔</span>
                <span>Hỗ trợ kỹ thuật tận tâm</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[#E0C068]">✔</span>
                <span>Phát triển bền vững</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* QUICK VIEW MODAL FOR FEATURED PRODUCTS */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            aria-label="Đóng"
          />

          <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-zinc-900/10">
            <div className="relative border-b border-zinc-100 bg-[#FAF7F2] px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E]">
                  Chi tiết dòng trà
                </span>
                <h3 className="font-serif text-lg font-bold text-zinc-950">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-500 shadow-xs hover:bg-zinc-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid gap-4 text-xs sm:text-sm">
              <div className="relative h-52 w-full overflow-hidden rounded-2xl">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-zinc-600 leading-relaxed">
                {selectedProduct.desc}
              </p>

              <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#EAE3D6] bg-[#FAF7F2] p-3 text-xs">
                <div>
                  <span className="font-bold text-zinc-500 text-[10px] uppercase">Thành phần</span>
                  <p className="font-semibold text-zinc-900 mt-0.5">{selectedProduct.ingredients}</p>
                </div>
                <div>
                  <span className="font-bold text-zinc-500 text-[10px] uppercase">Định lượng gợi ý</span>
                  <p className="font-semibold text-zinc-900 mt-0.5">{selectedProduct.dosage}</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#EAE3D6] bg-[#FAF7F2] p-3 text-xs">
                <span className="font-bold text-zinc-500 text-[10px] uppercase">Ứng dụng phù hợp</span>
                <p className="font-semibold text-zinc-900 mt-0.5">{selectedProduct.applications}</p>
              </div>

              <div className="mt-2 flex gap-3">
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-full bg-[#8B1E1E] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#5E0006]"
                >
                  Nhận mẫu thử Zalo
                </a>
                <Link
                  href="/products"
                  className="flex-1 text-center rounded-full border border-zinc-200 bg-white py-3 text-xs font-bold text-zinc-800 shadow-xs hover:bg-zinc-50"
                >
                  Xem danh mục đầy đủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

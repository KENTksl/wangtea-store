"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const productCardsRef = useRef<HTMLDivElement>(null);

  const highlights = [
    {
      title: "Nguyên liệu chọn lọc",
      desc: "Ưu tiên trà ngon và nguyên liệu rõ nguồn gốc.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2a7 7 0 0 0-7 7c0 4.2 3 7.3 6.1 11.3l.9 1.2.9-1.2C16 16.3 19 13.2 19 9a7 7 0 0 0-7-7zm0 16.2C9.5 14.9 7 12.2 7 9a5 5 0 0 1 10 0c0 3.2-2.5 5.9-5 9.2z" />
        </svg>
      ),
    },
    {
      title: "Pha chế chuẩn vị",
      desc: "Tỉ lệ cân chỉnh để mỗi ly đều ổn định chất lượng.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M7 2h10v2h-1v3.2l2.9 4.3c.7 1 .1 2.5-1.2 2.5H6.3c-1.3 0-1.9-1.5-1.2-2.5L8 7.2V4H7V2zm3 2v3.8L7.2 12h9.6L14 7.8V4h-4z" />
        </svg>
      ),
    },
    {
      title: "Nguồn hàng ổn định",
      desc: "Ưu tiên chất lượng ổn định, phù hợp vận hành kinh doanh lâu dài.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M3 7h11v10H3V7zm13 2h3.2l1.8 3.2V17h-5V9zm-1-2v12H2V5h13zm3 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      ),
    },
    {
      title: "R&D theo yêu cầu",
      desc: "Phân tích mẫu, thử nghiệm và phát triển nền trà theo định hướng riêng.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.4l3.3 2-.9 1.5L11 13V7h2z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    // Hero animation
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

    // Highlights animation
    if (highlightsRef.current) {
      const highlightCards = highlightsRef.current.querySelectorAll(".highlight-card");
      gsap.fromTo(
        highlightCards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Info card animation
    if (infoCardRef.current) {
      gsap.fromTo(
        infoCardRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoCardRef.current,
            start: "top 80%",
          },
        }
      );
      
      const infoRows = infoCardRef.current.querySelectorAll(".info-row");
      gsap.fromTo(
        infoRows,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoCardRef.current,
            start: "top 75%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="grid gap-12">
      <section ref={heroRef} className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-56 sm:h-72">
          <Image
            src="/banner.jpg"
            alt="MAOCHA Trà Nguyên Bản banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
        </div>

        <div className="grid gap-8 p-8 sm:p-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 hero-anim">
              Home
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
              MAOCHA Trà Nguyên Bản
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl hero-anim">
              MAOCHA Trà Nguyên Bản
              <span className="block text-zinc-600">
                Nền trà chuẩn cho vận hành lâu dài
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 hero-anim">
              Nền trà chuẩn để vận hành lâu dài. Gia công theo yêu cầu, tạo mẫu
              riêng cho thương hiệu, hạn chế đụng hàng thị trường.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 hero-anim">
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-700)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)]"
              >
                Xem sản phẩm
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-600 hero-anim">
              {["Nền trà chuẩn", "Mã hàng riêng", "Gia công theo mẫu", "Nguồn trà ổn định"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div ref={highlightsRef} className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
            Vì sao chọn MAOCHA?
          </h3>
          <p className="mt-3 text-base text-zinc-600">
            Tập trung vào nền trà chuẩn và trải nghiệm ổn định cho mô hình kinh doanh đồ uống.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {highlights.map((h, index) => (
              <div
                key={h.title}
                data-index={index}
                className="highlight-card group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-[var(--color-brand-700)] hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-md transition-transform group-hover:scale-110">
                    {h.icon}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-zinc-900">{h.title}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-600">
                      {h.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={infoCardRef} className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(213,62,15,0.1),transparent_60%)]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(139,69,19,0.1),transparent_60%)]" />
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
          
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-brand-700)]" fill="currentColor">
                <path d="M12 2a7 7 0 0 0-7 7c0 4.2 3 7.3 6.1 11.3l.9 1.2.9-1.2C16 16.3 19 13.2 19 9a7 7 0 0 0-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              Nguồn gốc & tiêu chuẩn
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Bảo Lộc, Lâm Đồng
            </p>
            <h3 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
              Nền trà ổn định cho vận hành
            </h3>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              Trà được chọn lọc kỹ lưỡng từ vùng nguyên liệu Bảo Lộc, phát triển theo nhu cầu thực tế, ưu tiên hương vị rõ ràng, chất lượng ổn định và phù hợp cho mô hình kinh doanh lâu dài.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { k: "Vùng nguyên liệu", v: "Bảo Lộc, Lâm Đồng" },
                { k: "Định hướng phát triển", v: "Mã hàng riêng theo yêu cầu" },
                { k: "Tiêu chuẩn chất lượng", v: "Ổn định theo lô & quy trình" },
              ].map((row, index) => (
                <div
                  key={row.k}
                  data-index={index}
                  className="info-row flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base"
                >
                  <span className="font-medium text-zinc-600">{row.k}</span>
                  <span className="font-bold text-zinc-900">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

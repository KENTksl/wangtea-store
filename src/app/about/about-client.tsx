"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const commitmentsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const capabilities = [
    {
      title: "Gia công nền trà theo yêu cầu",
      desc: "Gửi mẫu trà mong muốn, đội ngũ phân tích và thử nghiệm để ra hương vị đúng định hướng kinh doanh.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2a7 7 0 0 0-7 7c0 4.2 3 7.3 6.1 11.3l.9 1.2.9-1.2C16 16.3 19 13.2 19 9a7 7 0 0 0-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      ),
    },
    {
      title: "Giải pháp mã hàng riêng",
      desc: "Hỗ trợ chuỗi nhượng quyền cần nền trà chuẩn để vận hành ổn định và lâu dài.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v6h-2V7h2zm0 8v2h-2v-2h2z" />
        </svg>
      ),
    },
    {
      title: "Nguyên liệu pha chế mẫu riêng",
      desc: "Phục vụ các bên bán thương mại muốn dùng mẫu trà riêng, hạn chế đụng hàng thị trường.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M7 2h10v2h-1v3.2l2.9 4.3c.7 1 .1 2.5-1.2 2.5H6.3c-1.3 0-1.9-1.5-1.2-2.5L8 7.2V4H7V2zm3 2v3.8L7.2 12h9.6L14 7.8V4h-4z" />
        </svg>
      ),
    },
    {
      title: "Đồng hành vận hành mô hình",
      desc: "Đào tạo pha chế, hướng dẫn setup xe/quán, tư vấn quy trình vận hành thực tế.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 17.27l5.18 3.11-1.64-5.81 4.46-3.86-5.88-.5L12 4.98l-2.12 5.23-5.88.5 4.46 3.86-1.64 5.81L12 17.27z" />
        </svg>
      ),
    },
  ];

  const commitments = [
    {
      title: "Nguồn trà từ Bảo Lộc, Lâm Đồng",
      desc: "Thổ nhưỡng và thời tiết lý tưởng tạo hương vị ngọt thanh, thơm sâu, hậu vị đậm đà.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2a7 7 0 0 0-7 7c0 4.2 3 7.3 6.1 11.3l.9 1.2.9-1.2C16 16.3 19 13.2 19 9a7 7 0 0 0-7-7zm0 16.2C9.5 14.9 7 12.2 7 9a5 5 0 0 1 10 0c0 3.2-2.5 5.9-5 9.2z" />
        </svg>
      ),
    },
    {
      title: "Chất lượng ổn định",
      desc: "Nghiên cứu, thử nghiệm và phát triển liên tục để phù hợp nhu cầu thực tế của khách hàng.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 6v4h2V8h-2zm0 6v2h2v-2h-2z" />
        </svg>
      ),
    },
    {
      title: "Minh bạch & chuyên nghiệp",
      desc: "Hỗ trợ hồ sơ, chứng từ, giải thích thuật ngữ thuế, kiểm định và công bố an toàn nguyên liệu.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      ),
    },
    {
      title: "Mạng lưới khách hàng toàn quốc",
      desc: "Được tin chọn nhờ sự tận tâm, nguồn hàng ổn định và chăm sóc khách hàng bài bản.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
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

    // Capabilities animation
    if (capabilitiesRef.current) {
      const capabilityCards = capabilitiesRef.current.querySelectorAll(".capability-card");
      gsap.fromTo(
        capabilityCards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: capabilitiesRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Commitments animation
    if (commitmentsRef.current) {
      const commitmentCards = commitmentsRef.current.querySelectorAll(".commitment-card");
      gsap.fromTo(
        commitmentCards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: commitmentsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
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
      <section
        ref={heroRef}
        className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
      >
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

        <div className="grid gap-6 p-8 sm:p-10">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 hero-anim">
            About us
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
            MAOCHA Trà Nguyên Bản
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl hero-anim">
            MAOCHA Trà Nguyên Bản
            <span className="block text-[var(--color-brand-700)]">
              Đồng hành tạo nên nền trà riêng cho thương hiệu của bạn
            </span>
          </h1>
          <p className="max-w-3xl text-base leading-7 text-zinc-600 hero-anim">
            MAOCHA Trà Nguyên Bản là đơn vị chuyên cung cấp, thương mại và gia
            công trà theo yêu cầu. Chúng tôi cung cấp giải pháp mã hàng riêng cho
            chuỗi thương hiệu nhượng quyền, cần nền trà chuẩn để vận hành kinh
            doanh lâu dài. Đồng thời, chúng tôi còn cung cấp nguyên liệu pha chế
            cho các bên bán thương mại có nhu cầu sử dụng mẫu trà riêng, không
            đụng hàng thị trường.
          </p>

          <div className="flex flex-wrap items-center gap-3 hero-anim">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-700)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)]"
            >
              Liên hệ ngay
            </Link>
            <a
              href="https://www.facebook.com/share/18NsBG5wvy/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)]"
            >
              Xem Facebook
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div ref={capabilitiesRef} className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
            Năng lực & giải pháp
          </h3>
          <p className="mt-3 text-base text-zinc-600">
            Tập trung vào nền trà chuẩn, dễ vận hành và tối ưu cho mô hình kinh doanh đồ uống.
          </p>
          <div className="mt-8 grid gap-5">
            {capabilities.map((item, index) => (
              <div
                key={item.title}
                data-index={index}
                className="capability-card group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-[var(--color-brand-700)] hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-md transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-zinc-900">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={commitmentsRef} className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
            Chất lượng & cam kết
          </h3>
          <p className="mt-3 text-base text-zinc-600">
            Chúng tôi hiểu khách hàng cần một đối tác uy tín, nguồn hàng ổn định và giải pháp tối ưu cho kinh doanh.
          </p>
          <div className="mt-8 grid gap-5">
            {commitments.map((item, index) => (
              <div
                key={item.title}
                data-index={index}
                className="commitment-card group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-[var(--color-brand-700)] hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-md transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-zinc-900">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-[linear-gradient(135deg,var(--color-brand-900),var(--color-brand-700))] p-8 sm:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_10%,rgba(255,255,255,0.1),transparent_60%),radial-gradient(600px_circle_at_90%_90%,rgba(255,255,255,0.1),transparent_60%)]" />
        
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Hợp tác gia công nền trà riêng
            </h2>
            <p className="mt-4 text-lg text-[rgba(255,255,255,0.85)] leading-8">
              Khách hàng chỉ cần gửi mẫu trà mong muốn, chúng tôi sẽ phân tích, thử nghiệm và tạo ra sản phẩm có hương vị phù hợp với định hướng kinh doanh. MAOCHA đồng hành từ pha chế, setup, đến tư vấn vận hành và hỗ trợ hồ sơ liên quan để bạn yên tâm phát triển lâu dài.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-start lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[var(--color-brand-900)] shadow-lg shadow-black/10 transition hover:bg-[rgba(238,217,185,1)] hover:-translate-y-0.5"
            >
              <span>Liên hệ ngay</span>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/10"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import type { HeroBannerConfig } from "@/types/hero-banner";

interface HeroBannerProps {
  config: HeroBannerConfig;
  isPreview?: boolean;
}

export default function HeroBanner({ config, isPreview = false }: HeroBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isPreview) return;

    const ctx = gsap.context(() => {
      // Fade up hero text elements
      gsap.fromTo(
        ".hero-anim-item",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Buttons appear slightly delayed
      gsap.fromTo(
        ".hero-anim-buttons",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.22,
          ease: "power2.out",
        }
      );

      // Benefits bar appears last
      gsap.fromTo(
        ".hero-anim-benefits",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.38,
          ease: "power2.out",
        }
      );

      // Origin seal gentle scale-in
      gsap.fromTo(
        ".hero-anim-seal",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          delay: 0.3,
          ease: "back.out(1.4)",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isPreview]);

  // Highlight word replacement in title
  const renderTitle = (title: string, highlight: string) => {
    if (!highlight || !title.includes(highlight)) {
      return title.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ));
    }

    return title.split("\n").map((line, i) => {
      if (line.includes(highlight)) {
        const parts = line.split(highlight);
        return (
          <span key={i} className="block">
            {parts[0]}
            <span className="text-[#8B1E1E] transition-colors duration-300">
              {highlight}
            </span>
            {parts[1]}
          </span>
        );
      }
      return (
        <span key={i} className="block">
          {line}
        </span>
      );
    });
  };

  const isExternalSecondary = config.secondaryCtaLink?.startsWith("http");
  const isExternalPrimary = config.primaryCtaLink?.startsWith("http");

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#F7F4EC] transition-all duration-500
        min-h-[460px] sm:h-[500px] md:h-[540px] lg:h-[580px] flex items-center`}
    >
      {/* 1. BACKGROUND IMAGE (RESPONSIVE DESKTOP / MOBILE) */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image */}
        <div className="hidden sm:block absolute inset-0">
          <Image
            src={config.desktopImage || "/hero-clean-crisp.jpg"}
            alt={config.imageAlt || "Đồi trà Bảo Lộc MAOCHA"}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: config.desktopImagePosition || "78% center" }}
            className="object-cover"
          />
        </div>

        {/* Mobile Image */}
        <div className="block sm:hidden absolute inset-0">
          <Image
            src={config.mobileImage || config.desktopImage || "/hero-clean-crisp.jpg"}
            alt={config.imageAlt || "Đồi trà Bảo Lộc MAOCHA"}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: config.mobileImagePosition || "center center" }}
            className="object-cover"
          />
        </div>

        {/* Gradient Overlay for Text Readability & Natural Depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              config.gradientOverlay ||
              "linear-gradient(90deg, rgba(255,255,252,0.98) 0%, rgba(255,255,252,0.88) 30%, rgba(255,255,252,0.25) 58%, rgba(255,255,255,0) 100%)",
          }}
        />
        
        {/* Subtle mobile shade to ensure perfect contrast on phone */}
        <div className="sm:hidden absolute inset-0 bg-white/70 backdrop-blur-[2px] pointer-events-none" />
      </div>

      {/* 2. MAIN CONTAINER WITH MAX-WIDTH 1380PX */}
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12 py-10 sm:py-14 flex items-center justify-between">
        {/* Left Content Column (Max Width ~660px) */}
        <div ref={contentRef} className="w-full max-w-[660px] xl:max-w-[700px]">
          {/* Tagline / Small Badge */}
          {config.badgeLabel && (
            <div className="hero-anim-item inline-flex items-center gap-2 rounded-full border border-[#E6DEC8] bg-white/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B1E1E] shadow-2xs backdrop-blur-xs">
              <span>{config.badgeLabel}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E1E]" />
              <span className="text-zinc-600 font-medium tracking-normal text-[11px]">Bảo Lộc, Lâm Đồng</span>
            </div>
          )}

          {/* Main Headline */}
          <h1 className="hero-anim-item mt-3.5 text-2xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold tracking-tight text-[#162114] leading-[1.2]">
            {renderTitle(config.title, config.highlightWord)}
          </h1>

          {/* Description Paragraph */}
          <p className="hero-anim-item mt-3.5 text-xs sm:text-sm lg:text-base leading-relaxed text-zinc-700 font-medium max-w-lg">
            {config.description}
          </p>

          {/* 2 CTA Buttons (Prominent & Eye-Catching) */}
          <div className="hero-anim-buttons mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            {/* Primary Button */}
            {isExternalPrimary ? (
              <a
                href={config.primaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#8B1E1E] via-[#7B1818] to-[#5E0006] px-8 py-4 sm:px-9 sm:py-4.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#8B1E1E]/30 ring-1 ring-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#8B1E1E]/40 hover:-translate-y-1 hover:brightness-105 active:translate-y-0 focus:outline-hidden"
              >
                <span className="tracking-wide">{config.primaryCtaText}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/25">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            ) : (
              <Link
                href={config.primaryCtaLink || "/products"}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#8B1E1E] via-[#7B1818] to-[#5E0006] px-8 py-4 sm:px-9 sm:py-4.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#8B1E1E]/30 ring-1 ring-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#8B1E1E]/40 hover:-translate-y-1 hover:brightness-105 active:translate-y-0 focus:outline-hidden"
              >
                <span className="tracking-wide">{config.primaryCtaText}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/25">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            )}

            {/* Secondary Button */}
            {isExternalSecondary ? (
              <a
                href={config.secondaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#D5DDD2] bg-white/95 px-7 py-4 sm:px-8 sm:py-4.5 text-sm sm:text-base font-bold text-zinc-900 shadow-md shadow-black/5 backdrop-blur-xs transition-all duration-300 hover:bg-[#FAF7F2] hover:border-[#2D5A27] hover:text-[#2D5A27] hover:shadow-lg hover:shadow-black/8 hover:-translate-y-1 active:translate-y-0 focus:outline-hidden"
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">🍵</span>
                <span className="tracking-wide">{config.secondaryCtaText}</span>
              </a>
            ) : (
              <Link
                href={config.secondaryCtaLink || "/contact"}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#D5DDD2] bg-white/95 px-7 py-4 sm:px-8 sm:py-4.5 text-sm sm:text-base font-bold text-zinc-900 shadow-md shadow-black/5 backdrop-blur-xs transition-all duration-300 hover:bg-[#FAF7F2] hover:border-[#2D5A27] hover:text-[#2D5A27] hover:shadow-lg hover:shadow-black/8 hover:-translate-y-1 active:translate-y-0 focus:outline-hidden"
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">🍵</span>
                <span className="tracking-wide">{config.secondaryCtaText}</span>
              </Link>
            )}
          </div>

          {/* 3. FLOATING 3-BENEFITS BAR (KHUNG LỢI THẾ LỚN & THU HÚT) */}
          {config.highlights && config.highlights.length > 0 && (
            <div className="hero-anim-benefits mt-7 sm:mt-8 w-full max-w-[660px] rounded-2xl sm:rounded-3xl border border-[#E2D8C6] bg-gradient-to-b from-white/98 via-white/95 to-[#FAF7F2]/95 p-4 sm:p-5 sm:px-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:border-[#8B1E1E]/30">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE3D6]/90">
                {config.highlights.map((item, idx) => {
                  const styleColors = [
                    { bg: "bg-[#EEF7EE]", border: "border-[#2D5A27]/20", text: "text-[#2D5A27]" },
                    { bg: "bg-[#FFF7E8]", border: "border-[#D4AF37]/30", text: "text-[#B45309]" },
                    { bg: "bg-[#FDF2ED]", border: "border-[#EA580C]/20", text: "text-[#C2410C]" },
                  ];
                  const style = styleColors[idx % styleColors.length];
                  return (
                    <div
                      key={idx}
                      className={`group flex items-center gap-3.5 ${
                        idx > 0 ? "pt-3 sm:pt-0 sm:pl-4" : ""
                      } transition-transform duration-200 hover:translate-x-1 sm:hover:translate-x-0 sm:hover:scale-[1.02]`}
                    >
                      <span
                        className={`flex h-11 w-11 sm:h-12 sm:w-12 flex-none items-center justify-center rounded-2xl border ${style.bg} ${style.border} ${style.text} text-xl sm:text-2xl shadow-2xs transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm`}
                      >
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-950 text-sm sm:text-[14px] lg:text-[15px] leading-snug tracking-tight transition-colors duration-200 group-hover:text-[#8B1E1E]">
                          {item.title}
                        </p>
                        <p className="text-xs sm:text-[12px] text-zinc-600 mt-0.5 font-medium leading-tight">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. ORIGIN GOLDEN SEAL (RIGHT SIDE NEAR TEA BASKET) */}
        {config.showOriginBadge && (
          <div className="hero-anim-seal hidden lg:flex flex-col items-center justify-center text-center self-end mb-6 mr-4 xl:mr-12">
            <div className="relative flex flex-col items-center justify-center h-28 w-28 xl:h-32 xl:w-32 rounded-full border-2 border-[#D4AF37]/80 bg-gradient-to-br from-white/95 via-[#FFFDF7]/90 to-[#FAF6EE]/95 shadow-lg shadow-[#D4AF37]/20 backdrop-blur-md p-2.5 text-[#5E0006] transition-transform duration-500 hover:scale-105">
              {/* Outer decorative ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[#D4AF37]/50 pointer-events-none" />
              
              <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase text-zinc-500">
                {config.originBadgeText?.brand || "MAOCHA"}
              </span>
              <span className="text-xl xl:text-2xl font-black leading-none text-[#8B1E1E] my-0.5">
                {config.originBadgeText?.value || "100%"}
              </span>
              <span className="text-[8px] font-extrabold uppercase tracking-wider text-zinc-700 leading-tight">
                {config.originBadgeText?.sub1 || "NGUỒN TRÀ"}
              </span>
              <span className="text-[8px] font-extrabold uppercase tracking-wider text-[#8B1E1E] leading-tight">
                {config.originBadgeText?.sub2 || "BẢO LỘC"}
              </span>
              <span className="text-[10px] text-[#D4AF37] mt-0.5">✦</span>
            </div>
          </div>
        )}
      </div>

      {/* 5. ORGANIC CURVED WAVE TRANSITION AT BOTTOM */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#FAF7F2] fill-current"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0,35 C320,85 620,90 920,40 C1180,-5 1350,45 1440,30 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}

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
        {/* Left Content Column (Max Width ~620px) */}
        <div ref={contentRef} className="w-full max-w-[620px]">
          {/* Tagline / Small Badge */}
          {config.badgeLabel && (
            <div className="hero-anim-item inline-flex items-center gap-2 rounded-full border border-[#E6DEC8] bg-white/80 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B1E1E] shadow-2xs backdrop-blur-xs">
              <span>{config.badgeLabel}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E1E]" />
              <span className="text-zinc-600 font-medium tracking-normal text-[11px]">Bảo Lộc, Lâm Đồng</span>
            </div>
          )}

          {/* Main Headline */}
          <h1 className="hero-anim-item mt-3 text-2xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold tracking-tight text-[#162114] leading-[1.2]">
            {renderTitle(config.title, config.highlightWord)}
          </h1>

          {/* Description Paragraph */}
          <p className="hero-anim-item mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-zinc-700 font-medium max-w-lg">
            {config.description}
          </p>

          {/* 2 CTA Buttons */}
          <div className="hero-anim-buttons mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
            {/* Primary Button */}
            {isExternalPrimary ? (
              <a
                href={config.primaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#8B1E1E] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#8B1E1E]/25 transition-all duration-300 hover:bg-[#5E0006] hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden"
              >
                <span>{config.primaryCtaText}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ) : (
              <Link
                href={config.primaryCtaLink || "/products"}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#8B1E1E] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#8B1E1E]/25 transition-all duration-300 hover:bg-[#5E0006] hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden"
              >
                <span>{config.primaryCtaText}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}

            {/* Secondary Button */}
            {isExternalSecondary ? (
              <a
                href={config.secondaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#D5DDD2] bg-white/95 px-6 py-3 text-xs sm:text-sm font-bold text-zinc-800 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:bg-[#F2F7F2] hover:border-[#2D5A27]/40 hover:-translate-y-0.5 hover:shadow-sm focus:outline-hidden"
              >
                <span className="transition-transform duration-300 group-hover:scale-110">🍵</span>
                <span>{config.secondaryCtaText}</span>
              </a>
            ) : (
              <Link
                href={config.secondaryCtaLink || "/contact"}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#D5DDD2] bg-white/95 px-6 py-3 text-xs sm:text-sm font-bold text-zinc-800 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:bg-[#F2F7F2] hover:border-[#2D5A27]/40 hover:-translate-y-0.5 hover:shadow-sm focus:outline-hidden"
              >
                <span className="transition-transform duration-300 group-hover:scale-110">🍵</span>
                <span>{config.secondaryCtaText}</span>
              </Link>
            )}
          </div>

          {/* 3. FLOATING 3-BENEFITS BAR */}
          {config.highlights && config.highlights.length > 0 && (
            <div className="hero-anim-benefits mt-7 inline-flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl border border-[#E3DCCF] bg-white/90 p-2.5 sm:px-5 sm:py-2.5 shadow-sm shadow-black/5 backdrop-blur-md gap-3 sm:gap-5 text-xs text-zinc-800 transition-all duration-300 hover:shadow-md hover:border-[#C5A059]/40">
              {config.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#EBF4EB] text-[#2D5A27] text-xs shadow-2xs">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-bold text-zinc-900 leading-tight text-xs">{item.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{item.subtitle}</p>
                  </div>
                  {idx < config.highlights.length - 1 && (
                    <div className="hidden sm:block h-5 w-px bg-zinc-200 ml-2" />
                  )}
                </div>
              ))}
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

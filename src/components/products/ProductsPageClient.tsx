"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types/product";

export default function ProductsPageClient({ products }: { products: Product[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.description?.toLowerCase().includes(query) ||
          (p.ingredients?.toLowerCase().includes(query) ||
            (p.applications?.toLowerCase().includes(query))))
    );
  }, [products, searchQuery]);

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

    // Products section animation
    if (productsSectionRef.current) {
      gsap.fromTo(
        productsSectionRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      const productCards = productsSectionRef.current.querySelectorAll(".product-card");
      gsap.fromTo(
        productCards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.2)",
          delay: 0.3,
        }
      );
    }
  }, []);

  const total = filteredProducts.length;

  return (
    <div className="grid gap-10">
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
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
        </div>

        <div className="grid gap-4 p-8 sm:p-10">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 hero-anim">
            Sản phẩm
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
            MAOCHA Trà Nguyên Bản
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl hero-anim">
            Sản phẩm
          </h1>
          <p className="max-w-3xl text-base leading-7 text-zinc-600 hero-anim">
            Danh mục sản phẩm của MAOCHA Trà Nguyên Bản.
          </p>
        </div>
      </section>

      <section ref={productsSectionRef} className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Bộ sưu tập sản phẩm của MAOCHA
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              {total} sản phẩm
            </p>
          </div>
          <div className="w-full sm:w-80">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="6" />
                  <line x1="16" y1="16" x2="21" y2="21" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-full border border-zinc-200 bg-[rgba(238,217,185,0.16)] px-4 py-3 pl-12 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-[var(--color-brand-700)] focus:outline-none focus:ring-2 focus:ring-[rgba(213,62,15,0.22)]"
              />
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductsClient products={filteredProducts} />
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
            <svg
              viewBox="0 0 24 24"
              className="mb-4 h-12 w-12 text-zinc-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="6" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>
            <h3 className="text-lg font-semibold text-zinc-950">
              Không tìm thấy sản phẩm
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              Vui lòng thử từ khóa khác
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

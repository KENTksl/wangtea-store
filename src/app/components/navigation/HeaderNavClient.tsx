"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Trang chủ",
    desc: "Nguồn trà sạch Bảo Lộc cho thương hiệu & F&B",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "Giới thiệu",
    desc: "Nguồn cội, quy trình & năng lực cung ứng MAOCHA",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    href: "/products",
    label: "Sản phẩm",
    desc: "Trà Oolong, Lục trà, Hồng trà & phối thức độc quyền",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "Liên hệ",
    desc: "Tư vấn công thức, đặt gia công & nhận mẫu thử",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

interface HeaderNavClientProps {
  zaloUrl?: string;
  phone?: string;
  phoneDisplay?: string;
}

export default function HeaderNavClient({
  zaloUrl = "https://zalo.me/0944601732",
  phone = "0944601732",
  phoneDisplay = "0944 601 732",
}: HeaderNavClientProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile drawer upon navigating to a new route
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ========================================================
          DESKTOP NAVIGATION MENU (CENTER)
      ======================================================== */}
      <nav className="hidden items-center gap-2 text-sm font-medium text-zinc-700 md:flex">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2.5 transition-colors duration-200 font-semibold ${
                active
                  ? "text-[#8B1E1E]"
                  : "text-zinc-700 hover:text-zinc-950 hover:bg-[#F4ECE1]/50 rounded-lg"
              }`}
            >
              <span>{item.label}</span>
              {active && (
                <span className="absolute inset-x-3.5 bottom-0 h-[2.5px] bg-[#8B1E1E] rounded-full transition-all duration-300" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ========================================================
          MOBILE HAMBURGER TOGGLE BUTTON (FAR RIGHT ON MOBILE)
      ======================================================== */}
      <div className="flex md:hidden items-center order-last">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#8B1E1E] ${
            isMobileOpen
              ? "border-[#8B1E1E] bg-[#FAF2EE] text-[#8B1E1E] shadow-sm"
              : "border-[#EAE3D6] bg-white text-zinc-800 shadow-xs hover:bg-[#F4ECE1]/40"
          }`}
          aria-label={isMobileOpen ? "Đóng menu chức năng" : "Mở menu chức năng"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation-drawer"
        >
          {isMobileOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>

        {/* ========================================================
            FULL-WIDTH SOLID MOBILE DRAWER / OVERLAY
        ======================================================== */}
        {isMobileOpen && (
          <div
            id="mobile-navigation-drawer"
            className="absolute top-full left-0 right-0 w-full z-50 flex flex-col justify-between border-t border-[#EAE3D6] shadow-2xl overflow-y-auto"
            style={{
              height: "calc(100dvh - 96px)",
              maxHeight: "calc(100dvh - 96px)",
              backgroundColor: "#FAF7F2",
            }}
          >
            {/* Scrollable Content Container */}
            <div className="flex flex-col p-5 sm:p-6 gap-6">
              {/* Header inside drawer: quick search & brand motto */}
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]/80 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1.5 text-[#5E0006] font-bold uppercase tracking-wider text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E1E]" />
                  Danh mục chức năng
                </span>
                <span>MAOCHA Bảo Lộc</span>
              </div>

              {/* Navigation Items List */}
              <div className="flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`group flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 border ${
                        active
                          ? "bg-[#8B1E1E] border-[#8B1E1E] text-white shadow-md shadow-[#8B1E1E]/20"
                          : "bg-white border-[#EAE3D6] text-zinc-800 hover:border-[#8B1E1E]/40 hover:bg-[#FAF2EE]/50 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                            active
                              ? "bg-white/15 text-white"
                              : "bg-[#F4ECE1] text-[#5E0006] group-hover:bg-[#FAF2EE]"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-base font-bold tracking-tight ${active ? "text-white" : "text-zinc-900"}`}>
                            {item.label}
                          </span>
                          <span className={`text-xs ${active ? "text-white/80" : "text-zinc-500"}`}>
                            {item.desc}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center pr-1">
                        {active ? (
                          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        ) : (
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-400 group-hover:text-[#8B1E1E] transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Quick Search & Bag Links */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Link
                  href="/products"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-[#EAE3D6] text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-2xs"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="6" />
                    <line x1="16" y1="16" x2="21" y2="21" />
                  </svg>
                  <span>Tìm kiếm sản phẩm</span>
                </Link>

                <Link
                  href="/products"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-[#EAE3D6] text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-2xs"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span>Khay mẫu thử</span>
                </Link>
              </div>

              {/* Primary CTAs Section */}
              <div className="pt-2 flex flex-col gap-3">
                {/* Zalo Button */}
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-[#8B1E1E] py-3.5 px-4 text-sm font-bold text-white shadow-md shadow-[#8B1E1E]/20 transition-transform active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.42 3.84 7.08L5 22l4.16-1.39C10.05 20.84 11.01 21 12 21c5.52 0 10-4.03 10-9s-4.48-10-10-10zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                  </svg>
                  <span>Nhận mẫu thử miễn phí qua Zalo</span>
                </a>

                {/* Direct Call Button */}
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-[#2D5A27] py-3.5 px-4 text-sm font-bold text-white shadow-md shadow-[#2D5A27]/20 transition-transform active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Gọi Hotline: {phoneDisplay}</span>
                </a>
              </div>

              {/* Bottom Brand Credential */}
              <div className="pt-2 text-center text-xs text-zinc-500">
                <p className="font-semibold text-zinc-700">Xưởng sản xuất: Cao nguyên Bảo Lộc, Lâm Đồng</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Giao hàng toàn quốc 24 - 48h • Nguồn trà sạch chuẩn vị</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/contact", label: "Liên hệ" },
];

interface HeaderNavClientProps {
  zaloUrl?: string;
}

export default function HeaderNavClient({
  zaloUrl = "https://zalo.me/0944601732",
}: HeaderNavClientProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* DESKTOP NAVIGATION MENU (CENTER) */}
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

      {/* MOBILE HAMBURGER BUTTON */}
      <div className="flex md:hidden items-center">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 shadow-2xs hover:bg-zinc-50 focus:outline-hidden focus:ring-2 focus:ring-[#8B1E1E]"
          aria-label={isMobileOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>

        {/* MOBILE DRAWER */}
        {isMobileOpen && (
          <div className="fixed inset-0 top-[96px] z-50 flex flex-col bg-white/98 backdrop-blur-xl border-t border-zinc-200 p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2 text-base font-semibold">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                      active
                        ? "bg-[#FAF2EE] text-[#8B1E1E]"
                        : "text-zinc-800 hover:bg-[#F4ECE1]/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-[#8B1E1E]" />}
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col gap-3">
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#8B1E1E] py-3 text-sm font-bold text-white shadow-md shadow-[#8B1E1E]/20"
                >
                  <span>Nhận mẫu thử Zalo</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

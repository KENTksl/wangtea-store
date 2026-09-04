import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import HeaderNavClient from "@/app/components/navigation/HeaderNavClient";
import { getContactConfig } from "@/lib/contact-repo";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAOCHA Trà Nguyên Bản | Tinh hoa từ đất trời Bảo Lộc",
  description:
    "Mang đến nguồn trà sạch, chuẩn vị và ổn định cho thương hiệu & chuỗi đồ uống. Cung cấp, thương mại và gia công nền trà Bảo Lộc theo yêu cầu.",
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/icon.jpg", type: "image/jpeg" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContactConfig();
  return (
    <html
      lang="vi"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/helvetica-2" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1F2421]">
        {/* TOP NAVIGATION HEADER (STICKY, 88-100px HEIGHT) */}
        <header className="sticky top-0 z-50 h-24 border-b border-[#EAE3D6] bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all flex items-center">
          <div className="mx-auto flex h-full w-full max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo Brand Left */}
            <Link href="/" className="flex items-center gap-3.5 whitespace-nowrap group">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg shadow-2xs ring-1 ring-zinc-200/80 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.jpg"
                  alt="MAOCHA Logo"
                  fill
                  priority
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#5E0006]">
                  MAOCHA
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                  — Trà Nguyên Bản —
                </span>
              </div>
            </Link>

            {/* Menu Center (Desktop) */}
            <HeaderNavClient zaloUrl={contact.zaloUrl} />

            {/* Right Quick Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Search Icon */}
              <Link
                href="/products"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-[#F4ECE1]/60 hover:text-zinc-900"
                aria-label="Tìm kiếm sản phẩm"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="6" />
                  <line x1="16" y1="16" x2="21" y2="21" />
                </svg>
              </Link>

              {/* Sample Cart / Bag Icon */}
              <Link
                href="/products"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-[#F4ECE1]/60 hover:text-zinc-900"
                aria-label="Khay mẫu thử"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </Link>

              {/* Red CTA Button "Nhận mẫu thử" */}
              <a
                href={contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#8B1E1E] px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#8B1E1E]/20 transition-all duration-300 hover:bg-[#5E0006] hover:shadow-md hover:-translate-y-0.5"
              >
                Nhận mẫu thử
              </a>
            </div>
          </div>
        </header>

        {/* MAIN PAGE CONTAINER */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-[#EAE3D6] bg-white text-[#1F2421]">
          {/* Main Footer Content */}
          <div className="mx-auto w-full max-w-[1380px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              {/* Column 1: Brand Info */}
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-xl shadow-xs ring-1 ring-zinc-200">
                    <Image
                      src="/logo.jpg"
                      alt="MAOCHA Logo"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-xl font-bold tracking-tight text-[#5E0006]">
                      MAOCHA
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                      — Trà Nguyên Bản —
                    </span>
                  </div>
                </Link>
                <p className="text-xs leading-relaxed text-zinc-600">
                  Nền trà chuẩn cho vận hành lâu dài. Chúng tôi cung cấp, thương mại và gia công nguyên liệu trà chất lượng cao từ cao nguyên Bảo Lộc.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#FAF7F2] px-3.5 py-1.5 text-[11px] font-bold text-[#8B1E1E]">
                    <span>🌿</span>
                    <span>100% Nguồn Trà Bảo Lộc</span>
                  </div>

                  {/* Social links row */}
                  <div className="flex items-center gap-2">
                    {contact.facebookUrl && (
                      <a
                        href={contact.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#EAE3D6] text-zinc-600 transition hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                        title="Fanpage Facebook"
                        aria-label="Fanpage Facebook"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    )}
                    {contact.tiktokUrl && (
                      <a
                        href={contact.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#EAE3D6] text-zinc-600 transition hover:bg-black hover:text-white hover:border-black"
                        title="Kênh TikTok MAOCHA"
                        aria-label="Kênh TikTok MAOCHA"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                        </svg>
                      </a>
                    )}
                    {contact.zaloUrl && (
                      <a
                        href={contact.zaloUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#EAE3D6] text-[#0068FF] font-black text-[10px] font-sans transition hover:bg-[#0068FF] hover:text-white hover:border-[#0068FF]"
                        title="Zalo Tư vấn"
                        aria-label="Zalo Tư vấn"
                      >
                        Zalo
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <p className="font-serif text-sm font-bold tracking-wide text-zinc-900">
                  Khám phá
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-zinc-600">
                  <li>
                    <Link href="/" className="transition hover:text-[#8B1E1E]">
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="transition hover:text-[#8B1E1E]">
                      Giới thiệu & Kiến thức trà
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="transition hover:text-[#8B1E1E]">
                      Danh mục sản phẩm
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="transition hover:text-[#8B1E1E]">
                      Liên hệ & Tư vấn
                    </Link>
                  </li>
                  {contact.facebookUrl && (
                    <li>
                      <a
                        href={contact.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition hover:text-[#1877F2]"
                      >
                        <svg className="h-3.5 w-3.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span>Fanpage Facebook</span>
                        <span className="text-[10px] text-zinc-400">↗</span>
                      </a>
                    </li>
                  )}
                  {contact.tiktokUrl && (
                    <li>
                      <a
                        href={contact.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition hover:text-black"
                      >
                        <svg className="h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                        </svg>
                        <span>Kênh TikTok MAOCHA</span>
                        <span className="text-[10px] text-zinc-400">↗</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Column 3: Tea Categories */}
              <div>
                <p className="font-serif text-sm font-bold tracking-wide text-zinc-900">
                  Dòng trà chủ lực
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-zinc-600">
                  <li>
                    <Link href="/products" className="transition hover:text-[#8B1E1E]">
                      Hồng trà nền đậm vị
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="transition hover:text-[#8B1E1E]">
                      Lục trà hoa thanh hương
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="transition hover:text-[#8B1E1E]">
                      Trà Ô Long Bảo Lộc thơm ngậy
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="transition hover:text-[#8B1E1E]">
                      Gia công mã hàng độc quyền
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="transition hover:text-[#8B1E1E]">
                      Giải pháp cho chuỗi đồ uống F&B
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Contact & CTA */}
              <div className="space-y-4">
                <p className="font-serif text-sm font-bold tracking-wide text-zinc-900">
                  Tư vấn & Mẫu thử
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Gửi mẫu trà miễn phí tận nơi cho các chuỗi đồ uống, đại lý và thương hiệu nhượng quyền.
                </p>
                <div className="space-y-2 text-xs text-zinc-700">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900">Hotline/Zalo:</span>
                    <a href={contact.zaloUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#8B1E1E] hover:underline">
                      {contact.phoneDisplay || contact.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900">Xưởng trà:</span>
                    <span>{contact.factoryAddress}</span>
                  </p>
                </div>
                <a
                  href={contact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8B1E1E] py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#5E0006] hover:shadow-md"
                >
                  <span>🍵 Nhận mẫu thử miễn phí</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#EAE3D6] bg-[#FAF7F2]/60 py-4">
            <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-[1380px] px-4 text-[11px] text-zinc-500 sm:px-6 lg:px-8">
              <p>© {new Date().getFullYear()} MAOCHA Trà Nguyên Bản. Tất cả quyền được bảo lưu.</p>
              <div className="flex items-center gap-4">
                <span>Nguồn gốc Bảo Lộc</span>
                <span>•</span>
                <span>Chuẩn vị ổn định</span>
                <span>•</span>
                <span>Đồng hành lâu dài</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

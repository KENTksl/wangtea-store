import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maocha Trà Nguyên Bản",
  description: "Maocha Trà Nguyên Bản website",
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/icon.jpg", type: "image/jpeg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/75 dark:border-white/[.12]">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Maocha logo"
                width={44}
                height={44}
                priority
                className="rounded-md shadow-sm ring-1 ring-zinc-200 dark:ring-white/[.12]"
              />
              <span className="text-lg font-semibold tracking-tight">
                Maocha
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-white/70">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950 dark:hover:bg-white/[.06] dark:hover:text-white"
              >
                Trang chủ
              </Link>
              <Link
                href="/#san-pham"
                className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950 dark:hover:bg-white/[.06] dark:hover:text-white"
              >
                Sản phẩm
              </Link>
              <Link
                href="/#lien-he"
                className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950 dark:hover:bg-white/[.06] dark:hover:text-white"
              >
                Liên hệ
              </Link>
              <Link
                href="/about"
                className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950 dark:hover:bg-white/[.06] dark:hover:text-white"
              >
                Giới thiệu
              </Link>
              <Link
                href="/#lien-he"
                className="ml-2 hidden items-center gap-2 rounded-full bg-[var(--color-brand-700)] px-4 py-2 text-white shadow-sm transition hover:bg-[var(--color-brand-900)] sm:inline-flex"
              >
                Đặt ngay
                <span aria-hidden="true">→</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            {children}
          </div>
        </main>

        <footer className="border-t border-zinc-200 dark:border-white/[.12]">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 text-sm text-zinc-600 dark:text-white/70 sm:px-6 md:grid-cols-2 md:items-center">
            <p>© {new Date().getFullYear()} Maocha. All rights reserved.</p>
            
          </div>
        </footer>
      </body>
    </html>
  );
}

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
  title: "WangTea Store",
  description: "WangTea Store website",
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
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-rose-500/25 via-red-500/15 to-amber-400/20 blur-3xl [animation:float_10s_ease-in-out_infinite]" />
          <div className="absolute -bottom-40 -left-28 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-emerald-400/15 via-teal-400/10 to-sky-400/15 blur-3xl [animation:float_12s_ease-in-out_infinite]" />
          <div className="absolute -bottom-24 -right-40 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-fuchsia-500/15 via-purple-500/10 to-indigo-500/15 blur-3xl [animation:float_11s_ease-in-out_infinite]" />
        </div>

        <header className="sticky top-0 z-50 border-b border-black/[.08] bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-white/[.145]">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="WangTea Store logo"
                width={44}
                height={44}
                priority
                className="rounded-md shadow-sm ring-1 ring-black/[.08] dark:ring-white/[.145]"
              />
              <span className="text-lg font-semibold tracking-tight">
                WangTea Store
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium text-foreground/75">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 transition hover:bg-black/[.04] hover:text-foreground dark:hover:bg-white/[.06]"
              >
                Trang chủ
              </Link>
              <Link
                href="/#san-pham"
                className="rounded-lg px-3 py-2 transition hover:bg-black/[.04] hover:text-foreground dark:hover:bg-white/[.06]"
              >
                Sản phẩm
              </Link>
              <Link
                href="/#lien-he"
                className="rounded-lg px-3 py-2 transition hover:bg-black/[.04] hover:text-foreground dark:hover:bg-white/[.06]"
              >
                Liên hệ
              </Link>
              <Link
                href="/#lien-he"
                className="ml-2 hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-background shadow-sm transition hover:opacity-90 sm:inline-flex"
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

        <footer className="border-t border-black/[.08] dark:border-white/[.145]">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 text-sm text-foreground/70 sm:px-6 md:grid-cols-2 md:items-center">
            <p>© {new Date().getFullYear()} WangTea Store. All rights reserved.</p>
            <p className="md:text-right">
              Trà ngon mỗi ngày • Nhanh • Tươi • Chuẩn vị
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

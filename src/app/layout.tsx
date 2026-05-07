import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3 whitespace-nowrap">
              <Image
                src="/logo.jpg"
                alt="Maocha logo"
                width={44}
                height={44}
                priority
                className="rounded-md shadow-sm ring-1 ring-zinc-200"
              />
              <span className="text-lg font-semibold tracking-tight">
                Maocha
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <nav className="hidden items-center gap-1 text-sm font-medium text-zinc-600 sm:flex">
                <Link
                  href="/"
                  className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950"
                >
                  Trang chủ
                </Link>
                <Link
                  href="/products"
                  className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950"
                >
                  Sản phẩm
                </Link>
                <Link
                  href="/about"
                  className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950"
                >
                  Giới thiệu
                </Link>
                <Link
                  href="/admin/products"
                  className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950"
                >
                  Quản trị
                </Link>
              </nav>

              <details className="relative sm:hidden">
                <summary className="[&::-webkit-details-marker]:hidden cursor-pointer list-none rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)]">
                  Menu
                </summary>
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg">
                  <div className="grid p-2 text-sm text-zinc-950">
                    <Link
                      href="/"
                      className="rounded-xl px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)]"
                    >
                      Trang chủ
                    </Link>
                    <Link
                      href="/products"
                      className="rounded-xl px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)]"
                    >
                      Sản phẩm
                    </Link>
                    <Link
                      href="/about"
                      className="rounded-xl px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)]"
                    >
                      Giới thiệu
                    </Link>
                    <Link
                      href="/admin/products"
                      className="rounded-xl px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)]"
                    >
                      Quản trị
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            {children}
          </div>
        </main>

        <footer className="border-t border-zinc-200">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 text-sm text-zinc-600 sm:px-6 md:grid-cols-2 md:items-center">
            <p>© {new Date().getFullYear()} Maocha. All rights reserved.</p>
            <p className="md:text-right">Maocha Trà Nguyên Bản</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

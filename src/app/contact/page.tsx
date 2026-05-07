import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liên hệ | MAOCHA",
  description:
    "Thông tin liên hệ: Zalo 0944601732, Facebook và email congtytnhhwangtea@gmail.com.",
};

const PHONE = "0944601732";
const EMAIL = "congtytnhhwangtea@gmail.com";
const FACEBOOK_URL =
  "https://www.facebook.com/share/18NsBG5wvy/?mibextid=wwXIfr";
const ZALO_URL = `https://zalo.me/${PHONE}`;

function Icon({
  name,
  className,
}: {
  name: "chat" | "facebook" | "mail";
  className?: string;
}) {
  const baseClass = className ?? "h-5 w-5";
  if (name === "chat") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={baseClass}
      >
        <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={baseClass}
      >
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={baseClass}
    >
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm0 18.2a8.2 8.2 0 1 1 0-16.4 8.2 8.2 0 0 1 0 16.4zm2.4-11.8h1.9V6.5h-1.9c-1.7 0-3 1.3-3 3v1.2H9.8v1.9h1.6v5.1h2V12.6h2l.4-1.9h-2.4V9.6c0-.7.3-1.2 1-1.2z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="grid gap-12">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
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

        <div className="grid gap-6 p-8 sm:p-10 [animation:fade-up_650ms_ease-out_both]">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
            Contact
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
            MAOCHA Trà Nguyên Bản
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Liên hệ
          </h1>
          <p className="max-w-3xl text-base leading-7 text-zinc-600">
            Để lại thông tin liên hệ và nhu cầu, MAOCHA sẽ phản hồi sớm nhất.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-700)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)]"
            >
              Nhắn tin Facebook
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)]"
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">Kênh liên hệ</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Ưu tiên nhắn tin Zalo/Facebook để trao đổi nhanh về mẫu trà và nhu cầu
            gia công.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition hover:border-zinc-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(238,217,185,0.35)] text-zinc-950">
                    <Icon name="chat" className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Zalo
                    </div>
                    <div className="mt-1 font-medium text-zinc-950">
                      {PHONE}
                    </div>
                  </div>
                </div>
                <span className="text-zinc-400 transition group-hover:text-zinc-600">
                  ↗
                </span>
              </div>
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition hover:border-zinc-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(238,217,185,0.35)] text-zinc-950">
                    <Icon name="facebook" className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Fanpage
                    </div>
                    <div className="mt-1 font-medium text-zinc-950">
                      MAOCHA Trà Nguyên Bản
                    </div>
                  </div>
                </div>
                <span className="text-zinc-400 transition group-hover:text-zinc-600">
                  ↗
                </span>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="group rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition hover:border-zinc-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(238,217,185,0.35)] text-zinc-950">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Gmail
                    </div>
                    <div className="mt-1 truncate font-medium text-zinc-950">
                      {EMAIL}
                    </div>
                  </div>
                </div>
                <span className="text-zinc-400 transition group-hover:text-zinc-600">
                  ↗
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Thông tin cần gửi
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Khi nhắn tin, bạn có thể gửi nhanh các thông tin sau để MAOCHA tư vấn
            đúng nhu cầu.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            {[
              "Tên thương hiệu / mô hình kinh doanh",
              "Số lượng dự kiến theo tháng",
              "Dòng nền trà mong muốn (hồng trà / lục trà / ô long...)",
              "Hương vị mục tiêu & đối tượng khách",
              "Khu vực giao hàng / kho nhận",
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-700"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

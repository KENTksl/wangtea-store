import Image from "next/image";

export default function Home() {
  const featuredProducts = [
    {
      name: "Trà sữa truyền thống",
      note: "Béo thơm, cân vị, chuẩn gu dễ uống.",
      badge: "Best seller",
    },
    {
      name: "Trà đào cam sả",
      note: "Thanh mát, thơm sả nhẹ, uống là ghiền.",
      badge: "Fresh",
    },
    {
      name: "Hồng trà sữa",
      note: "Đậm vị trà, hậu ngọt nhẹ, không ngấy.",
      badge: "Đậm trà",
    },
  ];

  const highlights = [
    {
      title: "Nguyên liệu chọn lọc",
      desc: "Ưu tiên trà ngon và nguyên liệu rõ nguồn gốc.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2a7 7 0 0 0-7 7c0 4.2 3 7.3 6.1 11.3l.9 1.2.9-1.2C16 16.3 19 13.2 19 9a7 7 0 0 0-7-7zm0 16.2C9.5 14.9 7 12.2 7 9a5 5 0 0 1 10 0c0 3.2-2.5 5.9-5 9.2z" />
        </svg>
      ),
    },
    {
      title: "Pha chế chuẩn vị",
      desc: "Tỉ lệ cân chỉnh để mỗi ly đều ổn định chất lượng.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M7 2h10v2h-1v3.2l2.9 4.3c.7 1 .1 2.5-1.2 2.5H6.3c-1.3 0-1.9-1.5-1.2-2.5L8 7.2V4H7V2zm3 2v3.8L7.2 12h9.6L14 7.8V4h-4z" />
        </svg>
      ),
    },
    {
      title: "Giao nhanh & gọn",
      desc: "Đóng gói cẩn thận, giữ trọn hương vị khi đến tay.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M3 7h11v10H3V7zm13 2h3.2l1.8 3.2V17h-5V9zm-1-2v12H2V5h13zm3 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      ),
    },
    {
      title: "Ưu đãi mỗi tuần",
      desc: "Cập nhật combo và khuyến mãi theo mùa.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.4l3.3 2-.9 1.5L11 13V7h2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid gap-12">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/[.12] dark:bg-black">
        <div className="relative h-56 sm:h-72">
          <Image
            src="/banner.jpg"
            alt="Maocha Trà Nguyên Bản banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-black dark:via-black/50" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
        </div>

        <div className="grid gap-8 p-8 sm:p-10">
          <div className="[animation:fade-up_650ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.12] dark:bg-black dark:text-white/70">
              Maocha • Trà Nguyên Bản
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
              Bảo Lộc, Lâm Đồng
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Maocha Trà Nguyên Bản
              <span className="block text-zinc-600 dark:text-white/70">
                Nền trà chuẩn cho vận hành lâu dài
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-white/70">
              Nền trà chuẩn để vận hành lâu dài. Gia công theo yêu cầu, tạo mẫu
              riêng cho thương hiệu, hạn chế đụng hàng thị trường.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#san-pham"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-700)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)]"
              >
                Xem menu nổi bật
              </a>
              <a
                href="#lien-he"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)] dark:border-white/[.12] dark:bg-black dark:text-white dark:hover:bg-white/[.06]"
              >
                Liên hệ đặt hàng
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-white/70">
              {["Nền trà chuẩn", "Mã hàng riêng", "Gia công theo mẫu", "Nguồn trà ổn định"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 dark:border-white/[.12] dark:bg-black"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="san-pham"
        className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/[.12] dark:bg-black sm:p-10"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Menu nổi bật
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">
              Một vài lựa chọn “đỉnh” để bắt đầu.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-white/70">
            <span className="h-2 w-2 rounded-full bg-[var(--color-brand-700)]" />
            Fresh daily
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            Chỉnh đường/đá
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <div
              key={p.name}
              className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 dark:border-white/[.12] dark:bg-black"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-lg font-semibold tracking-tight">
                    {p.name}
                  </p>
                  <span className="shrink-0 rounded-full bg-[rgba(238,217,185,0.55)] px-3 py-1 text-xs font-medium text-[var(--color-brand-900)] dark:bg-white/[.06] dark:text-white/80">
                    {p.badge}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-white/70">
                  {p.note}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-xs text-zinc-600 dark:text-white/70">
                    Size M/L • Topping tuỳ chọn
                  </div>
                  <a
                    href="#lien-he"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-700)] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)]"
                  >
                    Đặt món
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/[.12] dark:bg-black">
          <h3 className="text-xl font-semibold tracking-tight">
            Vì sao chọn Maocha?
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">
            Tập trung vào nền trà chuẩn và trải nghiệm ổn định cho mô hình kinh
            doanh đồ uống.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-white/[.12] dark:bg-black"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-sm">
                    {h.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{h.title}</p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-white/70">
                      {h.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/[.12] dark:bg-black">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.12] dark:bg-black dark:text-white/70">
            Đặt hàng nhanh
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
            Chốt đơn trong 1 phút
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Muốn đặt ngay?
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">
            Gửi tên món + size + đường/đá + địa chỉ. Tụi mình phản hồi nhanh.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              { step: "01", text: "Chọn món và ghi chú đường/đá" },
              { step: "02", text: "Gửi thông tin qua Zalo/Facebook" },
              { step: "03", text: "Xác nhận và chờ giao" },
            ].map((s) => (
              <div
                key={s.step}
                className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 dark:border-white/[.12] dark:bg-black"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-white text-xs font-semibold">
                  {s.step}
                </span>
                <p className="text-sm text-zinc-600 dark:text-white/70">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <a
              href="#lien-he"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-700)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)]"
            >
              Đi tới liên hệ
            </a>
          </div>
        </div>
      </section>

      <section
        id="lien-he"
        className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/[.12] dark:bg-black sm:p-10"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Liên hệ</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">
              Kênh đặt hàng nhanh và cập nhật ưu đãi.
            </p>
          </div>
          <div className="text-xs text-zinc-600 dark:text-white/70">
            Online mỗi ngày • Phản hồi nhanh
          </div>
        </div>

        <ul className="mt-7 grid gap-4 text-sm text-zinc-600 dark:text-white/70 sm:grid-cols-2">
          <li>
            <span className="flex items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-white/[.12] dark:bg-black">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-zinc-950 dark:text-white">
                  Gmail
                </span>
                <a
                  className="break-all hover:underline"
                  href="mailto:infor.wangtea@gmail.com"
                >
                  infor.wangtea@gmail.com
                </a>
              </span>
            </span>
          </li>
          <li>
            <span className="flex items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-white/[.12] dark:bg-black">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.59a1 1 0 0 1-.25 1.01l-2.2 2.19z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-zinc-950 dark:text-white">
                  Zalo
                </span>
                <a className="hover:underline" href="tel:0944601732">
                  0944 601 732
                </a>
              </span>
            </span>
          </li>
          <li>
            <span className="flex items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-white/[.12] dark:bg-black">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.03 3.66 9.2 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.73 8.44-4.9 8.44-9.93z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-zinc-950 dark:text-white">
                  Fanpage
                </span>
                <a
                  className="hover:underline"
                  href="https://www.facebook.com/people/Maocha-Tr%C3%A0-Nguy%C3%AAn-B%E1%BA%A3n/61589320762880/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maocha - Trà Nguyên Bản
                </a>
              </span>
            </span>
          </li>
          <li>
            <span className="flex items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-white/[.12] dark:bg-black">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.03 3.66 9.2 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.73 8.44-4.9 8.44-9.93z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-zinc-950 dark:text-white">
                  Facebook
                </span>
                <a
                  className="hover:underline"
                  href="https://www.facebook.com/share/18NsBG5wvy/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mở trang Facebook
                </a>
              </span>
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}

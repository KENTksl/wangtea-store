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
    <div className="grid gap-10">
      <section className="relative overflow-hidden rounded-3xl border border-black/[.08] bg-white/70 p-8 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.35)] backdrop-blur dark:border-white/[.145] dark:bg-black/60 sm:p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-gradient-to-tr from-rose-500/25 via-red-500/15 to-amber-400/20 blur-3xl [animation:float_9s_ease-in-out_infinite]" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/15 via-teal-400/10 to-sky-400/15 blur-3xl [animation:float_11s_ease-in-out_infinite]" />
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.5),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.10),transparent_40%)]" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="[animation:fade-up_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-black/[.08] bg-black/[.02] px-3 py-1 text-xs font-medium text-foreground/70 dark:border-white/[.145] dark:bg-white/[.04]">
              Maocha • Trà Nguyên Bản
              <span className="h-1 w-1 rounded-full bg-foreground/40" />
              Fresh daily
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              WangTea Store
              <span className="block bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 bg-[length:200%_200%] bg-clip-text text-transparent [animation:gradient-pan_8s_ease-in-out_infinite]">
                Ngon chuẩn vị, đẹp chuẩn gu
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/70">
              Chọn một ly bạn thích, tụi mình pha thật chỉn chu và giao thật gọn.
              Hương trà rõ, vị sữa mượt, uống xong muốn đặt thêm.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#san-pham"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:opacity-95"
              >
                <span className="relative z-10">Xem menu nổi bật</span>
                <span className="pointer-events-none absolute inset-0 opacity-50">
                  <span className="absolute inset-y-0 left-0 w-1/2 bg-white/20 blur-md [transform:skewX(-12deg)] [animation:shimmer_1.8s_ease-in-out_infinite]" />
                </span>
              </a>
              <a
                href="#lien-he"
                className="inline-flex items-center justify-center rounded-full border border-black/[.10] bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-black/[.04] dark:border-white/[.16] dark:bg-black dark:hover:bg-white/[.06]"
              >
                Liên hệ đặt hàng
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-foreground/60">
              {["Đậm vị trà", "Ít ngọt theo yêu cầu", "Topping đa dạng", "Đóng gói xịn"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/[.08] bg-black/[.02] px-3 py-1 dark:border-white/[.145] dark:bg-white/[.04]"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative [animation:fade-up_900ms_ease-out_both]">
            <div className="relative overflow-hidden rounded-3xl border border-black/[.08] bg-gradient-to-br from-white to-white/60 p-6 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.65)] dark:border-white/[.145] dark:from-white/[.06] dark:to-white/[.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,63,94,0.18),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(34,197,94,0.12),transparent_45%)]" />
              <div className="relative grid gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Ưu đãi hôm nay</p>
                  <span className="rounded-full bg-foreground/10 px-2 py-1 text-xs font-medium text-foreground/70 dark:bg-white/[.10] dark:text-foreground/70">
                    Limited
                  </span>
                </div>
                <div className="grid gap-3">
                  {[
                    { k: "Combo 2 ly", v: "Giảm 10%" },
                    { k: "Topping", v: "Tặng 1 lần/đơn" },
                    { k: "Ít ngọt", v: "Chỉnh theo ý" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-center justify-between rounded-2xl border border-black/[.08] bg-white/70 px-4 py-3 text-sm shadow-sm dark:border-white/[.145] dark:bg-black/40"
                    >
                      <span className="text-foreground/70">{row.k}</span>
                      <span className="font-semibold">{row.v}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-black/[.08] bg-black/[.02] px-4 py-3 text-xs text-foreground/70 dark:border-white/[.145] dark:bg-white/[.04]">
                  Tip: Nhấn “Đặt ngay” trên thanh điều hướng để xem liên hệ nhanh.
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-gradient-to-tr from-rose-500/30 to-amber-400/20 blur-2xl" />
          </div>
        </div>
      </section>

      <section
        id="san-pham"
        className="rounded-3xl border border-black/[.08] bg-white/70 p-8 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-white/[.145] dark:bg-black/60 sm:p-10"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Menu nổi bật
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Một vài lựa chọn “đỉnh” để bắt đầu.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs text-foreground/60">
            <span className="h-2 w-2 rounded-full bg-rose-500/70" />
            Fresh daily
            <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
            Chỉnh đường/đá
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-3xl border border-black/[.08] bg-white/70 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-55px_rgba(0,0,0,0.55)] dark:border-white/[.145] dark:bg-black/40"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute -top-24 -right-28 h-64 w-64 rounded-full bg-gradient-to-tr from-rose-500/20 via-red-500/10 to-amber-400/15 blur-3xl" />
                <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-400/12 via-teal-400/10 to-sky-400/12 blur-3xl" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-lg font-semibold tracking-tight">
                    {p.name}
                  </p>
                  <span className="shrink-0 rounded-full border border-black/[.08] bg-black/[.02] px-3 py-1 text-xs font-medium text-foreground/70 dark:border-white/[.145] dark:bg-white/[.04]">
                    {p.badge}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  {p.note}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-xs text-foreground/60">
                    Size M/L • Topping tuỳ chọn
                  </div>
                  <a
                    href="#lien-he"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-sm transition hover:opacity-90"
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
        <div className="relative overflow-hidden rounded-3xl border border-black/[.08] bg-white/70 p-8 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-white/[.145] dark:bg-black/60">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-400/20 to-rose-500/15 blur-3xl" />
          </div>
          <div className="relative">
            <h3 className="text-xl font-semibold tracking-tight">
              Vì sao chọn WangTea?
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              Tụi mình tập trung vào những thứ “đáng tiền” nhất trong một ly trà.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-black/[.08] bg-white/70 p-5 shadow-sm transition hover:shadow-md dark:border-white/[.145] dark:bg-black/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
                      {h.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{h.title}</p>
                      <p className="mt-1 text-sm text-foreground/70">
                        {h.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-black/[.08] bg-foreground p-8 text-background shadow-[0_20px_70px_-40px_rgba(0,0,0,0.25)] dark:border-white/[.145]">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-white/18 to-white/0 blur-3xl [animation:float_10s_ease-in-out_infinite]" />
            <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-gradient-to-tr from-white/14 to-white/0 blur-3xl [animation:float_12s_ease-in-out_infinite]" />
          </div>
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-background/90">
              Đặt hàng nhanh
              <span className="h-1 w-1 rounded-full bg-white/60" />
              Chốt đơn trong 1 phút
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              Muốn đặt ngay?
            </h3>
            <p className="mt-2 text-sm text-background/80">
              Nhấn vào liên hệ, gửi tên món + size + đường/đá + địa chỉ.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                { step: "01", text: "Chọn món và ghi chú đường/đá" },
                { step: "02", text: "Gửi thông tin qua Zalo/Facebook" },
                { step: "03", text: "Xác nhận và chờ giao" },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-foreground text-xs font-semibold">
                    {s.step}
                  </span>
                  <p className="text-sm text-background/90">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <a
                href="#lien-he"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:opacity-95"
              >
                Đi tới liên hệ
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="lien-he"
        className="rounded-3xl border border-black/[.08] bg-white/70 p-8 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-white/[.145] dark:bg-black/60 sm:p-10"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Liên hệ</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Kênh đặt hàng nhanh và cập nhật ưu đãi.
            </p>
          </div>
          <div className="text-xs text-foreground/60">
            Online mỗi ngày • Phản hồi nhanh
          </div>
        </div>

        <ul className="mt-7 grid gap-4 text-sm text-foreground/70 sm:grid-cols-2">
          <li>
            <span className="flex items-start gap-4 rounded-3xl border border-black/[.08] bg-white/70 p-5 shadow-sm transition hover:shadow-md dark:border-white/[.145] dark:bg-black/40">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
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
                <span className="block font-medium text-foreground">Gmail</span>
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
            <span className="flex items-start gap-4 rounded-3xl border border-black/[.08] bg-white/70 p-5 shadow-sm transition hover:shadow-md dark:border-white/[.145] dark:bg-black/40">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
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
                <span className="block font-medium text-foreground">
                  Zalo chủ
                </span>
                <a className="hover:underline" href="tel:0944601732">
                  0944 601 732
                </a>
              </span>
            </span>
          </li>
          <li>
            <span className="flex items-start gap-4 rounded-3xl border border-black/[.08] bg-white/70 p-5 shadow-sm transition hover:shadow-md dark:border-white/[.145] dark:bg-black/40">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
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
                <span className="block font-medium text-foreground">Fanpage</span>
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
            <span className="flex items-start gap-4 rounded-3xl border border-black/[.08] bg-white/70 p-5 shadow-sm transition hover:shadow-md dark:border-white/[.145] dark:bg-black/40">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
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
                <span className="block font-medium text-foreground">
                  Facebook chủ cửa hàng
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

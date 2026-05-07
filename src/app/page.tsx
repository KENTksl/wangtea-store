import Image from "next/image";

export default function Home() {
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
      title: "Nguồn hàng ổn định",
      desc: "Ưu tiên chất lượng ổn định, phù hợp vận hành kinh doanh lâu dài.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M3 7h11v10H3V7zm13 2h3.2l1.8 3.2V17h-5V9zm-1-2v12H2V5h13zm3 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      ),
    },
    {
      title: "R&D theo yêu cầu",
      desc: "Phân tích mẫu, thử nghiệm và phát triển nền trà theo định hướng riêng.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.4l3.3 2-.9 1.5L11 13V7h2z" />
        </svg>
      ),
    },
  ];

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
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
        </div>

        <div className="grid gap-8 p-8 sm:p-10">
          <div className="[animation:fade-up_650ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
              Home
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
              MAOCHA Trà Nguyên Bản
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              MAOCHA Trà Nguyên Bản
              <span className="block text-zinc-600">
                Nền trà chuẩn cho vận hành lâu dài
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Nền trà chuẩn để vận hành lâu dài. Gia công theo yêu cầu, tạo mẫu
              riêng cho thương hiệu, hạn chế đụng hàng thị trường.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-700)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)]"
              >
                Xem sản phẩm
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-600">
              {["Nền trà chuẩn", "Mã hàng riêng", "Gia công theo mẫu", "Nguồn trà ổn định"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold tracking-tight">
            Vì sao chọn MAOCHA?
          </h3>
          <p className="mt-2 text-sm text-zinc-600">
            Tập trung vào nền trà chuẩn và trải nghiệm ổn định cho mô hình kinh
            doanh đồ uống.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-700)] text-white shadow-sm">
                    {h.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{h.title}</p>
                    <p className="mt-1 text-sm text-zinc-600">
                      {h.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
            Nguồn gốc & tiêu chuẩn
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
            Bảo Lộc, Lâm Đồng
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">
            Nền trà ổn định cho vận hành
          </h3>
          <p className="mt-2 text-sm text-zinc-600">
            Trà được chọn lọc và phát triển theo nhu cầu thực tế, ưu tiên hương vị
            rõ ràng, ổn định và phù hợp cho mô hình kinh doanh lâu dài.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              { k: "Vùng nguyên liệu", v: "Bảo Lộc, Lâm Đồng" },
              { k: "Định hướng", v: "Mã hàng riêng theo yêu cầu" },
              { k: "Chất lượng", v: "Ổn định theo lô & quy trình" },
            ].map((row) => (
              <div
                key={row.k}
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm"
              >
                <span className="text-zinc-600">{row.k}</span>
                <span className="font-semibold text-zinc-950">{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

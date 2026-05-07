import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Giới thiệu | Maocha",
  description:
    "Maocha Trà Nguyên Bản - cung cấp, thương mại và gia công nền trà theo yêu cầu.",
};

export default function AboutPage() {
  const capabilities = [
    {
      title: "Gia công nền trà theo yêu cầu",
      desc: "Gửi mẫu trà mong muốn, đội ngũ phân tích và thử nghiệm để ra hương vị đúng định hướng kinh doanh.",
    },
    {
      title: "Giải pháp mã hàng riêng",
      desc: "Hỗ trợ chuỗi nhượng quyền cần nền trà chuẩn để vận hành ổn định và lâu dài.",
    },
    {
      title: "Nguyên liệu pha chế mẫu riêng",
      desc: "Phục vụ các bên bán thương mại muốn dùng mẫu trà riêng, hạn chế đụng hàng thị trường.",
    },
    {
      title: "Đồng hành vận hành mô hình",
      desc: "Đào tạo pha chế, hướng dẫn setup xe/quán, tư vấn quy trình vận hành thực tế.",
    },
  ];

  const commitments = [
    {
      title: "Nguồn trà từ Bảo Lộc, Lâm Đồng",
      desc: "Thổ nhưỡng và thời tiết lý tưởng tạo hương vị ngọt thanh, thơm sâu, hậu vị đậm đà.",
    },
    {
      title: "Chất lượng ổn định",
      desc: "Nghiên cứu, thử nghiệm và phát triển liên tục để phù hợp nhu cầu thực tế của khách hàng.",
    },
    {
      title: "Minh bạch & chuyên nghiệp",
      desc: "Hỗ trợ hồ sơ, chứng từ, giải thích thuật ngữ thuế, kiểm định và công bố an toàn nguyên liệu.",
    },
    {
      title: "Mạng lưới khách hàng toàn quốc",
      desc: "Được tin chọn nhờ sự tận tâm, nguồn hàng ổn định và chăm sóc khách hàng bài bản.",
    },
  ];

  return (
    <div className="grid gap-12">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-56 sm:h-72">
          <Image
            src="/banner.jpg"
            alt="Maocha Trà Nguyên Bản banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
        </div>

        <div className="grid gap-6 p-8 sm:p-10 [animation:fade-up_650ms_ease-out_both]">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
            About us
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
            Maocha Trà Nguyên Bản
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Maocha Trà Nguyên Bản
            <span className="block text-[var(--color-brand-700)]">
              Đồng hành tạo nên nền trà riêng cho thương hiệu của bạn
            </span>
          </h1>
          <p className="max-w-3xl text-base leading-7 text-zinc-600">
            Maocha Trà Nguyên Bản là đơn vị chuyên cung cấp, thương mại và gia
            công trà theo yêu cầu. Chúng tôi cung cấp giải pháp mã hàng riêng cho
            chuỗi thương hiệu nhượng quyền, cần nền trà chuẩn để vận hành kinh
            doanh lâu dài. Đồng thời, chúng tôi còn cung cấp nguyên liệu pha chế
            cho các bên bán thương mại có nhu cầu sử dụng mẫu trà riêng, không
            đụng hàng thị trường.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.facebook.com/people/Maocha-Tr%C3%A0-Nguy%C3%AAn-B%E1%BA%A3n/61589320762880/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)]"
            >
              Xem fanpage
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">
            Năng lực & giải pháp
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Tập trung vào nền trà chuẩn, dễ vận hành và tối ưu cho mô hình kinh
            doanh đồ uống.
          </p>
          <div className="mt-6 grid gap-4">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">
            Chất lượng & cam kết
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Chúng tôi hiểu khách hàng cần một đối tác uy tín, nguồn hàng ổn định
            và giải pháp tối ưu cho kinh doanh.
          </p>
          <div className="mt-6 grid gap-4">
            {commitments.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))]" />
        <div className="grid gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Hợp tác gia công nền trà riêng
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-zinc-600">
            Khách hàng chỉ cần gửi mẫu trà mong muốn, chúng tôi sẽ phân tích, thử
            nghiệm và tạo ra sản phẩm có hương vị phù hợp với định hướng kinh
            doanh. Maocha đồng hành từ pha chế, setup, đến tư vấn vận hành và hỗ
            trợ hồ sơ liên quan để bạn yên tâm phát triển lâu dài.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)]"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

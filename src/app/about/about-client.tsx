"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "0944601732";
const ZALO_URL = `https://zalo.me/${PHONE}`;

// 4 Nhóm kiến thức trà chuyên sâu
const TEA_KNOWLEDGE_CATEGORIES = [
  {
    id: "hong-tra",
    name: "Hồng Trà Nền (Black Tea)",
    tag: "Đậm vị • Nước hổ phách",
    image: "/tea-hong-tra.jpg",
    fermentation: "Lên men toàn phần (100%)",
    flavor: "Hương mật ngọt tự nhiên, thơm nồng ấm, hậu vị đậm sâu",
    liquor: "Đỏ nâu hổ phách sáng trong",
    description:
      "Được ủ lên men trọn vẹn từ búp non Bảo Lộc, tạo nên tầng hương sâu dày dặn. Dù kết hợp cùng bột sữa béo hay sữa đặc, vị trà vẫn tỏa sáng rõ nét, không bị lấn át.",
    applications: "Trà sữa truyền thống, trà đào, trà chanh đậm vị, trà sữa nướng.",
  },
  {
    id: "luc-tra",
    name: "Lục Trà Thanh Hương (Green Tea)",
    tag: "Thanh mát • Hương hoa sớm",
    image: "/tea-luc-tra.jpg",
    fermentation: "Không lên men (0%)",
    flavor: "Chát dịu thanh khiết, hương hoa lài & hoa sen tự nhiên, hậu ngọt dài",
    liquor: "Vàng xanh ánh ngọc, trong vắt",
    description:
      "Trải qua quá trình diệt men tức thì ở nhiệt độ cao để giữ trọn diệp lục và polyphenol quý giá. Nền lục trà MAOCHA mang hương thơm hoa quả thanh tao, tôn vị tươi mát của các loại trái cây tươi.",
    applications: "Trà trái cây tươi nhiệt đới, lục trà macchiato, trà sữa lài, trà chanh thanh mát.",
  },
  {
    id: "olong-tra",
    name: "Trà Ô Long Bảo Lộc (Oolong Tea)",
    tag: "Thơm sữa rang • Tinh tế",
    image: "/tea-olong.jpg",
    fermentation: "Bán lên men (30% – 70%)",
    flavor: "Ngọt êm đằm thắm, thoang thoảng hương bơ sữa và quả chín ngọt",
    liquor: "Vàng óng mật ong rực rỡ",
    description:
      "Búp trà vo viên bán cầu chắc nịch, được ủ hương và sấy nhiều công đoạn tỉ mỉ. Khi hãm, từng búp trà mở rộng tỏa ra hương thơm quý phái và vị ngậy béo tự nhiên hiếm có.",
    applications: "Trà sữa ô long nướng, ô long kem cheese, ô long hoa cúc, trà pha máy cao cấp.",
  },
  {
    id: "custom-tra",
    name: "Nền Trà Gia Công Độc Quyền",
    tag: "Công thức riêng • Chống copy",
    image: "/tea-custom.jpg",
    fermentation: "Phối trộn tỷ lệ vàng theo mẫu",
    flavor: "Thiết kế riêng biệt theo gu đồ uống và đặc trưng thương hiệu của bạn",
    liquor: "Tùy biến theo concept menu",
    description:
      "Đội ngũ R&D MAOCHA phân tích mẫu trà đối chuẩn, thử nghiệm và phối trộn dòng trà độc quyền dành riêng cho chuỗi của bạn, đảm bảo tính ổn định và bảo mật công thức tối đa.",
    applications: "Chuỗi nhượng quyền F&B, quán signature, đại lý độc quyền mã hàng.",
  },
];

// 5 Bước chế tác trà nguyên bản
const CRAFTING_PROCESS = [
  {
    step: "01",
    title: "Thu hái sớm",
    desc: "Chỉ chọn hái búp 1 tôm 2 lá khi sương sớm còn đọng trên đồi trà Bảo Lộc.",
    icon: "🌱",
  },
  {
    step: "02",
    title: "Làm héo tự nhiên",
    desc: "Phơi và đảo tơi để lá trà thoát ẩm đều, kích hoạt các enzym thơm nội sinh.",
    icon: "🍃",
  },
  {
    step: "03",
    title: "Vò & Lên men chuẩn",
    desc: "Kiểm soát chặt chẽ nhiệt độ và độ ẩm phòng ủ để định hình hương vị đặc trưng.",
    icon: "⏱️",
  },
  {
    step: "04",
    title: "Sao sấy & Đánh hương",
    desc: "Sấy nhiệt đa tầng giữ trọn dưỡng chất và khóa tầng hương sâu trong từng thớ trà.",
    icon: "🔥",
  },
  {
    step: "05",
    title: "Phối trộn & Kiểm định",
    desc: "Thử nếm cupping nghiêm ngặt, kiểm tra độ ẩm và đóng túi màng nhôm bảo quản.",
    icon: "✨",
  },
];

// Năng lực & Giá trị đồng hành
const SOLUTIONS = [
  {
    title: "Gia công theo mẫu yêu cầu",
    desc: "Khách hàng gửi mẫu trà mục tiêu, MAOCHA phân tích chỉ số, thử nghiệm pha chế và cân chỉnh hương vị đúng định hướng kinh doanh.",
    icon: "🧪",
  },
  {
    title: "Độc quyền mã hàng cho chuỗi",
    desc: "Cung cấp nền trà ổn định quanh năm cho chuỗi nhượng quyền, giúp chất lượng ly nước tại mọi chi nhánh luôn đồng nhất 100%.",
    icon: "🔒",
  },
  {
    title: "Tối ưu cost ly & Đào tạo pha chế",
    desc: "Tư vấn tỷ lệ ủ trà, nhiệt độ nước và định lượng tối ưu giúp hạ giá thành nguyên liệu mà vẫn giữ trọn hương vị thượng hạng.",
    icon: "📊",
  },
  {
    title: "Hồ sơ tự công bố & ATVSTP",
    desc: "Đầy đủ phiếu kiểm nghiệm chất lượng, chứng từ xuất xứ vùng trồng và giấy chứng nhận an toàn vệ sinh thực phẩm theo quy chuẩn.",
    icon: "📜",
  },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance fade-in for section elements
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#FAF7F2] text-[#1F2421]">
      {/* 1. HERO BANNER VỀ CHÚNG TÔI */}
      <section className="relative w-full overflow-hidden bg-white border-b border-[#EAE3D6] pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Background Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8B1E1E_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6">
            <Link href="/" className="hover:text-[#8B1E1E] transition">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-[#8B1E1E]">Giới thiệu & Kiến thức Trà</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#FAF7F2] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
                <span>🌿</span>
                <span>Về Chúng Tôi — MAOCHA Trà Nguyên Bản</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-zinc-950">
                Tinh hoa trà nguyên bản <br />
                từ vùng đất <span className="text-[#8B1E1E]">Bảo Lộc</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-2xl font-normal">
                MAOCHA là đơn vị chuyên cung cấp, thương mại và gia công nền trà chất lượng cao dành cho chuỗi đồ uống, quán cà phê và các thương hiệu F&B trên toàn quốc. Chúng tôi kiến tạo nền trà chuẩn vị, ổn định bền vững để bạn tự tin vận hành dài lâu.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B1E1E] px-7 py-3.5 text-sm font-bold text-white shadow-sm shadow-[#8B1E1E]/25 transition-all duration-300 hover:bg-[#5E0006] hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>Khám phá sản phẩm</span>
                  <span>→</span>
                </Link>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8B1E1E]/30 bg-white px-7 py-3.5 text-sm font-bold text-[#8B1E1E] shadow-2xs transition-all duration-300 hover:bg-[#FAF7F2] hover:border-[#8B1E1E]"
                >
                  <span>🍵 Nhận mẫu thử miễn phí</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden rounded-3xl border border-[#EAE3D6] shadow-xl shadow-black/5">
                <Image
                  src="/hero-clean-crisp.jpg"
                  alt="Đồi trà Bảo Lộc MAOCHA"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-[78%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-6 right-6 left-auto text-right text-white max-w-[260px]">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                    Vùng nguyên liệu Bảo Lộc
                  </span>
                  <p className="font-serif text-sm sm:text-base font-bold mt-0.5">
                    Độ cao 900m quanh năm sương phủ
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 rounded-2xl border border-[#D4AF37]/50 bg-white/95 backdrop-blur-md p-4 shadow-lg shadow-black/5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF7F2] text-2xl border border-[#EAE3D6]">
                  🏔️
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Thổ nhưỡng
                  </p>
                  <p className="font-serif text-sm font-bold text-[#8B1E1E]">
                    Bảo Lộc, Lâm Đồng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CÂU CHUYỆN NGUỒN GỐC BẢO LỘC (TERROIR STORY) */}
      <section className="py-16 sm:py-24 mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Visual Collage */}
          <div className="lg:col-span-6 relative about-reveal">
            <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden rounded-3xl border border-[#EAE3D6] shadow-lg">
              <Image
                src="/hero-flipped-clean.jpg"
                alt="Thu hoạch búp trà Bảo Lộc"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Origin Seal Overlay */}
            <div className="absolute top-6 right-6 flex flex-col items-center justify-center h-24 w-24 rounded-full border-2 border-[#D4AF37] bg-white/90 backdrop-blur-md shadow-md text-center">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-500">MAOCHA</span>
              <span className="font-serif text-base font-black text-[#8B1E1E] leading-none my-0.5">100%</span>
              <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-700">Trà Bảo Lộc</span>
            </div>
          </div>

          {/* Right: The Origin Story */}
          <div className="lg:col-span-6 space-y-6 about-reveal">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E1E]" />
              Nguồn cội hương vị
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
              Bảo Lộc – Thủ phủ của những búp trà hương sâu lắng
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed">
              Nằm trên cao nguyên Nam Tây Nguyên với độ cao từ 800 đến 1.000m so với mực nước biển, Bảo Lộc được thiên nhiên ưu đãi khí hậu mát mẻ quanh năm, sương mù bao phủ vào mỗi sớm ban mai và tầng đất đỏ bazan màu mỡ trù phú.
            </p>

            <p className="text-base text-zinc-600 leading-relaxed">
              Chính điều kiện thổ nhưỡng lý tưởng này đã tạo nên những búp trà xanh mướt, giàu nội chất, sở hữu hương thơm thanh khiết cùng vị ngọt hậu sâu sắc không thể nhầm lẫn. MAOCHA kế thừa và phát triển tinh hoa từ nguồn nguyên liệu này, chắt lọc thành những dòng trà chuẩn chỉ nhất cho ngành pha chế hiện đại.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EAE3D6]">
              <div className="rounded-2xl bg-white border border-[#EAE3D6] p-4 shadow-2xs">
                <p className="font-serif text-2xl font-bold text-[#8B1E1E]">800 - 1000m</p>
                <p className="text-xs text-zinc-500 mt-1">Độ cao cao nguyên lý tưởng</p>
              </div>
              <div className="rounded-2xl bg-white border border-[#EAE3D6] p-4 shadow-2xs">
                <p className="font-serif text-2xl font-bold text-[#8B1E1E]">100%</p>
                <p className="text-xs text-zinc-500 mt-1">Búp trà sạch, tự nhiên</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KIẾN THỨC TRÀ: 4 NHÓM DÒNG TRÀ CHỦ LỰC */}
      <section id="kien-thuc" className="py-16 sm:py-24 bg-white border-y border-[#EAE3D6]">
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 about-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#FAF7F2] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
              Kiến thức nền trà chuyên sâu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950">
              Nghệ thuật phân loại & ứng dụng trà nguyên bản
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Mỗi dòng trà tại MAOCHA mang một bản sắc hương vị riêng biệt, được tối ưu hóa chuẩn xác cho từng công thức pha chế đồ uống.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {TEA_KNOWLEDGE_CATEGORIES.map((tea) => (
              <div
                key={tea.id}
                className="about-reveal group rounded-3xl border border-[#EAE3D6] bg-[#FAF7F2] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#8B1E1E]/40 transition-all duration-300 flex flex-col"
              >
                {/* Image & Tag */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={tea.image}
                    alt={tea.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-[#8B1E1E] shadow-xs">
                      {tea.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">
                      {tea.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {tea.description}
                  </p>

                  <div className="space-y-2.5 rounded-2xl bg-white border border-[#EAE3D6] p-4 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-zinc-400 uppercase text-[10px]">Mức độ lên men:</span>
                      <span className="font-semibold text-zinc-800 text-right">{tea.fermentation}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2 border-t border-zinc-100 pt-2">
                      <span className="font-bold text-zinc-400 uppercase text-[10px]">Màu nước trà:</span>
                      <span className="font-semibold text-zinc-800 text-right">{tea.liquor}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2 border-t border-zinc-100 pt-2">
                      <span className="font-bold text-zinc-400 uppercase text-[10px]">Ứng dụng nổi bật:</span>
                      <span className="font-bold text-[#8B1E1E] text-right">{tea.applications}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E1E] hover:underline"
                    >
                      <span>Xem các sản phẩm cùng nhóm</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUY TRÌNH CHẾ TÁC 5 BƯỚC (5-STEP CRAFTING) */}
      <section className="py-16 sm:py-24 mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 about-reveal">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
            Quy trình R&D & Chế tác
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950">
            Hành trình từ búp trà sương đến ly nước chuẩn vị
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Sự kết hợp giữa bí quyết sao trà truyền thống Bảo Lộc và công nghệ kiểm soát nhiệt ẩm hiện đại.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CRAFTING_PROCESS.map((item) => (
            <div
              key={item.step}
              className="about-reveal rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-2xs hover:shadow-md hover:border-[#8B1E1E]/30 transition-all space-y-3 relative group"
            >
              <span className="font-serif text-3xl font-black text-[#D4AF37]/50 group-hover:text-[#8B1E1E]/30 transition">
                {item.step}
              </span>
              <div className="text-2xl">{item.icon}</div>
              <h4 className="font-serif text-lg font-bold text-zinc-900">
                {item.title}
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NĂNG LỰC GIA CÔNG & GIẢI PHÁP ĐỒNG HÀNH */}
      <section className="py-16 sm:py-24 bg-[#F4ECE1]/40 border-t border-[#EAE3D6]">
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Header & Intro */}
            <div className="lg:col-span-5 space-y-5 about-reveal">
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#D4AF37]/50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
                Giải pháp cho doanh nghiệp F&B
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                Đồng hành kiến tạo bản sắc cho chuỗi của bạn
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Chúng tôi không chỉ bán nguyên liệu trà, mà cung cấp giải pháp toàn diện từ mẫu thử độc quyền, tư vấn quy trình pha chế chuẩn hóa đến đầy đủ hồ sơ kiểm nghiệm vệ sinh an toàn thực phẩm.
              </p>
              <div className="pt-2">
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8B1E1E] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#5E0006] transition"
                >
                  <span>Liên hệ trao đổi mẫu riêng</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Right: 4 Solutions */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SOLUTIONS.map((sol) => (
                <div
                  key={sol.title}
                  className="about-reveal rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-2xs hover:shadow-md transition space-y-3"
                >
                  <span className="text-2xl inline-block">{sol.icon}</span>
                  <h4 className="font-serif text-base font-bold text-zinc-900">
                    {sol.title}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {sol.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER CUỐI TRANG */}
      <section className="py-16 sm:py-20 mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#8B1E1E] p-8 sm:p-14 text-white shadow-xl shadow-[#8B1E1E]/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.25),transparent_60%)]" />
          
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-bold tracking-wider uppercase text-amber-200">
              Trải nghiệm thực tế
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Nhận bộ mẫu thử nền trà Bảo Lộc ngay hôm nay
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              MAOCHA sẵn sàng gửi bộ mẫu thử tận nơi miễn phí để bạn pha thử và cảm nhận sự khác biệt về độ dày vị và hương thơm nguyên bản.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-bold text-[#8B1E1E] shadow-sm hover:bg-[#FAF7F2] transition hover:-translate-y-0.5"
              >
                <span>🍵 Nhận mẫu thử qua Zalo</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-7 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition"
              >
                <span>Xem thông tin liên hệ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

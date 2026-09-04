"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { DEFAULT_CONTACT_CONFIG, type ContactConfig } from "@/types/contact";

interface ContactClientProps {
  contact?: ContactConfig;
}

export default function ContactClient({
  contact = DEFAULT_CONTACT_CONFIG,
}: ContactClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    teaType: "hong-tra",
    businessType: "quan-moi",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const zaloMsg = `Xin chào MAOCHA, tôi là ${formData.name} (${formData.phone}), mô hình: ${formData.businessType}, quan tâm dòng trà: ${formData.teaType}. Lời nhắn: ${formData.message}`;
    window.open(`https://zalo.me/${contact.phone}?text=${encodeURIComponent(zaloMsg)}`, "_blank");
  };

  return (
    <div ref={containerRef} className="w-full bg-[#FAF7F2] text-[#1F2421]">
      {/* 1. HERO BANNER */}
      <section className="relative w-full overflow-hidden bg-white border-b border-[#EAE3D6] pt-10 pb-16 sm:pt-14 sm:pb-24">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8B1E1E_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6">
            <Link href="/" className="hover:text-[#8B1E1E] transition">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-[#8B1E1E]">Liên hệ</span>
          </div>

          <div className="max-w-3xl space-y-4 contact-reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#FAF7F2] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
              <span>🌿</span>
              <span>Kết Nối Với MAOCHA Trà Nguyên Bản</span>
            </div>

            <h1 className=" text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.15]">
              Liên hệ hợp tác & <br />
              nhận <span className="text-[#8B1E1E]">mẫu thử miễn phí</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
              Đội ngũ chuyên gia MAOCHA luôn sẵn sàng lắng nghe nhu cầu của bạn, phân tích hương vị đối chuẩn và gửi bộ mẫu thử nền trà Bảo Lộc tận nơi hoàn toàn miễn phí.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & CONSULTATION FORM */}
      <section className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Cards & Facilities Info */}
          <div className="lg:col-span-6 space-y-6 contact-reveal">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
                Kênh kết nối trực tiếp
              </span>
              <h2 className=" text-2xl sm:text-3xl font-bold text-zinc-950 mt-1">
                Trao đổi nhanh cùng chuyên viên
              </h2>
            </div>

            {/* Zalo / Hotline Card (Primary) */}
            <div className="rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-white via-white to-[#FAF7F2] p-6 shadow-md shadow-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8B1E1E] text-white text-xl">
                    💬
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Tư vấn mẫu thử 24/7
                    </span>
                    <h3 className=" text-lg font-bold text-zinc-900">
                      Hotline & Zalo OA
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-[#2D5A27]/10 px-3 py-1 text-[11px] font-bold text-[#2D5A27]">
                  Phản hồi ngay
                </span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Nhắn tin trực tiếp qua Zalo để gửi mẫu đối chuẩn, nhận báo giá sỉ theo lô và đăng ký nhận mẫu thử pha chế miễn phí.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={contact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8B1E1E] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5E0006] transition"
                >
                  <span>Chat Zalo: {contact.phoneDisplay || contact.phone}</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Social Media & Email Cards (Facebook, TikTok, Email) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Facebook */}
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-[#EAE3D6] bg-white p-4 sm:p-5 shadow-2xs hover:border-[#1877F2]/40 hover:shadow-md transition space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] text-white group-hover:scale-105 transition mb-2 shadow-xs">
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <h4 className=" text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#1877F2]">
                    Fanpage Facebook
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                    Cập nhật kiến thức & tin tức
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1877F2] pt-1">
                  <span>Fanpage</span>
                  <span>→</span>
                </span>
              </a>

              {/* TikTok */}
              <a
                href={contact.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-[#EAE3D6] bg-white p-4 sm:p-5 shadow-2xs hover:border-black/40 hover:shadow-md transition space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white group-hover:scale-105 transition mb-2 shadow-xs">
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                    </svg>
                  </div>
                  <h4 className=" text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-black">
                    Kênh TikTok
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                    Video pha chế & review trà
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-900 pt-1 group-hover:text-black">
                  <span>Xem TikTok</span>
                  <span>→</span>
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="group rounded-3xl border border-[#EAE3D6] bg-white p-4 sm:p-5 shadow-2xs hover:border-[#8B1E1E]/40 hover:shadow-md transition space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8B1E1E] text-white group-hover:scale-105 transition mb-2 shadow-xs">
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <h4 className=" text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#8B1E1E]">
                    Email Hợp tác
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5 truncate">
                    {contact.email}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B1E1E] pt-1">
                  <span>Gửi thư</span>
                  <span>→</span>
                </span>
              </a>
            </div>

            {/* Facility Location Details */}
            <div className="rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-base">📍</span>
                <h4 className=" text-sm font-bold text-zinc-900">
                  Địa chỉ xưởng & Vùng nguyên liệu
                </h4>
              </div>
              <div className="space-y-3 text-xs text-zinc-600">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-zinc-800 min-w-24">• Xưởng sản xuất:</span>
                  <span>{contact.factoryAddress}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-zinc-800 min-w-24">• Kho phân phối:</span>
                  <span>{contact.warehouseAddress}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-zinc-800 min-w-24">• Giờ làm việc:</span>
                  <span>{contact.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-6 contact-reveal">
            <div className="rounded-3xl border border-[#EAE3D6] bg-white p-6 sm:p-10 shadow-lg shadow-black/5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
                  Gửi yêu cầu trực tuyến
                </span>
                <h3 className=" text-2xl font-bold text-zinc-950 mt-1">
                  Đăng ký nhận mẫu thử & Báo giá
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Điền thông tin bên dưới, nhân viên MAOCHA sẽ liên hệ xác nhận và gửi mẫu thử miễn phí đến bạn.
                </p>
              </div>

              {isSubmitted ? (
                <div className="rounded-2xl border border-[#2D5A27]/30 bg-[#2D5A27]/5 p-6 text-center space-y-3">
                  <div className="text-3xl">🎉</div>
                  <h4 className=" text-lg font-bold text-[#2D5A27]">
                    Đã gửi yêu cầu thành công!
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Cảm ơn bạn. MAOCHA đã tiếp nhận thông tin và đang mở cổng chat Zalo để xác nhận địa chỉ gửi mẫu thử.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 text-xs font-bold text-[#8B1E1E] hover:underline"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1.5">
                      Họ và tên / Tên thương hiệu <span className="text-[#8B1E1E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Anh Minh – Chuỗi Trà Sữa Bảo Lộc"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-2xl border border-[#EAE3D6] bg-[#FAF7F2] px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#8B1E1E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 transition"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1.5">
                      Số điện thoại / Zalo nhận mẫu <span className="text-[#8B1E1E]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại hoặc Zalo liên hệ"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-2xl border border-[#EAE3D6] bg-[#FAF7F2] px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#8B1E1E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-zinc-700 mb-1.5">
                        Dòng trà quan tâm
                      </label>
                      <select
                        value={formData.teaType}
                        onChange={(e) => setFormData({ ...formData, teaType: e.target.value })}
                        className="w-full rounded-2xl border border-[#EAE3D6] bg-[#FAF7F2] px-4 py-3 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 transition"
                      >
                        <option value="hong-tra">Hồng trà nền đậm vị</option>
                        <option value="luc-tra">Lục trà thanh hương</option>
                        <option value="o-long">Trà Ô Long Bảo Lộc</option>
                        <option value="gia-cong">Gia công mã riêng theo mẫu</option>
                        <option value="tat-ca">Bộ thử tất cả các dòng</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-1.5">
                        Mô hình kinh doanh
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full rounded-2xl border border-[#EAE3D6] bg-[#FAF7F2] px-4 py-3 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 transition"
                      >
                        <option value="quan-moi">Chuẩn bị mở quán mới</option>
                        <option value="dang-kinh-doanh">Quán trà sữa / Cà phê đang vận hành</option>
                        <option value="chuoi-nhuong-quyen">Chuỗi F&B / Nhượng quyền</option>
                        <option value="dai-ly">Đại lý phân phối nguyên liệu</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1.5">
                      Địa chỉ nhận mẫu thử & Ghi chú thêm
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Nhập địa chỉ nhận bưu phẩm hoặc yêu cầu gu vị cụ thể..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-2xl border border-[#EAE3D6] bg-[#FAF7F2] px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#8B1E1E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8B1E1E] py-3.5 text-xs font-bold text-white shadow-sm shadow-[#8B1E1E]/25 hover:bg-[#5E0006] transition hover:-translate-y-0.5"
                  >
                    <span>🍵 Gửi đăng ký & Nhận mẫu thử qua Zalo</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAM KẾT DỊCH VỤ 3 TRỤ CỘT */}
      <section className="py-12 pb-20 bg-white border-t border-[#EAE3D6]">
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-5 rounded-3xl border border-[#EAE3D6] bg-[#FAF7F2]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8B1E1E] text-white text-xl">
                🚀
              </div>
              <div>
                <h4 className=" text-sm font-bold text-zinc-900">
                  Giao mẫu thử 24 - 48h
                </h4>
                <p className="text-xs text-zinc-600 mt-1">
                  Đóng gói cẩn thận, bảo quản hương tươi mới và gửi chuyển phát nhanh toàn quốc.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-3xl border border-[#EAE3D6] bg-[#FAF7F2]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8B1E1E] text-white text-xl">
                📋
              </div>
              <div>
                <h4 className=" text-sm font-bold text-zinc-900">
                  Đầy đủ công thức cốt
                </h4>
                <p className="text-xs text-zinc-600 mt-1">
                  Kèm hướng dẫn nhiệt độ nước, thời gian ủ và tỷ lệ pha chuẩn cho từng món.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-3xl border border-[#EAE3D6] bg-[#FAF7F2]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8B1E1E] text-white text-xl">
                🛡️
              </div>
              <div>
                <h4 className=" text-sm font-bold text-zinc-900">
                  Bảo mật công thức
                </h4>
                <p className="text-xs text-zinc-600 mt-1">
                  Cam kết bảo vệ độc quyền mã hàng cho các chuỗi nhượng quyền và đối tác lớn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

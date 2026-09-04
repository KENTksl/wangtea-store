"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import type { ContactConfig } from "@/types/contact";

interface AdminContactSettingsClientProps {
  initialConfig: ContactConfig;
  sessionUser?: string;
}

export default function AdminContactSettingsClient({
  initialConfig,
  sessionUser = "Quản trị viên",
}: AdminContactSettingsClientProps) {
  const { signOut } = useAuth();
  const [config, setConfig] = useState<ContactConfig>(initialConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleChange = (field: keyof ContactConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Lưu thất bại");
      }

      setConfig(data.contact);
      showToast("Đã lưu thông tin liên hệ thành công!");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Lỗi khi lưu", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Bạn có chắc chắn muốn khôi phục về thông tin liên hệ mặc định của MAOCHA?")) {
      return;
    }

    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Khôi phục thất bại");
      }

      setConfig(data.contact);
      showToast("Đã khôi phục cài đặt gốc thành công!");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Lỗi khi khôi phục", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-28 right-6 z-50 rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-xl transition-all duration-300 ${message.type === "success"
              ? "bg-[#2D5A27] text-white border border-[#3E7B35]"
              : "bg-[#8B1E1E] text-white border border-[#A62424]"
            }`}
        >
          {message.text}
        </div>
      )}

      {/* ADMIN NAVIGATION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
            Hệ thống quản trị MAOCHA
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Cấu hình Thông tin Liên hệ & Mạng xã hội
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Đăng nhập: <strong>{sessionUser}</strong> • Chỉnh sửa hotline, link Zalo, Facebook, email và địa chỉ trên toàn website
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
          >
            Về trang chủ
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* ADMIN SUBNAV TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4">
        <Link
          href="/admin/products"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
        >
          📦 Quản lý Sản phẩm
        </Link>
        <Link
          href="/admin/hero-banner"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
        >
          ✨ Hero Banner trang chủ
        </Link>
        <span className="rounded-xl bg-[#8B1E1E] px-4 py-2 text-xs font-bold text-white shadow-xs">
          📞 Thông tin liên hệ & Mạng xã hội
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Hotline & Zalo */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
              <span>📱</span>
              <span>Hotline & Kênh Zalo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Số điện thoại Hotline
                </label>
                <input
                  type="text"
                  value={config.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Ví dụ: 0944601732"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
                />
                <p className="text-[10px] text-zinc-400 mt-1">Dùng cho tel: và cú pháp hệ thống</p>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Chữ số hiển thị Hotline
                </label>
                <input
                  type="text"
                  value={config.phoneDisplay}
                  onChange={(e) => handleChange("phoneDisplay", e.target.value)}
                  placeholder="Ví dụ: 0944 601 732"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
                />
                <p className="text-[10px] text-zinc-400 mt-1">Hiển thị đẹp trên giao diện</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Đường dẫn Zalo (Zalo OA hoặc Zalo cá nhân)
              </label>
              <input
                type="text"
                value={config.zaloUrl}
                onChange={(e) => handleChange("zaloUrl", e.target.value)}
                placeholder="Ví dụ: https://zalo.me/0944601732"
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
              />
              <p className="text-[10px] text-zinc-400 mt-1">
                Tất cả các nút &quot;Nhận mẫu thử&quot; trên toàn website sẽ mở link này
              </p>
            </div>
          </div>

          {/* Section 2: Facebook & Email */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
              <span>🌐</span>
              <span>Mạng xã hội (Facebook, TikTok) & Email</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="flex items-center gap-1.5 font-semibold text-zinc-700 mb-1">
                  <svg className="h-3.5 w-3.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Đường dẫn Fanpage Facebook</span>
                </label>
                <input
                  type="text"
                  value={config.facebookUrl}
                  onChange={(e) => handleChange("facebookUrl", e.target.value)}
                  placeholder="Ví dụ: https://www.facebook.com/..."
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 font-semibold text-zinc-700 mb-1">
                  <svg className="h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                  <span>Đường dẫn Kênh TikTok</span>
                </label>
                <input
                  type="text"
                  value={config.tiktokUrl}
                  onChange={(e) => handleChange("tiktokUrl", e.target.value)}
                  placeholder="Ví dụ: https://www.tiktok.com/@co_be_ban_tra?is_from_webapp=1&sender_device=pc"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Địa chỉ Email nhận liên hệ
                </label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Ví dụ: congtytnhhwangtea@gmail.com"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Addresses & Working Hours */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
              <span>📍</span>
              <span>Địa chỉ & Giờ làm việc</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Địa chỉ Xưởng sản xuất Bảo Lộc
                </label>
                <input
                  type="text"
                  value={config.factoryAddress}
                  onChange={(e) => handleChange("factoryAddress", e.target.value)}
                  placeholder="Ví dụ: Cao nguyên Bảo Lộc, Tỉnh Lâm Đồng"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Địa chỉ Kho phân phối / Văn phòng
                </label>
                <input
                  type="text"
                  value={config.warehouseAddress}
                  onChange={(e) => handleChange("warehouseAddress", e.target.value)}
                  placeholder="Ví dụ: TP. Hồ Chí Minh (Giao hàng toàn quốc 24 - 48h)"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Khung giờ làm việc / Hỗ trợ
                </label>
                <input
                  type="text"
                  value={config.workingHours}
                  onChange={(e) => handleChange("workingHours", e.target.value)}
                  placeholder="Ví dụ: Thứ 2 – Thứ 7 (08:00 – 18:00)"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-none focus:ring-1 focus:ring-[#8B1E1E]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
            >
              Khôi phục mặc định
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-xl bg-[#8B1E1E] px-7 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5E0006] transition"
            >
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>

        {/* Right Column: Live Preview Card */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Xem trước hiển thị thực tế
            </span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              Live Preview
            </span>
          </div>

          {/* Preview Contact Card */}
          <div className="rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-white via-white to-[#FAF7F2] p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8B1E1E] text-white text-lg">
                  💬
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Hotline & Zalo OA
                  </span>
                  <h4 className="text-base font-bold text-zinc-900">
                    {config.phoneDisplay || "0944 601 732"}
                  </h4>
                </div>
              </div>
              <span className="rounded-full bg-[#2D5A27]/10 px-2.5 py-1 text-[10px] font-bold text-[#2D5A27]">
                Online
              </span>
            </div>

            <div className="rounded-2xl bg-white border border-[#EAE3D6] p-3 text-xs space-y-2">
              <p className="flex items-center gap-1.5 text-[11px] text-zinc-600 truncate">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-[#0068FF] text-[8px] font-black text-white">Z</span>
                <strong>Zalo:</strong> <span className="truncate">{config.zaloUrl}</span>
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-zinc-600 truncate">
                <svg className="h-4 w-4 text-[#1877F2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <strong>Facebook:</strong> <span className="truncate">{config.facebookUrl}</span>
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-zinc-600 truncate">
                <svg className="h-4 w-4 text-black shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
                <strong>TikTok:</strong> <span className="truncate">{config.tiktokUrl}</span>
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-zinc-600 truncate">
                <span className="text-zinc-500">✉️</span>
                <strong>Email:</strong> <span className="truncate">{config.email}</span>
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6] p-3 text-[11px] space-y-1 text-zinc-600">
              <p>📍 <strong>Xưởng:</strong> {config.factoryAddress}</p>
              <p>📦 <strong>Kho:</strong> {config.warehouseAddress}</p>
              <p>⏰ <strong>Giờ làm việc:</strong> {config.workingHours}</p>
            </div>

            <a
              href={config.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8B1E1E] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5E0006] transition"
            >
              <span>Thử mở link Zalo</span>
              <span>↗</span>
            </a>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 leading-relaxed">
            💡 Khi bạn nhấn <strong>&quot;Lưu thay đổi&quot;</strong>, toàn bộ nút Zalo trên Header, các banner trang chủ, trang sản phẩm, trang liên hệ và Footer sẽ được cập nhật đồng bộ ngay lập tức.
          </div>
        </div>
      </div>
    </div>
  );
}

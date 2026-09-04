"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { HeroBannerConfig } from "@/types/hero-banner";
import HeroBanner from "@/app/components/hero/HeroBanner";

interface AdminHeroBannerClientProps {
  initialConfig: HeroBannerConfig;
  sessionUser?: string;
}

const GRADIENT_PRESETS = [
  {
    name: "Chuẩn thiết kế (Mặc định)",
    value:
      "linear-gradient(90deg, rgba(255,255,252,0.98) 0%, rgba(255,255,252,0.88) 30%, rgba(255,255,252,0.25) 58%, rgba(255,255,255,0) 100%)",
  },
  {
    name: "Trong trẻo dịu nhẹ",
    value:
      "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 80%)",
  },
  {
    name: "Ấm áp ánh ban mai",
    value:
      "linear-gradient(90deg, rgba(250,246,238,0.97) 0%, rgba(250,246,238,0.85) 35%, rgba(250,246,238,0.2) 65%, rgba(255,255,255,0) 100%)",
  },
];

export default function AdminHeroBannerClient({
  initialConfig,
  sessionUser = "Quản trị viên",
}: AdminHeroBannerClientProps) {
  const [config, setConfig] = useState<HeroBannerConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleFieldChange = <K extends keyof HeroBannerConfig>(key: K, value: HeroBannerConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleOriginTextChange = (field: keyof HeroBannerConfig["originBadgeText"], val: string) => {
    setConfig((prev) => ({
      ...prev,
      originBadgeText: {
        ...prev.originBadgeText,
        [field]: val,
      },
    }));
  };

  const handleHighlightChange = (index: number, field: "icon" | "title" | "subtitle", val: string) => {
    setConfig((prev) => {
      const nextHighlights = [...prev.highlights];
      nextHighlights[index] = { ...nextHighlights[index], [field]: val };
      return { ...prev, highlights: nextHighlights };
    });
  };

  // Upload image handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "desktop" | "mobile") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Dung lượng ảnh vượt quá 5MB", "error");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Tải ảnh thất bại");
      }

      if (target === "desktop") {
        handleFieldChange("desktopImage", data.url);
      } else {
        handleFieldChange("mobileImage", data.url);
      }
      showToast(`Tải lên ảnh ${target === "desktop" ? "desktop" : "mobile"} thành công!`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Có lỗi xảy ra khi tải ảnh", "error");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Save changes
  const handleSave = async (status: "published" | "draft") => {
    setIsSaving(true);
    try {
      const payload = {
        ...config,
        status,
        updatedBy: sessionUser,
      };

      const res = await fetch("/api/hero-banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Lưu thất bại");
      }

      setConfig(data.banner);
      showToast(status === "published" ? "Xuất bản Hero Banner thành công!" : "Lưu bản nháp thành công!");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Có lỗi khi lưu", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const handleReset = async () => {
    if (!confirm("Bạn có chắc chắn muốn khôi phục toàn bộ nội dung và ảnh về mặc định ban đầu?")) {
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/hero-banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Khôi phục thất bại");
      }

      setConfig(data.banner);
      showToast("Đã khôi phục về cài đặt gốc thành công!");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Lỗi khi khôi phục", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-28 right-6 z-50 rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-xl transition-all duration-300 ${
            message.type === "success"
              ? "bg-[#2D5A27] text-white border border-[#3E7B35]"
              : "bg-[#8B1E1E] text-white border border-[#A62424]"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* ADMIN SUB-NAVIGATION TABS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
            Hệ thống quản trị MAOCHA
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">
            Quản trị Giao diện Hero Banner
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/products"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            📦 Quản lý Sản phẩm
          </Link>
          <span className="rounded-xl bg-[#8B1E1E] px-4 py-2 text-xs font-bold text-white shadow-xs">
            ✨ Hero Banner trang chủ
          </span>
          <Link
            href="/admin/contact"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            📞 Thông tin liên hệ
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 rounded-xl border border-[#DCE8DC] bg-[#F0F6F0] px-4 py-2 text-xs font-bold text-[#2D5A27] hover:bg-[#E2EFE2]"
          >
            <span>Xem trang chủ</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* EDIT / PREVIEW SWITCHER */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-zinc-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-colors ${
              activeTab === "edit"
                ? "bg-[#8B1E1E] text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            ✏️ Chỉnh sửa nội dung & ảnh
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-colors ${
              activeTab === "preview"
                ? "bg-[#8B1E1E] text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            👁️ Xem trước (Live Preview)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 hidden sm:inline">
            Cập nhật gần nhất:{" "}
            <strong className="text-zinc-800">
              {new Date(config.updatedAt).toLocaleTimeString("vi-VN")}{" "}
              {new Date(config.updatedAt).toLocaleDateString("vi-VN")}
            </strong>
          </span>
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="text-xs font-semibold text-zinc-500 hover:text-red-600 underline"
          >
            Khôi phục mặc định
          </button>
        </div>
      </div>

      {/* LIVE PREVIEW TAB */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
            <span>
              ℹ️ Đây là chế độ xem trước trực tiếp theo cấu hình hiện tại của bạn. Nhấn <strong>&quot;Xuất bản ngay&quot;</strong> để áp dụng lên trang chủ website.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={isSaving}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 font-bold text-zinc-800 hover:bg-zinc-50"
              >
                Lưu bản nháp
              </button>
              <button
                type="button"
                onClick={() => handleSave("published")}
                disabled={isSaving}
                className="rounded-lg bg-[#8B1E1E] px-4 py-1.5 font-bold text-white shadow-xs hover:bg-[#5E0006]"
              >
                {isSaving ? "Đang lưu..." : "Xuất bản ngay"}
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-zinc-300 shadow-xl bg-[#FAF7F2]">
            <HeroBanner config={config} isPreview={true} />
          </div>
        </div>
      )}

      {/* EDIT FORM TAB */}
      {activeTab === "edit" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: FORM CONTROLS */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. STATUS & VISIBILITY */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-zinc-900 border-b pb-2">
                1. Trạng thái hiển thị
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.isEnabled}
                    onChange={(e) => handleFieldChange("isEnabled", e.target.checked)}
                    className="h-4 w-4 rounded text-[#8B1E1E] focus:ring-[#8B1E1E]"
                  />
                  <span className="text-sm font-semibold text-zinc-800">
                    Bật hiển thị Hero Banner trên trang chủ
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-600">Trạng thái:</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      config.status === "published"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {config.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. BACKGROUND IMAGES (DESKTOP & MOBILE) */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-5">
              <h3 className="font-bold text-base text-zinc-900 border-b pb-2 flex items-center justify-between">
                <span>2. Quản lý Ảnh nền (Desktop & Mobile)</span>
                <span className="text-xs font-normal text-zinc-500">Hỗ trợ JPG, PNG, WebP &lt; 5MB</span>
              </h3>

              {/* Desktop Image */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Ảnh Desktop (Khuyến nghị 1920 × 900px)
                  </label>
                  <label className="cursor-pointer text-xs font-bold text-[#8B1E1E] hover:underline">
                    <span>{isUploading ? "Đang tải ảnh..." : "+ Tải ảnh mới từ máy tính"}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => handleFileUpload(e, "desktop")}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={config.desktopImage}
                  onChange={(e) => handleFieldChange("desktopImage", e.target.value)}
                  placeholder="/hero-clean-crisp.jpg hoặc đường dẫn URL"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-hidden focus:ring-1 focus:ring-[#8B1E1E]"
                />

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">Căn vị trí ảnh (Position):</span>
                  <select
                    value={config.desktopImagePosition}
                    onChange={(e) => handleFieldChange("desktopImagePosition", e.target.value)}
                    className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs text-zinc-800"
                  >
                    <option value="78% center">78% center (Ưu tiên cô gái bên phải)</option>
                    <option value="center right">center right</option>
                    <option value="center center">center center</option>
                    <option value="center left">center left</option>
                  </select>
                </div>
              </div>

              {/* Mobile Image */}
              <div className="space-y-3 pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Ảnh Mobile (Khuyến nghị 900 × 1200px)
                  </label>
                  <label className="cursor-pointer text-xs font-bold text-[#8B1E1E] hover:underline">
                    <span>{isUploading ? "Đang tải..." : "+ Tải ảnh mobile"}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => handleFileUpload(e, "mobile")}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={config.mobileImage}
                  onChange={(e) => handleFieldChange("mobileImage", e.target.value)}
                  placeholder="Để trống sẽ tự động dùng ảnh Desktop"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#8B1E1E] focus:outline-hidden focus:ring-1 focus:ring-[#8B1E1E]"
                />
              </div>

              {/* Alt Text */}
              <div className="space-y-1 pt-2">
                <label className="text-xs font-semibold text-zinc-600">Văn bản mô tả ảnh (ALT SEO):</label>
                <input
                  type="text"
                  value={config.imageAlt}
                  onChange={(e) => handleFieldChange("imageAlt", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900"
                />
              </div>
            </div>

            {/* 3. HERO CONTENT & TEXT */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-zinc-900 border-b pb-2">
                3. Tiêu đề & Nội dung
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Nhãn nhỏ (Tagline):</label>
                <input
                  type="text"
                  value={config.badgeLabel}
                  onChange={(e) => handleFieldChange("badgeLabel", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs font-bold text-[#8B1E1E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">
                  Tiêu đề chính (Xuống dòng bằng phím Enter):
                </label>
                <textarea
                  rows={3}
                  value={config.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 p-3 font-serif text-base text-zinc-900 focus:border-[#8B1E1E] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">
                  Từ hoặc cụm từ cần bôi đỏ burgundy:
                </label>
                <input
                  type="text"
                  value={config.highlightWord}
                  onChange={(e) => handleFieldChange("highlightWord", e.target.value)}
                  placeholder="Ví dụ: Bảo Lộc"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs font-bold text-[#8B1E1E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Đoạn mô tả:</label>
                <textarea
                  rows={2}
                  value={config.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 p-3 text-xs text-zinc-800"
                />
              </div>
            </div>

            {/* 4. CTA BUTTONS */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-zinc-900 border-b pb-2">
                4. Nút bấm hành động (CTA)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 p-3 bg-red-50/50 rounded-xl border border-red-100">
                  <span className="text-xs font-bold text-[#8B1E1E]">Nút chính (Đỏ)</span>
                  <input
                    type="text"
                    value={config.primaryCtaText}
                    onChange={(e) => handleFieldChange("primaryCtaText", e.target.value)}
                    placeholder="Tên nút"
                    className="w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={config.primaryCtaLink}
                    onChange={(e) => handleFieldChange("primaryCtaLink", e.target.value)}
                    placeholder="Đường dẫn link (/products)"
                    className="w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-700"
                  />
                </div>

                <div className="space-y-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-xs font-bold text-zinc-800">Nút phụ (Trắng / Xanh kem)</span>
                  <input
                    type="text"
                    value={config.secondaryCtaText}
                    onChange={(e) => handleFieldChange("secondaryCtaText", e.target.value)}
                    placeholder="Tên nút"
                    className="w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={config.secondaryCtaLink}
                    onChange={(e) => handleFieldChange("secondaryCtaLink", e.target.value)}
                    placeholder="Đường dẫn link (Zalo URL)"
                    className="w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-700"
                  />
                </div>
              </div>
            </div>

            {/* 5. FLOATING BENEFITS BAR */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-zinc-900 border-b pb-2">
                5. Thanh 3 cam kết lợi ích
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {config.highlights.map((item, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleHighlightChange(idx, "icon", e.target.value)}
                        className="w-10 rounded-md border text-center py-1 text-sm"
                      />
                      <span className="text-[11px] font-bold text-zinc-500">Mục #{idx + 1}</span>
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleHighlightChange(idx, "title", e.target.value)}
                      placeholder="Tiêu đề"
                      className="w-full rounded-md border px-2 py-1 text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => handleHighlightChange(idx, "subtitle", e.target.value)}
                      placeholder="Mô tả phụ"
                      className="w-full rounded-md border px-2 py-1 text-[11px] text-zinc-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 6. ORIGIN SEAL BADGE */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-base text-zinc-900">
                  6. Huy hiệu nguồn gốc Bảo Lộc
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showOriginBadge}
                    onChange={(e) => handleFieldChange("showOriginBadge", e.target.checked)}
                    className="h-4 w-4 rounded text-[#8B1E1E]"
                  />
                  <span className="text-xs font-bold text-zinc-700">Hiển thị huy hiệu</span>
                </label>
              </div>

              {config.showOriginBadge && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[10px] text-zinc-500">Thương hiệu</span>
                    <input
                      type="text"
                      value={config.originBadgeText.brand}
                      onChange={(e) => handleOriginTextChange("brand", e.target.value)}
                      className="w-full rounded-lg border px-2 py-1.5 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500">Giá trị</span>
                    <input
                      type="text"
                      value={config.originBadgeText.value}
                      onChange={(e) => handleOriginTextChange("value", e.target.value)}
                      className="w-full rounded-lg border px-2 py-1.5 text-xs font-bold text-[#8B1E1E]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500">Dòng 1</span>
                    <input
                      type="text"
                      value={config.originBadgeText.sub1}
                      onChange={(e) => handleOriginTextChange("sub1", e.target.value)}
                      className="w-full rounded-lg border px-2 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500">Dòng 2</span>
                    <input
                      type="text"
                      value={config.originBadgeText.sub2}
                      onChange={(e) => handleOriginTextChange("sub2", e.target.value)}
                      className="w-full rounded-lg border px-2 py-1.5 text-xs font-bold text-[#8B1E1E]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 7. GRADIENT OVERLAY */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-zinc-900 border-b pb-2">
                7. Lớp phủ Gradient làm dịu nền
              </h3>

              <div className="flex flex-wrap gap-2">
                {GRADIENT_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleFieldChange("gradientOverlay", p.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                      config.gradientOverlay === p.value
                        ? "bg-[#FAF2EE] border-[#8B1E1E] text-[#8B1E1E]"
                        : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                value={config.gradientOverlay}
                onChange={(e) => handleFieldChange("gradientOverlay", e.target.value)}
                className="w-full rounded-xl border border-zinc-200 p-2.5 font-mono text-xs text-zinc-700"
              />
            </div>
          </div>

          {/* RIGHT 1 COLUMN: PREVIEW CARD & ACTIONS */}
          <div className="space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* CURRENT IMAGE THUMBNAIL */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Ảnh xem trước hiện tại
                </h4>
                <div className="relative h-44 w-full overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200">
                  <Image
                    src={config.desktopImage || "/hero-clean-crisp.jpg"}
                    alt="Xem trước"
                    fill
                    sizes="400px"
                    className="object-cover"
                    style={{ objectPosition: config.desktopImagePosition || "78% center" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: config.gradientOverlay }}
                  />
                  <div className="absolute bottom-2 left-2 z-10 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-white">
                    Desktop Position: {config.desktopImagePosition}
                  </div>
                </div>
              </div>

              {/* SAVE / PUBLISH ACTIONS */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Thao tác lưu dữ liệu
                </h4>

                <button
                  type="button"
                  onClick={() => handleSave("published")}
                  disabled={isSaving}
                  className="w-full rounded-xl bg-[#8B1E1E] py-3 text-sm font-bold text-white shadow-md shadow-[#8B1E1E]/20 transition-all hover:bg-[#5E0006] hover:shadow-lg disabled:opacity-50"
                >
                  {isSaving ? "Đang lưu hệ thống..." : "🚀 Xuất bản ngay (Publish)"}
                </button>

                <button
                  type="button"
                  onClick={() => handleSave("draft")}
                  disabled={isSaving}
                  className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 text-xs font-bold text-zinc-800 transition-all hover:bg-zinc-50 disabled:opacity-50"
                >
                  💾 Lưu bản nháp (Save Draft)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className="w-full rounded-xl border border-[#DCE8DC] bg-[#F0F6F0] py-2.5 text-xs font-bold text-[#2D5A27] transition-all hover:bg-[#E2EFE2]"
                >
                  👁️ Xem trước toàn màn hình
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

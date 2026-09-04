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

export default function AdminHeroBannerClient({
  initialConfig,
  sessionUser = "Quản trị viên",
}: AdminHeroBannerClientProps) {
  const [config, setConfig] = useState<HeroBannerConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<"desktop" | "mobile" | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3500);
  };

  const handleFieldChange = <K extends keyof HeroBannerConfig>(key: K, value: HeroBannerConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleHighlightChange = (index: number, field: "icon" | "title" | "subtitle", val: string) => {
    setConfig((prev) => {
      const nextHighlights = [...prev.highlights];
      nextHighlights[index] = { ...nextHighlights[index], [field]: val };
      return { ...prev, highlights: nextHighlights };
    });
  };

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Không thể đọc tệp hình ảnh"));
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });
}

async function fileToOptimizedDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Tệp được chọn không phải là hình ảnh");
  }

  const maxEdge = 1920;
  const quality = 0.82;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const targetWidth = Math.max(1, Math.round(bitmap.width * scale));
    const targetHeight = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close?.();
      return readFileAsDataUrl(file);
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
    bitmap.close?.();

    try {
      const webp = canvas.toDataURL("image/webp", quality);
      if (webp.startsWith("data:image/")) return webp;
    } catch {}

    const jpeg = canvas.toDataURL("image/jpeg", quality);
    if (jpeg.startsWith("data:image/")) return jpeg;
  } catch {}

  return readFileAsDataUrl(file);
}

  // Upload image handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "desktop" | "mobile") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast("Dung lượng ảnh vượt quá 10MB", "error");
      return;
    }

    setIsUploading(target);
    try {
      const dataUrl = await fileToOptimizedDataUrl(file);
      if (target === "desktop") {
        handleFieldChange("desktopImage", dataUrl);
      } else {
        handleFieldChange("mobileImage", dataUrl);
      }
      showToast(`Đã chọn ảnh ${target === "desktop" ? "máy tính" : "điện thoại"}! Hãy nhấn "Xuất bản ngay" để lưu.`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Có lỗi khi xử lý ảnh", "error");
    } finally {
      setIsUploading(null);
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
      showToast(status === "published" ? "Xuất bản Hero Banner thành công!" : "Đã lưu bản nháp!");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Có lỗi khi lưu", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const handleReset = async () => {
    if (!confirm("Khôi phục toàn bộ nội dung và hình ảnh banner về mặc định ban đầu?")) {
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
      showToast("Đã khôi phục banner về mặc định ban đầu!");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Lỗi khi khôi phục", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-24 right-6 z-50 rounded-xl px-4 py-3 text-xs font-bold shadow-lg transition-all duration-300 ${
            message.type === "success"
              ? "bg-[#2D5A27] text-white"
              : "bg-[#8B1E1E] text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* TOP HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
              Quản trị website
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                config.status === "published"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {config.status === "published" ? "● Đang hiển thị" : "○ Bản nháp"}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            Banner Trang Chủ
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-red-600 hover:bg-zinc-50"
          >
            Khôi phục gốc
          </button>
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-50"
          >
            {isSaving ? "Đang lưu..." : "Lưu nháp"}
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={isSaving}
            className="rounded-xl bg-[#8B1E1E] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#5E0006] transition"
          >
            {isSaving ? "Đang xuất bản..." : "Xuất bản ngay"}
          </button>
        </div>
      </div>

      {/* TABS SWITCHER: EDIT / PREVIEW */}
      <div className="flex items-center justify-between rounded-xl bg-white p-1.5 border border-zinc-200 shadow-2xs">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === "edit"
                ? "bg-[#8B1E1E] text-white shadow-2xs"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            ✏️ Chỉnh sửa nội dung & ảnh
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === "preview"
                ? "bg-[#8B1E1E] text-white shadow-2xs"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            👁️ Xem trước (Live Preview)
          </button>
        </div>

        <Link
          href="/"
          target="_blank"
          className="text-xs font-bold text-[#8B1E1E] hover:underline pr-2 flex items-center gap-1"
        >
          <span>Xem trang chủ</span>
          <span>↗</span>
        </Link>
      </div>

      {/* TAB 1: LIVE PREVIEW */}
      {activeTab === "preview" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-4 py-2.5 text-xs text-zinc-700">
            <span>Đây là bản xem trước trực tiếp theo dữ liệu bạn vừa nhập.</span>
            <button
              type="button"
              onClick={() => handleSave("published")}
              className="font-bold text-[#8B1E1E] hover:underline"
            >
              Xuất bản lên trang chủ →
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm bg-[#FAF7F2]">
            <HeroBanner config={config} isPreview={true} />
          </div>
        </div>
      )}

      {/* TAB 2: EDIT FORM */}
      {activeTab === "edit" && (
        <div className="space-y-5">
          {/* 1. HÌNH ẢNH NỀN BANNER */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h2 className="text-sm font-bold text-zinc-900">
                1. Hình ảnh nền Banner
              </h2>
              <span className="text-[11px] text-zinc-400">JPG, PNG, WebP &lt; 5MB</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Desktop Image */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-800">Ảnh Desktop (1920 × 900px)</span>
                  <label className="cursor-pointer font-bold text-[#8B1E1E] hover:underline">
                    <span>{isUploading === "desktop" ? "Đang tải..." : "+ Tải ảnh mới"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "desktop")}
                      className="hidden"
                      disabled={isUploading !== null}
                    />
                  </label>
                </div>

                <div className="relative h-36 w-full overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200">
                  <Image
                    src={config.desktopImage || "/hero-clean-crisp.jpg"}
                    alt="Desktop Banner"
                    fill
                    sizes="400px"
                    className="object-cover"
                    style={{ objectPosition: config.desktopImagePosition || "78% center" }}
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                    {config.desktopImagePosition || "78% center"}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={config.desktopImage}
                    onChange={(e) => handleFieldChange("desktopImage", e.target.value)}
                    placeholder="URL ảnh desktop..."
                    className="flex-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-800 focus:border-[#8B1E1E] focus:outline-hidden"
                  />
                  <select
                    value={config.desktopImagePosition}
                    onChange={(e) => handleFieldChange("desktopImagePosition", e.target.value)}
                    className="rounded-lg border border-zinc-200 px-2 py-1.5 text-xs text-zinc-800"
                    title="Vị trí căn ảnh"
                  >
                    <option value="78% center">78% Phải (Đẹp nhất)</option>
                    <option value="center center">Chính giữa</option>
                    <option value="center right">Bên phải</option>
                    <option value="center left">Bên trái</option>
                  </select>
                </div>
              </div>

              {/* Mobile Image */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-800">Ảnh Mobile (Tùy chọn)</span>
                  <label className="cursor-pointer font-bold text-[#8B1E1E] hover:underline">
                    <span>{isUploading === "mobile" ? "Đang tải..." : "+ Tải ảnh mobile"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "mobile")}
                      className="hidden"
                      disabled={isUploading !== null}
                    />
                  </label>
                </div>

                <div className="relative h-36 w-full overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200">
                  <Image
                    src={config.mobileImage || config.desktopImage || "/hero-clean-crisp.jpg"}
                    alt="Mobile Banner"
                    fill
                    sizes="400px"
                    className="object-cover"
                    style={{ objectPosition: config.mobileImagePosition || "center center" }}
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                    {config.mobileImage ? "Ảnh Mobile riêng" : "Dùng chung Desktop"}
                  </div>
                </div>

                <input
                  type="text"
                  value={config.mobileImage || ""}
                  onChange={(e) => handleFieldChange("mobileImage", e.target.value)}
                  placeholder="Để trống sẽ tự động lấy ảnh Desktop"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-800 focus:border-[#8B1E1E] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* 2. TIÊU ĐỀ & NỘI DUNG */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3">
              2. Tiêu đề & Thông điệp
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Nhãn nhỏ (Tagline phía trên):</label>
                <input
                  type="text"
                  value={config.badgeLabel}
                  onChange={(e) => handleFieldChange("badgeLabel", e.target.value)}
                  placeholder="Ví dụ: MAOCHA • BẢO LỘC, LÂM ĐỒNG"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-[#8B1E1E] focus:border-[#8B1E1E] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Từ khóa bôi đỏ burgundy:</label>
                <input
                  type="text"
                  value={config.highlightWord}
                  onChange={(e) => handleFieldChange("highlightWord", e.target.value)}
                  placeholder="Ví dụ: Bảo Lộc"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-[#8B1E1E] focus:border-[#8B1E1E] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">
                Tiêu đề chính (Bấm Enter để ngắt dòng):
              </label>
              <textarea
                rows={2}
                value={config.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Trà nguyên bản –&#10;Tinh hoa từ đất trời Bảo Lộc"
                className="w-full rounded-lg border border-zinc-200 p-3 text-sm font-bold text-zinc-900 focus:border-[#8B1E1E] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">Đoạn mô tả ngắn:</label>
              <textarea
                rows={2}
                value={config.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                placeholder="Mô tả giá trị nền trà cho khách hàng và chuỗi..."
                className="w-full rounded-lg border border-zinc-200 p-3 text-xs text-zinc-800 focus:border-[#8B1E1E] focus:outline-hidden"
              />
            </div>
          </div>

          {/* 3. NÚT KÊU GỌI HÀNH ĐỘNG (CTA) */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3">
              3. Hai nút bấm hành động (CTA)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nút 1 */}
              <div className="rounded-xl border border-red-100 bg-[#FAF7F2] p-3.5 space-y-2">
                <span className="text-xs font-bold text-[#8B1E1E]">Nút chính (Màu đỏ)</span>
                <input
                  type="text"
                  value={config.primaryCtaText}
                  onChange={(e) => handleFieldChange("primaryCtaText", e.target.value)}
                  placeholder="Tên nút (Ví dụ: Khám phá các dòng trà)"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold"
                />
                <input
                  type="text"
                  value={config.primaryCtaLink}
                  onChange={(e) => handleFieldChange("primaryCtaLink", e.target.value)}
                  placeholder="Liên kết (Ví dụ: /products)"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-700"
                />
              </div>

              {/* Nút 2 */}
              <div className="rounded-xl border border-zinc-200 bg-white p-3.5 space-y-2">
                <span className="text-xs font-bold text-zinc-800">Nút phụ (Trắng / Viền xanh)</span>
                <input
                  type="text"
                  value={config.secondaryCtaText}
                  onChange={(e) => handleFieldChange("secondaryCtaText", e.target.value)}
                  placeholder="Tên nút (Ví dụ: Nhận mẫu thử miễn phí)"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold"
                />
                <input
                  type="text"
                  value={config.secondaryCtaLink}
                  onChange={(e) => handleFieldChange("secondaryCtaLink", e.target.value)}
                  placeholder="Liên kết Zalo hoặc trang liên hệ"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-700"
                />
              </div>
            </div>
          </div>

          {/* 4. THANH 3 CAM KẾT LỢI ÍCH */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3">
              4. Thanh 3 cam kết lợi ích dưới banner
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {config.highlights.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-200 bg-[#FAF7F2] p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) => handleHighlightChange(idx, "icon", e.target.value)}
                      className="w-9 rounded-md border border-zinc-200 bg-white text-center py-1 text-sm font-bold"
                      title="Biểu tượng emoji"
                    />
                    <span className="text-xs font-bold text-zinc-700">Cam kết #{idx + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleHighlightChange(idx, "title", e.target.value)}
                    placeholder="Tiêu đề (VD: 100% trà từ Bảo Lộc)"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-bold text-zinc-900"
                  />
                  <input
                    type="text"
                    value={item.subtitle}
                    onChange={(e) => handleHighlightChange(idx, "subtitle", e.target.value)}
                    placeholder="Mô tả phụ ngắn"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] text-zinc-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

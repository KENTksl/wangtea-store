"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Product, ProductInput } from "@/types/product";
import { useProductsAdmin } from "@/hooks/useProductsAdmin";
import { useAuth } from "@/hooks/useAuth";

type DraftState = Omit<ProductInput, "images"> & { imagesText: string };

function parseImages(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Không thể đọc file"));
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });
}

function appendLines(base: string, lines: string[]): string {
  const next = lines.filter(Boolean);
  if (!next.length) return base;
  const trimmed = base.trimEnd();
  return trimmed ? `${trimmed}\n${next.join("\n")}` : next.join("\n");
}

async function fileToOptimizedDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("File không phải hình ảnh");
  }

  const maxEdge = 1400;
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
      throw new Error("Không thể xử lý hình");
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
    bitmap.close?.();

    try {
      const webp = canvas.toDataURL("image/webp", quality);
      if (webp.startsWith("data:image/")) return webp;
    } catch {
      // ignore
    }

    const jpeg = canvas.toDataURL("image/jpeg", quality);
    if (jpeg.startsWith("data:image/")) return jpeg;
  } catch {
    // ignore
  }

  return readFileAsDataUrl(file);
}

function toDraft(p?: Product): DraftState {
  return {
    name: p?.name || "",
    description: p?.description || "",
    ingredients: p?.ingredients || "",
    dosage: p?.dosage || "",
    disclosureNumber: p?.disclosureNumber || "",
    applications: p?.applications || "",
    imagesText: p?.images?.join("\n") || "",
  };
}

const emptyDraft: DraftState = {
  name: "",
  description: "",
  ingredients: "",
  dosage: "",
  disclosureNumber: "",
  applications: "",
  imagesText: "",
};

export default function AdminProductsClient() {
  const cardClass =
    "overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm";
  const labelClass =
    "text-[11px] font-semibold uppercase tracking-wide text-zinc-500";
  const hintClass = "mt-1 text-xs text-zinc-500";
  const inputClass =
    "mt-1 h-11 w-full rounded-2xl bg-white px-4 text-sm text-zinc-950 shadow-sm ring-1 ring-zinc-200 outline-none transition focus:ring-2 focus:ring-[rgba(213,62,15,0.28)]";
  const textareaClass =
    "mt-1 min-h-28 w-full rounded-2xl bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm ring-1 ring-zinc-200 outline-none transition focus:ring-2 focus:ring-[rgba(213,62,15,0.28)]";

  const { signOut } = useAuth();
  const { items, loading, error, create, update, remove, refresh } =
    useProductsAdmin();
  const [draft, setDraft] = useState<DraftState>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<DraftState>(emptyDraft);
  const [uploading, setUploading] = useState<"create" | "edit" | null>(null);
  const createFileRef = useRef<HTMLInputElement | null>(null);
  const editFileRef = useRef<HTMLInputElement | null>(null);

  const canCreate = useMemo(() => {
    return Boolean(draft.name.trim());
  }, [draft]);

  const createImages = useMemo(() => parseImages(draft.imagesText), [draft.imagesText]);
  const editImages = useMemo(() => parseImages(editDraft.imagesText), [editDraft.imagesText]);

  async function handleCreate() {
    if (!canCreate) return;
    setSaving(true);
    setMessage(null);
    try {
      await create({
        name: draft.name.trim(),
        description: draft.description.trim(),
        ingredients: draft.ingredients.trim(),
        dosage: draft.dosage.trim(),
        disclosureNumber: draft.disclosureNumber.trim(),
        applications: draft.applications.trim(),
        images: parseImages(draft.imagesText),
      });
      setDraft(emptyDraft);
      setMessage("Đã tạo sản phẩm");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Không thể tạo sản phẩm");
    } finally {
      setSaving(false);
    }
  }

  async function addFilesToDraft(
    mode: "create" | "edit",
    files: FileList | null,
  ) {
    if (!files?.length) return;
    setUploading(mode);
    setMessage(null);
    try {
      const dataUrls: string[] = [];
      for (const file of Array.from(files)) {
        dataUrls.push(await fileToOptimizedDataUrl(file));
        await new Promise<void>((r) => setTimeout(r, 0));
      }
      if (mode === "create") {
        setDraft((prev) => ({
          ...prev,
          imagesText: appendLines(prev.imagesText, dataUrls),
        }));
      } else {
        setEditDraft((prev) => ({
          ...prev,
          imagesText: appendLines(prev.imagesText, dataUrls),
        }));
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Không thể thêm hình");
    } finally {
      if (mode === "create" && createFileRef.current) createFileRef.current.value = "";
      if (mode === "edit" && editFileRef.current) editFileRef.current.value = "";
      setUploading(null);
    }
  }

  function removeImageFromDraft(mode: "create" | "edit", src: string) {
    if (mode === "create") {
      setDraft((prev) => ({
        ...prev,
        imagesText: parseImages(prev.imagesText).filter((s) => s !== src).join("\n"),
      }));
      return;
    }
    setEditDraft((prev) => ({
      ...prev,
      imagesText: parseImages(prev.imagesText).filter((s) => s !== src).join("\n"),
    }));
  }

  function startEdit(p: Product) {
    setMessage(null);
    setEditingId(p._id);
    setEditDraft(toDraft(p));
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft(emptyDraft);
  }

  async function saveEdit(id: string) {
    setBusyId(id);
    setMessage(null);
    try {
      await update(id, {
        name: editDraft.name.trim(),
        description: editDraft.description.trim(),
        ingredients: editDraft.ingredients.trim(),
        dosage: editDraft.dosage.trim(),
        disclosureNumber: editDraft.disclosureNumber.trim(),
        applications: editDraft.applications.trim(),
        images: parseImages(editDraft.imagesText),
      });
      await refresh();
      setMessage("Đã cập nhật");
      cancelEdit();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Không thể cập nhật");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    setMessage(null);
    try {
      await remove(id);
      setMessage("Đã xoá sản phẩm");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Không thể xoá");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
            Hệ thống quản trị MAOCHA
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Quản trị Sản phẩm
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-xl bg-[#8B1E1E] px-4 py-2 text-xs font-bold text-white shadow-xs">
              📦 Quản lý Sản phẩm
            </span>
            <Link
              href="/admin/hero-banner"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
            >
              ✨ Hero Banner trang chủ
            </Link>
            <Link
              href="/admin/contact"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
            >
              📞 Thông tin liên hệ
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)]"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      <section className={cardClass}>
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(213,62,15,0.12),transparent_55%),radial-gradient(900px_circle_at_90%_-20%,rgba(94,0,6,0.10),transparent_55%)]" />
          <div className="relative px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                  Admin
                  <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                  Tạo mới sản phẩm
                </p>

              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={createFileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => void addFilesToDraft("create", e.target.files)}
                />
                <button
                  type="button"
                  disabled={!canCreate || saving}
                  onClick={() => void handleCreate()}
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent))] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 disabled:opacity-60"
                >
                  {saving ? "Đang tạo..." : "Tạo sản phẩm"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200" />

        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelClass}>Tên</span>
              <input
                className={inputClass}
                placeholder="Ví dụ: Hồng trà nền (đậm hương)"
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
              />
              <div className={hintClass}>Bắt buộc</div>
            </label>

            <label className="sm:col-span-2">
              <span className={labelClass}>Mô tả</span>
              <textarea
                className={textareaClass}
                placeholder="Mô tả ngắn về sản phẩm..."
                value={draft.description}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, description: e.target.value }))
                }
              />
            </label>

            <label className="sm:col-span-2">
              <span className={labelClass}>Thành phần</span>
              <textarea
                className={textareaClass}
                placeholder="Ví dụ: Lá trà chọn lọc..."
                value={draft.ingredients}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, ingredients: e.target.value }))
                }
              />
            </label>

            <label>
              <span className={labelClass}>Định lượng</span>
              <input
                className={inputClass}
                placeholder="Ví dụ: Tuỳ theo menu"
                value={draft.dosage}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, dosage: e.target.value }))
                }
              />
            </label>

            <label>
              <span className={labelClass}>Số công bố</span>
              <input
                className={inputClass}
                placeholder="Ví dụ: MC-CB-001"
                value={draft.disclosureNumber}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, disclosureNumber: e.target.value }))
                }
              />
            </label>

            <label className="sm:col-span-2">
              <span className={labelClass}>Ứng dụng</span>
              <textarea
                className="mt-1 min-h-24 w-full rounded-2xl bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm ring-1 ring-zinc-200 outline-none transition focus:ring-2 focus:ring-[rgba(213,62,15,0.28)]"
                placeholder="Ví dụ: Trà sữa, latte trà, nền trà trái cây..."
                value={draft.applications}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, applications: e.target.value }))
                }
              />
            </label>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-zinc-200 bg-[rgba(238,217,185,0.16)] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-950">
                    Hình sản phẩm
                  </div>
                  <div className="mt-1 text-xs text-zinc-600">
                    {createImages.length
                      ? `${createImages.length} hình`
                      : "Chưa có hình"}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={uploading !== null}
                  onClick={() => createFileRef.current?.click()}
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 transition hover:bg-[rgba(238,217,185,0.35)] disabled:opacity-60"
                >
                  + Thêm
                </button>
              </div>

              <div className="mt-4">
                <span className={labelClass}>Link hình (mỗi dòng 1 link)</span>
                <textarea
                  className="mt-1 min-h-24 w-full rounded-2xl bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm ring-1 ring-zinc-200 outline-none transition focus:ring-2 focus:ring-[rgba(213,62,15,0.28)]"
                  placeholder="/images/product-1.jpg&#10;https://.../product-2.jpg"
                  value={draft.imagesText}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, imagesText: e.target.value }))
                  }
                />
              </div>

              {createImages.length ? (
                <div className="mt-4 grid gap-3">
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200">
                    <img
                      src={createImages[0]}
                      alt="preview"
                      className="h-56 w-full object-cover sm:h-64"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageFromDraft("create", createImages[0])}
                      className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 backdrop-blur transition hover:bg-white"
                      aria-label="Xoá hình"
                    >
                      ×
                    </button>
                  </div>

                  {createImages.length > 1 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {createImages.slice(1, 10).map((src, idx) => (
                        <div
                          key={`draft-thumb-${idx}`}
                          className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200"
                        >
                          <img
                            src={src}
                            alt={`thumb-${idx}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => removeImageFromDraft("create", src)}
                            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 backdrop-blur transition hover:bg-white"
                            aria-label="Xoá hình"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <button
                  type="button"
                  disabled={uploading !== null}
                  onClick={() => createFileRef.current?.click()}
                  className="mt-4 grid w-full place-items-center rounded-3xl border border-dashed border-zinc-300 bg-white px-4 py-10 text-sm font-semibold text-zinc-700 transition hover:bg-[rgba(238,217,185,0.22)] disabled:opacity-60"
                >
                  {uploading === "create"
                    ? "Đang thêm hình..."
                    : "Bấm để chọn hình từ máy"}
                </button>
              )}
            </div>

            {message ? (
              <div className="rounded-3xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-700 shadow-sm">
                {message}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
          <div className="text-sm text-zinc-600">
            {loading ? "Đang tải..." : `${items.length} sản phẩm`}
          </div>
        </div>

        {error ? <div className="mt-4 text-sm text-zinc-600">{error}</div> : null}

        <div className="mt-5 grid gap-3">
          {items.map((p) => (
            <div
              key={p._id}
              className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 bg-[rgba(238,217,185,0.14)] px-5 py-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-[linear-gradient(135deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent),var(--color-cream))]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold tracking-tight text-zinc-950">
                      {p.name}
                    </div>
                    <div className="mt-1 text-xs text-zinc-600">
                      Updated: {new Date(p.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {editingId === p._id ? (
                    <>
                      <button
                        type="button"
                        disabled={busyId === p._id}
                        onClick={() => void saveEdit(p._id)}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-700)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)] disabled:opacity-60"
                      >
                        Lưu
                      </button>
                      <button
                        type="button"
                        disabled={busyId === p._id}
                        onClick={cancelEdit}
                        className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)] disabled:opacity-60"
                      >
                        Huỷ
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)]"
                    >
                      Chỉnh sửa
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={busyId === p._id}
                    onClick={() => void handleDelete(p._id)}
                    className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)] disabled:opacity-60"
                  >
                    Xoá
                  </button>
                </div>
              </div>

              {editingId === p._id ? (
                <div className="px-5 py-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 sm:col-span-2">
                    <span className={labelClass}>Tên</span>
                    <input
                      className={inputClass}
                      value={editDraft.name}
                      onChange={(e) =>
                        setEditDraft((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className={labelClass}>Mô tả</span>
                    <textarea
                      className={textareaClass}
                      value={editDraft.description}
                      onChange={(e) =>
                        setEditDraft((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className={labelClass}>
                      Thành phần
                    </span>
                    <textarea
                      className={textareaClass}
                      value={editDraft.ingredients}
                      onChange={(e) =>
                        setEditDraft((prev) => ({
                          ...prev,
                          ingredients: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className={labelClass}>
                      Định lượng
                    </span>
                    <input
                      className={inputClass}
                      value={editDraft.dosage}
                      onChange={(e) =>
                        setEditDraft((prev) => ({ ...prev, dosage: e.target.value }))
                      }
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className={labelClass}>
                      Số công bố
                    </span>
                    <input
                      className={inputClass}
                      value={editDraft.disclosureNumber}
                      onChange={(e) =>
                        setEditDraft((prev) => ({
                          ...prev,
                          disclosureNumber: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="grid gap-1 sm:col-span-2">
                    <span className={labelClass}>
                      Ứng dụng
                    </span>
                    <textarea
                      className="mt-1 min-h-24 w-full rounded-2xl bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm ring-1 ring-zinc-200 outline-none transition focus:ring-2 focus:ring-[rgba(213,62,15,0.28)]"
                      value={editDraft.applications}
                      onChange={(e) =>
                        setEditDraft((prev) => ({
                          ...prev,
                          applications: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <div className="sm:col-span-2 rounded-3xl border border-zinc-200 bg-[rgba(238,217,185,0.16)] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-zinc-950">
                          Hình sản phẩm
                        </div>
                        <div className="mt-1 text-xs text-zinc-600">
                          {editImages.length ? `${editImages.length} hình` : "Chưa có hình"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          ref={editFileRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => void addFilesToDraft("edit", e.target.files)}
                        />
                        <button
                          type="button"
                          disabled={uploading !== null}
                          onClick={() => editFileRef.current?.click()}
                          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 transition hover:bg-[rgba(238,217,185,0.35)] disabled:opacity-60"
                        >
                          {uploading === "edit" ? "Đang thêm..." : "+ Thêm"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className={labelClass}>Link hình (mỗi dòng 1 link)</span>
                      <textarea
                        className="mt-1 min-h-24 w-full rounded-2xl bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm ring-1 ring-zinc-200 outline-none transition focus:ring-2 focus:ring-[rgba(213,62,15,0.28)]"
                        value={editDraft.imagesText}
                        onChange={(e) =>
                          setEditDraft((prev) => ({
                            ...prev,
                            imagesText: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {editImages.length ? (
                      <div className="mt-4 grid gap-3">
                        <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200">
                          <img
                            src={editImages[0]}
                            alt="preview"
                            className="h-56 w-full object-cover sm:h-64"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => removeImageFromDraft("edit", editImages[0])}
                            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 backdrop-blur transition hover:bg-white"
                            aria-label="Xoá hình"
                          >
                            ×
                          </button>
                        </div>

                        {editImages.length > 1 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {editImages.slice(1, 10).map((src, idx) => (
                              <div
                                key={`${p._id}-thumb-${idx}`}
                                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200"
                              >
                                <img
                                  src={src}
                                  alt={`${p._id}-thumb-${idx}`}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImageFromDraft("edit", src)}
                                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 backdrop-blur transition hover:bg-white"
                                  aria-label="Xoá hình"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={uploading !== null}
                        onClick={() => editFileRef.current?.click()}
                        className="mt-4 grid w-full place-items-center rounded-3xl border border-dashed border-zinc-300 bg-white px-4 py-10 text-sm font-semibold text-zinc-700 transition hover:bg-[rgba(238,217,185,0.22)] disabled:opacity-60"
                      >
                        {uploading === "edit"
                          ? "Đang thêm hình..."
                          : "Bấm để chọn hình từ máy"}
                      </button>
                    )}
                  </div>
                </div>
                </div>
              ) : (
                <div className="px-5 py-5">
                  <div className="grid items-start gap-5 lg:grid-cols-[280px_1fr]">
                    <div className="self-start overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-52 w-full object-cover sm:h-64 lg:h-56"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-52 w-full bg-[linear-gradient(135deg,var(--color-brand-900),var(--color-brand-700),var(--color-accent),var(--color-cream))] sm:h-64 lg:h-56" />
                      )}
                    </div>

                    <div className="rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200">
                      <div className="p-6">
                        {p.description ? (
                          <div className="text-sm leading-6 text-zinc-600">
                            {p.description}
                          </div>
                        ) : null}

                        <div className="mt-5 grid gap-4 text-sm">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className={labelClass}>Thành phần</div>
                              <div className="mt-1 font-medium text-zinc-950">
                                {p.ingredients || "—"}
                              </div>
                            </div>
                            <div>
                              <div className={labelClass}>Định lượng</div>
                              <div className="mt-1 font-medium text-zinc-950">
                                {p.dosage || "—"}
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className={labelClass}>Số tự công bố</div>
                            <div className="mt-1 font-medium text-zinc-950">
                              {p.disclosureNumber || "—"}
                            </div>
                          </div>

                          <div>
                            <div className={labelClass}>Ứng dụng</div>
                            <div className="mt-1 font-medium text-zinc-950">
                              {p.applications || "—"}
                            </div>
                          </div>
                        </div>

                        {p.images?.length ? (
                          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                            {p.images.slice(0, 10).map((src, idx) => (
                              <div
                                key={`${p._id}-img-${idx}`}
                                className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200"
                              >
                                <img
                                  src={src}
                                  alt={`${p.name}-${idx}`}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {!loading && items.length === 0 ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
              Chưa có sản phẩm.
            </div>
          ) : null}
        </div>
      </section>

      {message ? (
        <div className="fixed bottom-5 right-5 z-[80] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-lg">
          {message}
        </div>
      ) : null}
    </div>
  );
}

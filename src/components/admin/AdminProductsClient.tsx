"use client";

import { useMemo, useState } from "react";
import type { ProductInput } from "@/types/product";
import { useProductsAdmin } from "@/hooks/useProductsAdmin";
import { useAuth } from "@/hooks/useAuth";

const emptyDraft: ProductInput = {
  name: "",
  category: "Nền trà",
  sku: "",
  note: "",
  packaging: "",
  origin: "Bảo Lộc, Lâm Đồng",
  badge: "",
};

export default function AdminProductsClient() {
  const { signOut } = useAuth();
  const { items, loading, error, create, update, remove } = useProductsAdmin();
  const [draft, setDraft] = useState<ProductInput>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const canCreate = useMemo(() => {
    return Boolean(draft.name.trim() && draft.category.trim() && draft.sku.trim());
  }, [draft]);

  async function handleCreate() {
    if (!canCreate) return;
    setSaving(true);
    setMessage(null);
    try {
      await create({
        name: draft.name.trim(),
        category: draft.category.trim(),
        sku: draft.sku.trim(),
        note: draft.note.trim(),
        packaging: draft.packaging.trim(),
        origin: draft.origin.trim(),
        badge: draft.badge?.trim() || undefined,
      });
      setDraft(emptyDraft);
      setMessage("Đã tạo sản phẩm");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Không thể tạo sản phẩm");
    } finally {
      setSaving(false);
    }
  }

  async function handleQuickUpdate(id: string, patch: Partial<ProductInput>) {
    setBusyId(id);
    setMessage(null);
    try {
      await update(id, patch);
      setMessage("Đã cập nhật");
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Quản trị sản phẩm</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Tạo / chỉnh sửa / xoá sản phẩm (yêu cầu đăng nhập).
          </p>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)]"
        >
          Đăng xuất
        </button>
      </div>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Tạo sản phẩm</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="grid gap-1">
            <span className="text-xs font-medium text-zinc-600">Tên</span>
            <input
              className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-300"
              value={draft.name}
              onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-medium text-zinc-600">Danh mục</span>
            <input
              className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-300"
              value={draft.category}
              onChange={(e) =>
                setDraft((p) => ({ ...p, category: e.target.value }))
              }
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-medium text-zinc-600">SKU</span>
            <input
              className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-300"
              value={draft.sku}
              onChange={(e) => setDraft((p) => ({ ...p, sku: e.target.value }))}
            />
          </label>
          <label className="grid gap-1 sm:col-span-2 lg:col-span-3">
            <span className="text-xs font-medium text-zinc-600">Mô tả</span>
            <input
              className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-300"
              value={draft.note}
              onChange={(e) => setDraft((p) => ({ ...p, note: e.target.value }))}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-medium text-zinc-600">Đóng gói</span>
            <input
              className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-300"
              value={draft.packaging}
              onChange={(e) =>
                setDraft((p) => ({ ...p, packaging: e.target.value }))
              }
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-medium text-zinc-600">Nguồn</span>
            <input
              className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-300"
              value={draft.origin}
              onChange={(e) =>
                setDraft((p) => ({ ...p, origin: e.target.value }))
              }
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-medium text-zinc-600">Badge</span>
            <input
              className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-300"
              value={draft.badge || ""}
              onChange={(e) =>
                setDraft((p) => ({ ...p, badge: e.target.value }))
              }
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-zinc-600">{message}</div>
          <button
            type="button"
            disabled={!canCreate || saving}
            onClick={() => void handleCreate()}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-700)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-900)] disabled:opacity-60"
          >
            {saving ? "Đang tạo..." : "Tạo sản phẩm"}
          </button>
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
              className="grid gap-3 rounded-3xl border border-zinc-200 bg-white p-5 sm:grid-cols-[1fr_160px_140px] sm:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-zinc-300"
                    defaultValue={p.name}
                    onBlur={(e) =>
                      void handleQuickUpdate(p._id, { name: e.target.value })
                    }
                  />
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  <input
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-300"
                    defaultValue={p.category}
                    onBlur={(e) =>
                      void handleQuickUpdate(p._id, { category: e.target.value })
                    }
                  />
                  <input
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-300"
                    defaultValue={p.sku}
                    onBlur={(e) =>
                      void handleQuickUpdate(p._id, { sku: e.target.value })
                    }
                  />
                  <input
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-300"
                    defaultValue={p.badge || ""}
                    onBlur={(e) =>
                      void handleQuickUpdate(p._id, {
                        badge: e.target.value || undefined,
                      })
                    }
                  />
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <input
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-300"
                    defaultValue={p.packaging}
                    onBlur={(e) =>
                      void handleQuickUpdate(p._id, { packaging: e.target.value })
                    }
                  />
                  <input
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-300"
                    defaultValue={p.origin}
                    onBlur={(e) =>
                      void handleQuickUpdate(p._id, { origin: e.target.value })
                    }
                  />
                </div>
                <input
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-300"
                  defaultValue={p.note}
                  onBlur={(e) =>
                    void handleQuickUpdate(p._id, { note: e.target.value })
                  }
                />
                <div className="mt-2 text-xs text-zinc-600">
                  Updated: {new Date(p.updatedAt).toLocaleString()}
                </div>
              </div>

              <div className="text-sm text-zinc-600">
                <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                  <div className="text-xs font-medium text-zinc-600">ID</div>
                  <div className="mt-1 break-all text-xs text-zinc-950">
                    {p._id}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  disabled={busyId === p._id}
                  onClick={() => void handleDelete(p._id)}
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-[rgba(238,217,185,0.35)] disabled:opacity-60"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}

          {!loading && items.length === 0 ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
              Chưa có sản phẩm.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}


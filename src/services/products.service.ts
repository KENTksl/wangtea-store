import type { Product, ProductInput } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products", { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = (await res.json()) as { items: Product[] };
  return data.items;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(data?.message || "Failed to create product");
  }
  const data = (await res.json()) as { item: Product };
  return data.item;
}

export async function updateProduct(
  id: string,
  input: Partial<ProductInput>,
): Promise<Product> {
  const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(data?.message || "Failed to update product");
  }
  const data = (await res.json()) as { item: Product };
  return data.item;
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(data?.message || "Failed to delete product");
  }
}


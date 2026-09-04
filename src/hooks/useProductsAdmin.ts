import { useCallback, useEffect, useState } from "react";
import type { Product, ProductInput } from "@/types/product";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/services/products.service";

export function useProductsAdmin() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchProducts()
      .then((data) => {
        if (active) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (active) {
          setError(e instanceof Error ? e.message : "Failed to load products");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const create = useCallback(async (input: ProductInput) => {
    const created = await createProduct(input);
    setItems((prev) => [created, ...prev]);
    return created;
  }, []);

  const update = useCallback(async (id: string, input: Partial<ProductInput>) => {
    const updated = await updateProduct(id, input);
    setItems((prev) => prev.map((p) => (p._id === id ? updated : p)));
    return updated;
  }, []);

  const remove = useCallback(async (id: string) => {
    await deleteProduct(id);
    setItems((prev) => prev.filter((p) => p._id !== id));
  }, []);

  return { items, loading, error, refresh, create, update, remove };
}

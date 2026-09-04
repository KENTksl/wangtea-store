import type { Metadata } from "next";
import { listProducts } from "@/lib/products-repo";
import ProductsPageClient from "@/components/products/ProductsPageClient";

export const metadata: Metadata = {
  title: "Sản phẩm | MAOCHA",
  description: "Danh mục sản phẩm của MAOCHA Trà Nguyên Bản.",
};

export const runtime = "nodejs";
export const revalidate = 60;

export default async function ProductsPage() {
  const products = await listProducts();

  return <ProductsPageClient products={products} />;
}

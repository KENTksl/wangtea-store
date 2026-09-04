import type { Metadata } from "next";
import { listProducts } from "@/lib/products-repo";
import ProductsPageClient from "@/components/products/ProductsPageClient";

export const metadata: Metadata = {
  title: "Bộ Sưu Tập Nền Trà Bảo Lộc | MAOCHA Trà Nguyên Bản",
  description:
    "Danh mục các dòng trà nền chuẩn chất lượng từ Bảo Lộc: Hồng trà, Lục trà, Trà Ô long và giải pháp gia công mã hàng riêng cho chuỗi đồ uống F&B.",
};

export const runtime = "nodejs";
export const revalidate = 60;

export default async function ProductsPage() {
  const products = await listProducts();

  return <ProductsPageClient products={products} />;
}

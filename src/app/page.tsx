import type { Metadata } from "next";
import { getHeroBannerConfig } from "@/lib/hero-banner-repo";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "MAOCHA Trà Nguyên Bản | Nền Trà Chuẩn Cho Vận Hành Lâu Dài",
  description:
    "Cung cấp, thương mại và gia công nền trà chuẩn theo yêu cầu từ Bảo Lộc. Giải pháp mã hàng riêng độc quyền cho chuỗi kinh doanh F&B.",
};

export const runtime = "nodejs";
export const revalidate = 60;

export default async function HomePage() {
  const banner = await getHeroBannerConfig();
  return <HomeClient banner={banner} />;
}

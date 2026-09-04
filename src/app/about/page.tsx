import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "Giới thiệu & Kiến thức Trà | MAOCHA Trà Nguyên Bản",
  description:
    "Tìm hiểu câu chuyện thương hiệu MAOCHA, thổ nhưỡng trà Bảo Lộc, kiến thức các dòng trà nguyên bản và quy trình gia công nền trà chuẩn vận hành.",
};

export default function AboutPage() {
  return <AboutClient />;
}

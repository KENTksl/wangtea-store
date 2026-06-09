import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "Giới thiệu | MAOCHA",
  description:
    "MAOCHA Trà Nguyên Bản - cung cấp, thương mại và gia công nền trà theo yêu cầu.",
};

export default function AboutPage() {
  return <AboutClient />;
}

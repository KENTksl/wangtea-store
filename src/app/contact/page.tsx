import type { Metadata } from "next";
import { getContactConfig } from "@/lib/contact-repo";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Liên Hệ & Nhận Mẫu Thử | MAOCHA Trà Nguyên Bản",
  description:
    "Kết nối với MAOCHA để nhận mẫu thử nền trà Bảo Lộc miễn phí, tư vấn gia công công thức độc quyền và giải pháp cung ứng cho chuỗi F&B.",
};

export const runtime = "nodejs";
export const revalidate = 60;

export default async function ContactPage() {
  const contact = await getContactConfig();
  return <ContactClient contact={contact} />;
}

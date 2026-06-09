import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Liên hệ | MAOCHA",
  description:
    "Thông tin liên hệ: Zalo 0944601732, Facebook và email congtytnhhwangtea@gmail.com.",
};

export default function ContactPage() {
  return <ContactClient />;
}

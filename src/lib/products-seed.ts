import type { Product } from "@/types/product";

const nowIso = new Date().toISOString();

export const seededProducts: Product[] = [
  {
    _id: "seed-ht-001",
    name: "Hồng trà nền (đậm hương)",
    description: "Hậu vị đậm, thơm sâu, phù hợp làm nền trà sữa/latte trà.",
    ingredients: "Lá trà chọn lọc (mẫu).",
    dosage: "Tuỳ theo menu (mẫu).",
    disclosureNumber: "MC-CB-001 (mẫu)",
    applications: "Trà sữa, latte trà, nền trà đậm vị.",
    images: ["/banner.jpg"],
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    _id: "seed-lt-002",
    name: "Lục trà nền (thanh vị)",
    description: "Vị thanh, dễ phối trái cây, phù hợp take away.",
    ingredients: "Lá trà xanh chọn lọc (mẫu).",
    dosage: "Tuỳ theo menu (mẫu).",
    disclosureNumber: "MC-CB-002 (mẫu)",
    applications: "Trà trái cây, nền trà thanh.",
    images: ["/banner.jpg"],
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    _id: "seed-ol-003",
    name: "Ô long nền (thơm sữa)",
    description: "Mùi thơm đặc trưng, hợp với sữa và các topping.",
    ingredients: "Ô long rang nhẹ (mẫu).",
    dosage: "Tuỳ theo menu (mẫu).",
    disclosureNumber: "MC-CB-003 (mẫu)",
    applications: "Trà sữa ô long, topping-friendly.",
    images: ["/banner.jpg"],
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    _id: "seed-cus-101",
    name: "Nền trà (gia công theo yêu cầu)",
    description:
      "Gia công theo mẫu/hương vị riêng, hỗ trợ mã hàng riêng cho thương hiệu.",
    ingredients: "Theo mẫu khách hàng cung cấp.",
    dosage: "Theo công thức vận hành.",
    disclosureNumber: "Theo lô/đợt (mẫu)",
    applications: "Chuỗi nhượng quyền, thương mại, take away.",
    images: ["/banner.jpg"],
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    _id: "seed-sol-301",
    name: "Giải pháp nền trà cho chuỗi",
    description:
      "Gợi ý set nền trà theo menu, tối ưu độ ổn định và vận hành lâu dài.",
    ingredients: "Theo tiêu chuẩn MAOCHA (mẫu).",
    dosage: "Theo menu và quy trình vận hành.",
    disclosureNumber: "Theo gói giải pháp (mẫu)",
    applications: "Chuỗi đồ uống, vận hành dài hạn.",
    images: ["/banner.jpg"],
    createdAt: nowIso,
    updatedAt: nowIso,
  },
];

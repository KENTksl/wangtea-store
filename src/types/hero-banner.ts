export interface HeroBannerConfig {
  id: string;
  isEnabled: boolean;
  status: "published" | "draft";
  
  // Images
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
  desktopImagePosition: string; // e.g. "center right", "78% center"
  mobileImagePosition: string; // e.g. "center center"
  
  // Content
  badgeLabel: string; // e.g. "MAOCHA"
  title: string; // e.g. "Trà nguyên bản –\nTinh hoa từ đất trời\nBảo Lộc"
  highlightWord: string; // e.g. "Bảo Lộc" (will be styled in burgundy red)
  description: string;
  
  // CTA Buttons
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  
  // Origin Seal
  showOriginBadge: boolean;
  originBadgeText: {
    brand: string;
    value: string;
    sub1: string;
    sub2: string;
  };

  // Highlights Bar
  highlights: Array<{
    icon: string;
    title: string;
    subtitle: string;
  }>;
  
  // Gradient Overlay styling
  gradientOverlay: string; // custom gradient string or preset
  
  // Metadata
  updatedAt: string;
  updatedBy: string;
}

export type HeroBannerInput = Partial<HeroBannerConfig>;

export const DEFAULT_HERO_BANNER: HeroBannerConfig = {
  id: "main-hero-banner",
  isEnabled: true,
  status: "published",

  desktopImage: "/hero-clean-crisp.jpg",
  mobileImage: "/hero-clean-crisp.jpg",
  imageAlt: "Người phụ nữ thu hoạch trà trên đồi trà Bảo Lộc MAOCHA",
  desktopImagePosition: "78% center",
  mobileImagePosition: "center center",

  badgeLabel: "MAOCHA",
  title: "Trà nguyên bản –\nTinh hoa từ đất trời\nBảo Lộc",
  highlightWord: "Bảo Lộc",
  description: "Mang đến nguồn trà sạch, chuẩn vị và ổn định cho thương hiệu & chuỗi đồ uống.",

  primaryCtaText: "Khám phá sản phẩm",
  primaryCtaLink: "/products",
  secondaryCtaText: "Nhận mẫu thử miễn phí",
  secondaryCtaLink: "https://zalo.me/0944601732",

  showOriginBadge: true,
  originBadgeText: {
    brand: "MAOCHA",
    value: "100%",
    sub1: "NGUỒN TRÀ",
    sub2: "BẢO LỘC",
  },

  highlights: [
    {
      icon: "🌿",
      title: "100% trà từ Bảo Lộc",
      subtitle: "Nguồn gốc rõ ràng",
    },
    {
      icon: "⚙️",
      title: "Gia công theo yêu cầu",
      subtitle: "Độc quyền công thức",
    },
    {
      icon: "🚚",
      title: "Giao hàng toàn quốc",
      subtitle: "Nhanh chóng – An toàn",
    },
  ],

  gradientOverlay:
    "linear-gradient(90deg, rgba(255,255,252,0.98) 0%, rgba(255,255,252,0.88) 30%, rgba(255,255,252,0.25) 58%, rgba(255,255,255,0) 100%)",

  updatedAt: "2026-09-04T00:00:00.000Z",
  updatedBy: "Hệ thống MAOCHA",
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: "facebook" | "instagram" | "youtube" | "tiktok" | "shop" | "zalo" | "lemonade";
  color: string;
  bgGradient?: string;
};

export type Service = {
  category: string;
  images: string[];
  zaloUrl: string;
};

export type FeaturedClip = {
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  tagline: string;
  bio: string;
  bioDetails: string;
  bioHighlights: string[];
  bioNote: string;
  bioSharing: string[];
  avatar: string;
  socialLinks: SocialLink[];
  featuredVideoIds: string[];
  featuredClips: FeaturedClip[];
  services: Service[];
};

export const profile: Profile = {
  name: "Phạm Hà Thu",
  tagline: "MC · Biên tập viên · Tư vấn làm đẹp & Thẩm mỹ",
  bio: "Thu từng có gần 9 năm làm MC – Biên tập viên truyền hình. Cũng từ đó, Thu bén duyên với lĩnh vực làm đẹp và thẩm mỹ tới nay cũng gần 10 năm và có một cơ sở tư vấn làm đẹp cho chị em tại Hà Nội.",
  bioDetails:
    "Hiện tại, Thu tập trung chia sẻ trải nghiệm thực tế và đồng hành cùng chị em trong hành trình làm đẹp tại Thượng Hải, Seoul và Hà Nội theo hướng ✨ An toàn – tự nhiên – phù hợp với chính mình.",
  bioHighlights: [
    "Mắt – mũi – trẻ hóa gương mặt",
    "Nâng ngực – hút mỡ – tạo hình body",
    "Các giải pháp giúp chị em tự tin và đẹp hơn",
  ],
  bioNote:
    "Điều Thu quan tâm không phải là làm thật nhiều, mà là lựa chọn đúng phương pháp, đúng người thực hiện và phù hợp với từng người.",
  bioSharing: [
    "Góc nhìn thật",
    "Trải nghiệm thật",
    "Những điều chị em nên biết trước khi đưa ra quyết định làm đẹp quan trọng 💛",
  ],

  avatar: "/avatar.jpg",

  socialLinks: [
    {
      platform: "TikTok",
      url: "https://tiktok.com/@yourhandle",
      icon: "tiktok",
      color: "#010101",
    },
    {
      platform: "Fanpage",
      url: "https://facebook.com/yourpage",
      icon: "facebook",
      color: "#1877F2",
    },
    {
      platform: "YouTube",
      url: "https://youtube.com/@yourchannel",
      icon: "youtube",
      color: "#FF0000",
    },
    {
      platform: "Lemonade",
      url: "https://lemonade.vn/yourshop",
      icon: "lemonade",
      color: "#FF6B35",
    },
    {
      platform: "Group 888 Chuyện",
      url: "https://facebook.com/groups/your-group",
      icon: "facebook",
      color: "#1877F2",
    },
    {
      platform: "Nhóm Zalo Tư Vấn",
      url: "https://zalo.me/g/your-group",
      icon: "zalo",
      color: "#0068FF",
    },
  ],

  // Thay bằng TikTok video ID thật (từ URL: tiktok.com/@user/video/VIDEO_ID)
  featuredVideoIds: [],

  featuredClips: [
    { title: "Clip nổi bật 1", url: "https://tiktok.com/@yourhandle/video/..." },
    { title: "Clip nổi bật 2", url: "https://tiktok.com/@yourhandle/video/..." },
  ],

  services: [
    {
      category: "NÂNG MŨI",
      images: ["/services/mui-1.jpg", "/services/mui-2.jpg"],
      zaloUrl: "https://zalo.me/g/your-group",
    },
    {
      category: "MẮT",
      images: ["/services/mat-1.jpg", "/services/mat-2.jpg"],
      zaloUrl: "https://zalo.me/g/your-group",
    },
    {
      category: "NHÂN TRUNG",
      images: ["/services/nhantung-1.jpg", "/services/nhantung-2.jpg"],
      zaloUrl: "https://zalo.me/g/your-group",
    },
    {
      category: "HÚT MỠ",
      images: ["/services/hutmo-1.jpg", "/services/hutmo-2.jpg"],
      zaloUrl: "https://zalo.me/g/your-group",
    },
    {
      category: "NÂNG NGỰC",
      images: ["/services/nangnguc-1.jpg", "/services/nangnguc-2.jpg"],
      zaloUrl: "https://zalo.me/g/your-group",
    },
  ],
};

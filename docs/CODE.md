# Code Guide

## Tech Stack

| Công nghệ | Version | Lý do chọn |
|-----------|---------|------------|
| Next.js | 14+ | App Router, SSG, SEO tốt |
| TypeScript | 5+ | Type safety, dễ maintain |
| Tailwind CSS | 3+ | Utility-first, nhanh |
| ESLint + Prettier | - | Code style nhất quán |

---

## 1. Cấu trúc thư mục

```
src/
├── app/
│   ├── layout.tsx          # Root layout, font, metadata
│   ├── page.tsx            # Trang chính (/)
│   └── globals.css         # Tailwind base styles
├── components/
│   ├── Hero.tsx            # Avatar + tên + tagline
│   ├── SocialLinks.tsx     # Danh sách nút mạng xã hội
│   ├── TikTokEmbed.tsx     # Nhúng video TikTok
│   ├── FamilySection.tsx   # Section gia đình / team
│   └── Footer.tsx          # Footer đơn giản
└── data/
    └── profile.ts          # Toàn bộ dữ liệu cấu hình
```

**Quy tắc:** Mọi text/data đều để trong `data/profile.ts` — không hardcode trong component.

---

## 2. Data Layer (`src/data/profile.ts`)

Đây là file duy nhất cần sửa để cập nhật nội dung trang web:

```typescript
export const profile = {
  name: "Nguyễn Văn A",
  tagline: "Content Creator | Lifestyle",
  bio: "Chia sẻ cuộc sống, đam mê và câu chuyện của tôi.",
  avatar: "/avatar.jpg",           // đặt trong public/
  socialLinks: [
    {
      platform: "Facebook",
      url: "https://facebook.com/...",
      icon: "facebook",
      color: "#1877F2",
    },
    // ...
  ],
  featuredVideos: [
    { tiktokId: "7xxxxxxxxxxxxxxxxx" },
  ],
  family: [
    {
      name: "Người thân A",
      role: "Chức danh",
      avatar: "/family-a.jpg",
      url: "https://...",
    },
  ],
};
```

---

## 3. Components

### Hero (`src/components/Hero.tsx`)

```tsx
import Image from "next/image";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="flex flex-col items-center py-12 px-4 text-center">
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
        <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
      <p className="text-gray-500 mt-2 text-lg">{profile.tagline}</p>
      <p className="text-gray-600 mt-3 max-w-sm leading-relaxed">{profile.bio}</p>
    </section>
  );
}
```

### SocialLinks (`src/components/SocialLinks.tsx`)

```tsx
import { profile } from "@/data/profile";
import { PLATFORM_ICONS } from "@/components/icons";

export function SocialLinks() {
  return (
    <section className="flex flex-col gap-3 px-4 max-w-md mx-auto w-full">
      {profile.socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: link.color }}
          className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl
                     text-white font-semibold text-base shadow-md
                     hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
        >
          {PLATFORM_ICONS[link.icon]}
          {link.platform}
        </a>
      ))}
    </section>
  );
}
```

### TikTokEmbed (`src/components/TikTokEmbed.tsx`)

```tsx
"use client";

interface Props {
  videoId: string;
}

export function TikTokEmbed({ videoId }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md aspect-[9/16] max-w-[280px]">
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        className="w-full h-full"
        allowFullScreen
        allow="encrypted-media"
      />
    </div>
  );
}
```

### FamilySection (`src/components/FamilySection.tsx`)

```tsx
import Image from "next/image";
import { profile } from "@/data/profile";

export function FamilySection() {
  return (
    <section className="px-4 py-8 max-w-md mx-auto w-full">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Gia đình</h2>
      <div className="grid grid-cols-2 gap-4">
        {profile.family.map((member) => (
          <a
            key={member.name}
            href={member.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm
                       border border-gray-100 hover:border-amber-300 transition-colors"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
              <Image src={member.avatar} alt={member.name} fill className="object-cover" />
            </div>
            <p className="font-semibold text-gray-900 text-sm text-center">{member.name}</p>
            <p className="text-gray-500 text-xs text-center mt-1">{member.role}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
```

---

## 4. App Layout (`src/app/layout.tsx`)

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: profile.name,
  description: profile.bio,
  openGraph: {
    title: profile.name,
    description: profile.bio,
    images: [profile.avatar],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-[#F5EFE6] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
```

---

## 5. Main Page (`src/app/page.tsx`)

```tsx
import { Hero } from "@/components/Hero";
import { SocialLinks } from "@/components/SocialLinks";
import { TikTokEmbed } from "@/components/TikTokEmbed";
import { FamilySection } from "@/components/FamilySection";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="max-w-lg mx-auto pb-16">
      <Hero />
      <SocialLinks />

      {profile.featuredVideos.length > 0 && (
        <section className="px-4 py-8">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Video nổi bật</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 justify-center">
            {profile.featuredVideos.map((v) => (
              <TikTokEmbed key={v.tiktokId} videoId={v.tiktokId} />
            ))}
          </div>
        </section>
      )}

      <FamilySection />
      <Footer />
    </main>
  );
}
```

---

## 6. Conventions

- Component file: **PascalCase** (`Hero.tsx`)
- Hook file: **camelCase** (`useProfile.ts`)
- Tailwind classes: sắp xếp theo nhóm (layout → spacing → color → animation)
- Không dùng `any` trong TypeScript
- `"use client"` chỉ khi thực sự cần (event, state, browser API)
- Ảnh luôn dùng `next/image` để tối ưu

---

## 7. Lệnh hay dùng

```bash
npm run dev          # Chạy dev server tại localhost:3000
npm run build        # Build production
npm run start        # Chạy production build
npm run lint         # Kiểm tra lỗi ESLint
npx tsc --noEmit    # Kiểm tra TypeScript
```

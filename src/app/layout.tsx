import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-playfair",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phamhathu.vn";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${profile.name} — Tư vấn thẩm mỹ & Làm đẹp`,
    template: `%s | ${profile.name}`,
  },

  description: `${profile.bio} Tư vấn nâng mũi, mắt, nâng ngực, hút mỡ và trẻ hóa gương mặt tại Hà Nội, Seoul và Thượng Hải. An toàn – tự nhiên – phù hợp với từng người.`,

  keywords: [
    "Phạm Hà Thu",
    "tư vấn làm đẹp",
    "tư vấn thẩm mỹ",
    "nâng mũi",
    "nâng ngực",
    "hút mỡ",
    "trẻ hóa gương mặt",
    "thẩm mỹ Hà Nội",
    "thẩm mỹ Seoul",
    "thẩm mỹ Thượng Hải",
    "MC làm đẹp",
    "làm đẹp an toàn",
  ],

  authors: [{ name: profile.name }],
  creator: profile.name,

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — Tư vấn thẩm mỹ & Làm đẹp`,
    description: profile.bio,
    images: [
      {
        url: profile.avatar,
        width: 800,
        height: 800,
        alt: `${profile.name} — Tư vấn thẩm mỹ & Làm đẹp`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Tư vấn thẩm mỹ & Làm đẹp`,
    description: profile.bio,
    images: [profile.avatar],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#F5EFE6] min-h-screen`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

# Portfolio Website

Trang web personal brand / link-in-bio tương tự [nguyentrongcong.com](https://www.nguyentrongcong.com/).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deploy**: Vercel (miễn phí)

## Tính năng

- Hero section với avatar và giới thiệu
- Social media links (Facebook, Instagram, YouTube, TikTok)
- TikTok video embeds
- Family / Team section
- Responsive mobile-first
- SEO optimized

## Tài liệu

| File | Nội dung |
|------|----------|
| [docs/DESIGN.md](docs/DESIGN.md) | Thiết kế UI/UX, màu sắc, layout |
| [docs/CODE.md](docs/CODE.md) | Cấu trúc code, component, conventions |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Hướng dẫn deploy lên Vercel |

## Bắt đầu nhanh

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Cấu trúc thư mục

```
portfolio-website/
├── docs/               # Tài liệu design, code, deploy
├── public/             # Ảnh, favicon, assets tĩnh
└── src/
    ├── app/            # Next.js App Router (layout, page)
    ├── components/     # React components tái sử dụng
    └── data/           # Dữ liệu profile, links, videos
```

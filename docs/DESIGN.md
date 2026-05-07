# Design Document

## Mục tiêu

Xây dựng trang personal brand đơn giản, đẹp, load nhanh — giúp người dùng dễ dàng chia sẻ tất cả kênh mạng xã hội và nội dung nổi bật trong một link duy nhất.

---

## 1. Wireframe & Layout

```
┌─────────────────────────────────┐
│           HEADER / NAV          │  ← tên + logo (tuỳ chọn)
├─────────────────────────────────┤
│                                 │
│     [Avatar]  Tên + Bio         │  ← HERO SECTION
│     [Tagline ngắn gọn]          │
│                                 │
├─────────────────────────────────┤
│  [FB]  [IG]  [YT]  [TK]  [Shop] │  ← SOCIAL LINKS
├─────────────────────────────────┤
│                                 │
│   Video nổi bật (TikTok embed)  │  ← FEATURED CONTENT
│   [Video 1]  [Video 2]          │
│                                 │
├─────────────────────────────────┤
│   Gia đình / Team               │  ← FAMILY / TEAM
│   [Card 1]   [Card 2]           │
├─────────────────────────────────┤
│           FOOTER                │
└─────────────────────────────────┘
```

---

## 2. Color Palette

Phong cách: **tối giản, hiện đại, ấm áp**.

| Token | Màu | Mã hex | Dùng cho |
|-------|-----|--------|----------|
| `primary` | Nude/Cream | `#F5EFE6` | Background chính |
| `accent` | Warm Brown | `#8B5E3C` | Button, highlight |
| `text-dark` | Dark Charcoal | `#1A1A1A` | Tiêu đề, body |
| `text-muted` | Gray | `#6B7280` | Phụ đề, mô tả |
| `card-bg` | White | `#FFFFFF` | Card, surface |
| `border` | Light Gray | `#E5E7EB` | Border, divider |

> Có thể thay bằng dark theme: background `#0F0F0F`, accent `#C9A96E` (gold).

---

## 3. Typography

| Vai trò | Font | Size | Weight |
|---------|------|------|--------|
| Tên / H1 | Inter hoặc Playfair Display | 2.5rem | 700 |
| Tagline / H2 | Inter | 1.25rem | 400 |
| Body | Inter | 1rem | 400 |
| Label | Inter | 0.875rem | 500 |

Import từ Google Fonts:
```
Inter: 400, 500, 700
Playfair Display: 700 (optional, cho heading sang trọng)
```

---

## 4. Components

### 4.1 Hero Section
- Avatar hình tròn, có border nhẹ
- Tên to, tagline nhỏ bên dưới
- Nút CTA "Liên hệ" / "Xem thêm"

### 4.2 Social Link Button
- Full width trên mobile
- Icon + tên nền tảng
- Hover animation nhẹ (scale + shadow)
- Màu riêng cho từng platform:
  - Facebook: `#1877F2`
  - Instagram: gradient `#E1306C → #F77737`
  - YouTube: `#FF0000`
  - TikTok: `#010101` / `#69C9D0`

### 4.3 TikTok Embed Card
- Responsive aspect ratio 9:16
- Border radius 12px
- Skeleton loading

### 4.4 Family / Team Card
- Avatar tròn
- Tên + chức danh
- Link đến profile cá nhân

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | 1 cột, stack dọc |
| Tablet | 640px – 1024px | 2 cột cho cards |
| Desktop | > 1024px | Max-width 600px centered |

> Trang này tối ưu cho **mobile** vì chủ yếu truy cập từ điện thoại qua bio link.

---

## 6. Animation & UX

- Page load: fade-in nhẹ (`opacity 0 → 1`, 300ms)
- Social button hover: `transform: translateY(-2px)`, box-shadow tăng
- Card hover: border highlight màu accent
- Scroll: smooth scrolling

---

## 7. SEO & Meta

```html
<title>Tên Của Bạn — Personal Brand</title>
<meta name="description" content="Theo dõi tôi trên Facebook, Instagram, TikTok..." />
<meta property="og:image" content="/avatar.jpg" />
<meta property="og:title" content="Tên Của Bạn" />
```

- Favicon: ảnh avatar crop vuông 32x32
- OG image: 1200x630px

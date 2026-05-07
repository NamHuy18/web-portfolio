# Deploy Guide

## Cách deploy nhanh nhất: Vercel (miễn phí)

Vercel là platform chính thức của Next.js — deploy trong 2 phút, không cần cấu hình.

---

## Bước 1: Chuẩn bị code

### 1.1 Cài đặt và test local

```bash
cd portfolio-website
npm install
npm run build       # Đảm bảo không có lỗi build
npm run start       # Test bản production local
```

### 1.2 Cập nhật dữ liệu cá nhân

Sửa file `src/data/profile.ts`:
- Thay tên, bio, tagline
- Thay link mạng xã hội
- Thay TikTok video IDs
- Thêm ảnh vào thư mục `public/`

### 1.3 Cập nhật favicon & OG image

```
public/
├── favicon.ico          # 32x32 px
├── avatar.jpg           # Ảnh đại diện (400x400)
└── og-image.jpg         # OG image (1200x630)
```

---

## Bước 2: Đưa code lên GitHub

```bash
# Khởi tạo git
git init
git add .
git commit -m "Initial portfolio website"

# Tạo repo trên github.com rồi push lên
git remote add origin https://github.com/username/portfolio-website.git
git branch -M main
git push -u origin main
```

---

## Bước 3: Deploy lên Vercel

### Option A: Deploy qua UI (dễ nhất)

1. Vào [vercel.com](https://vercel.com) → đăng nhập bằng GitHub
2. Click **"Add New Project"**
3. Chọn repo `portfolio-website`
4. Vercel tự nhận diện Next.js — giữ nguyên cài đặt mặc định
5. Click **"Deploy"**
6. Chờ ~1 phút → Xong!

URL mặc định: `https://portfolio-website-username.vercel.app`

### Option B: Deploy qua CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Bước 4: Gắn tên miền riêng (tuỳ chọn)

### Dùng tên miền từ Vercel (miễn phí)
Vercel cho phép đặt subdomain: `ten-cua-ban.vercel.app`

### Gắn domain riêng (ví dụ: tendomain.com)

1. Trong Vercel dashboard → Project → **Settings → Domains**
2. Thêm domain của bạn (ví dụ: `nguyenvana.com`)
3. Vercel hiện DNS records cần cấu hình
4. Vào nhà cung cấp domain (Namecheap, GoDaddy, ...) → DNS Settings
5. Thêm records theo hướng dẫn của Vercel:
   ```
   Type: A     Name: @    Value: 76.76.21.21
   Type: CNAME Name: www  Value: cname.vercel-dns.com
   ```
6. Đợi 5–30 phút để DNS propagate

### Mua domain Việt Nam
- [inet.vn](https://inet.vn) — .vn từ ~250k/năm
- [tenten.vn](https://tenten.vn) — nhiều lựa chọn
- [namecheap.com](https://namecheap.com) — .com từ ~$10/năm

---

## Bước 5: Tự động deploy khi push code

Vercel tự động re-deploy mỗi khi bạn push lên GitHub:

```bash
# Cập nhật bio
# Sửa src/data/profile.ts
git add src/data/profile.ts
git commit -m "Update bio"
git push
# → Vercel tự deploy trong ~1 phút
```

---

## Tổng kết chi phí

| Hạng mục | Chi phí |
|----------|---------|
| Vercel Hobby (cá nhân) | **Miễn phí** |
| GitHub | **Miễn phí** |
| Tên miền .com | ~$10–12/năm |
| Tên miền .vn | ~250k–500k/năm |

**Tổng tối thiểu: $0/năm** (dùng subdomain vercel.app)

---

## Các nền tảng deploy thay thế

| Platform | Free tier | Ghi chú |
|----------|-----------|---------|
| **Vercel** | ✅ Rất tốt | Khuyến nghị cho Next.js |
| **Netlify** | ✅ Tốt | Cần thêm `netlify.toml` |
| **GitHub Pages** | ✅ Miễn phí | Cần export static, không hỗ trợ SSR |
| **Railway** | ✅ Limited | Cần Docker hoặc Nixpacks |
| **Render** | ✅ Limited | Cold start chậm ở free tier |

---

## Troubleshooting

### Build thất bại trên Vercel
```bash
npm run build  # Test local trước
```
Xem log lỗi trong Vercel dashboard → Deployments → Click vào deployment lỗi.

### Ảnh không hiển thị
Đảm bảo ảnh nằm trong `public/` và đường dẫn bắt đầu bằng `/`:
```typescript
avatar: "/avatar.jpg"  // ✅ đúng
avatar: "avatar.jpg"   // ❌ sai
```

### TikTok embed bị block
TikTok embed cần domain thật — trên localhost có thể bị block bởi CORS. Sau khi deploy sẽ hoạt động bình thường.

### Cần HTTPS cho meta tag OG
Vercel tự động cấp SSL miễn phí. Sau khi deploy URL sẽ là `https://...`.

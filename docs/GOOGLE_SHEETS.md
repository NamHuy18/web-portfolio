# Thiết lập Google Sheets — nhận dữ liệu tư vấn

Cách đơn giản nhất: dùng **Google Apps Script** (không cần tạo Google Cloud project, không cần service account).

Chỉ 5 bước, mất khoảng 5 phút.

---

## Bước 1 — Tạo Google Sheets

1. Vào [sheets.google.com](https://sheets.google.com) → **+ Tạo bảng tính mới**
2. Đặt tên ví dụ: `Tư vấn làm đẹp — Phạm Hà Thu`
3. Điền tên cột ở **hàng 1**:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Thời gian | Họ tên | Email | SĐT | Quận/QG | Yêu cầu |

---

## Bước 2 — Mở Script Editor

1. Trong Google Sheets, click menu **Tiện ích mở rộng → Apps Script**
2. Một tab mới mở ra, xoá hết code cũ
3. Dán đoạn code sau vào:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('vi-VN'),
      data.name    || '',
      data.email   || '',
      data.phone   || '',
      data.district|| '',
      data.request || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Nhấn **Ctrl+S** (hoặc biểu tượng đĩa mềm) để lưu

---

## Bước 3 — Deploy Web App

1. Click nút **Deploy** (góc trên phải) → **New deployment**
2. Click biểu tượng bánh răng ⚙ → chọn **Web app**
3. Cấu hình:
   - **Execute as:** `Me` (tài khoản Google của bạn)
   - **Who has access:** `Anyone` *(bắt buộc để website gửi được)*
4. Click **Deploy**
5. Google yêu cầu xác quyền → click **Authorize access** → chọn tài khoản Google → **Allow**
6. Copy **Web app URL** (dạng `https://script.google.com/macros/s/XXXX/exec`)

---

## Bước 4 — Tạo file .env.local

Tạo file `.env.local` ở thư mục gốc của dự án:

```bash
# /Users/namhuy/portfolio-website/.env.local
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
```

Thay `https://script.google.com/macros/s/XXXX/exec` bằng URL vừa copy ở Bước 3.

---

## Bước 5 — Kiểm tra

Chạy dev server:
```bash
npm run dev
```

Mở trang web, điền form và nhấn **Đăng ký tư vấn ngay**. Vào Google Sheets kiểm tra — dữ liệu sẽ xuất hiện ở hàng tiếp theo.

---

## Deploy lên Vercel

Khi deploy production, vào **Vercel Dashboard → Settings → Environment Variables** và thêm:

```
GOOGLE_APPS_SCRIPT_URL = https://script.google.com/macros/s/XXXX/exec
```

> `.env.local` không được commit lên git (đã có trong `.gitignore`).

---

## Lưu ý

- Nếu deploy lại Apps Script → URL **không đổi**, chỉ cần redeploy là dữ liệu vẫn vào sheet cũ.
- Mỗi lần sửa code Apps Script cần **Deploy → Manage deployments → chọn deployment cũ → Update** để URL không thay đổi.

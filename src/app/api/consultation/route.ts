import { NextRequest, NextResponse } from "next/server";

type FormBody = {
  name?: string;
  email?: string;
  phone?: string;
  district?: string;
  request?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: FormBody = await req.json();
    const { name, email, phone, district, request } = body;

    if (!name?.trim() || !phone?.trim() || !request?.trim()) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ các trường bắt buộc." },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("Thiếu GOOGLE_APPS_SCRIPT_URL trong .env.local");
      return NextResponse.json(
        { error: "Hệ thống chưa được cấu hình. Vui lòng liên hệ quản trị viên." },
        { status: 500 }
      );
    }

    const timestamp = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp,
        name: name.trim(),
        email: email?.trim() ?? "",
        phone: phone.trim(),
        district: district?.trim() ?? "",
        request: request.trim(),
      }),
    });

    if (!res.ok) {
      throw new Error(`Apps Script trả về ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lỗi ghi Google Sheets:", err);
    return NextResponse.json(
      { error: "Lỗi hệ thống, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

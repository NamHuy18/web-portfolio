"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MapPin, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FormState = {
  name: string;
  email: string;
  phone: string;
  district: string;
  request: string;
};

type Status = "idle" | "loading" | "success" | "error";

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  district: "",
  request: "",
};

function InputField({
  icon,
  label,
  required,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-semibold text-gray-600 tracking-wide">
        {label}
        {required && <span className="text-[#C9A279] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConsultationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(initialForm);
    } catch {
      setErrorMsg("Không thể kết nối, vui lòng thử lại sau.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-[#FDFAF7] border border-gray-200 rounded-xl " +
    "focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/25 focus:border-[#8B5E3C]/60 " +
    "placeholder:text-gray-300 transition-all duration-200 min-h-[46px]";

  return (
    <motion.section
      className="px-5 py-8 max-w-md mx-auto w-full"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Card */}
      <div className="bg-white rounded-3xl shadow-soft border border-gray-100/80 overflow-hidden">
        {/* Gradient accent bar */}
        <div className="h-1 bg-gradient-to-r from-[#EADBC8] via-[#C9A279] to-[#8B5E3C]" />

        <div className="p-6 sm:p-7">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="font-serif text-xl font-bold text-gray-900">
              Tư vấn thẩm mỹ & Làm đẹp
            </h2>
            <p className="text-[13px] text-gray-400 mt-1">
              Để lại thông tin để Thu đồng hành cùng chị em
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex flex-col items-center text-center py-8 gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-[#F5EFE6] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#8B5E3C]" />
                </div>
                <p className="font-serif text-lg font-bold text-gray-800">
                  Đã nhận thông tin!
                </p>
                <p className="text-[13px] text-gray-500 max-w-[240px]">
                  Thu sẽ liên hệ với chị em trong thời gian sớm nhất 💛
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-3 text-[#8B5E3C] text-[13px] underline underline-offset-4 decoration-[#C9A279]/60"
                >
                  Đăng ký thêm
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <InputField icon={<User size={15} />} label="Họ và tên" required>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Thị A"
                    className={inputClass}
                  />
                </InputField>

                <InputField icon={<Mail size={15} />} label="Email">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={inputClass}
                  />
                </InputField>

                <InputField icon={<Phone size={15} />} label="Số điện thoại" required>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0912 345 678"
                    className={inputClass}
                  />
                </InputField>

                <InputField icon={<MapPin size={15} />} label="Quận / Quốc gia">
                  <input
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="Hà Nội / TP.HCM / Seoul..."
                    className={inputClass}
                  />
                </InputField>

                <div className="space-y-1.5">
                  <label className="block text-[12px] font-semibold text-gray-600 tracking-wide">
                    Yêu cầu của chị em<span className="text-[#C9A279] ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={15}
                      className="absolute left-3.5 top-3.5 text-gray-300 pointer-events-none"
                    />
                    <textarea
                      name="request"
                      required
                      rows={4}
                      value={form.request}
                      onChange={handleChange}
                      placeholder="Chị em muốn tư vấn về..."
                      className={
                        "w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-[#FDFAF7] border border-gray-200 rounded-xl " +
                        "focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/25 focus:border-[#8B5E3C]/60 " +
                        "placeholder:text-gray-300 transition-all duration-200 resize-none"
                      }
                    />
                  </div>
                </div>

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-[13px] text-center"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ y: -1.5, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-[#8B5E3C] to-[#6D4830] text-white
                             font-bold py-4 rounded-2xl shadow-md min-h-[52px]
                             disabled:opacity-60 disabled:cursor-not-allowed
                             text-[13px] tracking-[0.08em] uppercase transition-opacity"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Đang gửi...
                    </span>
                  ) : (
                    "Đăng ký tư vấn ngay"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

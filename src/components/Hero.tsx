"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/profile";

// Typed cubic-bezier để tránh lỗi TypeScript với framer-motion
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5 w-full">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8B5E3C]/20 to-[#8B5E3C]/20" />
      <span className="text-[#C9A279] text-xs">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#8B5E3C]/20 to-[#8B5E3C]/20" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#EADBC8]/55 via-[#F2E9DE]/20 to-transparent pointer-events-none" />
      {/* Decorative blurs */}
      <div className="absolute top-8 right-6 w-40 h-40 rounded-full bg-[#C9A279]/8 blur-3xl pointer-events-none" />
      <div className="absolute top-24 left-2 w-28 h-28 rounded-full bg-[#8B5E3C]/6 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col items-center pt-16 pb-10 px-6">
        {/* Avatar */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="relative mb-10 flex items-center justify-center"
        >
          <div className="absolute w-44 h-44 rounded-full border border-[#8B5E3C]/10" />
          <div className="absolute w-36 h-36 rounded-full border border-[#8B5E3C]/16" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-[3px] border-white shadow-xl shadow-[#8B5E3C]/15">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-[2rem] sm:text-4xl font-bold text-gray-900 text-center leading-tight"
        >
          {profile.name}{" "}
          <span className="not-italic">🌷</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-[#8B5E3C]/65 text-center"
        >
          {profile.tagline}
        </motion.p>

        {/* Divider */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <Divider />
        </motion.div>

        {/* Bio */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full space-y-4 text-sm text-gray-600 leading-relaxed bg-[#F5EFE6]/60 backdrop-blur-sm rounded-2xl px-4 py-4"
        >
          <p>{profile.bio}</p>
          <p className="text-gray-700">{profile.bioDetails}</p>

          {/* Highlights card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-[#8B5E3C]/8 space-y-2.5 shadow-card">
            <p className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-widest">
              Lĩnh vực tư vấn
            </p>
            <ul className="space-y-2">
              {profile.bioHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-[#C9A279] text-xs mt-0.5 flex-shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Note italic */}
          <p className="text-[13px] text-gray-500 italic leading-relaxed border-l-2 border-[#C9A279]/50 pl-3.5">
            {profile.bioNote}
          </p>

          {/* Sharing */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-widest">
              Thu chia sẻ tại đây
            </p>
            <ul className="space-y-2">
              {profile.bioSharing.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-600">
                  <span className="text-[#8B5E3C]/65 mt-0.5 flex-shrink-0">–</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

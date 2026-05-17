"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { profile, type FeaturedClip } from "@/data/profile";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getTikTokId(url: string): string | null {
  const m = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  return m ? m[1] : null;
}

function TikTokCard({ clip, index }: { clip: FeaturedClip; index: number }) {
  const videoId = getTikTokId(clip.url);
  if (!videoId) return null;

  return (
    <motion.div
      className="rounded-3xl overflow-hidden border border-gray-100/80 shadow-card bg-white"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
    >
      {/* Accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-[#EADBC8] via-[#C9A279]/70 to-[#EADBC8]" />

      {/* TikTok official blockquote embed — auto-sized by embed.js */}
      <div className="pt-4" />
      <blockquote
        className="tiktok-embed"
        cite={clip.url}
        data-video-id={videoId}
        style={{ margin: 0, maxWidth: "100%", minWidth: "325px" }}
      >
        <section />
      </blockquote>

      {/* CTA button */}
      <div className="p-4">
        <a
          href={clip.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl min-h-[48px]
                     bg-[#010101] text-white text-[13px] font-semibold
                     transition-opacity hover:opacity-80 active:opacity-70"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.8 1.54V6.78a4.85 4.85 0 0 1-1.03-.09z" />
          </svg>
          Xem ngay trên TikTok
          <ExternalLink size={13} className="opacity-60" />
        </a>
      </div>
    </motion.div>
  );
}

export function FeaturedClips() {
  const clips = profile.featuredClips;
  if (clips.length === 0) return null;

  return (
    <section className="px-5 py-8 max-w-md mx-auto w-full">
      {/* TikTok embed script — loaded once, deduped by Next.js */}
      <Script src="https://www.tiktok.com/embed.js" strategy="afterInteractive" />

      {/* Section title */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h2 className="font-serif text-xl font-bold text-gray-900">
          Một số clip nổi bật
        </h2>
        <div className="flex items-center justify-center gap-3 mt-2.5">
          <div className="h-px w-10 bg-[#8B5E3C]/20" />
          <span className="text-[#C9A279] text-xs">✦</span>
          <div className="h-px w-10 bg-[#8B5E3C]/20" />
        </div>
        <p className="text-[12px] text-gray-500 mt-2">
          Những nội dung chia sẻ thực tế của Thu
        </p>
      </motion.div>

      {/* Vertical stack */}
      <div className="space-y-5">
        {clips.map((clip, i) => (
          <TikTokCard key={i} clip={clip} index={i} />
        ))}
      </div>
    </section>
  );
}

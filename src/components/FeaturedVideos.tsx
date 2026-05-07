"use client";

import { motion } from "framer-motion";
import { TikTokEmbed } from "@/components/TikTokEmbed";
import { profile } from "@/data/profile";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FeaturedVideos() {
  return (
    <section className="py-8">
      <motion.div
        className="text-center mb-6 px-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h2 className="font-serif text-xl font-bold text-gray-900">Video nổi bật</h2>
        <div className="flex items-center justify-center gap-3 mt-2.5">
          <div className="h-px w-10 bg-[#8B5E3C]/20" />
          <span className="text-[#C9A279] text-xs">✦</span>
          <div className="h-px w-10 bg-[#8B5E3C]/20" />
        </div>
      </motion.div>

      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory px-5 scrollbar-none">
        {profile.featuredVideoIds.map((id, i) => (
          <motion.div
            key={id}
            className="snap-start flex-shrink-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
          >
            <TikTokEmbed videoId={id} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

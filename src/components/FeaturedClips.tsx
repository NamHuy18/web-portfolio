"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FeaturedClips() {
  if (profile.featuredClips.length === 0) return null;

  return (
    <section className="px-5 py-8 max-w-md mx-auto w-full">
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
      </motion.div>

      <div className="flex flex-col gap-3">
        {profile.featuredClips.map((clip, i) => (
          <motion.a
            key={i}
            href={clip.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 min-h-[64px]
                       border border-gray-100/80 shadow-card group transition-shadow
                       hover:shadow-soft"
          >
            {/* Play icon */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A279] to-[#8B5E3C]
                            flex items-center justify-center flex-shrink-0 shadow-sm">
              <Play size={14} className="text-white ml-0.5" fill="white" />
            </div>

            {/* Title */}
            <span className="flex-1 text-[14px] font-medium text-gray-700 group-hover:text-[#8B5E3C] transition-colors leading-snug">
              {clip.title}
            </span>

            {/* External link icon */}
            <ExternalLink
              size={14}
              className="text-gray-300 group-hover:text-[#8B5E3C] flex-shrink-0 transition-colors"
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

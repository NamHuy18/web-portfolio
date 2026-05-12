"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { type Service } from "@/data/profile";

type ServiceWithImages = Service & { images: string[] };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ServiceImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full aspect-[3/4] bg-[#F5EFE6] rounded-2xl flex flex-col items-center justify-center gap-2 border border-dashed border-[#8B5E3C]/20">
        <svg
          className="w-7 h-7 text-[#C9A279]/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-[10px] text-[#8B5E3C]/40 text-center px-2 leading-relaxed">
          Thêm ảnh vào
          <br />
          /public/services/
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden group">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setError(true)}
      />
      {/* Subtle gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}

function ServiceImageSlider({ images, category }: { images: string[]; category: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  if (images.length === 1) {
    return <ServiceImage src={images[0]} alt={`${category} 1`} />;
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden -mx-5 px-5" ref={emblaRef}>
        <div className="flex gap-2.5">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_calc(50%-5px)] min-w-0">
              <ServiceImage src={img} alt={`${category} ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators — chỉ hiện khi có hơn 2 ảnh */}
      {images.length > 2 && (
        <div className="flex justify-center gap-1.5">
          {images.slice(0, -1).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ảnh ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-4 h-1.5 bg-[#C9A279]"
                  : "w-1.5 h-1.5 bg-[#8B5E3C]/25"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}

function ServiceCard({ service, index }: { service: ServiceWithImages; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }}
      className="bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-card"
    >
      {/* Card top accent */}
      <div className="h-0.5 bg-gradient-to-r from-[#EADBC8] via-[#C9A279]/70 to-[#EADBC8]" />

      <div className="p-5 space-y-4">
        {/* Category title */}
        <div className="text-center">
          <span className="inline-block font-serif text-sm font-bold text-gray-800 tracking-wider uppercase">
            {service.category}
          </span>
        </div>

        {/* Image slider */}
        <ServiceImageSlider images={service.images} category={service.category} />

        {/* Zalo CTA */}
        <motion.a
          href={service.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -1.5, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl min-h-[48px]
                     bg-[#0068FF] text-white text-[13px] font-semibold shadow-sm
                     transition-opacity hover:opacity-90"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.388.703 4.615 1.922 6.487L0 24l5.633-1.888A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.701 16.711c-.246.692-1.458 1.324-2.01 1.408-.496.075-1.12.107-1.808-.114a16.617 16.617 0 0 1-1.638-.607C9.892 16.45 8.386 14.84 7.236 12.98c-.618-.996-.852-1.796-.876-2.596-.027-.93.343-1.764.942-2.383.199-.208.418-.32.625-.32h.446c.207 0 .488.08.762.607.295.561.998 2.033 1.083 2.182.086.148.143.322.029.519-.114.198-.172.32-.344.493-.172.173-.362.386-.516.519-.171.148-.35.309-.15.607.199.297.885 1.46 1.898 2.364 1.303 1.162 2.401 1.522 2.742 1.69.34.17.54.143.739-.086.199-.23.852-.994 1.08-1.335.228-.342.456-.285.762-.172.306.113 1.947.918 2.283 1.085.336.167.56.25.642.389.081.14.081.809-.164 1.499z" />
          </svg>
          Nhóm Zalo tư vấn trực tiếp
        </motion.a>
      </div>
    </motion.div>
  );
}

export function ServicesSection({ services }: { services: ServiceWithImages[] }) {
  return (
    <section className="px-5 py-8 max-w-md mx-auto w-full">
      {/* Section title */}
      <motion.div
        className="text-center mb-7"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h2 className="font-serif text-xl font-bold text-gray-900">
          Tham khảo dịch vụ
        </h2>
        <div className="flex items-center justify-center gap-3 mt-2.5">
          <div className="h-px w-10 bg-[#8B5E3C]/20" />
          <span className="text-[#C9A279] text-xs">✦</span>
          <div className="h-px w-10 bg-[#8B5E3C]/20" />
        </div>
        <p className="text-[12px] text-gray-600 mt-2">
          Ảnh thực tế từ các chị em đã làm cùng Thu
        </p>
      </motion.div>

      <div className="space-y-5">
        {services.map((service, i) => (
          <ServiceCard key={service.category} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

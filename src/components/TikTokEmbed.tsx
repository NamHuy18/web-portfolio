"use client";

interface Props {
  videoId: string;
}

export function TikTokEmbed({ videoId }: Props) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-card border border-gray-100/80 flex-shrink-0"
      style={{ width: 270, height: 480 }}
    >
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        className="w-full h-full"
        allowFullScreen
        allow="encrypted-media"
        title={`TikTok video ${videoId}`}
        loading="lazy"
      />
    </div>
  );
}

import { Heart } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="text-center py-10 px-5">
      <div className="flex items-center justify-center gap-2 text-gray-400 text-[13px]">
        <span>© {new Date().getFullYear()}</span>
        <span className="text-[#C9A279]/60 text-xs">✦</span>
        <span className="font-serif text-gray-500">{profile.name}</span>
      </div>
      <p className="text-[11px] text-gray-300 mt-1.5 flex items-center justify-center gap-1">
        Made with{" "}
        <Heart size={10} className="text-[#C9A279]/70" fill="currentColor" />
        {" "}in Hà Nội
      </p>
    </footer>
  );
}

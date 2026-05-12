import fs from "fs";
import path from "path";

const IMG_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VID_EXTS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

export function getServiceImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "services", slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMG_EXTS.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/services/${slug}/${f}`);
  } catch {
    return [];
  }
}

export function getServiceVideos(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "services", slug, "videos");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => VID_EXTS.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/services/${slug}/videos/${f}`);
  } catch {
    return [];
  }
}

import fs from "fs";
import path from "path";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function getServiceImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "services", slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/services/${slug}/${f}`);
  } catch {
    return [];
  }
}

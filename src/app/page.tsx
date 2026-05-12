import { Hero } from "@/components/Hero";
import { SocialLinks } from "@/components/SocialLinks";
import { ConsultationForm } from "@/components/ConsultationForm";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturedVideos } from "@/components/FeaturedVideos";
import { FeaturedClips } from "@/components/FeaturedClips";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";
import { getServiceImages } from "@/lib/getServiceImages";

export default function Home() {
  const services = profile.services.map((s) => ({
    ...s,
    images: getServiceImages(s.slug),
  }));

  return (
    <main className="max-w-lg mx-auto pb-16 animate-fadein">
      <Hero />
      <SocialLinks />
      <ConsultationForm />
      <ServicesSection services={services} />
      {profile.featuredVideoIds.length > 0 && <FeaturedVideos />}
      <FeaturedClips />
      <Footer />
    </main>
  );
}

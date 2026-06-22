import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import StatsSection from "@/components/public/StatsSection";
import VisionMissionSection from "@/components/public/VisionMissionSection";
import CoreValuesSection from "@/components/public/CoreValuesSection";
import ProgramsPreview from "@/components/public/ProgramsPreview";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import BlogPreview from "@/components/public/BlogPreview";
import PartnersSection from "@/components/public/PartnersSection";
import CTASection from "@/components/public/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <VisionMissionSection />
        <CoreValuesSection />
        <ProgramsPreview />
        <TestimonialsSection />
        <BlogPreview />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

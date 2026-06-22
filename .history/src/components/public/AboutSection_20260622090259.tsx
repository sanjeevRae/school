import { Link } from "react-router";
import { useSettings } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Clock } from "lucide-react";

const featureIcons = [BookOpen, Users, Award, Clock];

export default function AboutSection() {
  const { data: settings, loading } = useSettings();

  const schoolName = settings?.schoolName || "Samriddhi School";
  const sectionLabel = settings?.tagline || "About Our School";
  const introText = settings?.aboutText || "Learn more about our school, our mission, and our learning environment.";

  const aboutGallery = [
    { src: settings?.logo || "/images/logo.png", alt: `${schoolName} logo` },
    { src: settings?.favicon || "/images/favicon.png", alt: `${schoolName} icon` },
    { src: settings?.facebook || "/images/hero1.jpg", alt: `${schoolName} highlight 1` },
    { src: settings?.instagram || "/images/hero2.jpg", alt: `${schoolName} highlight 2` },
  ].map((item) => ({
    ...item,
    src: item.src && item.src.startsWith("http") ? item.src : item.src,
  }));

  const featureValues = [
    settings?.tagline || "Science, Technology, Engineering, Arts & Math",
    settings?.address || "Qualified and experienced teaching staff",
    settings?.metaDescription || "High academic standards and achievements",
    settings?.phone || "Over 15 years of educational excellence",
  ];

  const featureLabels = [
    "School Identity",
    "Location & Community",
    "Education Quality",
    "Contact & Legacy",
  ];

  const features = featureLabels.map((label, index) => ({
    icon: featureIcons[index],
    label,
    desc: featureValues[index],
  }));

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {aboutGallery.map((item, index) => (
                <img
                  key={`${item.src}-${index}`}
                  src={item.src}
                  alt={item.alt}
                  className={`rounded-xl shadow-lg w-full h-48 md:h-56 object-cover ${
                    index === 1 ? "mt-8" : index === 2 ? "-mt-8" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
              {sectionLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              {schoolName}
            </h2>
            <div className="prose prose-slate text-slate-600 leading-relaxed mb-6">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-4/6" />
                </div>
              ) : (
                <p>{introText}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 shrink-0">
                    <f.icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{f.label}</h4>
                    <p className="text-xs text-slate-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="bg-slate-800 hover:bg-slate-700">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

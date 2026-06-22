import { useState, useEffect } from "react";
import { useHeroSlides } from "@/hooks/useSchoolData";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";

export default function HeroSection() {
  const { data: slides } = useHeroSlides();
  const [current, setCurrent] = useState(0);
  const activeSlides = slides.filter((s) => s.isActive);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + activeSlides.length) % activeSlides.length);
  const next = () => setCurrent((current + 1) % activeSlides.length);

  if (activeSlides.length === 0) return null;

  const slide = activeSlides[current] || activeSlides[0];

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover opacity-60 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
            >
              <Link to="/admission">
                <GraduationCap className="h-5 w-5 mr-2" />
                Admission Open
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? "bg-amber-400 w-8" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

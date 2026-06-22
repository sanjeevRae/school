import { useState } from "react";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { useGalleryImages } from "@/hooks/useSchoolData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Events", "Academic", "Sports", "Arts"];

export default function Gallery() {
  const { data: images, loading } = useGalleryImages();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const activeImages = images.filter((img) => img.isActive);
  const filtered =
    activeCategory === "All"
      ? activeImages
      : activeImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () =>
    setLightbox((prev) => (prev === null ? null : prev === 0 ? filtered.length - 1 : prev - 1));
  const nextImage = () =>
    setLightbox((prev) => (prev === null ? null : prev === filtered.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="bg-slate-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Capturing moments of learning, achievement, and joy at our school
          </p>
        </div>
      </div>

      <main className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-slate-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-end">
                    <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white font-medium text-sm">{img.title}</p>
                      <p className="text-white/70 text-xs">{img.category}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="max-w-4xl max-h-[80vh] px-12" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].image}
              alt={filtered[lightbox].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-3 font-medium">
              {filtered[lightbox].title}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

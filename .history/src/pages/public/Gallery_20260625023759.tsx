import { useState } from "react";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { useGalleryImages } from "@/hooks/useSchoolData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Events", "Academic", "Sports", "Arts"];

export default function Gallery() {
  const { data: images, loading } = useGalleryImages();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxGroup, setLightboxGroup] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState(0);

  const getImageList = (item: { images?: string[]; image?: string }) => {
    if (Array.isArray(item.images) && item.images.length > 0) {
      return item.images.filter(Boolean);
    }

    if (typeof item.image === "string" && item.image.trim()) {
      return [item.image];
    }

    return [];
  };

  const activeImages = images.filter((img) => img.isActive);
  const filtered =
    activeCategory === "All"
      ? activeImages
      : activeImages.filter((img) => img.category === activeCategory);

  const openLightbox = (groupIndex: number, imageIndex = 0) => {
    setLightboxGroup(groupIndex);
    setLightboxImage(imageIndex);
  };
  const closeLightbox = () => {
    setLightboxGroup(null);
    setLightboxImage(0);
  };

  const currentGroup = lightboxGroup !== null ? filtered[lightboxGroup] : null;
  const currentImages = currentGroup ? getImageList(currentGroup as any) : [];

  const prevImage = () => {
    if (!currentImages.length) return;
    setLightboxImage((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (!currentImages.length) return;
    setLightboxImage((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

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
              {filtered.map((img, index) => {
                const imageList = getImageList(img as any);
                if (imageList.length === 0) return null;

                return (
                  <button
                    key={img.id}
                    onClick={() => openLightbox(index, 0)}
                    className="group relative aspect-square rounded-xl overflow-hidden"
                  >
                    <img
                      src={imageList[0]}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-end">
                      <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-white font-medium text-sm">{img.title}</p>
                        <p className="text-white/70 text-xs">{img.category} • {imageList.length} photo(s)</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxGroup !== null && currentGroup && currentImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div className="flex h-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col rounded-3xl bg-slate-900 shadow-2xl ring-1 ring-white/10">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-white sm:text-lg">
                    {currentGroup.title}
                  </p>
                  <p className="text-sm text-white/65">
                    Image {lightboxImage + 1} of {currentImages.length}
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 items-center gap-2 px-2 py-2 sm:gap-4 sm:px-4 sm:py-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="shrink-0 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>

                <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl px-2 py-2 sm:px-4 sm:py-4">
                  <img
                    src={currentImages[lightboxImage]}
                    alt={currentGroup.title}
                    className="block max-h-full max-w-full object-contain"
                    style={{ maxHeight: "calc(92vh - 180px)" }}
                  />
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="shrink-0 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </div>

              {currentImages.length > 1 && (
                <div className="border-t border-white/10 px-4 py-4 sm:px-6">
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
                    {currentImages.map((image, index) => (
                      <button
                        key={`${currentGroup.id}-${index}`}
                        type="button"
                        onClick={() => setLightboxImage(index)}
                        className={`overflow-hidden rounded-2xl border p-1 transition-all ${
                          lightboxImage === index
                            ? "border-white/10 bg-white/10"
                            : "border-transparent bg-transparent:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex aspect-square items-center justify-center rounded-xl p-2">
                          <img
                            src={image}
                            alt={`${currentGroup.title} thumbnail ${index + 1}`}
                            className="block max-h-full max-w-full object-contain"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

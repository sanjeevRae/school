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
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((img, index) => {
                const imageList = getImageList(img as any);
                if (imageList.length === 0) return null;

                return (
                  <button
                    key={img.id}
                    onClick={() => openLightbox(index, 0)}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={imageList[0]}
                        alt={img.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-90" />
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                        {img.category}
                      </div>
                      {imageList.length > 1 && (
                        <div className="absolute right-4 top-4 rounded-full bg-slate-900/75 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
                          {imageList.length} photos
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="line-clamp-1 text-base font-semibold text-white">{img.title}</p>
                        <p className="mt-1 text-sm text-white/80">Open album</p>
                      </div>
                    </div>
                    {imageList.length > 1 && (
                      <div className="grid grid-cols-3 gap-1 border-t border-slate-100 bg-slate-50 p-2">
                        {imageList.slice(0, 3).map((image, previewIndex) => (
                          <div key={`${img.id}-preview-${previewIndex}`} className="aspect-square overflow-hidden rounded-md bg-slate-200">
                            <img src={image} alt={`${img.title} preview ${previewIndex + 1}`} className="h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
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
          <div className="w-full max-w-6xl px-6 md:px-12" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 bg-black/30 p-4 md:p-6">
                  <div className="flex h-[50vh] min-h-[320px] items-center justify-center overflow-hidden rounded-xl bg-slate-950/40 md:h-[70vh]">
                    <img
                      src={currentImages[lightboxImage]}
                      alt={currentGroup.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <div className="w-full border-t border-white/10 bg-slate-950/40 p-4 text-white lg:w-80 lg:border-l lg:border-t-0">
                  <p className="text-lg font-semibold">{currentGroup.title}</p>
                  <p className="mt-1 text-sm text-white/70">{currentGroup.category}</p>
                  <p className="mt-3 text-sm text-white/80">
                    Image {lightboxImage + 1} of {currentImages.length}
                  </p>

                  {currentImages.length > 1 && (
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
                      {currentImages.map((image, index) => (
                        <button
                          key={`${currentGroup.id}-${index}`}
                          type="button"
                          onClick={() => setLightboxImage(index)}
                          className={`overflow-hidden rounded-lg border transition-all ${
                            lightboxImage === index
                              ? "border-white ring-2 ring-white/40"
                              : "border-white/15 hover:border-white/40"
                          }`}
                        >
                          <img src={image} alt={`${currentGroup.title} thumbnail ${index + 1}`} className="h-20 w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

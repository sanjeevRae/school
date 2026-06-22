import { useState, useEffect, useCallback } from "react";
import { firestore } from "@/lib/firebase/firestore";
import { seedIfEmpty } from "@/lib/firebase/firestore";
import {
  defaultSettings,
  defaultHeroSlides,
  defaultStats,
  defaultCoreValues,
  defaultPrograms,
  defaultBlogPosts,
  defaultPartners,
  defaultTestimonials,
  defaultTeamMembers,
  defaultAdmissionInfo,
  defaultCareerPosts,
  defaultGalleryImages,
} from "@/lib/seedData";
import type {
  SchoolSettings,
  HeroSlide,
  CoreValue,
  Program,
  BlogPost,
  Stat,
  Partner,
  Testimonial,
  TeamMember,
  AdmissionInfo,
  CareerPost,
  GalleryImage,
} from "@/types";

// Generic hook factory for Firestore collections
function useFirestoreCollection<T>(collection: string, seedData?: T[]) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      if (seedData) {
        await seedIfEmpty(collection, seedData);
      }

      // Avoid relying on Firestore orderBy for initial seeded data:
      // if docs are `{}` or missing `order`, ordering can result in empty/unsorted reads.
      const docs = await firestore.getDocs(collection);

      const mapped = docs.map((d) => ({ ...d.data, id: d.id })) as T[];

      // Sort in-memory when `order` exists; otherwise keep stable order.
      mapped.sort((a: any, b: any) => {
        const ao = typeof a?.order === "number" ? a.order : Number.POSITIVE_INFINITY;
        const bo = typeof b?.order === "number" ? b.order : Number.POSITIVE_INFINITY;
        return ao - bo;
      });

      setData(mapped);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [collection, seedData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const add = async (item: Omit<T, "id">) => {
    const id = await firestore.addDoc(collection, item);
    await fetch();
    return id;
  };

  const update = async (id: string, item: Partial<T>) => {
    await firestore.updateDoc(collection, id, item);
    await fetch();
  };

  const remove = async (id: string) => {
    await firestore.deleteDoc(collection, id);
    await fetch();
  };

  return { data, loading, error, refresh: fetch, add, update, remove };
}

function useFirestoreDoc<T>(collection: string, id: string, seedData?: T) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);

      const existing = await firestore.getDoc(collection, id);

      if (!existing && seedData) {
        await firestore.setDoc(collection, id, seedData as any, { merge: false });
      }

      const doc = existing ?? (await firestore.getDoc(collection, id));
      if (doc) {
        setData({ ...doc.data, id: doc.id } as T);
      } else {
        setData(seedData ?? null);
      }

      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [collection, id, seedData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const update = async (item: Partial<T>) => {
    const existing = await firestore.getDoc(collection, id);

    if (!existing) {
      await firestore.setDoc(
        collection,
        id,
        {
          ...(seedData as object | undefined),
          ...(item as object),
        },
        { merge: false },
      );
    } else {
      await firestore.updateDoc(collection, id, item as any);
    }

    await fetch();
  };

  return { data, loading, error, refresh: fetch, update };
}

// Specific hooks for each collection
export function useSettings() {
  return useFirestoreDoc<SchoolSettings>("settings", "main", defaultSettings);
}

export function useHeroSlides() {
  return useFirestoreCollection<HeroSlide>("heroSlides", defaultHeroSlides);
}

export function useStats() {
  return useFirestoreCollection<Stat>("stats", defaultStats);
}

export function useCoreValues() {
  return useFirestoreCollection<CoreValue>("coreValues", defaultCoreValues);
}

export function usePrograms() {
  return useFirestoreCollection<Program>("programs", defaultPrograms);
}

export function useBlogPosts() {
  return useFirestoreCollection<BlogPost>("blogPosts", defaultBlogPosts);
}

export function usePartners() {
  return useFirestoreCollection<Partner>("partners", defaultPartners);
}

export function useTestimonials() {
  return useFirestoreCollection<Testimonial>("testimonials", defaultTestimonials);
}

export function useTeamMembers() {
  return useFirestoreCollection<TeamMember>("teamMembers", defaultTeamMembers);
}

export function useAdmissionInfo() {
  return useFirestoreDoc<AdmissionInfo>("admissionInfo", "admission_main", defaultAdmissionInfo);
}

export function useCareerPosts() {
  return useFirestoreCollection<CareerPost>("careerPosts", defaultCareerPosts);
}

export function useGalleryImages() {
  return useFirestoreCollection<GalleryImage>("galleryImages", defaultGalleryImages);
}

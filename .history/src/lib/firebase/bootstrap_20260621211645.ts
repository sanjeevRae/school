import { USE_MOCK_FIRESTORE } from "./config";
import { firestore } from "./firestore";
import {
  defaultAdmissionInfo,
  defaultBlogPosts,
  defaultCareerPosts,
  defaultCoreValues,
  defaultGalleryImages,
  defaultHeroSlides,
  defaultPartners,
  defaultPrograms,
  defaultSettings,
  defaultStats,
  defaultTeamMembers,
  defaultTestimonials,
} from "@/lib/seedData";

let bootstrapPromise: Promise<void> | null = null;

const seedCollections: Array<{ collection: string; docs: any[] }> = [
  { collection: "settings", docs: [defaultSettings] },
  { collection: "heroSlides", docs: defaultHeroSlides },
  { collection: "stats", docs: defaultStats },
  { collection: "coreValues", docs: defaultCoreValues },
  { collection: "programs", docs: defaultPrograms },
  { collection: "blogPosts", docs: defaultBlogPosts },
  { collection: "partners", docs: defaultPartners },
  { collection: "testimonials", docs: defaultTestimonials },
  { collection: "teamMembers", docs: defaultTeamMembers },
  { collection: "admissionInfo", docs: [defaultAdmissionInfo] },
  { collection: "careerPosts", docs: defaultCareerPosts },
  { collection: "galleryImages", docs: defaultGalleryImages },
];

async function seedCollectionIfEmpty(collection: string, docs: any[]) {
  const existing = await firestore.getDocs(collection);
  if (existing.length > 0) return;

  for (const item of docs) {
    if (item && typeof item === "object" && typeof item.id === "string") {
      await firestore.setDoc(collection, item.id, item, { merge: false });
    } else {
      await firestore.addDoc(collection, item);
    }
  }
}

export function bootstrapWebsiteContent() {
  if (!USE_MOCK_FIRESTORE) {
    return Promise.resolve();
  }

  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      for (const entry of seedCollections) {
        await seedCollectionIfEmpty(entry.collection, entry.docs);
      }
    })().catch((error) => {
      bootstrapPromise = null;
      throw error;
    });
  }

  return bootstrapPromise;
}

import { USE_MOCK_FIRESTORE, firebaseConfig } from "./config";
import { mockFirestore } from "./mockFirestore";

let db: any;

// Initialize Firebase only if credentials are provided
if (!USE_MOCK_FIRESTORE) {
  try {
    const { initializeApp, getApps } = await import("firebase/app");
    const { getFirestore } = await import("firebase/firestore");
    if (!getApps().length) {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
    } else {
      const { getApp } = await import("firebase/app");
      db = getFirestore(getApp());
    }
  } catch (e) {
    console.warn("Firebase init failed, falling back to mock:", e);
  }
}

type WhereFilterOp = "==" | "!=" | "<" | "<=" | ">" | ">=" | "array-contains" | "in" | "array-contains-any";

interface QueryConstraint {
  field: string;
  op: WhereFilterOp;
  value: any;
}

interface OrderConstraint {
  field: string;
  direction: "asc" | "desc";
}

interface QueryOptions {
  where?: QueryConstraint[];
  orderBy?: OrderConstraint[];
  limit?: number;
}

// Unified API that works with both mock and real Firestore
export const firestore = {
  async getDocs(collection: string, options?: QueryOptions): Promise<{ id: string; data: any }[]> {
    if (USE_MOCK_FIRESTORE || !db) {
      return mockFirestore.getDocs(collection, options);
    }
    const { collection: fbCollection, query, where, orderBy, limit, getDocs: fbGetDocs } = await import("firebase/firestore");
    const colRef = fbCollection(db, collection);
    const constraints: any[] = [];

    if (options?.where) {
      for (const w of options.where) {
        constraints.push(where(w.field, w.op, w.value));
      }
    }
    if (options?.orderBy) {
      for (const o of options.orderBy) {
        constraints.push(orderBy(o.field, o.direction));
      }
    }
    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    const q = query(colRef, ...constraints);
    const snapshot = await fbGetDocs(q);
    return snapshot.docs.map((doc: any) => ({ id: doc.id, data: doc.data() }));
  },

  async getDoc(collection: string, id: string): Promise<{ id: string; data: any } | null> {
    if (USE_MOCK_FIRESTORE || !db) {
      return mockFirestore.getDoc(collection, id);
    }
    const { doc: fbDoc, getDoc: fbGetDoc } = await import("firebase/firestore");
    const docRef = fbDoc(db, collection, id);
    const snapshot = await fbGetDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, data: snapshot.data() };
  },

  async addDoc(collection: string, data: any): Promise<string> {
    if (USE_MOCK_FIRESTORE || !db) {
      return mockFirestore.addDoc(collection, data);
    }
    const { collection: fbCollection, addDoc: fbAddDoc } = await import("firebase/firestore");
    const docRef = await fbAddDoc(fbCollection(db, collection), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  },

  async setDoc(
    collection: string,
    id: string,
    data: any,
    options?: { merge?: boolean },
  ): Promise<void> {
    const merge = options?.merge ?? false;

    if (USE_MOCK_FIRESTORE || !db) {
      // mockFirestore.setDoc does full overwrite (no merge)
      return mockFirestore.setDoc(collection, id, data);
    }

    const { doc: fbDoc, setDoc: fbSetDoc } = await import("firebase/firestore");
    const docRef = fbDoc(db, collection, id);
    await fbSetDoc(
      docRef,
      {
        ...data,
        updatedAt: new Date(),
      },
      { merge },
    );
  },

  async updateDoc(collection: string, id: string, data: Partial<any>): Promise<void> {
    if (USE_MOCK_FIRESTORE || !db) {
      return mockFirestore.updateDoc(collection, id, data);
    }
    const { doc: fbDoc, updateDoc: fbUpdateDoc } = await import("firebase/firestore");
    const docRef = fbDoc(db, collection, id);
    await fbUpdateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async deleteDoc(collection: string, id: string): Promise<void> {
    if (USE_MOCK_FIRESTORE || !db) {
      return mockFirestore.deleteDoc(collection, id);
    }
    const { doc: fbDoc, deleteDoc: fbDeleteDoc } = await import("firebase/firestore");
    const docRef = fbDoc(db, collection, id);
    await fbDeleteDoc(docRef);
  },
};

const REQUIRED_FIELDS_BY_COLLECTION: Record<string, string[]> = {
  settings: ["schoolName", "tagline", "address", "email"],
  heroSlides: ["title", "subtitle", "image", "order"],
  stats: ["label", "value", "suffix", "order"],
  coreValues: ["name", "description", "icon", "order"],
  programs: ["title", "slug", "description", "image", "order"],
  blogPosts: ["title", "slug", "excerpt", "content", "image", "publishedAt", "order"],
  partners: ["name", "logo", "website", "order"],
  testimonials: ["name", "role", "content", "image", "order"],
  teamMembers: ["name", "role", "bio", "image", "order"],
  admissionInfo: ["title", "content", "requirements", "process", "fees"],
  careerPosts: ["title", "department", "type", "description", "postedAt", "isActive"],
  galleryImages: ["title", "category", "image", "order", "isActive"],
};

function looksLikeEmptyDoc(data: any, collection: string): boolean {
  if (!data || typeof data !== "object") return true;

  // If we know required fields for the collection, overwrite when any are missing.
  const required = REQUIRED_FIELDS_BY_COLLECTION[collection];
  if (required && required.length) {
    for (const f of required) {
      if (typeof data[f] === "undefined") return true;
    }
    return false;
  }

  // Fallback heuristic for unknown collections:
  const keys = Object.keys(data);
  const meaningfulKeys = keys.filter((k) => !["id", "createdAt", "updatedAt"].includes(k));
  return meaningfulKeys.length === 0;
}

export async function seedIfEmpty(collection: string, defaultData: any[]) {
  const existing = await firestore.getDocs(collection);

  if (existing.length === 0) {
    for (const item of defaultData) {
      await firestore.addDoc(collection, item);
    }
    return;
  }

  // If we have docs, but they’re effectively empty, overwrite deterministically.
  // Important: don’t only inspect the first doc; earlier runs might have created a mix.
  const allEmpty = existing.every((d) => looksLikeEmptyDoc(d.data, collection));
  if (!allEmpty) return;

  const canOverwriteById = defaultData.every(
    (x) => x && typeof x === "object" && typeof (x as any).id === "string",
  );
  if (!canOverwriteById) return;

  for (const item of defaultData) {
    const id = (item as any).id as string;
    await firestore.setDoc(collection, id, item, { merge: false });
  }
}

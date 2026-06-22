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

// Helper to seed initial data if empty OR if documents look "empty" (missing required fields).
// This fixes the case where a seeder created documents with `{}`
// (so `existing.length !== 0` and the previous seedIfEmpty would NOT overwrite).
function looksLikeEmptyDoc(data: any): boolean {
  if (!data || typeof data !== "object") return true;

  const keys = Object.keys(data);

  // Common scenario: document only contains `{ id: ..., updatedAt: ... }` or nothing useful.
  // Treat as empty if there are 0 meaningful fields besides id/updatedAt/createdAt.
  const meaningfulKeys = keys.filter((k) => !["id", "createdAt", "updatedAt"].includes(k));
  if (meaningfulKeys.length === 0) return true;

  // If default data expects `image` or `title` for many collections but they are missing, consider empty.
  // (Heuristic; safe because it only triggers overwrite on clearly empty docs.)
  if (typeof data.image === "undefined" && typeof data.title === "undefined" && typeof data.aboutText === "undefined") {
    // still could be a doc type without these fields, so we only mark empty if it has very few keys
    if (meaningfulKeys.length <= 2) return true;
  }

  return false;
}

export async function seedIfEmpty(collection: string, defaultData: any[]) {
  const existing = await firestore.getDocs(collection);
  if (existing.length === 0) {
    for (const item of defaultData) {
      await firestore.addDoc(collection, item);
    }
    return;
  }

  // If first doc appears empty, overwrite with defaults deterministically.
  const first = existing[0]?.data;
  if (!looksLikeEmptyDoc(first)) return;

  // overwrite by doc id:
  // - for collections where defaults are arrays with items containing `id`, overwrite by that id
  // - otherwise fall back to previous behavior (addDoc)
  const canOverwriteById = defaultData.every((x) => x && typeof x === "object" && typeof x.id === "string");
  if (!canOverwriteById) return;

  for (const item of defaultData) {
    const id = item.id;
    // merge:false => full replace
    await firestore.setDoc(collection, id, item, { merge: false });
  }
}

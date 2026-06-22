// Mock Firestore implementation using localStorage
// Provides full CRUD functionality without requiring Firebase credentials

type DocumentData = Record<string, any>;
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

function getCollectionKey(collection: string): string {
  return `mock_firestore_${collection}`;
}

function getCollection(collection: string): Map<string, DocumentData> {
  const key = getCollectionKey(collection);
  const raw = localStorage.getItem(key);
  if (!raw) return new Map();
  try {
    const parsed = JSON.parse(raw);
    return new Map(Object.entries(parsed));
  } catch {
    return new Map();
  }
}

function saveCollection(collection: string, data: Map<string, DocumentData>) {
  const key = getCollectionKey(collection);
  const obj: Record<string, DocumentData> = {};
  data.forEach((val, k) => {
    obj[k] = val;
  });
  localStorage.setItem(key, JSON.stringify(obj));
}

function matchesFilter(doc: DocumentData, constraint: QueryConstraint): boolean {
  const val = doc[constraint.field];
  switch (constraint.op) {
    case "==": return val === constraint.value;
    case "!=": return val !== constraint.value;
    case "<": return val < constraint.value;
    case "<=": return val <= constraint.value;
    case ">": return val > constraint.value;
    case ">=": return val >= constraint.value;
    case "array-contains": return Array.isArray(val) && val.includes(constraint.value);
    case "in": return Array.isArray(constraint.value) && constraint.value.includes(val);
    case "array-contains-any": return Array.isArray(val) && Array.isArray(constraint.value) && constraint.value.some((v: any) => val.includes(v));
    default: return true;
  }
}

export class MockFirestore {
  async getDocs(collection: string, options?: QueryOptions): Promise<{ id: string; data: DocumentData }[]> {
    let results: { id: string; data: DocumentData }[] = [];
    const coll = getCollection(collection);

    coll.forEach((data, id) => {
      results.push({ id, data: { ...data } });
    });

    if (options?.where) {
      for (const constraint of options.where) {
        results = results.filter((r) => matchesFilter(r.data, constraint));
      }
    }

    if (options?.orderBy) {
      for (const order of options.orderBy) {
        results.sort((a, b) => {
          const aVal = a.data[order.field];
          const bVal = b.data[order.field];
          if (aVal < bVal) return order.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return order.direction === "asc" ? 1 : -1;
          return 0;
        });
      }
    }

    if (options?.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  async getDoc(collection: string, id: string): Promise<{ id: string; data: DocumentData } | null> {
    const coll = getCollection(collection);
    const data = coll.get(id);
    if (!data) return null;
    return { id, data: { ...data } };
  }

  async addDoc(collection: string, data: DocumentData): Promise<string> {
    const id = data.id || `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const coll = getCollection(collection);
    coll.set(id, {
      ...data,
      id,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
    });
    saveCollection(collection, coll);
    return id;
  }

  async setDoc(collection: string, id: string, data: DocumentData): Promise<void> {
    const coll = getCollection(collection);
    const existing = coll.get(id) || {};
    coll.set(id, {
      ...existing,
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    });
    saveCollection(collection, coll);
  }

  async updateDoc(collection: string, id: string, data: Partial<DocumentData>): Promise<void> {
    const coll = getCollection(collection);
    const existing = coll.get(id);
    if (!existing) throw new Error(`Document ${id} not found in ${collection}`);
    coll.set(id, {
      ...existing,
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    });
    saveCollection(collection, coll);
  }

  async deleteDoc(collection: string, id: string): Promise<void> {
    const coll = getCollection(collection);
    coll.delete(id);
    saveCollection(collection, coll);
  }

  async query(collection: string, field: string, op: WhereFilterOp, value: any): Promise<{ id: string; data: DocumentData }[]> {
    return this.getDocs(collection, { where: [{ field, op, value }] });
  }
}

export const mockFirestore = new MockFirestore();

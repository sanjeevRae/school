/*
  Import data from the browser localStorage mock Firestore into Firebase Firestore.

  Usage (after you export localStorage to a JSON file):
    1) Create mock_export.json by running the export snippet in the browser console:

       const keys = Object.keys(localStorage).filter(k => k.startsWith('mock_firestore_'));
       const out = {};
       for (const k of keys) {
         out[k.replace('mock_firestore_','')] = JSON.parse(localStorage.getItem(k) || '{}');
       }
       JSON.stringify(out)

     Then save it as mock_export.json.

    2) Ensure env var is set in your shell:
       FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON='{"project_id":...}'

    3) Run:
       node --loader ts-node/esm scripts/import-mock-firestore-to-firebase.ts mock_export.json

  Note: This script expects Node environment with firebase-admin installed.
*/

import fs from "node:fs";
import path from "node:path";

import admin from "firebase-admin";
import type { Firestore } from "firebase-admin/firestore";

import { seedAllData } from "../src/lib/seedData";

/**
 * NOTE:
 * This script overwrites documents (merge: false) so repeated runs are deterministic.
 *
 * Usage:
 *  - To overwrite using exported localStorage mock JSON:
 *      node --loader ts-node/esm scripts/import-mock-firestore-to-firebase.ts mock_export.json
 *
 *  - To overwrite Firestore with dummy data ONCE (your current request):
 *      node --loader ts-node/esm scripts/import-mock-firestore-to-firebase.ts
 */

type ExportedData = Record<string, Record<string, Record<string, any>>>;

type SeedFn = (collection: string, data: any[]) => Promise<void>;

function readExport(filePath: string): ExportedData {
  const abs = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(abs, "utf-8");
  return JSON.parse(raw) as ExportedData;
}

function getServiceAccountFromEnv(): any {
  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error(
      "Missing env var FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON (Firebase Admin service account JSON).",
    );
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(
      "FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON is not valid JSON. Ensure it is a single-line JSON string.",
    );
  }
}

function getAdminFirestore(): Firestore {
  if (admin.apps.length === 0) {
    const serviceAccount = getServiceAccountFromEnv();
    admin.initializeApp({
      credential: (admin.credential as any).cert(serviceAccount),
    });
  }

  return admin.firestore();
}

function stripMockId(data: Record<string, any>) {
  // LocalStorage mock documents often store { id: "docId", ...data }.
  // Firestore doc IDs are set explicitly by docRef.id, so remove `id` field.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _ignoredId, ...rest } = data;
  return rest;
}

async function overwriteFromExport(
  firestore: Firestore,
  exported: ExportedData,
) {
  const collections = Object.keys(exported);
  if (collections.length === 0) {
    console.log("No collections found in export.");
    return;
  }

  for (const collection of collections) {
    const docs = exported[collection];
    const docIds = Object.keys(docs);

    console.log(`Importing ${collection}: ${docIds.length} docs...`);

    const batch = firestore.batch();
    let ops = 0;

    for (const id of docIds) {
      const data = docs[id] || {};
      const ref = firestore.collection(collection).doc(id);

      batch.set(ref, stripMockId(data), { merge: false });

      ops++;
      if (ops >= 450) {
        await batch.commit();
        ops = 0;
      }
    }

    if (ops > 0) {
      await batch.commit();
    }
  }
}

async function overwriteFromDummyData(
  firestore: Firestore,
) {
  console.log("Firestore export not provided; overwriting with dummy collections from src/lib/seedData.ts ...");

  // seedAllData expects a seedFn(collection, data[])
  const seedFn: SeedFn = async (collection, items) => {
    const batch = firestore.batch();
    let ops = 0;

    for (const item of items) {
      const id = (item as any).id as string | undefined;
      if (!id) continue;

      const ref = firestore.collection(collection).doc(id);
      batch.set(ref, stripMockId(item as any), { merge: false });

      ops++;
      if (ops >= 450) {
        await batch.commit();
        ops = 0;
      }
    }

    if (ops > 0) {
      await batch.commit();
    }
  };

  await seedAllData(seedFn);
}

async function main() {
  const input = process.argv[2];

  const firestore = getAdminFirestore();

  if (input) {
    const exported = readExport(input);
    await overwriteFromExport(firestore, exported);
  } else {
    await overwriteFromDummyData(firestore);
  }

  console.log("Import/seed completed (overwrite semantics enabled).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


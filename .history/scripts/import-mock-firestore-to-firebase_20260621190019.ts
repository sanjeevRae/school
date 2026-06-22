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
import { fileURLToPath } from "node:url";

import admin from "firebase-admin";
import { getFirebaseAdminFirestore } from "./util-firebaseAdminFirestore";

type ExportedData = Record<
  string,
  Record<
    string,
    Record<string, any>
  >
>;

function readExport(filePath: string): ExportedData {
  const abs = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(abs, "utf-8");
  return JSON.parse(raw) as ExportedData;
}

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("Missing argument: mock_export.json path");
    process.exit(1);
  }

  const exported = readExport(input);
  const firestore = await getFirebaseAdminFirestore();

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

      // Firestore doc ref
      const ref = firestore.collection(collection).doc(id);

      // Ensure we don't store mock internal fields that might confuse UI.
      // Keep everything else as-is.
      const { id: _ignoredId, ...rest } = data;

      batch.set(ref, {
        ...rest,
        // keep timestamps as-is; admin SDK will store strings/numbers as fields
      }, { merge: true });

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

  console.log("Import completed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


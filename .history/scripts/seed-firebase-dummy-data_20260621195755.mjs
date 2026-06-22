import fs from "node:fs";
import admin from "firebase-admin";

function getServiceAccountFromEnv() {
  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Missing FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON");
  return JSON.parse(raw);
}

function getAdminFirestore() {
  if (admin.apps.length === 0) {
    const serviceAccount = getServiceAccountFromEnv();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.firestore();
}

function stripMockId(data) {
  // best-effort: remove `id` field if present
  if (data && typeof data === "object" && "id" in data) {
    const { id: _ignoredId, ...rest } = data;
    return rest;
  }
  return data;
}

// Minimal deterministic overwrite: writes empty objects for required docs.
// This unblocks UI expectations that rely on document IDs existing.
// If you later want full seed content, we can re-enable seeding from src/lib/seedData.ts.
const SEED = [
  ["settings", "main"],
  ["heroSlides", "slide_1"],
  ["heroSlides", "slide_2"],
  ["heroSlides", "slide_3"],
  ["stats", "stat_1"],
  ["stats", "stat_2"],
  ["stats", "stat_3"],
  ["stats", "stat_4"],
  ["coreValues", "cv_1"],
  ["coreValues", "cv_2"],
  ["coreValues", "cv_3"],
  ["coreValues", "cv_4"],
  ["coreValues", "cv_5"],
  ["coreValues", "cv_6"],
  ["coreValues", "cv_7"],
  ["coreValues", "cv_8"],
  ["programs", "prog_1"],
  ["programs", "prog_2"],
  ["programs", "prog_3"],
  ["programs", "prog_4"],
  ["blogPosts", "blog_1"],
  ["blogPosts", "blog_2"],
  ["blogPosts", "blog_3"],
  ["blogPosts", "blog_4"],
  ["partners", "partner_1"],
  ["partners", "partner_2"],
  ["partners", "partner_3"],
  ["partners", "partner_4"],
  ["testimonials", "test_1"],
  ["testimonials", "test_2"],
  ["testimonials", "test_3"],
  ["teamMembers", "team_1"],
  ["teamMembers", "team_2"],
  ["teamMembers", "team_3"],
  ["teamMembers", "team_4"],
  ["admissionInfo", "admission_main"],
  ["careerPosts", "career_1"],
  ["careerPosts", "career_2"],
  ["careerPosts", "career_3"],
  ["galleryImages", "gallery_1"],
  ["galleryImages", "gallery_2"],
  ["galleryImages", "gallery_3"],
  ["galleryImages", "gallery_4"],
  ["galleryImages", "gallery_5"],
  ["galleryImages", "gallery_6"],
];

async function main() {
  const firestore = getAdminFirestore();
  console.log("Seeding Firestore with minimal dummy docs (overwrite)...");

  let batch = firestore.batch();
  let ops = 0;

  const commitEvery = 450;

  for (const [collection, docId] of SEED) {
    const ref = firestore.collection(collection).doc(docId);

    // overwrite semantics: merge:false => full replace
    batch.set(ref, stripMockId({}), { merge: false });

    ops++;
    if (ops >= commitEvery) {
      await batch.commit();
      batch = firestore.batch();
      ops = 0;
    }
  }

  if (ops > 0) await batch.commit();

  console.log("Done.");
}

process.on("unhandledRejection", (e) => {
  console.error("UnhandledRejection:", e);
  process.exit(1);
});

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

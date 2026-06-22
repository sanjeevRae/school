import admin from "firebase-admin";

const {
  defaultSettings,
  defaultHeroSlides,
  defaultStats,
  defaultCoreValues,
  defaultPartners,
  defaultTestimonials,
  defaultTeamMembers,
  defaultCareerPosts,
} = await import("../dist-seed/seedData.js");

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
  if (data && typeof data === "object" && "id" in data) {
    const { id: _ignoredId, ...rest } = data;
    return rest;
  }
  return data;
}

const SEED_COLLECTIONS = {
  settings: [defaultSettings],
  heroSlides: defaultHeroSlides,
  stats: defaultStats,
  coreValues: defaultCoreValues,
  testimonials: defaultTestimonials,
  teamMembers: defaultTeamMembers,
  careerPosts: defaultCareerPosts,
  partners: defaultPartners,
};

async function seedCollection(firestore, collection, docs) {
  let batch = firestore.batch();
  let ops = 0;

  for (const item of docs) {
    const id = item?.id;
    if (!id) continue;

    const ref = firestore.collection(collection).doc(id);
    batch.set(ref, stripMockId(item), { merge: false });
    ops++;

    if (ops >= 450) {
      await batch.commit();
      batch = firestore.batch();
      ops = 0;
    }
  }

  if (ops > 0) {
    await batch.commit();
  }
}

async function main() {
  const firestore = getAdminFirestore();
  console.log("Seeding Firestore with dummy content from existing seed files...");

  for (const [collection, docs] of Object.entries(SEED_COLLECTIONS)) {
    console.log(`Writing ${collection} (${docs.length} docs)`);
    await seedCollection(firestore, collection, docs);
  }

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

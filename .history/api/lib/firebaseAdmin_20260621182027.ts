import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function getServiceAccountFromEnv(): any {
  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error(
      "Missing env var FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON (Firebase Admin service account JSON).",
    );
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(
      "FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON is not valid JSON. Ensure it is a single-line JSON string.",
    );
  }
}

let adminAppInitialized = false;

export function getFirebaseAdminAuth() {
  if (!adminAppInitialized) {
    const serviceAccount = getServiceAccountFromEnv();

    // Only initialize once
    const apps = getApps();
    if (apps.length === 0) {
      initializeApp({
        credential: (require("firebase-admin").credential as any).cert(
          serviceAccount,
        ),
      });
    }

    adminAppInitialized = true;
  }

  return getAuth();
}


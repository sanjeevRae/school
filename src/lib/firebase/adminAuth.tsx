import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { firebaseConfig, USE_REAL_FIREBASE } from "./config";
import { Navigate } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";

const app = USE_REAL_FIREBASE
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null;

export const adminAuth = app ? getAuth(app) : null;

export async function signInAdmin(email: string, password: string) {
  if (!adminAuth) {
    throw new Error("Firebase Auth is not configured. Add real VITE_FIREBASE_* values first.");
  }

  const credential = await signInWithEmailAndPassword(adminAuth, email, password);
  return credential.user;
}

export async function signOutAdmin() {
  if (!adminAuth) {
    return;
  }

  await signOut(adminAuth);
}

export function useAdminAuthState() {
  const [user, setUser] = useState<User | null>(() => adminAuth?.currentUser ?? null);
  const [loading, setLoading] = useState<boolean>(!!adminAuth);

  useEffect(() => {
    if (!adminAuth) {
      setLoading(false);
      setUser(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(adminAuth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}

export function RequireAdminAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAdminAuthState();

  if (!USE_REAL_FIREBASE) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner className="h-8 w-8 text-slate-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

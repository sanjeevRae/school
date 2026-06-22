import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { getFirebaseAdminAuth } from "./lib/firebaseAdmin";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: Pick<User, "role">;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  const authHeader = opts.req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : "";

  if (!token) return ctx;

  try {
    const decoded = await getFirebaseAdminAuth().verifyIdToken(token);

    // Custom claims set via Firebase Admin customClaims, e.g. { role: "admin" }
    const role = decoded.role as string | undefined;
    if (!role) return ctx;

    ctx.user = { role };
  } catch {
    // Authentication is optional here
  }

  return ctx;
}


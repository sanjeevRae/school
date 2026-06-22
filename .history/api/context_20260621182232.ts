import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { getFirebaseAdminAuth } from "./lib/firebaseAdmin";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: Pick<User, "id" | "name" | "email" | "role" | "avatar">;
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
    const role = decoded.role;
    if (!role) return ctx;

    if (role !== "user" && role !== "admin") return ctx;

    // id token claims can include custom fields like name/email/avatar
    const name = decoded.name as string | undefined;
    const email = decoded.email as string | undefined;
    const avatar = decoded.avatar as string | undefined;
    const id = decoded.user_id as string | undefined;

    if (!id) return ctx;

    ctx.user = {
      id: id as any,
      name: name ?? null,
      email: email ?? null,
      avatar: avatar ?? null,
      role,
    };



  } catch {
    // Authentication is optional here
  }

  return ctx;
}


import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// Type exports for Cloudflare environment
export type CloudflareEnv = {
  DB: any; // D1Database type from Cloudflare runtime
  CRON_SECRET?: string;
};

// For use in Next.js on Cloudflare Pages
// D1 binding is passed via context in the runtime

export function getDb(db: any) {
  return drizzle(db, { schema });
}

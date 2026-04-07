import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  // Use better-sqlite3 for local migrations during development
  // Production will use D1 via Cloudflare workers
});

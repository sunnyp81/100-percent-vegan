import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { fetchProductsFromOFF } from "../src/lib/fetch-logic";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client);

const pages = parseInt(process.argv[2] || "5");
console.log(`Fetching ${pages} pages from Open Food Facts...`);

fetchProductsFromOFF(db, pages).then((result) => {
  console.log(`Done: ${result.inserted} inserted, ${result.skipped} skipped`);
  if (result.error) console.error("Error:", result.error);
  process.exit(0);
});

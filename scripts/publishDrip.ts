import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { dripPublishProducts } from "../src/lib/drip-logic";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client);

dripPublishProducts(db).then((result) => {
  console.log(`Published ${result.published} products`);
  process.exit(0);
});

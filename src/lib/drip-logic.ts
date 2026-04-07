import { drizzle } from "drizzle-orm/d1";
import { products } from "./schema";
import { eq, sql } from "drizzle-orm";

const MIN_DRIP = 10;
const MAX_DRIP = 25;

export async function dripPublishProducts(db: D1Database) {
  const drizzleDb = drizzle(db);

  // Random count between MIN_DRIP and MAX_DRIP
  const count = Math.floor(Math.random() * (MAX_DRIP - MIN_DRIP + 1)) + MIN_DRIP;

  // Select random drafts
  const drafts = await drizzleDb
    .select({ id: products.id, name: products.name })
    .from(products)
    .where(eq(products.publishStatus, "draft"))
    .orderBy(sql`RANDOM()`)
    .limit(count)
    .all();

  if (drafts.length === 0) {
    return { published: 0 };
  }

  // Publish selected drafts
  for (const draft of drafts) {
    await drizzleDb
      .update(products)
      .set({
        publishStatus: "published",
        publishDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(products.id, draft.id));
  }

  return { published: drafts.length };
}

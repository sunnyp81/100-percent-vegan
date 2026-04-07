import { products } from "./schema";
import { eq, sql } from "drizzle-orm";

const MIN_DRIP = 10;
const MAX_DRIP = 25;

export async function dripPublishProducts(db: any) {
  const count = Math.floor(Math.random() * (MAX_DRIP - MIN_DRIP + 1)) + MIN_DRIP;

  const drafts = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.publishStatus, "draft"))
    .orderBy(sql`RANDOM()`)
    .limit(count)
    .all();

  for (const draft of drafts) {
    await db
      .update(products)
      .set({ publishStatus: "published", publishDate: new Date(), updatedAt: new Date() })
      .where(eq(products.id, draft.id));
  }

  return { published: drafts.length };
}

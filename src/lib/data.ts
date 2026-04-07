import { eq, desc, like, or, and, sql } from "drizzle-orm";
import { products } from "./schema";

export type DB = any;

export async function getPublishedProduct(db: DB, barcode: string) {
  const result = await db
    .select()
    .from(products)
    .where(
      and(eq(products.barcode, barcode), eq(products.publishStatus, "published"))
    )
    .get();
  return result || null;
}

export async function getRecentProducts(db: DB, limit = 20) {
  return db
    .select()
    .from(products)
    .where(eq(products.publishStatus, "published"))
    .orderBy(desc(products.publishDate))
    .limit(limit)
    .all();
}

export async function searchProducts(db: DB, query: string, limit = 20) {
  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.publishStatus, "published"),
        or(
          like(products.name, `%${query}%`),
          like(products.brand, `%${query}%`),
          like(products.barcode, `%${query}%`)
        )
      )
    )
    .limit(limit)
    .all();
}

export async function getAllPublishedBarcodes(db: DB) {
  const results = await db
    .select({ barcode: products.barcode })
    .from(products)
    .where(eq(products.publishStatus, "published"))
    .all();
  return results.map((r: any) => r.barcode);
}

export async function getPublishedCount(db: DB) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(eq(products.publishStatus, "published"))
    .get();
  return result?.count ?? 0;
}

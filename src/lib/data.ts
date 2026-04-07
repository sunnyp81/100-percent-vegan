import { eq, desc, like, or, and, sql } from "drizzle-orm";
import { products } from "./schema";
import { db } from "./db";

export async function getPublishedProduct(dbInstance: typeof db, barcode: string) {
  return dbInstance
    .select()
    .from(products)
    .where(and(eq(products.barcode, barcode), eq(products.publishStatus, "published")))
    .get();
}

export async function getRecentProducts(dbInstance: typeof db, limit = 20) {
  return dbInstance
    .select()
    .from(products)
    .where(eq(products.publishStatus, "published"))
    .orderBy(desc(products.publishDate))
    .limit(limit)
    .all();
}

export async function searchProducts(dbInstance: typeof db, query: string, limit = 20) {
  return dbInstance
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

export async function getAllPublishedBarcodes(dbInstance: typeof db) {
  const results = await dbInstance
    .select({ barcode: products.barcode })
    .from(products)
    .where(eq(products.publishStatus, "published"))
    .all();
  return results.map((r) => r.barcode);
}

export async function getPublishedCount(dbInstance: typeof db) {
  const result = await dbInstance
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(eq(products.publishStatus, "published"))
    .get();
  return result?.count ?? 0;
}

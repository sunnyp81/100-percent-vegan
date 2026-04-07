import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  barcode: text("barcode").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand"),
  imageUrl: text("image_url"),
  ingredientsText: text("ingredients_text").notNull(),
  veganStatus: text("vegan_status", { enum: ["YES", "NO", "MAYBE"] }).notNull(),
  nonVeganIngredients: text("non_vegan_ingredients").notNull().default("[]"),
  categories: text("categories"),
  publishStatus: text("publish_status", { enum: ["draft", "published"] })
    .notNull()
    .default("draft"),
  publishDate: integer("publish_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

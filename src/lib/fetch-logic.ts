import { drizzle } from "drizzle-orm/d1";
import { products } from "./schema";
import { checkVegan } from "./vegan-checker";
import { eq } from "drizzle-orm";

interface OFFProduct {
  code: string;
  product_name: string;
  brands?: string;
  image_front_url?: string;
  ingredients_text_en?: string;
  ingredients_text?: string;
  categories_tags?: string[];
}

interface FetchResult {
  inserted: number;
  skipped: number;
  error?: string;
}

export async function fetchProductsFromOFF(
  db: D1Database,
  pages: number = 1
): Promise<FetchResult> {
  let inserted = 0;
  let skipped = 0;

  const drizzleDb = drizzle(db);
  const API_BASE = "https://world.openfoodfacts.org/cgi/search.pl";
  const pageSize = 100;

  for (let page = 1; page <= pages; page++) {
    try {
      const params = new URLSearchParams({
        action: "process",
        tagtype_0: "countries",
        tag_contains_0: "contains",
        tag_0: "united-kingdom",
        fields:
          "code,product_name,brands,image_front_url,ingredients_text_en,ingredients_text,categories_tags",
        page_size: String(pageSize),
        page: String(page),
        json: "true",
      });

      const url = `${API_BASE}?${params}`;
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "100PercentVegan/1.0 (+https://100percentvegan.co.uk)",
        },
      });

      if (!response.ok) {
        throw new Error(`OFF API returned ${response.status}`);
      }

      const data: { products: OFFProduct[] } = await response.json();

      for (const product of data.products) {
        if (!product.code || !product.product_name) continue;

        const ingredientsText =
          product.ingredients_text_en || product.ingredients_text;
        if (!ingredientsText) continue;

        const vegan = checkVegan(ingredientsText);

        try {
          // Insert with ON CONFLICT (barcode) DO NOTHING equivalent in D1
          const existing = await drizzleDb
            .select()
            .from(products)
            .where(eq(products.barcode, product.code))
            .get();

          if (!existing) {
            await drizzleDb.insert(products).values({
              barcode: product.code,
              name: product.product_name,
              brand: product.brands || null,
              imageUrl: product.image_front_url || null,
              ingredientsText: ingredientsText,
              veganStatus: vegan.status,
              nonVeganIngredients: JSON.stringify(vegan.flaggedIngredients),
              categories: product.categories_tags?.join(",") || null,
              publishStatus: "draft",
            });
            inserted++;
          } else {
            skipped++;
          }
        } catch (err) {
          skipped++;
        }
      }

      // Rate limiting per OFF guidelines
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (err) {
      console.error(`Error fetching page ${page}:`, err);
      return {
        inserted,
        skipped,
        error: `Failed at page ${page}: ${err}`,
      };
    }
  }

  return { inserted, skipped };
}

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

export async function fetchProductsFromOFF(db: any, pages: number = 1) {
  let inserted = 0;
  let skipped = 0;

  const API_BASE = "https://world.openfoodfacts.org/cgi/search.pl";

  for (let page = 1; page <= pages; page++) {
    try {
      const params = new URLSearchParams({
        action: "process",
        tagtype_0: "countries",
        tag_contains_0: "contains",
        tag_0: "united-kingdom",
        fields: "code,product_name,brands,image_front_url,ingredients_text_en,ingredients_text,categories_tags",
        page_size: "100",
        page: String(page),
        json: "true",
      });

      const response = await fetch(`${API_BASE}?${params}`, {
        headers: { "User-Agent": "100PercentVegan/1.0 (+https://100percentvegan.co.uk)" },
      });

      if (!response.ok) throw new Error(`OFF API returned ${response.status}`);

      const data = (await response.json()) as { products: OFFProduct[] };

      for (const product of data.products) {
        if (!product.code || !product.product_name) continue;
        const ingredientsText = product.ingredients_text_en || product.ingredients_text;
        if (!ingredientsText) continue;

        const vegan = checkVegan(ingredientsText);

        try {
          const existing = await db
            .select({ id: products.id })
            .from(products)
            .where(eq(products.barcode, product.code))
            .get();

          if (!existing) {
            await db.insert(products).values({
              barcode: product.code,
              name: product.product_name,
              brand: product.brands || null,
              imageUrl: product.image_front_url || null,
              ingredientsText,
              veganStatus: vegan.status,
              nonVeganIngredients: JSON.stringify(vegan.flaggedIngredients),
              categories: product.categories_tags?.join(",") || null,
              publishStatus: "draft",
            });
            inserted++;
          } else {
            skipped++;
          }
        } catch {
          skipped++;
        }
      }

      await new Promise((r) => setTimeout(r, 100));
    } catch (error) {
      return { inserted, skipped, error: String(error) };
    }
  }

  return { inserted, skipped };
}

import { NextRequest, NextResponse } from "next/server";
import { getRecentProducts } from "@/lib/data";
import { drizzle } from "drizzle-orm/d1";
import type { CloudflareEnv } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const env = (process.env as any) as CloudflareEnv;
    if (!env.DB) {
      return NextResponse.json({ products: [] });
    }

    const db = drizzle(env.DB);
    const products = await getRecentProducts(db, 20);

    return NextResponse.json({
      products: products.map((p: any) => ({
        ...p,
        nonVeganIngredients: JSON.parse(p.nonVeganIngredients as string),
      })),
    });
  } catch (error) {
    console.error("Recent products error:", error);
    return NextResponse.json({ products: [], error: String(error) }, { status: 200 });
  }
}

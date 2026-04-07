import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/data";
import { drizzle } from "drizzle-orm/d1";
import type { CloudflareEnv } from "@/lib/db";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";

  if (!query || query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    const env = (process.env as any) as CloudflareEnv;
    if (!env.DB) {
      return NextResponse.json(
        { error: "Database not configured", products: [] },
        { status: 200 }
      );
    }

    const db = drizzle(env.DB);
    const products = await searchProducts(db, query, 10);

    return NextResponse.json({
      products: products.map((p: any) => ({
        ...p,
        nonVeganIngredients: JSON.parse(p.nonVeganIngredients as string),
      })),
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ products: [], error: String(error) }, { status: 200 });
  }
}

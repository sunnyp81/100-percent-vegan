import { NextRequest, NextResponse } from "next/server";
import { getPublishedProduct } from "@/lib/data";
import { drizzle } from "drizzle-orm/d1";
import type { CloudflareEnv } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ barcode: string }> }
) {
  const { barcode } = await params;

  try {
    const env = (process.env as any) as CloudflareEnv;
    if (!env.DB) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const db = drizzle(env.DB);
    const product = await getPublishedProduct(db, barcode);

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...(product as any),
      nonVeganIngredients: JSON.parse(
        (product as any).nonVeganIngredients as string
      ),
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

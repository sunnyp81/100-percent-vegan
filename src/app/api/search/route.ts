import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/data";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";

  if (!query || query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await searchProducts(db, query, 10);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ products: [] }, { status: 200 });
  }
}

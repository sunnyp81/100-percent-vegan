import { NextResponse } from "next/server";
import { getRecentProducts } from "@/lib/data";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const products = await getRecentProducts(db, 20);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Recent products error:", error);
    return NextResponse.json({ products: [] }, { status: 200 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { fetchProductsFromOFF } from "@/lib/fetch-logic";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = process.env.ADMIN_TOKEN || "dev-token";

  if (!authHeader?.startsWith(`Bearer ${token}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pages = parseInt(request.nextUrl.searchParams.get("pages") || "1");
  const pageCount = Math.min(pages, 10);

  try {
    const result = await fetchProductsFromOFF(db, pageCount);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: String(error), success: false }, { status: 500 });
  }
}

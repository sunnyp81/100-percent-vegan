import { NextRequest, NextResponse } from "next/server";
import { fetchProductsFromOFF } from "@/lib/fetch-logic";
import type { CloudflareEnv } from "@/lib/db";

export async function GET(request: NextRequest) {
  // Security: check auth in production
  const authHeader = request.headers.get("authorization");
  const token = process.env.ADMIN_TOKEN || "dev-token";

  if (!authHeader?.startsWith(`Bearer ${token}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pages = request.nextUrl.searchParams.get("pages") || "1";
  const pageCount = Math.min(parseInt(pages), 10); // Cap at 10 pages per request

  try {
    // Get D1 binding from Cloudflare context
    const env = (process.env as any) as CloudflareEnv;
    if (!env.DB) {
      return NextResponse.json(
        { error: "D1 database not configured" },
        { status: 500 }
      );
    }

    const result = await fetchProductsFromOFF(env.DB, pageCount);

    return NextResponse.json({
      success: true,
      ...result,
      message: `Fetched ${pageCount} pages: ${result.inserted} inserted, ${result.skipped} skipped`,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: String(error), success: false },
      { status: 500 }
    );
  }
}

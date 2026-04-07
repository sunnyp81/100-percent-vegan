import { NextRequest, NextResponse } from "next/server";
import { dripPublishProducts } from "@/lib/drip-logic";
import type { CloudflareEnv } from "@/lib/db";

export async function POST(request: NextRequest) {
  // Cloudflare Cron Trigger validation
  const cronSecret = request.headers.get("cf-cron");
  const envSecret = process.env.CRON_SECRET;

  if (!envSecret || cronSecret !== envSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get D1 binding from Cloudflare context
    const env = (process.env as any) as CloudflareEnv;
    if (!env.DB) {
      return NextResponse.json(
        { error: "D1 database not configured" },
        { status: 500 }
      );
    }

    const result = await dripPublishProducts(env.DB);

    return NextResponse.json({
      success: true,
      ...result,
      message: `Published ${result.published} products at ${new Date().toISOString()}`,
    });
  } catch (error) {
    console.error("Drip error:", error);
    return NextResponse.json(
      { error: String(error), success: false },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

const MIN_DRIP = 10;
const MAX_DRIP = 25;

export async function POST(request: NextRequest) {
  const cronSecret = request.headers.get("x-cron-secret");
  if (!process.env.CRON_SECRET || cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const count = Math.floor(Math.random() * (MAX_DRIP - MIN_DRIP + 1)) + MIN_DRIP;

    const drafts = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.publishStatus, "draft"))
      .orderBy(sql`RANDOM()`)
      .limit(count);

    for (const draft of drafts) {
      await db
        .update(products)
        .set({ publishStatus: "published", publishDate: new Date(), updatedAt: new Date() })
        .where(eq(products.id, draft.id));
    }

    return NextResponse.json({ success: true, published: drafts.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

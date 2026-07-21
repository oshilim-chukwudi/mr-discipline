import { NextResponse } from "next/server";
import { createDigitalProductCheckoutUrl } from "../../../../lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const priceId = process.env.STRIPE_LAWS_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "30 Laws of Discipline checkout is not configured yet." },
      { status: 500 }
    );
  }

  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  try {
    const url = await createDigitalProductCheckoutUrl({ priceId, slug: "laws", origin });
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

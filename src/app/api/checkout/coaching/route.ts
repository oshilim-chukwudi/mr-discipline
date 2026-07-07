import { NextResponse } from "next/server";
import { getStripe } from "../../../../lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const priceId = process.env.STRIPE_COACHING_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "Coaching checkout is not configured yet." },
      { status: 500 }
    );
  }

  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { product_slug: "coaching" },
      subscription_data: { metadata: { product_slug: "coaching" } },
      success_url: `${origin}/program/coaching/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

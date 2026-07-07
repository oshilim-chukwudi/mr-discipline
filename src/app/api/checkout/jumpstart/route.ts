import { NextResponse } from "next/server";
import { getStripe } from "../../../../lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const priceId = process.env.STRIPE_JUMPSTART_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "JumpStart checkout is not configured yet." },
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
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { program_slug: "jumpstart" },
      success_url: `${origin}/program/jumpstart/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

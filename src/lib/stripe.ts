import Stripe from "stripe";

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(secretKey, { apiVersion: "2026-06-24.dahlia" });
}

export async function createDigitalProductCheckoutUrl({
  priceId,
  slug,
  origin,
}: {
  priceId: string;
  slug: string;
  origin: string;
}) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { product_slug: slug },
    success_url: `${origin}/downloads/${slug}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/products`,
  });
  return session.url;
}

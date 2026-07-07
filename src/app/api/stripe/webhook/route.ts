import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripe } from "../../../../lib/stripe";
import { createAdminClient } from "../../../../lib/supabase/admin";

export const runtime = "nodejs";

async function handleOneTimePurchase(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email ?? session.customer_email;
  const programSlug = session.metadata?.program_slug;
  if (!email || !programSlug) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("purchases").insert({
    email,
    program_slug: programSlug,
    stripe_session_id: session.id,
    stripe_customer_id:
      typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
    amount_cents: session.amount_total,
  });

  // 23505 = unique_violation on stripe_session_id — expected on webhook retries.
  if (error && error.code !== "23505") {
    console.error("Failed to record purchase:", error);
    throw new Error("Failed to record purchase");
  }

  await preProvisionUser(email);
}

async function handleSubscriptionCheckout(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email ?? session.customer_email;
  const productSlug = session.metadata?.product_slug;
  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  if (!email || !productSlug || !subscriptionId) return;

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  await upsertSubscription(email, productSlug, subscription);
  await preProvisionUser(email);
}

async function upsertSubscription(email: string, productSlug: string, subscription: Stripe.Subscription) {
  const supabase = createAdminClient();
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
  const { error } = await supabase.from("subscriptions").upsert(
    {
      email,
      product_slug: productSlug,
      stripe_customer_id:
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      current_period_end: currentPeriodEnd
        ? new Date(currentPeriodEnd * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" }
  );
  if (error) {
    console.error("Failed to upsert subscription:", error);
    throw new Error("Failed to upsert subscription");
  }
}

async function preProvisionUser(email: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.createUser({ email, email_confirm: true });
  if (error && error.code !== "email_exists") {
    console.error("Failed to pre-provision auth user:", error);
  }
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature ?? "", webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription") {
        await handleSubscriptionCheckout(session);
      } else {
        await handleOneTimePurchase(session);
      }
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const productSlug = subscription.metadata?.product_slug;
      if (productSlug) {
        const customer =
          typeof subscription.customer === "string"
            ? await getStripe().customers.retrieve(subscription.customer)
            : subscription.customer;
        const email = !customer.deleted ? customer.email : null;
        if (email) {
          await upsertSubscription(email, productSlug, subscription);
        }
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

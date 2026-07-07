import Link from "next/link";
import { headers } from "next/headers";

import { getStripe } from "../../../../lib/stripe";
import { createClient } from "../../../../lib/supabase/server";
import MagicLinkForm from "../../../../components/program/MagicLinkForm";
import PurchaseTracker from "../../../../components/analytics/PurchaseTracker";

export const metadata = {
  title: "Welcome to JumpStart | Mr. Discipline",
};

interface WelcomePageProps {
  searchParams: { session_id?: string };
}

async function resolvePurchaseDetails(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const email = session.customer_details?.email ?? session.customer_email ?? null;
    if (!email) return null;
    return {
      email,
      amount: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? "usd").toUpperCase(),
    };
  } catch {
    return null;
  }
}

export default async function JumpstartWelcomePage({ searchParams }: WelcomePageProps) {
  const purchase = await resolvePurchaseDetails(searchParams.session_id);
  const email = purchase?.email ?? null;

  if (email) {
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ?? `https://${headers().get("host")}`;
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=/program/jumpstart`,
      },
    });
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      {searchParams.session_id && purchase && (
        <PurchaseTracker
          eventId={searchParams.session_id}
          value={purchase.amount}
          currency={purchase.currency}
          contentName="JumpStart"
        />
      )}
      <div className="max-w-md w-full text-center py-24">
        <span className="inline-block text-red-500 font-black tracking-[0.2em] text-[13px] uppercase">
          Mr. Discipline
        </span>
        <h1 className="mt-4 text-white font-black text-[32px] sm:text-[40px] leading-tight">
          You&apos;re in.
        </h1>

        {email ? (
          <>
            <p className="mt-4 text-white/60 text-[15px]">
              We sent an access link to <span className="text-white">{email}</span>. Open it on
              this device to start Day 1.
            </p>
            <p className="mt-6 text-white/40 text-[13px]">
              Didn&apos;t get it? Request a new link below.
            </p>
            <div className="mt-4">
              <MagicLinkForm prefillEmail={email} />
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-white/60 text-[15px]">
              Enter the email you purchased with and we&apos;ll send you an access link.
            </p>
            <div className="mt-6">
              <MagicLinkForm />
            </div>
          </>
        )}

        <Link
          href="/products"
          className="mt-10 inline-block text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
        >
          Back to products
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

import { getCoachingAccess } from "../../../lib/program/coachingAccess";
import MagicLinkForm from "../../../components/program/MagicLinkForm";
import ManageSubscriptionButton from "../../../components/program/ManageSubscriptionButton";

export const metadata = {
  title: "Live Coach Consultation | Mr. Discipline",
};

const CAL_EMBED_URL = "https://cal.com/chukwudi-oshilim/coaching-hour?theme=dark";

export default async function CoachingPage() {
  const access = await getCoachingAccess();

  if (access.status === "signed_out") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center py-24">
          <span className="inline-block text-red-500 font-black tracking-[0.2em] text-[13px] uppercase">
            Mr. Discipline
          </span>
          <h1 className="mt-4 text-white font-black text-[32px] sm:text-[40px] leading-tight">
            Live Coach Consultation
          </h1>
          <p className="mt-4 text-white/60 text-[15px]">
            Enter the email you subscribed with and we&apos;ll send you an access link.
          </p>
          <div className="mt-6">
            <MagicLinkForm next="/program/coaching" />
          </div>
          <Link
            href="/products"
            className="mt-10 inline-block text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
          >
            Haven&apos;t subscribed yet?
          </Link>
        </div>
      </div>
    );
  }

  if (access.status === "no_subscription" || access.status === "inactive") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center py-24">
          <span className="inline-block text-red-500 font-black tracking-[0.2em] text-[13px] uppercase">
            Mr. Discipline
          </span>
          <h1 className="mt-4 text-white font-black text-[28px] sm:text-[34px] leading-tight">
            {access.status === "inactive" ? "Subscription needs attention" : "No subscription found"}
          </h1>
          <p className="mt-4 text-white/60 text-[15px]">
            {access.status === "inactive"
              ? `Your subscription is currently "${access.subscriptionStatus}". Update your payment method to keep booking weekly calls.`
              : `We couldn't find an active Live Coach Consultation subscription for ${access.user.email}.`}
          </p>
          {access.status === "inactive" ? (
            <div className="mt-8">
              <ManageSubscriptionButton />
            </div>
          ) : (
            <Link
              href="/products"
              className="mt-8 inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View Live Coach Consultation
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
        >
          ← Back to portfolio
        </Link>

        <div className="mt-8 text-center">
          <span className="text-red-500 font-black tracking-[0.2em] text-[12px] uppercase">
            Mr. Discipline
          </span>
          <h1 className="mt-3 text-white font-black text-[32px] sm:text-[40px]">
            You&apos;re subscribed.
          </h1>
          <p className="mt-3 text-white/60 text-[15px]">
            Book your weekly coaching call below — any time that works for you.
          </p>
        </div>

        <div className="mt-10 rounded-2xl overflow-hidden border border-red-500/30 bg-white/[0.03]">
          <iframe src={CAL_EMBED_URL} className="w-full h-[700px]" title="Book your coaching call" />
        </div>

        <div className="mt-8">
          <ManageSubscriptionButton />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Chukwudi Oshilim",
  description: "Terms of service for products, programs, and coaching sold by Mr. Discipline.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
        >
          ← Back to portfolio
        </Link>

        <span className="mt-10 block text-red-500 font-black tracking-[0.2em] text-[13px] uppercase">
          Mr. Discipline
        </span>
        <h1 className="mt-3 text-white font-black text-[34px] sm:text-[44px] leading-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-white/40 text-[13px]">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-white/70 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">1. Acceptance</h2>
            <p>
              By purchasing a product, subscribing to coaching, or booking a call through this
              site, you agree to these terms. If you don&apos;t agree, please don&apos;t use the
              site or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">2. What we sell</h2>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>Digital downloads (planners, workbooks, guides — instant delivery as PDF)</li>
              <li>The JumpStart 14-day program (video-based, delivered through a gated account area)</li>
              <li>Live Coach Consultation — a $99/month recurring subscription with weekly calls</li>
              <li>Paid one-off consultation calls (Quick Call, Focus Session, Coaching Hour), booked via Cal.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">3. Not medical advice</h2>
            <p>
              Nothing sold or discussed on this site — including JumpStart, coaching calls, or
              downloadable guides — is medical advice, therapy, or treatment. It is general
              motivation and accountability coaching intended to support your discipline and
              mood. Always consult a qualified professional for medical or mental health concerns.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">4. Account access</h2>
            <p>
              JumpStart and Coaching access are tied to the email address used at checkout.
              Sign-in uses a passwordless magic link sent to that email — keep access to that
              inbox to retain access to what you bought.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">5. Subscriptions</h2>
            <p>
              The Live Coach Consultation is billed monthly until cancelled. You can cancel any
              time from your account&apos;s subscription management page — cancellation takes
              effect at the end of the current billing period, and you keep access until then.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">6. Bookings</h2>
            <p>
              Paid calls are scheduled via Cal.com. Please reschedule at least 24 hours in advance
              if you can&apos;t make a booked slot. No-shows without notice are not eligible for a
              refund or free reschedule.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">7. Refunds</h2>
            <p>
              See our <Link href="/refund" className="text-red-500 hover:text-red-400 underline">Refund Policy</Link> for
              details on each product type.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">8. Limitation of liability</h2>
            <p>
              This site and its products are provided as-is. We&apos;re not liable for indirect,
              incidental, or consequential damages arising from your use of any product,
              program, or coaching call purchased here.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">9. Contact</h2>
            <p>Questions about these terms — chukwudioshilim@gmail.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Refund Policy | Chukwudi Oshilim",
  description: "Refund policy for digital products, JumpStart, coaching, and booked calls.",
};

export default function RefundPage() {
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
          Refund Policy
        </h1>
        <p className="mt-2 text-white/40 text-[13px]">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-white/70 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">Digital downloads</h2>
            <p>
              Planners, workbooks, and guides are delivered instantly. Because there&apos;s no way
              to &quot;return&quot; a digital download once accessed, these sales are final —
              except if you were charged but never received a working download link, in which
              case email chukwudioshilim@gmail.com and we&apos;ll fix it or refund you.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">JumpStart (14-day program)</h2>
            <p>
              JumpStart unlocks instantly on purchase. Sales are final once purchased. If
              you&apos;re running into a technical issue accessing your account or content, email
              us before requesting a refund — most access issues are fixed within a day.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">Live Coach Consultation (subscription)</h2>
            <p>
              This is a recurring monthly subscription. You can cancel anytime from your
              subscription management page, and you&apos;ll keep access through the end of the
              period you&apos;ve already paid for. We don&apos;t provide partial refunds for
              unused time in the current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">Booked calls (Quick Call, Focus Session, Coaching Hour)</h2>
            <p>
              If you need to cancel or reschedule, do so at least 24 hours before your booked
              time and you&apos;ll be rebooked or refunded. Cancellations with less than 24
              hours&apos; notice, or no-shows, are not eligible for a refund.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">Questions</h2>
            <p>
              If something doesn&apos;t feel right about a charge, email
              chukwudioshilim@gmail.com before opening a dispute with your bank — we&apos;d
              rather sort it out directly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

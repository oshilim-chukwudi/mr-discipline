import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Chukwudi Oshilim",
  description: "How Chukwudi Oshilim / Mr. Discipline collects, uses, and protects your data.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-white/40 text-[13px]">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-white/70 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">1. Who we are</h2>
            <p>
              This site (chukwudioshilim.com and its Vercel-hosted deployments) is operated by
              Chukwudi Oshilim, trading as &quot;Mr. Discipline&quot;. For any privacy questions,
              contact chukwudioshilim@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">2. What we collect</h2>
            <p>When you buy a product, subscribe, or book a call, we collect:</p>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>Your email address (for account access, receipts, and magic-link sign-in)</li>
              <li>Purchase and subscription records (what you bought, when, and its status)</li>
              <li>Program progress data (JumpStart day completions and mood ratings, if you use it)</li>
              <li>Payment details — handled entirely by Stripe; we never see or store your card number</li>
              <li>Booking details — handled by Cal.com for scheduling paid calls</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">3. How we use it</h2>
            <p>
              We use your data to give you access to what you bought, send purchase and
              scheduling confirmations, track your program progress if you opt to log it, and
              respond to support requests. We do not sell your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">4. Third-party processors</h2>
            <p>We rely on the following processors to run this site:</p>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li><strong className="text-white">Stripe</strong> — payment processing and subscription billing</li>
              <li><strong className="text-white">Supabase</strong> — account authentication and data storage</li>
              <li><strong className="text-white">Cal.com</strong> — call scheduling and calendar booking</li>
              <li><strong className="text-white">Vercel</strong> — website hosting</li>
              <li><strong className="text-white">Google Analytics</strong> and <strong className="text-white">Meta (Facebook/Instagram) Pixel</strong> — anonymized site usage and ad performance tracking, if enabled</li>
            </ul>
            <p className="mt-3">
              Each of these processors has its own privacy policy governing how they handle data
              on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">5. Cookies and tracking</h2>
            <p>
              We use standard analytics and advertising cookies (Google Analytics, Meta Pixel) to
              understand how visitors use the site and to measure ad performance. You can block
              these using your browser&apos;s privacy settings or an ad blocker without affecting
              your ability to use the site.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">6. Your rights</h2>
            <p>
              You can request a copy of your data or ask us to delete your account and associated
              data at any time by emailing chukwudioshilim@gmail.com. We&apos;ll respond within a
              reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">7. Health &amp; wellness disclaimer</h2>
            <p>
              Content across this site (including the JumpStart program and coaching calls) is
              general motivation and discipline coaching. It is not medical or mental health
              treatment, diagnosis, or a substitute for professional care. If you&apos;re dealing
              with a medical or mental health condition, please consult a qualified professional.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-[18px] mb-2">8. Changes to this policy</h2>
            <p>
              We may update this policy occasionally. Continued use of the site after an update
              means you accept the revised terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

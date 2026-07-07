import Link from "next/link";

export const metadata = {
  title: "Book a Call | Chukwudi Oshilim",
  description: "Book a quick call or a full coaching hour with Chukwudi Oshilim.",
};

const CAL_BASE = "https://cal.com/chukwudi-oshilim";

export default function ConsultPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
        >
          ← Back to portfolio
        </Link>

        <div className="mt-8 text-center">
          <span className="text-red-500 font-black tracking-[0.2em] text-[13px] uppercase">
            Book a call
          </span>
          <h1 className="mt-3 text-white font-black text-[36px] sm:text-[48px] leading-tight">
            Let&apos;s talk.
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-white/50 text-[15px]">
            Pick whichever fits — a quick 15-minute call, or a full coaching hour.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-white font-bold text-[20px]">Quick Call — $15</h2>
            <p className="mt-1 text-white/50 text-[13px]">15 minutes</p>
            <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
              <iframe
                src={`${CAL_BASE}/quick-call?theme=dark`}
                className="w-full h-[700px]"
                title="Book a Quick Call"
              />
            </div>
          </div>

          <div>
            <h2 className="text-white font-bold text-[20px]">Coaching Hour — $50</h2>
            <p className="mt-1 text-white/50 text-[13px]">60 minutes</p>
            <div className="mt-4 rounded-2xl overflow-hidden border border-red-500/30 bg-white/[0.03]">
              <iframe
                src={`${CAL_BASE}/coaching-hour?theme=dark`}
                className="w-full h-[700px]"
                title="Book a Coaching Hour"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

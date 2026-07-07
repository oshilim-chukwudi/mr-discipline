import Link from "next/link";
import { Inter } from "next/font/google";

import CalBookButton from "../../components/program/CalBookButton";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

export const metadata = {
  title: "Book a Call | Chukwudi Oshilim",
  description: "Book a quick call or a full coaching hour with Chukwudi Oshilim.",
};

const TRUST_POINTS = [
  "Same-week booking",
  "Real 1-on-1 time, no sales pitch",
  "Cancel or reschedule any time",
];

interface CallOption {
  namespace: string;
  calLink: string;
  name: string;
  price: string;
  duration: string;
  tagline: string;
  bullets: string[];
  featured?: boolean;
}

const CALL_OPTIONS: CallOption[] = [
  {
    namespace: "quick-call",
    calLink: "chukwudi-oshilim/quick-call",
    name: "Quick Call",
    price: "$1",
    duration: "15 minutes",
    tagline: "A short intro call — meet me and see if we're a fit, low-stakes.",
    bullets: [
      "Quick questions or a fast check-in",
      "No commitment beyond the call",
      "Great first step before a full session",
    ],
  },
  {
    namespace: "focus-session",
    calLink: "chukwudi-oshilim/focus-session",
    name: "Focus Session",
    price: "$20",
    duration: "30 minutes",
    tagline: "Enough time to work through one problem or goal in depth.",
    bullets: [
      "Focused time on one specific challenge",
      "Actionable steps you can start same day",
      "A good middle ground before a full hour",
    ],
  },
  {
    namespace: "coaching-hour",
    calLink: "chukwudi-oshilim/coaching-hour",
    name: "Coaching Hour",
    price: "$50",
    duration: "60 minutes",
    tagline: "A full session to dig into your goals, questions, or challenges.",
    bullets: [
      "A full hour, fully focused on you",
      "Work through goals or blockers together",
      "Leave with a clear next step",
    ],
    featured: true,
  },
];

export default function ConsultPage() {
  return (
    <div className={`min-h-screen bg-black ${inter.className}`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
        >
          ← Back to portfolio
        </Link>

        <div className="mt-10 text-center">
          <span className="inline-block text-red-500 font-bold tracking-[0.2em] text-[13px] uppercase">
            Mr. Discipline
          </span>
          <h1 className="mt-4 text-white font-extrabold text-[40px] sm:text-[52px] leading-tight tracking-tight">
            Let&apos;s <span className="text-red-600">talk.</span>
          </h1>
          <p className="mt-5 max-w-lg mx-auto text-white/50 text-[16px]">
            Pick whichever fits — a quick chat, a focused half-hour, or a full coaching hour.
            Booked and paid in one step.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {TRUST_POINTS.map((point) => (
              <span key={point} className="flex items-center gap-2 text-white/60 text-[13px]">
                <span className="text-red-500">✓</span>
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CALL_OPTIONS.map((option) => (
            <div
              key={option.namespace}
              className={`relative flex flex-col rounded-2xl bg-white/[0.03] border backdrop-blur-sm transition-colors duration-300 p-7 ${
                option.featured
                  ? "border-red-500/40 shadow-[0_0_50px_-15px_rgba(220,38,38,0.5)]"
                  : "border-white/10 hover:border-red-500/30"
              }`}
            >
              {option.featured && (
                <span className="absolute -top-3 left-7 bg-red-600 text-white text-[11px] font-bold tracking-wide px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}

              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-white font-semibold text-[19px] tracking-tight">{option.name}</h2>
                <span className="font-bold text-[24px] tracking-tight tabular-nums shrink-0 text-red-500">
                  {option.price}
                </span>
              </div>
              <p className="mt-1 text-white/40 text-[12.5px] font-medium tracking-wide">{option.duration}</p>
              <p className="mt-3 text-white/60 text-[14px] leading-relaxed font-normal">{option.tagline}</p>

              <ul className="mt-5 flex flex-col gap-2">
                {option.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-white/70 text-[13px] font-normal">
                    <span className="text-red-500 shrink-0 mt-[2px]">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <CalBookButton
                calLink={option.calLink}
                namespace={option.namespace}
                label={`Book — ${option.price}`}
                className={`mt-6 w-full rounded-lg py-3 text-[14px] font-semibold transition-colors duration-200 ${
                  option.featured
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10"
                }`}
              />
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-white/30 text-[12px]">
          All times shown in your local timezone. Payment is handled securely at booking — no
          account needed.
        </p>
      </div>
    </div>
  );
}

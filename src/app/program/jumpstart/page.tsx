import Link from "next/link";

import { createClient } from "../../../lib/supabase/server";
import { getJumpstartAccess } from "../../../lib/program/access";
import MagicLinkForm from "../../../components/program/MagicLinkForm";
import { formatDuration, ProgramContentRow, UserProgressRow } from "../../../types/program";

export const metadata = {
  title: "JumpStart | Mr. Discipline",
};

const PROGRAM_SLUG = "jumpstart";
const TOTAL_DAYS = 14;

export default async function JumpstartHubPage() {
  const access = await getJumpstartAccess(PROGRAM_SLUG);

  if (access.status === "signed_out") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center py-24">
          <span className="inline-block text-red-500 font-black tracking-[0.2em] text-[13px] uppercase">
            Mr. Discipline
          </span>
          <h1 className="mt-4 text-white font-black text-[32px] sm:text-[40px] leading-tight">
            JumpStart
          </h1>
          <p className="mt-4 text-white/60 text-[15px]">
            Enter the email you purchased with and we&apos;ll send you an access link.
          </p>
          <div className="mt-6">
            <MagicLinkForm />
          </div>
          <Link
            href="/products"
            className="mt-10 inline-block text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
          >
            Haven&apos;t bought JumpStart yet?
          </Link>
        </div>
      </div>
    );
  }

  if (access.status === "no_purchase") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center py-24">
          <span className="inline-block text-red-500 font-black tracking-[0.2em] text-[13px] uppercase">
            Mr. Discipline
          </span>
          <h1 className="mt-4 text-white font-black text-[28px] sm:text-[34px] leading-tight">
            No JumpStart purchase found
          </h1>
          <p className="mt-4 text-white/60 text-[15px]">
            We couldn&apos;t find a JumpStart purchase for {access.user.email}. If you just
            bought it, purchases can take a minute to show up — try refreshing.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Get JumpStart
          </Link>
        </div>
      </div>
    );
  }

  const supabase = createClient();
  const user = access.user;

  const [{ data: content }, { data: progress }] = await Promise.all([
    supabase
      .from("program_content")
      .select("*")
      .eq("program_slug", PROGRAM_SLUG)
      .order("sort_order", { ascending: true }),
    supabase
      .from("user_progress")
      .select("*")
      .eq("program_slug", PROGRAM_SLUG)
      .eq("user_id", user.id),
  ]);

  const days: ProgramContentRow[] = content ?? [];
  const progressByDay = new Map<number, UserProgressRow>(
    (progress ?? []).map((row: UserProgressRow) => [row.day_number, row])
  );

  const completedCount = days.filter((d) => progressByDay.get(d.day_number)?.completed_at).length;
  const allComplete = completedCount >= TOTAL_DAYS && days.length === TOTAL_DAYS;
  const nextDay =
    days.find((d) => !progressByDay.get(d.day_number)?.completed_at) ?? days[days.length - 1];

  const deltas = (progress ?? [])
    .filter((row: UserProgressRow) => row.mood_before != null && row.mood_after != null)
    .map((row: UserProgressRow) => (row.mood_after as number) - (row.mood_before as number));
  const avgDelta =
    deltas.length > 0 ? deltas.reduce((a, b) => a + b, 0) / deltas.length : null;

  const currentDayNumber = nextDay?.day_number ?? TOTAL_DAYS;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 pt-28 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
        >
          ← Back to portfolio
        </Link>

        <div className="mt-8">
          <span className="text-red-500 font-black tracking-[0.2em] text-[12px] uppercase">
            Mr. Discipline
          </span>
          <div className="mt-2 flex items-end justify-between gap-4">
            <h1 className="text-white font-black text-[28px] sm:text-[36px]">
              Day {currentDayNumber} of {TOTAL_DAYS}
            </h1>
            <span className="text-white/50 text-[13px] font-medium mb-1">
              {completedCount}/{TOTAL_DAYS} complete
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / TOTAL_DAYS) * 100}%` }}
            />
          </div>
        </div>

        {allComplete ? (
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-white/[0.03] p-8 text-center">
            <p className="text-red-500 font-black tracking-[0.15em] text-[12px] uppercase">
              Program complete
            </p>
            <h2 className="mt-3 text-white font-black text-[24px] sm:text-[28px]">
              You showed up for all 14 days.
            </h2>
            {avgDelta !== null && (
              <p className="mt-3 text-white/60 text-[15px]">
                You averaged{" "}
                <span className="text-white font-bold">
                  {avgDelta >= 0 ? "+" : ""}
                  {avgDelta.toFixed(1)}
                </span>{" "}
                on your mood after moving.
              </p>
            )}
          </div>
        ) : (
          nextDay && (
            <Link
              href={`/program/jumpstart/day/${nextDay.day_number}`}
              className="mt-8 flex items-center gap-5 rounded-2xl border border-red-500/30 bg-white/[0.03] hover:border-red-500/50 p-6 transition-colors duration-300"
            >
              <span className="shrink-0 w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-[20px]">
                ▶
              </span>
              <span className="min-w-0">
                <span className="block text-red-500 text-[12px] font-bold uppercase tracking-wide">
                  Today&apos;s session — Day {nextDay.day_number}
                </span>
                <span className="block text-white font-bold text-[18px] truncate">
                  {nextDay.title}
                </span>
                <span className="block text-white/50 text-[13px]">
                  {formatDuration(nextDay.duration_seconds)}
                </span>
              </span>
            </Link>
          )
        )}

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {days.map((day) => {
            const isComplete = Boolean(progressByDay.get(day.day_number)?.completed_at);
            const isFuture = day.day_number > currentDayNumber;
            return (
              <Link
                key={day.id}
                href={`/program/jumpstart/day/${day.day_number}`}
                className={`relative rounded-xl border p-4 transition-colors duration-300 ${
                  isComplete
                    ? "border-red-500/40 bg-red-500/[0.06]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                } ${isFuture ? "opacity-50" : ""}`}
              >
                {isComplete && (
                  <span className="absolute top-3 right-3 text-red-500 text-[14px]">✓</span>
                )}
                <span className="block text-white/40 text-[11px] font-bold uppercase tracking-wide">
                  Day {day.day_number}
                </span>
                <span className="mt-1 block text-white text-[14px] font-bold leading-snug">
                  {day.title}
                </span>
                <span className="mt-1 block text-white/40 text-[12px]">
                  {formatDuration(day.duration_seconds)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/80 backdrop-blur-sm py-6 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="/products/jumpstart-guide.pdf"
            download
            className="text-white/70 hover:text-white text-[13px] font-semibold transition-colors duration-200"
          >
            ↓ Download the JumpStart companion guide (PDF)
          </a>
          <p className="text-white/30 text-[11px] text-center sm:text-right max-w-md">
            JumpStart is designed to support your mood through movement. It is not a substitute
            for professional care. If you are in crisis, contact{" "}
            <a href="tel:988" className="underline hover:text-white/60">
              988
            </a>{" "}
            (US) or your local emergency number.
          </p>
        </div>
      </div>
    </div>
  );
}

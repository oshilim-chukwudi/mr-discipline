'use client'
import { useState, useEffect, useTransition } from "react";
import Link from "next/link";

import { formatDuration, ProgramContentRow, UserProgressRow } from "../../types/program";
import { markDayComplete } from "../../app/program/jumpstart/day/[n]/actions";

const MOOD_EMOJIS = ["😞", "😕", "😐", "🙂", "😄"];

interface DayViewProps {
  day: ProgramContentRow;
  existingProgress: UserProgressRow | null;
  prevDay: number | null;
  nextDay: number | null;
  totalDays: number;
  gateUnlocksAt: string | null;
}

const MoodPicker = ({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number | null;
  onChange: (v: number) => void;
  disabled?: boolean;
}) => (
  <div className="text-center">
    <p className="text-white/70 text-[13px] font-medium mb-3">{label}</p>
    <div className="flex justify-center gap-2 sm:gap-3">
      {MOOD_EMOJIS.map((emoji, i) => {
        const moodValue = i + 1;
        const selected = value === moodValue;
        return (
          <button
            key={moodValue}
            type="button"
            disabled={disabled}
            onClick={() => onChange(moodValue)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[22px] sm:text-[26px] border transition-all duration-200 ${
              selected
                ? "border-red-500 bg-red-500/15 scale-110"
                : "border-white/10 bg-white/[0.03] hover:border-white/25"
            } ${disabled ? "opacity-60" : ""}`}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  </div>
);

const formatCountdown = (msRemaining: number): string => {
  const totalMinutes = Math.max(0, Math.ceil(msRemaining / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
};

const DayView = ({
  day,
  existingProgress,
  prevDay,
  nextDay,
  totalDays,
  gateUnlocksAt,
}: DayViewProps) => {
  const [moodBefore, setMoodBefore] = useState<number | null>(
    existingProgress?.mood_before ?? null
  );
  const [moodAfter, setMoodAfter] = useState<number | null>(existingProgress?.mood_after ?? null);
  const [isComplete, setIsComplete] = useState(Boolean(existingProgress?.completed_at));
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const gateUnlockTime = gateUnlocksAt ? new Date(gateUnlocksAt).getTime() : null;
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!gateUnlockTime) return;
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, [gateUnlockTime]);

  const isGated = Boolean(gateUnlockTime && now !== null && now < gateUnlockTime && !isComplete);
  const canComplete = moodBefore !== null && moodAfter !== null && !isComplete && !isGated;

  const handleComplete = () => {
    if (moodBefore === null || moodAfter === null) return;
    setError(null);
    startTransition(async () => {
      try {
        await markDayComplete(day.day_number, moodBefore, moodAfter);
        setIsComplete(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't save that. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        <Link
          href="/program/jumpstart"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
        >
          ← Back to JumpStart
        </Link>

        <div className="mt-6 text-center">
          <span className="text-red-500 font-black tracking-[0.15em] text-[12px] uppercase">
            Day {day.day_number} of {totalDays}
          </span>
          <h1 className="mt-2 text-white font-black text-[26px] sm:text-[32px]">{day.title}</h1>
          <p className="mt-1 text-white/40 text-[13px]">{formatDuration(day.duration_seconds)}</p>
          {day.description && (
            <p className="mt-3 text-white/60 text-[14px] max-w-md mx-auto">{day.description}</p>
          )}
        </div>

        <div className="mt-8">
          <MoodPicker
            label="How are you feeling before moving?"
            value={moodBefore}
            onChange={setMoodBefore}
            disabled={isComplete}
          />
        </div>

        <div className="mt-8 mx-auto w-full max-w-[380px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
          {day.video_embed_url ? (
            <iframe
              src={day.video_embed_url}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={day.title}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-center px-6">
              <p className="text-white/40 text-[14px]">Coming soon</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <MoodPicker
            label="How are you feeling after moving?"
            value={moodAfter}
            onChange={setMoodAfter}
            disabled={isComplete}
          />
        </div>

        <div className="mt-8 text-center">
          {isComplete ? (
            <span className="inline-flex items-center gap-2 text-red-500 font-bold text-[15px]">
              ✓ Day {day.day_number} complete
            </span>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canComplete || isPending}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold py-3 px-10 rounded-lg transition-colors duration-200"
            >
              {isPending ? "Saving..." : "Mark complete"}
            </button>
          )}
          {!isComplete && isGated && gateUnlockTime && now !== null && (
            <p className="mt-3 text-white/40 text-[13px]">
              One day at a time — available in {formatCountdown(gateUnlockTime - now)}.
            </p>
          )}
          {!isComplete && !isGated && moodBefore === null && (
            <p className="mt-3 text-white/40 text-[13px]">
              Tap a mood above, and one below after moving, to unlock this.
            </p>
          )}
          {!isComplete && !isGated && moodBefore !== null && moodAfter === null && (
            <p className="mt-3 text-white/40 text-[13px]">
              Tap a mood below, after moving, to unlock this.
            </p>
          )}
          {error && <p className="mt-3 text-red-400 text-[13px]">{error}</p>}
        </div>

        <div className="mt-12 flex items-center justify-between">
          {prevDay ? (
            <Link
              href={`/program/jumpstart/day/${prevDay}`}
              className="text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
            >
              ← Day {prevDay}
            </Link>
          ) : (
            <span />
          )}
          {nextDay ? (
            <Link
              href={`/program/jumpstart/day/${nextDay}`}
              className="text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
            >
              Day {nextDay} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;

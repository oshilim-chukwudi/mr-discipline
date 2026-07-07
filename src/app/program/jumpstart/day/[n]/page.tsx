import { notFound, redirect } from "next/navigation";

import { createClient } from "../../../../../lib/supabase/server";
import { getJumpstartAccess } from "../../../../../lib/program/access";
import DayView from "../../../../../components/program/DayView";
import { ProgramContentRow, UserProgressRow } from "../../../../../types/program";

const PROGRAM_SLUG = "jumpstart";
const TOTAL_DAYS = 14;
const GATE_HOURS = 24;

interface DayPageProps {
  params: { n: string };
}

export async function generateMetadata({ params }: DayPageProps) {
  return { title: `Day ${params.n} | JumpStart` };
}

export default async function JumpstartDayPage({ params }: DayPageProps) {
  const dayNumber = Number(params.n);
  if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > TOTAL_DAYS) {
    notFound();
  }

  const access = await getJumpstartAccess(PROGRAM_SLUG);
  if (access.status !== "ok") {
    redirect("/program/jumpstart");
  }

  const supabase = createClient();

  const { data: day } = await supabase
    .from("program_content")
    .select("*")
    .eq("program_slug", PROGRAM_SLUG)
    .eq("day_number", dayNumber)
    .maybeSingle<ProgramContentRow>();

  if (!day) {
    notFound();
  }

  const { data: existingProgress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("program_slug", PROGRAM_SLUG)
    .eq("day_number", dayNumber)
    .eq("user_id", access.user.id)
    .maybeSingle<UserProgressRow>();

  const { data: mostRecentCompletion } = await supabase
    .from("user_progress")
    .select("completed_at")
    .eq("program_slug", PROGRAM_SLUG)
    .eq("user_id", access.user.id)
    .neq("day_number", dayNumber)
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ completed_at: string }>();

  const gateUnlocksAt = mostRecentCompletion
    ? new Date(
        new Date(mostRecentCompletion.completed_at).getTime() + GATE_HOURS * 3_600_000
      ).toISOString()
    : null;

  return (
    <DayView
      day={day}
      existingProgress={existingProgress}
      prevDay={dayNumber > 1 ? dayNumber - 1 : null}
      nextDay={dayNumber < TOTAL_DAYS ? dayNumber + 1 : null}
      totalDays={TOTAL_DAYS}
      gateUnlocksAt={gateUnlocksAt}
    />
  );
}

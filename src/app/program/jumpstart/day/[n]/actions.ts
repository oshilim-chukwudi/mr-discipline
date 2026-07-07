'use server'

import { createClient } from "../../../../../lib/supabase/server";

const PROGRAM_SLUG = "jumpstart";
const GATE_HOURS = 24;

export async function markDayComplete(
  dayNumber: number,
  moodBefore: number,
  moodAfter: number
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: mostRecent } = await supabase
    .from("user_progress")
    .select("completed_at")
    .eq("user_id", user.id)
    .eq("program_slug", PROGRAM_SLUG)
    .neq("day_number", dayNumber)
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (mostRecent?.completed_at) {
    const hoursSince = (Date.now() - new Date(mostRecent.completed_at).getTime()) / 3_600_000;
    if (hoursSince < GATE_HOURS) {
      throw new Error(
        `You can mark your next day complete ${Math.ceil(GATE_HOURS - hoursSince)}h from now.`
      );
    }
  }

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      program_slug: PROGRAM_SLUG,
      day_number: dayNumber,
      mood_before: moodBefore,
      mood_after: moodAfter,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,program_slug,day_number" }
  );

  if (error) {
    throw new Error(error.message);
  }
}

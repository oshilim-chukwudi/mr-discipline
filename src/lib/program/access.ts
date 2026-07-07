import { createClient } from "../supabase/server";
import type { User } from "@supabase/supabase-js";

export type JumpstartAccess =
  | { status: "signed_out" }
  | { status: "no_purchase"; user: User }
  | { status: "ok"; user: User };

export async function getJumpstartAccess(programSlug: string): Promise<JumpstartAccess> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn(
      "Supabase env vars are not set — showing the signed-out gate. See README for setup steps."
    );
    return { status: "signed_out" };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { status: "signed_out" };
  }

  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("program_slug", programSlug)
    .maybeSingle();

  if (!purchase) {
    return { status: "no_purchase", user };
  }

  return { status: "ok", user };
}

import { createClient } from "../supabase/server";
import type { User } from "@supabase/supabase-js";

export type CoachingAccess =
  | { status: "signed_out" }
  | { status: "no_subscription"; user: User }
  | { status: "inactive"; user: User; subscriptionStatus: string }
  | { status: "ok"; user: User };

const ACTIVE_STATUSES = ["active", "trialing"];

export async function getCoachingAccess(): Promise<CoachingAccess> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase env vars are not set — showing the signed-out gate.");
    return { status: "signed_out" };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { status: "signed_out" };
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("product_slug", "coaching")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!subscription) {
    return { status: "no_subscription", user };
  }

  if (!ACTIVE_STATUSES.includes(subscription.status)) {
    return { status: "inactive", user, subscriptionStatus: subscription.status };
  }

  return { status: "ok", user };
}
